/**
 * Hero particles (Hero.astro): thousands of coffee-ground specks drift in from
 * everywhere and gather into the Pando mark. The pointer pushes them apart
 * like a finger through sand; scrolling blows them away. Plain WebGL, no
 * library. Reduced motion: one still frame of the finished mark.
 */
import { MARK_PATHS } from '../lib/mark';

const VERT = `
attribute vec2 aTarget;
attribute vec2 aStart;
attribute vec3 aSeed;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform vec2 uCenter;
uniform float uTime;
uniform float uForm;
uniform float uScatter;
uniform float uDpr;
varying float vSeed;
varying float vAlpha;

float easeInOut(float t) { return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0; }

void main() {
  float delay = aSeed.x * 0.45;
  float f = easeInOut(clamp((uForm - delay) / (1.0 - 0.45), 0.0, 1.0));
  // Arrive along a gentle curve rather than a straight line.
  vec2 mid = mix(aStart, aTarget, 0.5) + vec2(sin(aSeed.y * 6.28) * 120.0, cos(aSeed.z * 6.28) * 120.0);
  vec2 a = mix(aStart, mid, f);
  vec2 b = mix(mid, aTarget, f);
  vec2 pos = mix(a, b, f);
  // A slow breathing drift once formed.
  pos += vec2(sin(uTime * 0.7 + aSeed.y * 40.0), cos(uTime * 0.6 + aSeed.z * 40.0)) * (1.5 + aSeed.x * 2.5);
  // The pointer parts the specks.
  vec2 d = pos - uMouse;
  float dist = length(d);
  float push = smoothstep(140.0, 0.0, dist) * 70.0;
  pos += (dist > 0.001 ? d / dist : vec2(0.0)) * push;
  // Scrolling blows them away from the mark's centre, and upwards.
  vec2 away = normalize(pos - uCenter + vec2(aSeed.y - 0.5, aSeed.z - 0.5) * 40.0);
  pos += (away * (300.0 + aSeed.x * 700.0) + vec2(0.0, -400.0)) * uScatter * uScatter;
  vec2 clip = (pos / uRes) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = (2.2 + aSeed.z * 3.4) * uDpr * (1.0 + push * 0.012);
  vSeed = aSeed.y;
  vAlpha = (0.5 + 0.5 * f) * (1.0 - uScatter * 0.85);
}`;

const FRAG = `
precision mediump float;
varying float vSeed;
varying float vAlpha;
uniform float uDim;
void main() {
  float r = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, r);
  a = a * a * 1.4;
  vec3 grounds = vec3(0.42, 0.29, 0.21);
  vec3 caramel = vec3(0.88, 0.62, 0.32);
  vec3 crema = vec3(0.98, 0.86, 0.64);
  vec3 col = vSeed < 0.45 ? mix(grounds, caramel, vSeed / 0.45) : mix(caramel, crema, (vSeed - 0.45) / 0.55);
  gl_FragColor = vec4(col * 1.25, a * vAlpha * uDim);
}`;

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

/** Points inside the mark, in a unit box (0..1 on the long side), from a raster of its paths. */
function samplePoints(count: number): Float32Array {
  const w = 206;
  const h = 262;
  const scale = 2;
  const canvas = document.createElement('canvas');
  canvas.width = w * scale;
  canvas.height = h * scale;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(scale, scale);
  ctx.translate(6, 6);
  ctx.fillStyle = '#000';
  MARK_PATHS.forEach((d) => ctx.fill(new Path2D(d)));
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const inside: number[] = [];
  for (let y = 0; y < canvas.height; y += 2) {
    for (let x = 0; x < canvas.width; x += 2) if (data[(y * canvas.width + x) * 4 + 3] > 128) inside.push(x / canvas.height, y / canvas.height);
  }
  const out = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    const k = ((Math.random() * inside.length) / 2) | 0;
    out[i * 2] = inside[k * 2] + (Math.random() - 0.5) * 0.008;
    out[i * 2 + 1] = inside[k * 2 + 1] + (Math.random() - 0.5) * 0.008;
  }
  return out;
}

export function startParticles(canvas: HTMLCanvasElement): void {
  const gl = canvas.getContext('webgl', { premultipliedAlpha: false, antialias: false, alpha: true });
  if (!gl) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = matchMedia('(max-width: 1039px)').matches;
  const modest = (navigator.hardwareConcurrency || 4) <= 4;
  const count = small ? 2400 : modest ? 4500 : 6500;
  const unit = samplePoints(count);
  const seeds = new Float32Array(count * 3).map(() => Math.random());

  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  gl.useProgram(program);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

  const buffer = (name: string, size: number, data: Float32Array): WebGLBuffer => {
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    return buf;
  };
  const u = (name: string): WebGLUniformLocation | null => gl.getUniformLocation(program, name);
  const uniforms = {
    res: u('uRes'),
    mouse: u('uMouse'),
    center: u('uCenter'),
    time: u('uTime'),
    form: u('uForm'),
    scatter: u('uScatter'),
    dpr: u('uDpr'),
    dim: u('uDim'),
  };

  let width = 0;
  let height = 0;
  const dpr = Math.min(1.5, window.devicePixelRatio || 1);
  const layout = (): void => {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    // The mark stands in the right column on large screens, behind the title on small ones.
    const size = small ? Math.min(height * 0.36, width * 0.7) : Math.min(height * 0.66, 560);
    const cx = small ? width * 0.5 : width * 0.74;
    const cy = small ? height * 0.3 : height * 0.48;
    const targets = new Float32Array(count * 2);
    const starts = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) {
      targets[i * 2] = cx + (unit[i * 2] - 0.39) * size;
      targets[i * 2 + 1] = cy + (unit[i * 2 + 1] - 0.5) * size;
      // Start scattered across the whole stage, biased to the edges.
      const angle = Math.random() * Math.PI * 2;
      const radius = (0.55 + Math.random() * 0.6) * Math.max(width, height);
      starts[i * 2] = cx + Math.cos(angle) * radius;
      starts[i * 2 + 1] = cy + Math.sin(angle) * radius;
    }
    buffer('aTarget', 2, targets);
    buffer('aStart', 2, starts);
    buffer('aSeed', 3, seeds);
    // Positions stay in CSS pixels; only the point size follows the pixel ratio.
    gl.uniform1f(uniforms.dpr, dpr);
    gl.uniform1f(uniforms.dim, small ? 0.6 : 1);
    gl.uniform2f(uniforms.res, width, height);
    gl.uniform2f(uniforms.center, cx, cy);
  };
  layout();

  let mouse = [-9999, -9999];
  let target = [-9999, -9999];
  canvas.parentElement?.addEventListener(
    'pointermove',
    (event) => {
      const rect = canvas.getBoundingClientRect();
      target = [event.clientX - rect.left, event.clientY - rect.top];
      if (mouse[0] < -999) mouse = [...target];
    },
    { passive: true },
  );
  canvas.parentElement?.addEventListener('pointerleave', () => (target = [-9999, -9999]));

  const intro = document.documentElement.dataset.intro === 'seen' || !document.querySelector('.preloader') ? 0.2 : 2.0;
  const born = performance.now();
  let visible = true;
  new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(canvas);
  addEventListener('resize', () => layout());

  const draw = (now: number): void => {
    const t = (now - born) / 1000;
    const form = reduced ? 1 : Math.min(1, Math.max(0, (t - intro) / 2.6));
    mouse[0] += (target[0] - mouse[0]) * 0.12;
    mouse[1] += (target[1] - mouse[1]) * 0.12;
    if (target[0] < -999) mouse = [-9999, -9999];
    const scatter = reduced ? 0 : Math.min(1, window.scrollY / (height * 0.9));
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uniforms.time, reduced ? 0 : t);
    gl.uniform1f(uniforms.form, form);
    gl.uniform1f(uniforms.scatter, scatter);
    gl.uniform2f(uniforms.mouse, mouse[0], mouse[1]);
    gl.drawArrays(gl.POINTS, 0, count);
    if (!reduced && !document.hidden && (visible || form < 1)) requestAnimationFrame(draw);
    else if (!reduced) {
      // Resume when the hero comes back into view.
      const wait = setInterval(() => {
        if (visible && !document.hidden) {
          clearInterval(wait);
          requestAnimationFrame(draw);
        }
      }, 250);
    }
  };
  requestAnimationFrame(draw);
}
