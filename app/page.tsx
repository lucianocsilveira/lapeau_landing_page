"use client";

import { useEffect } from "react";

const ArrowDown = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M12 4v15M6.5 13.5 12 19l5.5-5.5" />
  </svg>
);

export default function Home() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const header = document.querySelector<HTMLElement>(".site-header");
    const parallaxItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    );
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    revealItems.forEach((item) => observer.observe(item));

    let animationFrame = 0;
    const update = () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 32);

      if (!reduceMotion) {
        parallaxItems.forEach((item) => {
          const rect = item.parentElement?.getBoundingClientRect();
          if (!rect || rect.bottom < -200 || rect.top > window.innerHeight + 200) {
            return;
          }
          const speed = Number(item.dataset.parallax ?? 0.08);
          const distance =
            (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
          item.style.setProperty("--parallax-shift", `${distance}px`);
        });
      }

      animationFrame = 0;
    };

    const onScroll = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <main>
      <header className="site-header">
        <a className="header-mark" href="#inicio" aria-label="La Peau — início">
          LP
        </a>
        <nav aria-label="Navegação principal">
          <a href="#conceito">Conceito</a>
          <a href="#experiencia">Experiência</a>
          <a className="nav-cta" href="#lancamento">
            Em breve
          </a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">Parfumerie de contact · Em breve</p>
          <h1>
            O perfume
            <span>encontra a pele.</span>
          </h1>
          <p className="hero-intro">
            Uma casa de perfumes criada para transformar fragrância em presença,
            memória e identidade.
          </p>
          <a className="text-link" href="#conceito">
            Descobrir a La Peau <span aria-hidden="true">↘</span>
          </a>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <img
            data-parallax="0.055"
            src="/embalagens.png"
            alt=""
            className="hero-image"
          />
          <div className="hero-veil" />
          <p className="hero-monogram">LP</p>
        </div>

        <a className="scroll-cue" href="#conceito" aria-label="Ir para o conceito">
          <ArrowDown />
          <span>Descubra</span>
        </a>
      </section>

      <section className="manifesto section-shell" id="conceito">
        <div className="section-number" data-reveal>
          01 <span>La maison</span>
        </div>
        <div className="manifesto-grid">
          <p className="eyebrow rose" data-reveal>
            Um encontro íntimo
          </p>
          <div className="manifesto-copy" data-reveal>
            <h2>
              Perfume não é acessório.
              <em>É presença.</em>
            </h2>
            <p>
              La Peau nasce do instante em que a fragrância deixa o frasco e se
              torna única em cada pele. Uma curadoria sensível, feita para quem
              entende o perfume como assinatura — silenciosa, pessoal e
              inesquecível.
            </p>
          </div>
        </div>
      </section>

      <section className="editorial" id="experiencia">
        <div className="editorial-frame">
          <div className="perfume-crop">
            <img
              data-parallax="0.045"
              src="/redes-sociais.png"
              alt="Frasco La Peau sobre pedra clara com uma pétala rosé"
            />
          </div>
          <p className="vertical-caption">Parfumerie de contact · La Peau</p>
        </div>
        <div className="editorial-copy section-shell" data-reveal>
          <p className="eyebrow">O ritual</p>
          <h2>
            A fragrância revela.
            <em>A pele transforma.</em>
          </h2>
          <p>
            Entre matéria e memória, cada escolha conta uma história. A La Peau
            convida você a desacelerar, sentir e descobrir a fragrância que já
            parecia sua.
          </p>
        </div>
      </section>

      <section className="pillars section-shell">
        <div className="section-number light" data-reveal>
          02 <span>Le geste</span>
        </div>
        <div className="pillars-heading" data-reveal>
          <p className="eyebrow">A essência de uma escolha</p>
          <h2>Três tempos. Uma assinatura.</h2>
        </div>
        <div className="pillar-list">
          <article data-reveal>
            <span>01</span>
            <h3>Pele</h3>
            <p>Onde cada perfume encontra sua forma mais verdadeira.</p>
          </article>
          <article data-reveal>
            <span>02</span>
            <h3>Presença</h3>
            <p>O gesto sutil que chega antes e permanece depois.</p>
          </article>
          <article data-reveal>
            <span>03</span>
            <h3>Memória</h3>
            <p>A marca invisível de tudo o que merece ser lembrado.</p>
          </article>
        </div>
      </section>

      <section className="brand-story section-shell">
        <div className="brand-board-wrap" data-reveal>
          <img
            data-parallax="0.025"
            src="/brand-board.png"
            alt="Identidade visual La Peau em tons de marfim e dourado"
          />
        </div>
        <div className="brand-story-copy" data-reveal>
          <p className="eyebrow rose">Clássica por natureza</p>
          <h2>Uma nova casa, com alma atemporal.</h2>
          <p>
            Texturas táteis, luz suave e o rigor dos grandes clássicos encontram
            uma sensibilidade contemporânea. Elegância que não pede atenção —
            conquista.
          </p>
        </div>
      </section>

      <section className="launch" id="lancamento">
        <div className="launch-inner" data-reveal>
          <p className="launch-script" aria-hidden="true">LP</p>
          <p className="eyebrow">A história está apenas começando</p>
          <h2>Uma nova casa de perfumes está prestes a abrir.</h2>
          <p className="launch-soon">Em breve</p>
          <a className="text-link light-link" href="#inicio">
            Voltar ao início <span aria-hidden="true">↑</span>
          </a>
        </div>
      </section>

      <footer>
        <p className="footer-wordmark">LA PEAU</p>
        <p>Parfumerie de contact</p>
        <p>© 2026 La Peau</p>
      </footer>
    </main>
  );
}
