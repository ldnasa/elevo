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

  /* diagnóstico: reveal frase a frase (palavras com stagger sutil) */
  const diagText = document.querySelector('.diag-text');
  const motionOk = !matchMedia('(prefers-reduced-motion: reduce)').matches
    && !docEl.classList.contains('is-static');

  if (diagText && motionOk && 'IntersectionObserver' in window) {
    const fullText = diagText.textContent.replace(/\s+/g, ' ').trim();
    const PHRASE_STEP = 0.26; /* s entre frases */
    const WORD_STEP = 0.028;  /* s entre palavras da mesma frase */
    let maxDelay = 0;

    diagText.querySelectorAll('.ph').forEach((ph, pi) => {
      let wi = 0;
      /* percorre preservando wrappers internos (ex.: .hl-mark) */
      const splitNode = (node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          [...node.childNodes].forEach(splitNode);
          return;
        }
        if (node.nodeType !== Node.TEXT_NODE) return;
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach((token) => {
          if (!token) return;
          if (/^\s+$/.test(token)) {
            frag.appendChild(document.createTextNode(' '));
            return;
          }
          const w = document.createElement('span');
          w.className = 'w';
          w.textContent = token;
          const d = pi * PHRASE_STEP + wi * WORD_STEP;
          maxDelay = Math.max(maxDelay, d);
          w.style.setProperty('--d', d.toFixed(3) + 's');
          frag.appendChild(w);
          wi += 1;
        });
        node.replaceWith(frag);
      };
      [...ph.childNodes].forEach(splitNode);
      ph.setAttribute('aria-hidden', 'true');
    });

    diagText.dataset.split = '';

    /* texto integral para leitores de tela (os spans ficam aria-hidden) */
    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = fullText;
    diagText.prepend(sr);

    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        diagText.classList.add('in');
        /* grifa só depois de TODAS as frases assentarem (última palavra + respiro) */
        setTimeout(() => diagText.classList.add('hl-in'), (maxDelay + 0.55 + 0.15) * 1000);
        io.disconnect();
      }
    }, { threshold: .3 });
    io.observe(diagText);
  }

  /* frentes: accordion drop-down (exclusivo, sem modal) */
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

  /* formatos: tabs com troca de foto + texto (hover, clique e teclado) */
  const formatoTabs = [...document.querySelectorAll('.formato-tab')];
  if (formatoTabs.length) {
    const formatoImgs = [...document.querySelectorAll('.formato-img')];
    const panel = document.getElementById('formatoPanel');
    const info = panel.querySelector('.formato-info');
    const nome = panel.querySelector('.formato-nome');
    const desc = panel.querySelector('.formato-desc');
    let current = 0;
    let swapTimer = 0;

    const select = (i) => {
      if (i === current) return;
      current = i;
      formatoTabs.forEach((t, ti) => {
        t.classList.toggle('is-active', ti === i);
        t.setAttribute('aria-selected', String(ti === i));
      });
      formatoImgs.forEach((im, ii) => im.classList.toggle('is-active', ii === i));
      panel.setAttribute('aria-labelledby', formatoTabs[i].id);
      info.classList.add('swapping');
      clearTimeout(swapTimer);
      swapTimer = setTimeout(() => {
        nome.textContent = formatoTabs[i].dataset.nome;
        desc.textContent = formatoTabs[i].dataset.desc;
        info.classList.remove('swapping');
      }, 190);
    };

    formatoTabs.forEach((tab, i) => {
      tab.addEventListener('click', (e) => { select(i); if (e.detail) tab.blur(); });
      tab.addEventListener('mouseenter', () => select(i));
      tab.addEventListener('focus', () => select(i));
    });
  }

  /* depoimentos: carrossel (setas no desktop, dots + swipe no mobile) */
  const depoStage = document.querySelector('.depo-stage');
  if (depoStage) {
    const DEPOS = [
      {
        quote: 'A consultoria da Elevo tem agregado qualidade, foco e assertividade na condução das melhores estratégias para duas das minhas empresas, assim investimos a energia certa nos pontos com a probabilidade de maiores e melhores resultados. A partir de dados e organização acrescentamos leveza e performance. É a inteligência e a inovação trabalhando, qualidades, inclusive, que a Jéssica Fahl tem de sobra!',
        nome: 'Karen Sinnema',
        empresa: 'London Marcas e Patentes',
        logo: './img/clientes/vector/london-white.svg',
        logoW: 203, logoH: 55, tint: false
      },
      {
        quote: 'Encerramos uma etapa importante de aperfeiçoamento das nossas práticas de gestão de pessoas. Reconhecemos a competência, a organização e a agilidade da Elevo na condução de todas as entregas.',
        nome: 'Henrique Tristão',
        empresa: 'Produsi Metalúrgica',
        logo: './img/clientes/vector/produsi.svg',
        logoW: 183, logoH: 38, tint: true
      },
      {
        quote: 'A gente tinha a cabeça voltada só para as redes sociais. A Elevo trouxe uma visão mais ampla e estratégica para o negócio. Hoje entendemos que marketing vai além das redes.',
        nome: 'Guilherme Bittencourt',
        empresa: 'Fortmobile',
        logo: './img/clientes/fortmobile.png',
        logoW: 150, logoH: 34, tint: true
      }
    ];
    const content = document.getElementById('depoContent');
    const quoteEl = document.getElementById('depoQuote');
    const authorEl = document.getElementById('depoAuthor');
    const logoEl = document.getElementById('depoLogo');
    const dots = [...document.querySelectorAll('.depo-dot')];
    let depoIdx = 0;
    let depoTimer = 0;

    const renderDepo = (i) => {
      depoIdx = (i + DEPOS.length) % DEPOS.length;
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
        logoEl.classList.toggle('logo-tint', d.tint);
        content.classList.remove('swapping');
        logoEl.style.opacity = '1';
      }, 290);
      dots.forEach((dot, di) => {
        dot.classList.toggle('is-active', di === depoIdx);
        dot.setAttribute('aria-selected', String(di === depoIdx));
      });
    };

    logoEl.style.transition = 'opacity .28s ease';
    document.getElementById('depoPrev').addEventListener('click', () => renderDepo(depoIdx - 1));
    document.getElementById('depoNext').addEventListener('click', () => renderDepo(depoIdx + 1));
    dots.forEach((dot, di) => dot.addEventListener('click', () => renderDepo(di)));

    /* swipe no mobile */
    let touchX = 0;
    depoStage.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    depoStage.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 48) renderDepo(depoIdx + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  /* na mídia: carrossel (setas desktop, dots + swipe mobile) */
  const midiaTrack = document.getElementById('midiaTrack');
  if (midiaTrack) {
    const cards = [...midiaTrack.querySelectorAll('.midia-card')];
    const prev = document.getElementById('midiaPrev');
    const next = document.getElementById('midiaNext');
    const mDots = [...document.querySelectorAll('.midia-dot')];
    let mIdx = 0;

    const step = () => cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(midiaTrack).gap);

    const renderMidia = (i) => {
      mIdx = Math.max(0, Math.min(cards.length - 1, i));
      midiaTrack.style.transform = `translateX(${-mIdx * step()}px)`;
      prev.disabled = mIdx === 0;
      next.disabled = mIdx === cards.length - 1;
      mDots.forEach((d, di) => {
        d.classList.toggle('is-active', di === mIdx);
        d.setAttribute('aria-selected', String(di === mIdx));
      });
    };

    prev.addEventListener('click', () => renderMidia(mIdx - 1));
    next.addEventListener('click', () => renderMidia(mIdx + 1));
    mDots.forEach((d, di) => d.addEventListener('click', () => renderMidia(di)));
    window.addEventListener('resize', () => renderMidia(mIdx), { passive: true });

    let mTouchX = 0;
    midiaTrack.addEventListener('touchstart', (e) => { mTouchX = e.touches[0].clientX; }, { passive: true });
    midiaTrack.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - mTouchX;
      if (Math.abs(dx) > 48) renderMidia(mIdx + (dx < 0 ? 1 : -1));
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

  /* footer: máscara de telefone + envio do lead para o WhatsApp */
  const footerForm = document.getElementById('footerLeadForm');
  if (footerForm) {
    const phoneInput = document.getElementById('footerPhone');

    phoneInput.addEventListener('input', () => {
      const digits = phoneInput.value.replace(/\D/g, '').slice(0, 11);
      const ddd = digits.slice(0, 2);
      const first = digits.slice(2, 7);
      const last = digits.slice(7, 11);
      let formatted = ddd ? `(${ddd}` : '';
      if (ddd.length === 2) formatted += ') ';
      formatted += first;
      if (last) formatted += `-${last}`;
      phoneInput.value = formatted;
    });

    footerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!footerForm.checkValidity()) {
        footerForm.reportValidity();
        return;
      }

      const data = new FormData(footerForm);
      const nome = String(data.get('nome')).trim();
      const empresa = String(data.get('empresa')).trim();
      const telefone = String(data.get('telefone')).trim();
      const message = `Olá, equipe ELEVO! Meu nome é ${nome}. Atuo em ${empresa}. Meu telefone é ${telefone}. Quero conversar sobre o próximo passo da empresa.`;
      const url = `https://wa.me/5543991588212?text=${encodeURIComponent(message)}`;
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
