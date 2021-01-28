import { GameObject } from '../Core/Core';
export class Renderer {
  private static instance;

  canvas;
  gl;

  private vsSource = `
    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
      gl_Position = aVertexPosition;
    }
  `;
  private fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;

  shaderProgram;
  programInfo;

  constructor() {
    Renderer.instance = this;
  }

  static getInstance() {
    return Renderer.instance;
  }
  Initialize(canvas) {
    this.canvas = canvas.nativeElement;
    this.setupContext();
    this.shaderProgram = this.initShaderProgram(
      this.gl,
      this.vsSource,
      this.fsSource
    );
    this.programInfo = {
      program: this.shaderProgram,
      attribLocations: {
        vertexPosition: this.gl.getAttribLocation(
          this.shaderProgram,
          'aVertexPosition'
        ),
      },
      uniformLocations: {
        projectionMatrix: this.gl.getUniformLocation(
          this.shaderProgram,
          'uProjectionMatrix'
        ),
        modelViewMatrix: this.gl.getUniformLocation(
          this.shaderProgram,
          'uModelViewMatrix'
        ),
      },
    };

    const buffers = this.initBuffers(this.gl);
    //this.drawScene(this.gl, this.programInfo, buffers);
  }

  setupContext() {
    this.gl = this.canvas.getContext('webgl');
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    if (this.gl === null) {
      alert(
        'Unable to initialize WebGL. Your browser or machine may not support it.'
      );
      return;
    }
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  initBuffers(gl) {
    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-0.0, 0.0, 0.5, 0.1, -1.0, -1.0, 1.0, -1.0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    return {
      position: positionBuffer,
    };
  }

  clearScreen(r, g, b) {
    this.gl.clearColor(r, g, b, 1.0);
    this.gl.clearDepth(1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }
  draw() {
    const buffers = this.initBuffers(this.gl);
    this.drawScene(this.gl, this.programInfo, buffers);
  }
  drawScene(gl, programInfo, buffers) {
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // gl.clearDepth(1.0);
    // gl.enable(gl.DEPTH_TEST);
    // gl.depthFunc(gl.LEQUAL);

    // Clear the canvas before we start drawing on it.

    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    // const fieldOfView = (45 * Math.PI) / 180; // in radians
    // const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    // const zNear = 0.1;
    // const zFar = 100.0;
    // const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    // mat4.perspective(projectionMatrix,
    //                  fieldOfView,
    //                  aspect,
    //                  zNear,
    //                  zFar);

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    // const modelViewMatrix = mat4.create();

    // Now move the drawing position a bit to where we want to
    // start drawing the square.

    // mat4.translate(modelViewMatrix,     // destination matrix
    //                modelViewMatrix,     // matrix to translate
    //                [-0.0, 0.0, -6.0]);  // amount to translate

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    {
      const numComponents = 2; // pull out 2 values per iteration
      const type = gl.FLOAT; // the data in the buffer is 32bit floats
      const normalize = false; // don't normalize
      const stride = 0; // how many bytes to get from one set of values to the next
      // 0 = use type and numComponents above
      const offset = 0; // how many bytes inside the buffer to start from
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    }

    // Tell WebGL to use our program when drawing

    gl.useProgram(programInfo.program);

    // Set the shader uniforms
    // gl.uniformMatrix4fv(
    //     programInfo.uniformLocations.projectionMatrix,
    //     false,
    //     projectionMatrix);
    // gl.uniformMatrix4fv(
    //     programInfo.uniformLocations.modelViewMatrix,
    //     false,
    //     modelViewMatrix);

    {
      const offset = 0;
      const vertexCount = 4;
      gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
    console.log('Aweseome');
  }

  initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert(
        'Unable to initialize the shader program: ' +
          gl.getProgramInfoLog(shaderProgram)
      );
      return null;
    }

    return shaderProgram;
  }
  loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(
        'An error occurred compiling the shaders: ' +
          gl.getShaderInfoLog(shader)
      );
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  Draw(scene: GameObject) {
    console.log('Drawing the scene ', scene);
  }
}
