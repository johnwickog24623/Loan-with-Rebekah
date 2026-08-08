import { Mesh, Program, Renderer, Triangle } from "ogl";
import { SIDE_RAYS_FRAG, SIDE_RAYS_VERT } from "./side-rays-shaders";
import { hexToRgb, originToFlip, type SideRaysOrigin } from "./side-rays-utils";

export interface SideRaysInitConfig {
  speed: number;
  rayColor1: string;
  rayColor2: string;
  intensity: number;
  spread: number;
  origin: SideRaysOrigin;
  tilt: number;
  saturation: number;
  blend: number;
  falloff: number;
  opacity: number;
}

export type SideRaysUniforms = {
  iTime: { value: number };
  iResolution: { value: number[] };
  iSpeed: { value: number };
  iRayColor1: { value: number[] };
  iRayColor2: { value: number[] };
  iIntensity: { value: number };
  iSpread: { value: number };
  iFlipX: { value: number };
  iFlipY: { value: number };
  iTilt: { value: number };
  iSaturation: { value: number };
  iBlend: { value: number };
  iFalloff: { value: number };
  iOpacity: { value: number };
};

export function createSideRaysScene(
  container: HTMLDivElement,
  config: SideRaysInitConfig,
) {
  const renderer = new Renderer({
    dpr: Math.min(window.devicePixelRatio, 2),
    alpha: true,
    premultipliedAlpha: false,
  });
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);
  gl.canvas.style.display = "block";
  gl.canvas.style.position = "absolute";
  gl.canvas.style.inset = "0";
  gl.canvas.style.width = "100%";
  gl.canvas.style.height = "100%";
  container.replaceChildren(gl.canvas);
  const [flipX, flipY] = originToFlip(config.origin);
  const uniforms: SideRaysUniforms = {
    iTime: { value: 0 },
    iResolution: { value: [1, 1] },
    iSpeed: { value: config.speed },
    iRayColor1: { value: hexToRgb(config.rayColor1) },
    iRayColor2: { value: hexToRgb(config.rayColor2) },
    iIntensity: { value: config.intensity },
    iSpread: { value: config.spread },
    iFlipX: { value: flipX },
    iFlipY: { value: flipY },
    iTilt: { value: config.tilt },
    iSaturation: { value: config.saturation },
    iBlend: { value: config.blend },
    iFalloff: { value: config.falloff },
    iOpacity: { value: config.opacity },
  };
  const geometry = new Triangle(gl);
  const program = new Program(gl, {
    vertex: SIDE_RAYS_VERT,
    fragment: SIDE_RAYS_FRAG,
    uniforms,
    transparent: true,
    depthTest: false,
  });
  const mesh = new Mesh(gl, { geometry, program });
  const updateSize = () => {
    renderer.dpr = Math.min(window.devicePixelRatio, 2);
    const { clientWidth: w, clientHeight: h } = container;
    if (w < 2 || h < 2) return;
    renderer.setSize(w, h);
    uniforms.iResolution.value = [w * renderer.dpr, h * renderer.dpr];
  };
  return { renderer, mesh, uniforms, updateSize };
}

export function applySideRaysUniforms(
  uniforms: SideRaysUniforms,
  config: SideRaysInitConfig,
) {
  uniforms.iSpeed.value = config.speed;
  uniforms.iRayColor1.value = hexToRgb(config.rayColor1);
  uniforms.iRayColor2.value = hexToRgb(config.rayColor2);
  uniforms.iIntensity.value = config.intensity;
  uniforms.iSpread.value = config.spread;
  const [flipX, flipY] = originToFlip(config.origin);
  uniforms.iFlipX.value = flipX;
  uniforms.iFlipY.value = flipY;
  uniforms.iTilt.value = config.tilt;
  uniforms.iSaturation.value = config.saturation;
  uniforms.iBlend.value = config.blend;
  uniforms.iFalloff.value = config.falloff;
  uniforms.iOpacity.value = config.opacity;
}
