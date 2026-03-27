const currentYear = new Date().getFullYear();

const quickLinks = [
  { label: "Encontrar Vagas", href: "#vagas" },
  { label: "Avaliar Currículo", href: "#avaliador" },
  { label: "Mentoria", href: "#mentoria" },
  { label: "MERCADO & TRABALHO", href: "#blog" },
  { label: "Bom Dia Segunda Shopping", href: "#loja" },
  { label: "Sobre Nós", href: "#contato" },
  { label: "Publicar Vaga", href: "#contato" },
];

const cities = [
  "Angra dos Reis",
  "Areal",
  "Barra do Piraí",
  "Barra Mansa",
  "Comendador Levy Gasparian",
  "Engenheiro Paulo de Frontin",
  "Itatiaia",
  "Mendes",
  "Miguel Pereira",
  "Paracambi",
  "Paraíba do Sul",
  "Paraty",
  "Paty do Alferes",
  "Pinheiral",
  "Piraí",
  "Porto Real",
  "Quatis",
  "Resende",
  "Rio Claro",
  "Rio das Flores",
  "Sapucaia",
  "Três Rios",
  "Valença",
  "Vassouras",
  "Volta Redonda",
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/bomdiasegunda",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/bomdiasegunda",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@bomdiasegunda",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/bomdiasegunda",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@bomdiasegunda",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
  },
  {
    name: "Substack",
    href: "https://bomdiasegunda.substack.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
      </svg>
    ),
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/show/bomdiasegunda",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    name: "Kwai",
    href: "https://www.kwai.com/@bomdiasegunda",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#111" }} className="text-white/70 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Biografia do Idealizador */}
        <div className="mb-10 pb-10 border-b border-white/10">
          <h4 className="font-semibold text-white mb-6 text-lg">
            Sobre o Idealizador
          </h4>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <img
              src="/assets/uploads/josemar-019d2b40-e5dc-748b-9b35-de99b615a3ab-1.png"
              alt="Josemar Avelino"
              className="w-28 h-28 rounded-full object-cover object-top flex-shrink-0 border-2 border-primary"
            />
            <div>
              <p className="text-white font-semibold text-base mb-1">
                Josemar Avelino
              </p>
              <p className="text-primary text-xs font-medium mb-3 uppercase tracking-wide">
                Idealizador do BOM DIA SEGUNDA
              </p>
              <p className="text-xs leading-relaxed">
                Especialista em Gestão de Pessoas (UNIFEI), formado em
                Controladoria e Gestão em Recursos Humanos (UNIFOA), vem atuando
                auxiliando pessoas e empresas no processo de ressignificação e
                desenvolvimento. Possui ampla experiência em educação
                profissional, treinamento e desenvolvimento de pessoas. Atua há
                mais de 20 anos na formação e orientação de jovens e adultos
                para o mercado de trabalho, com foco em empreendedorismo,
                comportamento profissional e empregabilidade.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            {/* Logo BDS + BOM DIA SEGUNDA */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-black text-2xl leading-none tracking-tight">
                <span style={{ color: "#ffffff" }}>B</span>
                <span style={{ color: "#d7350d" }}>D</span>
                <span style={{ color: "#ffffff" }}>S</span>
              </span>
              <span className="font-black italic text-2xl leading-none">
                <span style={{ color: "#ffffff" }}>BOM</span>
                <span style={{ color: "#d7350d" }}>DIA</span>
                <span style={{ color: "#ffffff" }}>SEGUNDA</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-5">
              A principal plataforma de vagas de emprego do Sul Fluminense.
              Conectando talentos às melhores oportunidades da região desde
              2026.
            </p>
            {/* Redes Sociais */}
            <h5 className="text-white text-xs font-semibold uppercase tracking-widest mb-3">
              Redes Sociais
            </h5>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Links Rápidos</h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="hover:text-primary transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Cidades Atendidas</h4>
            <ul className="space-y-2 text-xs columns-2">
              {cities.map((c) => (
                <li key={c}>
                  <a
                    href="#vagas"
                    className="hover:text-primary transition-colors"
                  >
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Contato</h4>
            <ul className="space-y-2 text-xs">
              <li>📧 contato@bomdiasegunda.com.br</li>
              <li>📱 (24) 99200-1100</li>
              <li>📍 Sul Fluminense, RJ</li>
              <li className="pt-2">
                <a href="#contato" className="text-primary hover:underline">
                  Termos de Uso
                </a>
                {" · "}
                <a href="#contato" className="text-primary hover:underline">
                  Privacidade
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span>
            © {currentYear} Bom Dia Segunda. Todos os direitos reservados.
          </span>
          <div className="flex items-center gap-4">
            <span>
              Feito com ❤️ usando{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </span>
            <a
              href="#admin"
              className="text-white/20 hover:text-white/50 transition-colors"
              data-ocid="footer.admin.link"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
