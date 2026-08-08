import { mat4 } from "gl-matrix";
import { createAndSetupTexture } from "./infinite-menu-gl-utils";
import type { GridMenuState } from "./infinite-menu-grid-runtime";
import type { MenuItem } from "./infinite-menu-types";

export function initMenuTexture(
  state: GridMenuState,
  destroyed: () => boolean,
) {
  if (!state.gl) return;
  const gl = state.gl;
  state.tex = createAndSetupTexture(gl, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);
  const itemCount = Math.max(1, state.items.length);
  state.atlasSize = Math.ceil(Math.sqrt(itemCount));
  const cellSize = 512;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = state.atlasSize * cellSize;
  canvas.height = state.atlasSize * cellSize;
  Promise.all(
    state.items.map(
      (item: MenuItem) =>
        new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve(img);
          img.src = item.image;
        }),
    ),
  ).then((images) => {
    if (destroyed()) return;
    images.forEach((img, i) => {
      ctx.drawImage(
        img,
        (i % state.atlasSize) * cellSize,
        Math.floor(i / state.atlasSize) * cellSize,
        cellSize,
        cellSize,
      );
    });
    gl.bindTexture(gl.TEXTURE_2D, state.tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
    gl.generateMipmap(gl.TEXTURE_2D);
  });
}

export function initDiscInstances(state: GridMenuState, count: number) {
  if (!state.gl || !state.discVAO) return;
  const gl = state.gl;
  const matricesArray = new Float32Array(count * 16);
  const matrices: Float32Array[] = [];
  for (let i = 0; i < count; ++i) {
    const instanceMatrixArray = new Float32Array(matricesArray.buffer, i * 16 * 4, 16);
    mat4.identity(instanceMatrixArray as unknown as mat4);
    matrices.push(instanceMatrixArray);
  }
  state.discInstances = { matricesArray, matrices, buffer: gl.createBuffer() };
  gl.bindVertexArray(state.discVAO);
  gl.bindBuffer(gl.ARRAY_BUFFER, state.discInstances.buffer);
  gl.bufferData(gl.ARRAY_BUFFER, state.discInstances.matricesArray.byteLength, gl.DYNAMIC_DRAW);
  for (let j = 0; j < 4; ++j) {
    const loc = (state.discLocations.aInstanceMatrix as number) + j;
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, 16 * 4, j * 4 * 4);
    gl.vertexAttribDivisor(loc, 1);
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindVertexArray(null);
}
