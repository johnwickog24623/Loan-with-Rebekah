import { mat4, vec3 } from "gl-matrix";
import { ArcballControl } from "./infinite-menu-arcball";
import { DiscGeometry, IcosahedronGeometry } from "./infinite-menu-geometry";
import {
  animateGridMenu,
  onControlUpdate,
  renderGridMenu,
  updateCameraMatrix,
  updateProjectionMatrix,
  type GridMenuState,
} from "./infinite-menu-grid-runtime";
import { initDiscInstances, initMenuTexture } from "./infinite-menu-grid-setup";
import {
  createProgram,
  makeBuffer,
  makeVertexArray,
  resizeCanvasToDisplaySize,
} from "./infinite-menu-gl-utils";
import { discFragShaderSource, discVertShaderSource } from "./infinite-menu-shaders";
import type {
  ActiveItemCallback,
  InitCallback,
  MenuItem,
  MovementChangeCallback,
} from "./infinite-menu-types";

export class InfiniteGridMenu {
  private state: GridMenuState;
  private rafId = 0;
  private destroyed = false;
  private _time = 0;
  private _deltaTime = 0;

  constructor(
    private canvas: HTMLCanvasElement,
    items: MenuItem[],
    onActiveItemChange: ActiveItemCallback,
    onMovementChange: MovementChangeCallback,
    onInit?: InitCallback,
    scale = 1,
  ) {
    this.state = {
      gl: null,
      discProgram: null,
      discVAO: null,
      discBuffers: {
        vertices: new Float32Array(),
        indices: new Uint16Array(),
        normals: new Float32Array(),
        uvs: new Float32Array(),
      },
      worldMatrix: mat4.create(),
      tex: null,
      control: null as unknown as ArcballControl,
      discLocations: {},
      discInstances: { matricesArray: new Float32Array(), matrices: [], buffer: null },
      instancePositions: [],
      DISC_INSTANCE_COUNT: 0,
      atlasSize: 1,
      _frames: 0,
      movementActive: false,
      TARGET_FRAME_DURATION: 1000 / 60,
      SPHERE_RADIUS: 2,
      smoothRotationVelocity: 0,
      scaleFactor: scale,
      items,
      onActiveItemChange,
      onMovementChange,
      camera: {
        matrix: mat4.create(),
        near: 0.1,
        far: 40,
        fov: Math.PI / 4,
        aspect: 1,
        position: vec3.fromValues(0, 0, 3 * scale),
        up: vec3.fromValues(0, 1, 0),
        matrices: {
          view: mat4.create(),
          projection: mat4.create(),
          inversProjection: mat4.create(),
        },
      },
    };
    this.init(onInit);
  }

  resize() {
    if (!this.state.gl) return;
    if (resizeCanvasToDisplaySize(this.canvas)) {
      this.state.gl.viewport(0, 0, this.state.gl.drawingBufferWidth, this.state.gl.drawingBufferHeight);
    }
    updateProjectionMatrix(this.state);
  }

  run(time = 0) {
    if (this.destroyed) return;
    this._deltaTime = Math.min(32, time - this._time);
    this._time = time;
    this.state._frames += this._deltaTime / this.state.TARGET_FRAME_DURATION;
    animateGridMenu(this.state, this._deltaTime);
    renderGridMenu(this.state);
    this.rafId = requestAnimationFrame((t) => this.run(t));
  }

  destroy() {
    this.destroyed = true;
    cancelAnimationFrame(this.rafId);
  }

  private init(onInit?: InitCallback) {
    const gl = this.canvas.getContext("webgl2", { antialias: true, alpha: true });
    if (!gl) throw new Error("No WebGL 2 context!");
    this.state.gl = gl;
    this.state.discProgram = createProgram(gl, [discVertShaderSource, discFragShaderSource], null, {
      aModelPosition: 0,
      aModelNormal: 1,
      aModelUvs: 2,
      aInstanceMatrix: 3,
    });
    const p = this.state.discProgram!;
    this.state.discLocations = {
      aModelPosition: gl.getAttribLocation(p, "aModelPosition"),
      aModelUvs: gl.getAttribLocation(p, "aModelUvs"),
      aInstanceMatrix: gl.getAttribLocation(p, "aInstanceMatrix"),
      uWorldMatrix: gl.getUniformLocation(p, "uWorldMatrix"),
      uViewMatrix: gl.getUniformLocation(p, "uViewMatrix"),
      uProjectionMatrix: gl.getUniformLocation(p, "uProjectionMatrix"),
      uCameraPosition: gl.getUniformLocation(p, "uCameraPosition"),
      uScaleFactor: gl.getUniformLocation(p, "uScaleFactor"),
      uRotationAxisVelocity: gl.getUniformLocation(p, "uRotationAxisVelocity"),
      uTex: gl.getUniformLocation(p, "uTex"),
      uFrames: gl.getUniformLocation(p, "uFrames"),
      uItemCount: gl.getUniformLocation(p, "uItemCount"),
      uAtlasSize: gl.getUniformLocation(p, "uAtlasSize"),
    };
    const discGeo = new DiscGeometry(56, 1);
    this.state.discBuffers = discGeo.data;
    this.state.discVAO = makeVertexArray(
      gl,
      [
        [
          makeBuffer(gl, this.state.discBuffers.vertices, gl.STATIC_DRAW),
          this.state.discLocations.aModelPosition as number,
          3,
        ],
        [
          makeBuffer(gl, this.state.discBuffers.uvs, gl.STATIC_DRAW),
          this.state.discLocations.aModelUvs as number,
          2,
        ],
      ],
      this.state.discBuffers.indices,
    );
    const icoGeo = new IcosahedronGeometry();
    icoGeo.subdivide(1).spherize(this.state.SPHERE_RADIUS);
    this.state.instancePositions = icoGeo.vertices.map((v) => v.position);
    this.state.DISC_INSTANCE_COUNT = icoGeo.vertices.length;
    initDiscInstances(this.state, this.state.DISC_INSTANCE_COUNT);
    initMenuTexture(this.state, () => this.destroyed);
    this.state.control = new ArcballControl(this.canvas, (dt) => onControlUpdate(this.state, dt));
    updateCameraMatrix(this.state);
    updateProjectionMatrix(this.state);
    this.resize();
    onInit?.(this);
  }
}
