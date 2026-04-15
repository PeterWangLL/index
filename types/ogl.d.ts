declare module "ogl" {
  export class Camera {
    constructor(gl?: unknown);
    fov: number;
    position: { z: number };
    aspect: number;
    perspective: (opts: { aspect: number }) => void;
  }

  export class Geometry {
    constructor(gl: unknown, attributes?: Record<string, unknown>);
  }

  export class Mesh {
    constructor(gl: unknown, opts: { geometry: Geometry; program: Program });
    scale: { x: number; y: number; z: number; set: (x: number, y: number, z: number) => void };
    position: { x: number; y: number; z: number; set: (x: number, y: number, z: number) => void };
    rotation: { z: number; set: (x: number, y: number, z: number) => void };
    program: Program;
    setParent: (parent: Transform) => void;
  }

  export class Plane extends Geometry {}

  export class Program {
    constructor(
      gl: unknown,
      opts: {
        vertex?: string;
        fragment?: string;
        uniforms?: Record<string, { value: unknown }>;
        transparent?: boolean;
        depthTest?: boolean;
        depthWrite?: boolean;
      }
    );
    uniforms: Record<string, { value: any }>;
  }

  export class Renderer {
    constructor(opts: { alpha?: boolean; antialias?: boolean; dpr?: number });
    gl: {
      canvas: HTMLCanvasElement;
      clearColor: (r: number, g: number, b: number, a: number) => void;
    };
    setSize: (width: number, height: number) => void;
    render: (opts: { scene: Transform; camera: Camera }) => void;
  }

  export class Texture {
    constructor(gl: unknown, opts?: { generateMipmaps?: boolean });
    image: HTMLImageElement | HTMLCanvasElement;
  }

  export class Transform {
    setParent: (parent: Transform) => void;
  }
}
