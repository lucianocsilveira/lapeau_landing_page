"use client";

import { useEffect, useState } from "react";

const instagramUrl = "https://www.instagram.com/lapeau.parfumerie/";
const logo = "/la-peau-logo.png";
const hero = "/la-peau-hero.png";
const discovery = "/la-peau-discovery.png";
const experience = "/la-peau-experience.png";
const instagramImages = [
  "/redes-sociais_1.png",
  "/redes-sociais_2.png",
  "/redes-sociais_4.png",
];

function useParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;
      elements.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        const distance =
          (bounds.top + bounds.height / 2 - viewportCenter) / window.innerHeight;
        const strength = Number(element.dataset.parallax ?? 22);
        const offset = Math.max(-1, Math.min(1, distance)) * strength;
        element.style.setProperty("--parallax-y", `${offset}px`);
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}

function Arrow({ direction = "right" }: { direction?: "right" | "down" }) {
  return (
    <span aria-hidden="true" className={`arrow arrow--${direction}`}>
      {direction === "down" ? "↓" : "→"}
    </span>
  );
}

function Button({
  children,
  href = "#sobre",
  outline = false,
}: {
  children: React.ReactNode;
  href?: string;
  outline?: boolean;
}) {
  return (
    <a href={href} className={`button ${outline ? "button--outline" : ""}`}>
      {children}
      <Arrow />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["Início", "#inicio"],
    ["A LA PEAU", "#sobre"],
    ["Experiência", "#experiencia"],
    ["Curadoria", "#curadoria"],
    ["Instagram", "#instagram"],
  ];
  return (
    <header
      className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}
    >
      <button
        className="mobile-trigger"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
      >
        {open ? "×" : "☰"}
      </button>
      <nav className="desktop-nav" aria-label="Navegação principal">
        {links.slice(0, 3).map(([label, href]) => (
          <a key={label} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <a className="header-logo" href="#inicio" aria-label="LA PEAU — início">
        <img src={logo} alt="LA PEAU — Parfumerie de Contact" />
      </a>
      <div className="header-actions">
        <nav className="desktop-nav nav-right">
          {links.slice(3).map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a
          className="header-contact"
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
        >
          Fale conosco
        </a>
      </div>
      {open && (
        <div className="mobile-menu">
          <nav>
            {links.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
          <a
            className="mobile-instagram"
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            @lapeau.parfumerie
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero" aria-label="LA PEAU">
      <img
        src={hero}
        alt="Frasco de perfume em vidro escuro sobre pedra e seda"
        className="hero-image"
        data-parallax="34"
      />
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">Parfumerie de contact</p>
        <h1>
          Uma fragrância.
          <br />
          Uma presença.
          <br />
          <em>Uma assinatura.</em>
        </h1>
        <p className="hero-text">
          A LA PEAU é uma perfumaria de contato: um lugar para sentir, conversar
          e escolher com calma.
        </p>
        <div className="hero-actions">
          <Button href="#sobre">Conheça a LA PEAU</Button>
          <Button outline href={instagramUrl}>
            Fale conosco
          </Button>
        </div>
      </div>
      <a className="scroll-prompt" href="#sobre">
        <span>Explorar</span>
        <Arrow direction="down" />
      </a>
    </section>
  );
}

function BrandStory() {
  return (
    <section id="sobre" className="about">
      <div className="about-image">
        <img
          src={discovery}
          alt="Mãos descobrindo uma fragrância em uma perfumaria"
          loading="lazy"
          data-parallax="24"
        />
      </div>
      <div className="about-copy">
        <p className="eyebrow">A essência da LA PEAU</p>
        <h2>
          Perfume é<br />
          <em>presença.</em>
        </h2>
        <p>
          Acreditamos que uma fragrância se escolhe pela memória que desperta e
          pela presença que deixa. Por isso, cada encontro na LA PEAU começa com
          escuta.
        </p>
        <p>
          Nossa loja foi pensada como uma pausa: uma forma mais íntima de
          descobrir o que combina com você.
        </p>
        <div className="signature">
          <img src={logo} alt="LA PEAU" />
        </div>
      </div>
    </section>
  );
}

function Curatorship() {
  const items = [
    [
      "Escuta",
      "Entendemos o momento, o estilo e a história que você quer contar.",
    ],
    [
      "Curadoria",
      "Apresentamos caminhos olfativos com repertório, intenção e cuidado.",
    ],
    [
      "Ritual",
      "Transformamos a descoberta em uma experiência que permanece na memória.",
    ],
    [
      "Proximidade",
      "Um atendimento atento, feito para que a sua escolha seja verdadeiramente sua.",
    ],
  ];
  return (
    <section id="curadoria" className="benefits section">
      <div className="section-intro">
        <p className="eyebrow">O jeito LA PEAU</p>
        <h2>
          Uma escolha que
          <br />
          se <em>sente.</em>
        </h2>
      </div>
      <div className="benefit-grid">
        {items.map(([title, text], index) => (
          <article key={title}>
            <span>0{index + 1}</span>
            <div className="line-icon">✦</div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experiencia" className="experience">
      <img
        src={experience}
        alt="Ritual de perfumaria com frascos e pedras naturais"
        loading="lazy"
        data-parallax="30"
      />
      <div className="experience-overlay" />
      <div className="experience-copy">
        <p className="eyebrow">Experiência LA PEAU</p>
        <h2>
          Você chega com
          <br />
          uma ideia.
          <br />
          <em>Sai com uma memória.</em>
        </h2>
        <p>Descubra a sua próxima fragrância em uma conversa sem pressa.</p>
        <Button href={instagramUrl}>Iniciar uma conversa</Button>
      </div>
    </section>
  );
}

function Moments() {
  const moments = [
    [
      "Referências",
      "Texturas, notas e inspirações que movem a nossa curadoria.",
    ],
    ["Descoberta", "Um espaço onde a perfumaria é vivida com tempo e atenção."],
    ["Cuidado", "Cada detalhe pensado para tornar o encontro especial."],
  ];
  return (
    <section className="testimonials section">
      <div className="section-intro">
        <p className="eyebrow">A nossa casa</p>
        <h2>
          Em cada encontro,
          <br />
          uma nova <em>impressão.</em>
        </h2>
      </div>
      <div className="testimonial-grid">
        {moments.map(([title, text], i) => (
          <article key={title}>
            <div className="stars">✦ ✦ ✦</div>
            <h3>{title}</h3>
            <p>{text}</p>
            <span>0{i + 1}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Instagram() {
  return (
    <section id="instagram" className="instagram section">
      <div className="instagram-heading">
        <div className="section-intro">
          <p className="eyebrow">Acompanhe de perto</p>
          <h2>Siga a LA PEAU</h2>
          <p className="section-copy">
            Referências, rituais e descobertas da nossa perfumaria.
          </p>
        </div>
        <Button outline href={instagramUrl}>
          Seguir no Instagram
        </Button>
      </div>
      {/* <div className="insta-grid">
        {instagramImages.map((image, index) => (
          <a
            key={image}
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className={`insta-tile insta-tile--${index + 1}`}
            aria-label={`Ver LA PEAU no Instagram ${index + 1}`}
          >
            <img src={image} alt="" loading="lazy" />
            <span>↗</span>
          </a>
        ))}
      </div> */}
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="orb orb--one" />
      <div className="orb orb--two" />
      <p className="eyebrow">Seu próximo encontro</p>
      <h2>
        Sua próxima fragrância pode estar
        <br />a um <em>encontro</em> de distância.
      </h2>
      <div>
        <Button href={instagramUrl}>Falar com a LA PEAU</Button>
        <Button outline href="#inicio">
          Voltar ao início
        </Button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contato">
      <div className="footer-main">
        <div>
          <img
            className="footer-logo"
            src={logo}
            alt="LA PEAU — Parfumerie de Contact"
          />
          <p>
            Uma perfumaria de contato para transformar sensações em memórias.
          </p>
        </div>
        <div>
          <h3>Navegação</h3>
          <a href="#sobre">A LA PEAU</a>
          <a href="#experiencia">Experiência</a>
          <a href="#curadoria">Curadoria</a>
        </div>
        <div>
          <h3>Atendimento</h3>
          <a href={instagramUrl} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={instagramUrl} target="_blank" rel="noreferrer">
            Fale conosco
          </a>
        </div>
        <div>
          <h3>Institucional</h3>
          <a href="#sobre">Sobre a LA PEAU</a>
          <a href="#contato">Contato</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© LA PEAU — Parfumerie de Contact</span>
        <span>Brasil</span>
      </div>
    </footer>
  );
}

export function LaPeauLanding() {
  useParallax();
  return (
    <main>
      <Header />
      <Hero />
      <BrandStory />
      <Curatorship />
      <Experience />
      <Moments />
      <Instagram />
      <FinalCTA />
      <Footer />
    </main>
  );
}
