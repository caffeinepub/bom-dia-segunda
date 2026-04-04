import AudioPlayer from "@/components/AudioPlayer";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Encontrar Vagas", href: "#vagas" },
  { label: "Estatísticas", href: "#estatisticas" },
  { label: "Mercado & Trabalho", href: "#blog" },
  { label: "Mentoria", href: "#mentoria" },
  { label: "Contato", href: "#contato" },
];

function Logo() {
  return (
    <span className="font-black italic text-2xl tracking-tight leading-none select-none">
      <span className="text-black">BOM</span>
      <span className="text-[#d7350d]">DIA</span>
      <span className="text-black">SEGUNDA</span>
    </span>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handlePublicarVaga() {
    window.location.hash = "publicar-vaga";
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-1" data-ocid="header.link">
          <Logo />
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-800 hover:text-[#d7350d] transition-colors"
              data-ocid="header.link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <AudioPlayer />
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={handlePublicarVaga}
            data-ocid="header.primary_button"
          >
            Publicar Vaga
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          data-ocid="header.toggle"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-800 hover:text-[#d7350d]"
              onClick={() => setMenuOpen(false)}
              data-ocid="header.link"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">
                Música tema
              </span>
              <AudioPlayer />
            </div>
            <Button
              size="sm"
              className="bg-primary text-white"
              onClick={handlePublicarVaga}
              data-ocid="header.primary_button"
            >
              Publicar Vaga
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
