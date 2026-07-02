const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ?static also skips the entrance animations (a hidden tab never advances the
// animation clock, so screenshot tooling would wait for "idle" forever)
const staticMode = new URLSearchParams(window.location.search).has("static");
if (staticMode) document.documentElement.classList.add("is-static");

/* ---------- mobile nav ---------- */
const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");

const navToggleIcon = navToggle?.querySelector("use");

navToggle?.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  navToggleIcon?.setAttribute("href", isOpen ? "#i-x" : "#i-menu");
  document.body.style.overflow = isOpen ? "hidden" : "";
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

/* ---------- active nav link on scroll ---------- */
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".main-nav a, .mobile-nav a")];
if (sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((section) => navObserver.observe(section));
}

/* ---------- scroll reveal ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in");
    });
  },
  { threshold: 0.14 }
);
document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));

/* ---------- pain chip -> active frente card ---------- */
const frenteCards = document.querySelectorAll(".frente-card");
function activateFrente(id) {
  frenteCards.forEach((card) => card.classList.toggle("is-active", card.id === id));
}
document.querySelectorAll(".pain-chip").forEach((chip) => {
  chip.addEventListener("click", () => activateFrente(chip.getAttribute("href").slice(1)));
});
// direct navigation with #frente-... in the URL also activates
if (window.location.hash.startsWith("#frente-")) activateFrente(window.location.hash.slice(1));

/* ---------- frente modals ---------- */
document.querySelectorAll("[data-modal]").forEach((btn) => {
  const dialog = document.getElementById(btn.dataset.modal);
  if (!dialog) return;
  btn.addEventListener("click", () => dialog.showModal());
});
document.querySelectorAll("dialog.frente-modal").forEach((dialog) => {
  dialog.querySelector("[data-close]")?.addEventListener("click", () => dialog.close());
  // click on the backdrop (outside .modal-inner) closes
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
});

/* ---------- lead form (Seção 9) ----------
   Destino do lead ainda indefinido (ver CLAUDE.md): por ora valida e abre o
   WhatsApp com a mensagem preenchida. Trocar por endpoint real quando definido. */
const leadForm = document.getElementById("leadForm");
if (leadForm) {
  const fields = {
    nome: { input: document.getElementById("leadNome"), error: document.getElementById("leadNomeErro"), valid: (v) => v.trim().length > 0 },
    telefone: { input: document.getElementById("leadTelefone"), error: document.getElementById("leadTelefoneErro"), valid: (v) => v.replace(/\D/g, "").length >= 10 },
    email: { input: document.getElementById("leadEmail"), error: document.getElementById("leadEmailErro"), valid: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
  };

  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let firstInvalid = null;
    Object.values(fields).forEach(({ input, error, valid }) => {
      const ok = valid(input.value);
      input.setAttribute("aria-invalid", String(!ok));
      error.hidden = ok;
      if (!ok && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }
    const msg = `Olá! Sou ${fields.nome.input.value.trim()} e quero marcar uma conversa com a elevo. Telefone: ${fields.telefone.input.value.trim()} · E-mail: ${fields.email.input.value.trim()}`;
    window.open(`https://wa.me/5543991588212?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    leadForm.hidden = true;
    document.getElementById("leadSucesso").hidden = false;
  });
}

/* ---------- hero H1 word-fade (once, hero only) ---------- */
const heroTitle = document.querySelector(".js-hero-title");
if (heroTitle && !prefersReducedMotion && !staticMode) {
  const words = heroTitle.textContent.trim().split(/\s+/);
  heroTitle.innerHTML = words
    .map((w, i) => `<span class="word" style="animation-delay:${550 + i * 55}ms">${w}</span>`)
    .join(" ");
}

/* ---------- hero shader: subtle malva/roxo/laranja gradient drift ----------
   Confined to .hero-art via the canvas sitting inside the clipped container.
   Falls back to the static CSS gradient (already the canvas's parent background)
   if WebGL is unavailable, reduced-motion is on, or the canvas is off-screen. */
function initHeroShader(canvas, staticFrame) {
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
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    uniform vec2 resolution;
    uniform float time;
    uniform vec2 pointer;  // 0..1 canvas space, y up; rests at center
    uniform float scroll;  // 0..1, hero scrolled out of view
    uniform sampler2D noiseTex; // 256x256 CPU-seeded random, LINEAR + REPEAT

    /* value noise via texture lookup: the random data comes from the CPU
       (identical bytes on every device/browser), the GPU only interpolates.
       No GPU math hash -> no driver/precision divergence anywhere. */
    float vnoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return texture2D(noiseTex, (i + f + 0.5) / 256.0).r;
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
      for (int i = 0; i < 4; i++) {
        v += a * vnoise(p);
        p = rot * p * 2.03;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec2 p = uv * vec2(resolution.x / resolution.y, 1.0) * 1.6;
      float t = time * 0.06 + scroll * 0.5;
      // gentle parallax: the whole field leans toward the cursor
      p += (pointer - 0.5) * 0.22;

      // two-level domain warp: q drives r, r drives the field -> messy organic flow
      vec2 q = vec2(
        fbm(p + vec2(0.0, 0.0) + t * vec2(0.9, 0.4)),
        fbm(p + vec2(5.2, 1.3) - t * vec2(0.3, 0.7))
      );
      vec2 r = vec2(
        fbm(p + 2.4 * q + vec2(1.7, 9.2) + t * 0.6),
        fbm(p + 2.4 * q + vec2(8.3, 2.8) - t * 0.4)
      );
      float f = fbm(p + 2.6 * r);
      // fbm clusters around 0.5: stretch it (biased up) so the palette gets full range
      f = clamp((f - 0.48) * 2.4 + 0.58, 0.0, 1.0);

      // brand palette only: lilac field, malva pools, roxo depth, laranja heat, cream lifts
      vec3 lilac   = vec3(0.906, 0.855, 0.945);
      vec3 malva   = vec3(0.722, 0.510, 0.910);
      vec3 roxo    = vec3(0.184, 0.082, 0.200);
      vec3 laranja = vec3(1.000, 0.282, 0.090);
      vec3 cream   = vec3(0.973, 0.953, 0.933);

      vec3 color = mix(lilac, malva, smoothstep(0.0, 0.58, f));
      color = mix(color, roxo, smoothstep(0.62, 0.95, f) * 0.55 * smoothstep(0.42, 0.58, q.y));
      // laranja lives on the thin transition ridges, like the hot edges in the reference
      float ridge = smoothstep(0.10, 0.0, abs(f - 0.48)) * smoothstep(0.42, 0.55, r.x);
      color = mix(color, laranja, ridge * 0.85);
      // vertical brand read: warmth gathers toward the bottom
      color = mix(color, laranja, smoothstep(0.45, 0.0, uv.y) * smoothstep(0.42, 0.56, q.x) * 0.4);
      // cream lifts in the low-density valleys
      color = mix(color, cream, smoothstep(0.28, 0.08, f) * 0.3);
      // soft light following the cursor (pointer rests at center when idle)
      float pd = distance(uv * vec2(resolution.x / resolution.y, 1.0), pointer * vec2(resolution.x / resolution.y, 1.0));
      color = mix(color, cream, smoothstep(0.5, 0.0, pd) * 0.07);
      // scrolling out warms the field toward laranja
      color = mix(color, laranja, scroll * 0.15);

      // film grain from the same texture, drifting per-frame
      float grain = texture2D(noiseTex, gl_FragCoord.xy / 256.0 + fract(time) * vec2(0.37, 0.71)).r - 0.5;
      color += grain * 0.055;

      gl_FragColor = vec4(color, 1.0);
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

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return; // fall back to CSS gradient silently
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const resolutionLoc = gl.getUniformLocation(program, "resolution");
  const timeLoc = gl.getUniformLocation(program, "time");
  const pointerLoc = gl.getUniformLocation(program, "pointer");
  const scrollLoc = gl.getUniformLocation(program, "scroll");

  // seeded PRNG (mulberry32): every visitor gets the exact same noise field
  function mulberry32(seed) {
    return function () {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const rand = mulberry32(1291816);
  const noiseData = new Uint8Array(256 * 256);
  for (let i = 0; i < noiseData.length; i++) noiseData[i] = rand() * 256;
  const noiseTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, noiseTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, 256, 256, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, noiseData);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.uniform1i(gl.getUniformLocation(program, "noiseTex"), 0);

  // pointer target in canvas space (0..1, y up), eased each frame; center when idle
  let pointerX = 0.5, pointerY = 0.5;
  let targetX = 0.5, targetY = 0.5;
  if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", (e) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetX = Math.min(Math.max((e.clientX - rect.left) / rect.width, -0.2), 1.2);
      targetY = Math.min(Math.max(1 - (e.clientY - rect.top) / rect.height, -0.2), 1.2);
    }, { passive: true });
  }

  function scrollProgress() {
    const rect = canvas.getBoundingClientRect();
    if (!rect.height) return 0;
    // 0 while the hero top is in view, ramping to 1 as it scrolls fully out
    return Math.min(Math.max(-rect.top / rect.height, 0), 1);
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
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
      pointerX += (targetX - pointerX) * 0.045;
      pointerY += (targetY - pointerY) * 0.045;
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, now * 0.001);
      gl.uniform2f(pointerLoc, pointerX, pointerY);
      gl.uniform1f(scrollLoc, scrollProgress());
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    if (!staticFrame) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// ?static renders one frozen shader frame and stops the loop (screenshot/idle-capture
// tooling times out on a perpetual rAF loop). Both the desktop and mobile canvases
// init; the one whose shape is display:none stays paused (its IntersectionObserver
// never fires), so only the visible composition animates.
initHeroShader(document.getElementById("heroShader"), staticMode);
initHeroShader(document.getElementById("heroShaderM"), staticMode);
