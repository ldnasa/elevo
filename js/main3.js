/* ELEVO - index3 */
(function () {
  "use strict";

  /* header: sombra ao rolar */
  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* menu mobile */
  var toggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  var setMenu = function (open) {
    mobileNav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    toggle.querySelector("use").setAttribute("href", open ? "#i-x" : "#i-menu");
  };
  toggle.addEventListener("click", function () {
    setMenu(!mobileNav.classList.contains("is-open"));
  });
  mobileNav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  /* reveal on scroll */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealed = document.querySelectorAll(".rv");
  if (!reduced && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealed.forEach(function (el) { io.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add("in"); });
  }

  /* frentes: uma aberta por vez */
  var acc = document.querySelector("[data-accordion]");
  if (acc) {
    acc.addEventListener("toggle", function (e) {
      if (e.target.open) {
        acc.querySelectorAll("details[open]").forEach(function (d) {
          if (d !== e.target) d.open = false;
        });
      }
    }, true);
  }

  /* formulário de lead
     Destino do lead a confirmar com o cliente (e-mail, WhatsApp ou planilha).
     Por enquanto valida e mostra o estado de sucesso. */
  var form = document.getElementById("leadForm");
  if (form) {
    var fields = [
      { input: "fNome", error: "errNome", valid: function (v) { return v.trim().length >= 2; } },
      { input: "fTel", error: "errTel", valid: function (v) { return v.replace(/\D/g, "").length >= 10; } },
      { input: "fEmail", error: "errEmail", valid: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); } }
    ];

    fields.forEach(function (f) {
      document.getElementById(f.input).addEventListener("input", function () {
        this.closest(".field").classList.remove("has-error");
        document.getElementById(f.error).hidden = true;
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstInvalid = null;
      fields.forEach(function (f) {
        var input = document.getElementById(f.input);
        var ok = f.valid(input.value);
        input.closest(".field").classList.toggle("has-error", !ok);
        document.getElementById(f.error).hidden = ok;
        if (!ok && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }
      form.querySelectorAll("input, button").forEach(function (el) { el.disabled = true; });
      document.getElementById("formSuccess").hidden = false;
    });
  }
})();
