/* ELEVO Landing v2 - lean interactions */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

function closeMobileNav() {
  if (!mobileNav?.classList.contains("is-open")) return;
  mobileNav.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Abrir menu");
  navToggleIcon?.setAttribute("href", "#i-menu");
  document.body.style.overflow = "";
}

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 900) closeMobileNav();
});

/* ---------- header border on scroll ---------- */
const siteHeader = document.getElementById("siteHeader");
if (siteHeader) {
  const onScroll = () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- active nav link ---------- */
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".main-nav a, .mobile-nav a[href^='#']")];

if (sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          link.classList.toggle("active", href === `#${id}` || (id === "top" && href === "#top"));
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((section) => navObserver.observe(section));
}

/* ---------- scroll reveal ---------- */
if (!staticMode && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in");
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));
} else {
  document.querySelectorAll(".reveal").forEach((node) => node.classList.add("in"));
}

/* ---------- pain chip -> highlight frente ---------- */
const frenteRows = document.querySelectorAll(".frente-row");

function activateFrente(id) {
  frenteRows.forEach((row) => row.classList.toggle("is-active", row.id === id));
}

document.querySelectorAll(".pain-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const id = chip.getAttribute("href")?.slice(1);
    if (id) activateFrente(id);
  });
});

if (window.location.hash.startsWith("#frente-")) {
  activateFrente(window.location.hash.slice(1));
}

/* ---------- lead form -> WhatsApp ---------- */
const leadForm = document.getElementById("leadForm");
if (leadForm) {
  const fields = {
    nome: {
      input: document.getElementById("leadNome"),
      error: document.getElementById("leadNomeErro"),
      valid: (v) => v.trim().length > 0,
    },
    telefone: {
      input: document.getElementById("leadTelefone"),
      error: document.getElementById("leadTelefoneErro"),
      valid: (v) => v.replace(/\D/g, "").length >= 10,
    },
    email: {
      input: document.getElementById("leadEmail"),
      error: document.getElementById("leadEmailErro"),
      valid: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    },
  };

  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let firstInvalid = null;

    Object.values(fields).forEach(({ input, error, valid }) => {
      if (!input) return;
      const ok = valid(input.value);
      input.setAttribute("aria-invalid", String(!ok));
      if (error) error.hidden = ok;
      if (!ok && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const msg = `Olá! Sou ${fields.nome.input.value.trim()} e quero marcar uma conversa com a elevo. Telefone: ${fields.telefone.input.value.trim()} - E-mail: ${fields.email.input.value.trim()}`;
    window.open(`https://wa.me/5543991588212?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    leadForm.hidden = true;
    const success = document.getElementById("leadSucesso");
    if (success) success.hidden = false;
  });
}
