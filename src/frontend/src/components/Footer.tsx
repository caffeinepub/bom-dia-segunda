import { Sun } from "lucide-react";

const currentYear = new Date().getFullYear();

const quickLinks = [
  { label: "Encontrar Vagas", href: "#vagas" },
  { label: "Avaliar Currículo", href: "#avaliador" },
  { label: "Mentoria", href: "#mentoria" },
  { label: "Blog", href: "#blog" },
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
        {/* Siga nas Redes Sociais */}
        <div className="mb-10 pb-10 border-b border-white/10">
          <h4 className="font-semibold text-white mb-5 text-base uppercase tracking-widest text-center">
            Siga nas Redes Sociais
          </h4>
          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="flex flex-col items-center gap-2 group"
              >
                <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 group-hover:bg-primary group-hover:text-white transition-colors">
                  {s.icon}
                </span>
                <span className="text-xs text-white/50 group-hover:text-primary transition-colors">
                  {s.name}
                </span>
              </a>
            ))}
          </div>
        </div>

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
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Sun className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">Bom Dia Segunda</span>
            </div>
            <p className="text-xs leading-relaxed">
              A principal plataforma de vagas de emprego do Sul Fluminense.
              Conectando talentos às melhores oportunidades da região desde
              2026.
            </p>
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
              <li>📱 (24) 99999-9999</li>
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
