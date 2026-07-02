const root = document.documentElement;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");
const savedTheme = localStorage.getItem("elevo-ds-showcase-theme");
const requestedTheme = new URLSearchParams(window.location.search).get("theme");

if (requestedTheme === "light" || (!requestedTheme && savedTheme === "light")) {
  root.classList.remove("theme-dark");
  root.classList.add("theme-light");
  themeLabel.textContent = "Light";
} else if (requestedTheme === "dark") {
  root.classList.remove("theme-light");
  root.classList.add("theme-dark");
  themeLabel.textContent = "Dark";
}

themeToggle?.addEventListener("click", () => {
  const isLight = root.classList.toggle("theme-light");
  root.classList.toggle("theme-dark", !isLight);
  themeLabel.textContent = isLight ? "Light" : "Dark";
  localStorage.setItem("elevo-ds-showcase-theme", isLight ? "light" : "dark");
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("in");
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav a")];
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-38% 0px -56% 0px" });

sections.forEach((section) => navObserver.observe(section));

document.querySelectorAll("[data-copy]").forEach((node) => {
  node.addEventListener("click", async () => {
    const value = node.getAttribute("data-copy");
    const label = node.querySelector("em");
    try {
      await navigator.clipboard.writeText(value);
      node.classList.add("copied");
      const original = label.textContent;
      label.textContent = "Copiado";
      window.setTimeout(() => {
        label.textContent = original;
        node.classList.remove("copied");
      }, 1000);
    } catch {
      label.textContent = value;
    }
  });
});

const motionLab = document.getElementById("motionLab");
const replayMotion = document.getElementById("replayMotion");

function playMotionLab() {
  if (!motionLab) return;
  motionLab.classList.remove("is-playing");
  void motionLab.offsetWidth;
  motionLab.classList.add("is-playing");
}

replayMotion?.addEventListener("click", playMotionLab);
if (!prefersReducedMotion) window.setTimeout(playMotionLab, 900);

function initShader(canvas, compact = false) {
  if (!canvas || prefersReducedMotion) return;
  const gl = canvas.getContext("webgl", { antialias: false, alpha: true, powerPreference: "low-power" });
  if (!gl) return;

  const vertex = `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fragment = `
    precision mediump float;
    uniform vec2 resolution;
    uniform float time;

    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec2 p = uv - 0.5;
      p.x *= resolution.x / resolution.y;

      float t = time * 0.05;
      float d1 = length(p - vec2(sin(t) * 0.3, cos(t * 0.75) * 0.2));
      float d2 = length(p - vec2(cos(t * 1.1) * -0.24, sin(t * 0.65) * -0.18));
      float malva = smoothstep(0.72, 0.05, d1) * 0.5;
      float laranja = smoothstep(0.62, 0.04, d2) * 0.34;
      float grain = noise(gl_FragCoord.xy + time) * 0.035;

      vec3 base = vec3(0.106, 0.055, 0.117);
      vec3 c1 = vec3(0.72, 0.51, 0.91) * malva;
      vec3 c2 = vec3(1.0, 0.28, 0.09) * laranja;
      vec3 color = base + c1 + c2 + grain;
      float vignette = smoothstep(0.95, 0.2, length(p));
      gl_FragColor = vec4(color * vignette, ${compact ? "0.9" : "0.7"});
    }
  `;

  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  const program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
  gl.linkProgram(program);
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const resolution = gl.getUniformLocation(program, "resolution");
  const time = gl.getUniformLocation(program, "time");

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.floor(rect.width * ratio));
    const height = Math.max(1, Math.floor(rect.height * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  }

  let running = true;
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    running = entry.isIntersecting;
  });
  visibilityObserver.observe(canvas);

  function frame(now) {
    resize();
    if (running) {
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, now * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* WebGL hero shader: off by default per DS config. Set window.__DS_BUILDER_CONFIG = { webgl: true } to enable. */
if (window.__DS_BUILDER_CONFIG?.webgl) {
  initShader(document.getElementById("shaderCanvas"));
  initShader(document.getElementById("miniShader"), true);
}
