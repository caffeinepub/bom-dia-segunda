import { Check, ShoppingCart } from "lucide-react";

const ebooks = [
  "O que você precisa antes de enfrentar os desafios do mercado de trabalho",
  "Quem tem medo da entrevista de emprego?",
  "Minha melhor receita de currículo",
];

export default function EbooksBanner() {
  return (
    <section
      id="ebooks-banner"
      className="relative overflow-hidden py-16 md:py-20"
      style={{
        background:
          "linear-gradient(135deg, #111111 0%, #1e0905 40%, #2d0e04 70%, #3d1505 100%)",
      }}
    >
      {/* Decorative glows */}
      <div
        className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full opacity-20 blur-3xl"
        style={{ background: "#d7350d" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/4 h-56 w-56 rounded-full opacity-10 blur-2xl"
        style={{ background: "#ff6b35" }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top badge */}
        <div className="mb-8 flex justify-center md:justify-start">
          <span
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold uppercase tracking-widest text-white"
            style={{
              background: "rgba(215,53,13,0.85)",
              border: "1px solid rgba(215,53,13,0.6)",
            }}
          >
            🔥 OFERTA EXCLUSIVA
          </span>
        </div>

        <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-14">
          {/* LEFT — Ebook Image */}
          <div className="flex shrink-0 justify-center md:w-[42%]">
            <div className="relative">
              {/* Glow behind image */}
              <div
                className="absolute inset-0 -translate-y-2 translate-x-2 rounded-2xl opacity-40 blur-xl"
                style={{ background: "#d7350d" }}
              />
              <img
                src="/assets/ebooks-combo.png"
                alt="Combo 3 E-books — Mercado de Trabalho"
                className="relative z-10 w-64 max-w-full -rotate-2 rounded-xl object-contain drop-shadow-2xl sm:w-80 md:w-full md:max-w-sm"
                data-ocid="ebooks-banner-image"
              />
            </div>
          </div>

          {/* RIGHT — Content */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left md:w-[58%]">
            {/* Headline */}
            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              PELO PREÇO DO COMBO{" "}
              <span className="block">DO SEU LANCHE PREFERIDO</span>
            </h2>

            {/* Sub-headline */}
            <p
              className="mt-3 text-xl font-bold sm:text-2xl"
              style={{ color: "#ff6b35" }}
            >
              você tem acesso a esses 3 e-books
            </p>

            {/* Body text */}
            <p
              className="mt-2 text-base leading-relaxed"
              style={{ color: "#d1d5db" }}
            >
              que vão fazer você compreender o mercado de trabalho e conquistar
              o sucesso!
            </p>

            {/* Ebook list */}
            <ul className="mt-6 space-y-3">
              {ebooks.map((title) => (
                <li key={title} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "#d7350d" }}
                  >
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium text-white sm:text-base">
                    {title}
                  </span>
                </li>
              ))}
            </ul>

            {/* Price */}
            <div className="mt-8 flex flex-col items-center gap-1 md:items-start">
              <span
                className="text-sm line-through"
                style={{ color: "#9ca3af" }}
              >
                De R$ 59,70
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-semibold text-white">
                  Por apenas
                </span>
                <span
                  className="text-4xl font-extrabold sm:text-5xl"
                  style={{ color: "#fbbf24" }}
                >
                  R$ 19,90
                </span>
              </div>
              <p className="text-xs font-medium" style={{ color: "#d97706" }}>
                Mais barato que o combo do seu lanche — e pode mudar sua vida
                profissional!
              </p>
            </div>

            {/* CTA Button */}
            <a
              href="#ebooks-banner"
              data-ocid="ebooks-banner-cta"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-extrabold uppercase tracking-wide text-white transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-100 sm:w-auto sm:text-lg md:w-full lg:w-auto"
              style={{
                background: "linear-gradient(135deg, #d7350d 0%, #b92d0b 100%)",
                boxShadow: "0 4px 24px rgba(215,53,13,0.5)",
              }}
            >
              <ShoppingCart className="h-5 w-5" />
              QUERO OS 3 E-BOOKS AGORA →
            </a>

            {/* Trust signals */}
            <p className="mt-3 text-xs" style={{ color: "#9ca3af" }}>
              ✓ Acesso imediato&nbsp;&nbsp;✓ Download em PDF&nbsp;&nbsp;✓
              Garantia de satisfação
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
