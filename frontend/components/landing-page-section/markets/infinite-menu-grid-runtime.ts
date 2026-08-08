import { mat4, quat, vec3 } from "gl-matrix";
import type { ArcballControl } from "./infinite-menu-arcball";
import type { ActiveItemCallback, MenuItem, MovementChangeCallback } from "./infinite-menu-types";

export interface GridMenuState {
  gl: WebGL2RenderingContext | null;
  discProgram: WebGLProgram | null;
  discVAO: WebGLVertexArrayObject | null;
  discBuffers: {
    vertices: Float32Array;
    indices: Uint16Array;
    normals: Float32Array;
    uvs: Float32Array;
  };
  worldMatrix: mat4;
  tex: WebGLTexture | null;
  control: ArcballControl;
  discLocations: Record<string, number | WebGLUniformLocation | null>;
  discInstances: {
    matricesArray: Float32Array;
    matrices: Float32Array[];
    buffer: WebGLBuffer | null;
  };
  instancePositions: vec3[];
  DISC_INSTANCE_COUNT: number;
  atlasSize: number;
  _frames: number;
  movementActive: boolean;
  TARGET_FRAME_DURATION: number;
  SPHERE_RADIUS: number;
  smoothRotationVelocity: number;
  scaleFactor: number;
  items: MenuItem[];
  onActiveItemChange: ActiveItemCallback;
  onMovementChange: MovementChangeCallback;
  camera: {
    matrix: mat4;
    near: number;
    far: number;
    fov: number;
    aspect: number;
    position: vec3;
    up: vec3;
    matrices: {
      view: mat4;
      projection: mat4;
      inversProjection: mat4;
    };
  };
}

export function animateGridMenu(state: GridMenuState, deltaTime: number) {
  if (!state.gl) return;
  state.control.update(deltaTime, state.TARGET_FRAME_DURATION);
  const positions = state.instancePositions.map((p) =>
    vec3.transformQuat(vec3.create(), p, state.control.orientation),
  );
  const scale = 0.25;
  const SCALE_INTENSITY = 0.6;
  positions.forEach((p, ndx) => {
    const s = (Math.abs(p[2]) / state.SPHERE_RADIUS) * SCALE_INTENSITY + (1 - SCALE_INTENSITY);
    const finalScale = s * scale;
    const matrix = mat4.create();
    mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), vec3.negate(vec3.create(), p)));
    mat4.multiply(matrix, matrix, mat4.targetTo(mat4.create(), [0, 0, 0], p, [0, 1, 0]));
    mat4.multiply(matrix, matrix, mat4.fromScaling(mat4.create(), [finalScale, finalScale, finalScale]));
    mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), [0, 0, -state.SPHERE_RADIUS]));
    mat4.copy(state.discInstances.matrices[ndx], matrix);
  });
  state.gl.bindBuffer(state.gl.ARRAY_BUFFER, state.discInstances.buffer);
  state.gl.bufferSubData(state.gl.ARRAY_BUFFER, 0, state.discInstances.matricesArray);
  state.gl.bindBuffer(state.gl.ARRAY_BUFFER, null);
  state.smoothRotationVelocity = state.control.rotationVelocity;
}

export function renderGridMenu(state: GridMenuState) {
  if (!state.gl || !state.discProgram) return;
  const gl = state.gl;
  const loc = state.discLocations;
  gl.useProgram(state.discProgram);
  gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.uniformMatrix4fv(loc.uWorldMatrix as WebGLUniformLocation, false, state.worldMatrix);
  gl.uniformMatrix4fv(loc.uViewMatrix as WebGLUniformLocation, false, state.camera.matrices.view);
  gl.uniformMatrix4fv(loc.uProjectionMatrix as WebGLUniformLocation, false, state.camera.matrices.projection);
  gl.uniform3f(
    loc.uCameraPosition as WebGLUniformLocation,
    state.camera.position[0],
    state.camera.position[1],
    state.camera.position[2],
  );
  gl.uniform4f(
    loc.uRotationAxisVelocity as WebGLUniformLocation,
    state.control.rotationAxis[0],
    state.control.rotationAxis[1],
    state.control.rotationAxis[2],
    state.smoothRotationVelocity * 1.1,
  );
  gl.uniform1i(loc.uItemCount as WebGLUniformLocation, state.items.length);
  gl.uniform1i(loc.uAtlasSize as WebGLUniformLocation, state.atlasSize);
  gl.uniform1f(loc.uFrames as WebGLUniformLocation, state._frames);
  gl.uniform1f(loc.uScaleFactor as WebGLUniformLocation, state.scaleFactor);
  gl.uniform1i(loc.uTex as WebGLUniformLocation, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, state.tex);
  gl.bindVertexArray(state.discVAO);
  gl.drawElementsInstanced(
    gl.TRIANGLES,
    state.discBuffers.indices.length,
    gl.UNSIGNED_SHORT,
    0,
    state.DISC_INSTANCE_COUNT,
  );
  gl.bindVertexArray(null);
}

export function updateCameraMatrix(state: GridMenuState) {
  mat4.targetTo(state.camera.matrix, state.camera.position, [0, 0, 0], state.camera.up);
  mat4.invert(state.camera.matrices.view, state.camera.matrix);
}

export function updateProjectionMatrix(state: GridMenuState) {
  if (!state.gl) return;
  const canvasEl = state.gl.canvas as HTMLCanvasElement;
  state.camera.aspect = canvasEl.clientWidth / canvasEl.clientHeight;
  const height = state.SPHERE_RADIUS * 0.35;
  const distance = state.camera.position[2];
  state.camera.fov =
    state.camera.aspect > 1
      ? 2 * Math.atan(height / distance)
      : 2 * Math.atan(height / state.camera.aspect / distance);
  mat4.perspective(
    state.camera.matrices.projection,
    state.camera.fov,
    state.camera.aspect,
    state.camera.near,
    state.camera.far,
  );
  mat4.invert(state.camera.matrices.inversProjection, state.camera.matrices.projection);
}

function findNearestVertexIndex(state: GridMenuState) {
  const n = state.control.snapDirection;
  const inversOrientation = quat.conjugate(quat.create(), state.control.orientation);
  const nt = vec3.transformQuat(vec3.create(), n, inversOrientation);
  let maxD = -1;
  let nearestVertexIndex = 0;
  for (let i = 0; i < state.instancePositions.length; ++i) {
    const d = vec3.dot(nt, state.instancePositions[i]);
    if (d > maxD) {
      maxD = d;
      nearestVertexIndex = i;
    }
  }
  return nearestVertexIndex;
}

function getVertexWorldPosition(state: GridMenuState, index: number) {
  return vec3.transformQuat(vec3.create(), state.instancePositions[index], state.control.orientation);
}

export function onControlUpdate(state: GridMenuState, deltaTime: number) {
  const timeScale = deltaTime / state.TARGET_FRAME_DURATION + 0.0001;
  let damping = 5 / timeScale;
  let cameraTargetZ = 3 * state.scaleFactor;
  const isMoving = state.control.isPointerDown || Math.abs(state.smoothRotationVelocity) > 0.01;
  if (isMoving !== state.movementActive) {
    state.movementActive = isMoving;
    state.onMovementChange(isMoving);
  }
  if (!state.control.isPointerDown) {
    const nearestVertexIndex = findNearestVertexIndex(state);
    state.onActiveItemChange(nearestVertexIndex % Math.max(1, state.items.length));
    state.control.snapTargetDirection = vec3.normalize(
      vec3.create(),
      getVertexWorldPosition(state, nearestVertexIndex),
    );
  } else {
    cameraTargetZ += state.control.rotationVelocity * 80 + 2.5;
    damping = 7 / timeScale;
  }
  state.camera.position[2] += (cameraTargetZ - state.camera.position[2]) / damping;
  updateCameraMatrix(state);
}
