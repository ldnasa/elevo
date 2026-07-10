/* ELEVO - index4: header 2 estados + menu mobile + entrada da hero */
(() => {
  const docEl = document.documentElement;

  /* ?static: congela as animações de entrada (screenshots/preview) */
  if (new URLSearchParams(location.search).has('static')) {
    docEl.classList.add('is-static');
  }

  /* entrada slide-up: dispara depois do primeiro frame */
  requestAnimationFrame(() => requestAnimationFrame(() => {
    docEl.classList.add('is-loaded');
  }));

  /* header: aba acoplada ao banner -> barra flutuante fixa (com histerese) */
  const header = document.getElementById('siteHeader');
  const FLOAT_AT = 140;
  const DOCK_AT = 60;
  let floating = false;
  let raf = 0;

  const applyHeaderState = () => {
    raf = 0;
    const y = window.scrollY;
    if (!floating && y > FLOAT_AT) {
      floating = true;
      header.classList.add('is-floating');
    } else if (floating && y < DOCK_AT) {
      floating = false;
      header.classList.remove('is-floating');
    }
  };
  window.addEventListener('scroll', () => {
    if (!raf) raf = requestAnimationFrame(applyHeaderState);
  }, { passive: true });
  applyHeaderState();

  const motionOk = !matchMedia('(prefers-reduced-motion: reduce)').matches
    && !docEl.classList.contains('is-static');

  /* travando: grifa malva no título ao entrar na tela */
  const travandoTitle = document.getElementById('travandoTitle');
  if (travandoTitle && motionOk && 'IntersectionObserver' in window) {
    const ioTrav = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        travandoTitle.classList.add('hl-in');
        ioTrav.disconnect();
      }
    }, { threshold: .45 });
    ioTrav.observe(travandoTitle);
  } else if (travandoTitle) {
    travandoTitle.classList.add('hl-in');
  }

  /* projetos: accordion drop-down (exclusivo, sem modal) */
  const openFront = (front) => {
    if (!front) return;
    const list = front.closest('[data-accordion]');
    if (!list) return;
    const fronts = [...list.querySelectorAll('.front')];
    const head = front.querySelector('.front-head');
    fronts.forEach((f) => {
      f.classList.remove('open');
      f.querySelector('.front-head').setAttribute('aria-expanded', 'false');
    });
    front.classList.add('open');
    head.setAttribute('aria-expanded', 'true');
  };

  document.querySelectorAll('[data-accordion]').forEach((list) => {
    const fronts = [...list.querySelectorAll('.front')];
    fronts.forEach((front) => {
      const head = front.querySelector('.front-head');
      head.addEventListener('click', (e) => {
        const willOpen = !front.classList.contains('open');
        fronts.forEach((f) => {
          f.classList.remove('open');
          f.querySelector('.front-head').setAttribute('aria-expanded', 'false');
        });
        if (willOpen) {
          front.classList.add('open');
          head.setAttribute('aria-expanded', 'true');
        }
        /* clique de mouse não deve deixar foco preso (shape e outline ficavam ativos) */
        if (e.detail) head.blur();
      });
    });
  });

  /* chips de dor: levam ao projeto correspondente e abrem o accordion */
  document.querySelectorAll('.pain-chip[data-front]').forEach((chip) => {
    chip.addEventListener('click', (e) => {
      const id = `front-${chip.dataset.front}`;
      const front = document.getElementById(id);
      if (!front) return;
      e.preventDefault();
      openFront(front);
      front.scrollIntoView({ behavior: motionOk ? 'smooth' : 'auto', block: 'center' });
      history.replaceState(null, '', `#${id}`);
    });
  });

  /* formatos: cards abrem modal (dialog nativo, estilo index2) */
  document.querySelectorAll('[data-modal]').forEach((btn) => {
    const dialog = document.getElementById(btn.dataset.modal);
    if (!dialog || typeof dialog.showModal !== 'function') return;
    btn.addEventListener('click', () => dialog.showModal());
  });
  document.querySelectorAll('dialog.fmt-modal').forEach((dialog) => {
    dialog.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
  });

  /* depoimentos: carrossel (setas no desktop, dots + swipe no mobile) */
  const depoStage = document.querySelector('.depo-stage');
  if (depoStage) {
    const DEPOS = [
      {
        quote: 'A consultoria da Elevo tem agregado qualidade, foco e assertividade na condução das melhores estratégias para duas das minhas empresas, assim investimos a energia certa nos pontos com a probabilidade de maiores e melhores resultados. A partir de dados e organização acrescentamos leveza e performance. É a inteligência e a inovação trabalhando, qualidades, inclusive, que a Jéssica Fahl tem de sobra!',
        nome: 'Karen Sinnema',
        empresa: 'London Marcas e Patentes',
        logo: './img/clientes/london.png',
        logoW: 203, logoH: 55
      },
      {
        quote: 'Encerramos uma etapa importante de aperfeiçoamento das nossas práticas de gestão de pessoas. Reconhecemos a competência, a organização e a agilidade da Elevo na condução de todas as entregas.',
        nome: 'Henrique Tristão',
        empresa: 'Produsi Metalúrgica',
        logo: './img/clientes/produsi.png',
        logoW: 183, logoH: 38
      },
      {
        quote: 'A gente tinha a cabeça voltada só para as redes sociais. A Elevo trouxe uma visão mais ampla e estratégica para o negócio. Hoje entendemos que marketing vai além das redes.',
        nome: 'Guilherme Bittencourt',
        empresa: 'Fortmobile',
        logo: './img/clientes/fortmobile.png',
        logoW: 150, logoH: 34
      }
    ];
    const content = document.getElementById('depoContent');
    const quoteEl = document.getElementById('depoQuote');
    const authorEl = document.getElementById('depoAuthor');
    const logoEl = document.getElementById('depoLogo');
    const dots = [...document.querySelectorAll('.depo-dot')];
    let depoIdx = 0;
    let depoTimer = 0;
    let depoBusy = false;

    const renderDepo = (i) => {
      if (depoBusy) return;
      const next = (i + DEPOS.length) % DEPOS.length;
      if (next === depoIdx) return;
      depoBusy = true;
      depoIdx = next;
      const d = DEPOS[depoIdx];
      content.classList.add('swapping');
      logoEl.style.opacity = '0';
      clearTimeout(depoTimer);
      depoTimer = setTimeout(() => {
        quoteEl.textContent = d.quote;
        authorEl.innerHTML = '';
        authorEl.append(d.nome + ' - ', Object.assign(document.createElement('span'), { textContent: d.empresa }));
        logoEl.src = d.logo;
        logoEl.width = d.logoW; logoEl.height = d.logoH;
        logoEl.alt = d.empresa;
        content.classList.remove('swapping');
        logoEl.style.opacity = '1';
        depoBusy = false;
      }, 220);
      dots.forEach((dot, di) => {
        dot.classList.toggle('is-active', di === depoIdx);
        dot.setAttribute('aria-selected', String(di === depoIdx));
      });
    };

    logoEl.style.transition = 'opacity .22s ease';
    document.getElementById('depoPrev').addEventListener('click', () => renderDepo(depoIdx - 1));
    document.getElementById('depoNext').addEventListener('click', () => renderDepo(depoIdx + 1));
    dots.forEach((dot, di) => dot.addEventListener('click', () => renderDepo(di)));

    /* swipe fluido: threshold baixo + velocidade */
    let touchX = 0;
    let touchY = 0;
    let touchT = 0;
    let swiping = false;
    depoStage.addEventListener('touchstart', (e) => {
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
      touchT = performance.now();
      swiping = true;
    }, { passive: true });
    depoStage.addEventListener('touchend', (e) => {
      if (!swiping) return;
      swiping = false;
      const dx = e.changedTouches[0].clientX - touchX;
      const dy = e.changedTouches[0].clientY - touchY;
      const dt = Math.max(1, performance.now() - touchT);
      const vx = Math.abs(dx) / dt;
      /* prioriza gesto horizontal; threshold baixo ou flick rápido */
      if (Math.abs(dx) < Math.abs(dy) * 1.1) return;
      if (Math.abs(dx) > 28 || vx > 0.45) {
        renderDepo(depoIdx + (dx < 0 ? 1 : -1));
      }
    }, { passive: true });
    depoStage.addEventListener('touchcancel', () => { swiping = false; }, { passive: true });
  }

  /* na mídia: setas no desktop; scroll-snap nativo + dots no mobile */
  const midiaTrack = document.getElementById('midiaTrack');
  if (midiaTrack) {
    const viewport = midiaTrack.closest('.midia-viewport');
    const cards = [...midiaTrack.querySelectorAll('.midia-card')];
    const prev = document.getElementById('midiaPrev');
    const next = document.getElementById('midiaNext');
    const mDots = [...document.querySelectorAll('.midia-dot')];
    let mIdx = 0;

    const isSnapMode = () => window.matchMedia('(max-width: 860px)').matches;

    const step = () => cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(midiaTrack).gap);

    const syncDots = (i) => {
      mIdx = Math.max(0, Math.min(cards.length - 1, i));
      prev.disabled = mIdx === 0;
      next.disabled = mIdx === cards.length - 1;
      mDots.forEach((d, di) => {
        d.classList.toggle('is-active', di === mIdx);
        d.setAttribute('aria-selected', String(di === mIdx));
      });
    };

    const goTo = (i, behavior = 'smooth') => {
      const idx = Math.max(0, Math.min(cards.length - 1, i));
      if (isSnapMode()) {
        cards[idx].scrollIntoView({ behavior, inline: 'center', block: 'nearest' });
        syncDots(idx);
        return;
      }
      midiaTrack.style.transform = `translateX(${-idx * step()}px)`;
      syncDots(idx);
    };

    prev.addEventListener('click', () => goTo(mIdx - 1));
    next.addEventListener('click', () => goTo(mIdx + 1));
    mDots.forEach((d, di) => d.addEventListener('click', () => goTo(di)));

    /* mobile: dots acompanham o scroll nativo */
    let scrollRaf = 0;
    viewport.addEventListener('scroll', () => {
      if (scrollRaf || !isSnapMode()) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        const vRect = viewport.getBoundingClientRect();
        const center = vRect.left + vRect.width / 2;
        let nearest = 0;
        let best = Infinity;
        cards.forEach((card, i) => {
          const r = card.getBoundingClientRect();
          const dist = Math.abs(r.left + r.width / 2 - center);
          if (dist < best) { best = dist; nearest = i; }
        });
        if (nearest !== mIdx) syncDots(nearest);
      });
    }, { passive: true });

    window.addEventListener('resize', () => {
      if (isSnapMode()) {
        midiaTrack.style.transform = '';
        goTo(mIdx, 'auto');
      } else {
        viewport.scrollLeft = 0;
        goTo(mIdx, 'auto');
      }
    }, { passive: true });
  }

  /* blog: entrada em sequência quando a grade chega à tela */
  const blogCards = [...document.querySelectorAll('.blog-card')];
  if (blogCards.length) {
    blogCards.forEach((card, i) => card.style.setProperty('--blog-delay', `${i * 100}ms`));
    if (motionOk && 'IntersectionObserver' in window) {
      const blogObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          blogCards.forEach((card) => card.classList.add('in-view'));
          blogObserver.disconnect();
        }
      }, { threshold: .18 });
      blogObserver.observe(document.querySelector('.blog-grid'));
    } else {
      blogCards.forEach((card) => card.classList.add('in-view'));
    }
  }

  /* formulário de lead (seção agendar): máscara + envio via WhatsApp */
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    const phoneInput = document.getElementById('leadPhone');
    const msgEl = document.getElementById('leadFormMsg');

    const maskPhone = (value) => {
      const digits = value.replace(/\D/g, '').slice(0, 11);
      const ddd = digits.slice(0, 2);
      const first = digits.slice(2, 7);
      const last = digits.slice(7, 11);
      let formatted = ddd ? `(${ddd}` : '';
      if (ddd.length === 2) formatted += ') ';
      formatted += first;
      if (last) formatted += `-${last}`;
      return formatted;
    };

    if (phoneInput) {
      phoneInput.addEventListener('input', () => {
        phoneInput.value = maskPhone(phoneInput.value);
      });
    }

    const showMsg = (text, kind) => {
      if (!msgEl) return;
      msgEl.hidden = false;
      msgEl.textContent = text;
      msgEl.classList.toggle('is-error', kind === 'error');
      msgEl.classList.toggle('is-ok', kind === 'ok');
    };

    leadForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(leadForm);
      const nome = String(data.get('nome') || '').trim();
      const telefone = String(data.get('telefone') || '').trim();
      const email = String(data.get('email') || '').trim();

      if (!nome) {
        showMsg('Escreva o seu nome.', 'error');
        document.getElementById('leadName')?.focus();
        return;
      }
      if (telefone.replace(/\D/g, '').length < 10) {
        showMsg('Confira o número - falta um dígito.', 'error');
        phoneInput?.focus();
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMsg('Confira o e-mail - parece faltar o @.', 'error');
        document.getElementById('leadEmail')?.focus();
        return;
      }

      const message = `Olá, equipe elevo! Meu nome é ${nome}. Meu telefone é ${telefone} e meu e-mail é ${email}. Quero conversar sobre a empresa.`;
      const url = `https://wa.me/5543991588212?text=${encodeURIComponent(message)}`;
      showMsg('Contato enviado. A gente retorna em breve.', 'ok');
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  /* menu mobile */
  const toggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  const icon = toggle.querySelector('use');

  const setMenu = (open) => {
    mobileNav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    icon.setAttribute('href', open ? '#i-x' : '#i-menu');
  };

  toggle.addEventListener('click', () => setMenu(!mobileNav.classList.contains('is-open')));
  mobileNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) setMenu(false);
  });
})();
