import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CITIES } from "@/data/mockData";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";

interface HeroProps {
  onSearch: (keyword: string, city: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("Todas");

  const handleSearch = () => {
    onSearch(keyword, city);
    const el = document.getElementById("vagas");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero-gradient py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
          Sua Próxima Oportunidade está no{" "}
          <span className="text-orange-300">Sul Fluminense</span>
        </h1>
        <p className="text-white/80 text-lg mb-10">
          Vagas atualizadas para você começar a semana com novas oportunidades
          de carreira.
        </p>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-3 shadow-xl flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              className="pl-9 border-0 focus-visible:ring-0 bg-transparent"
              placeholder="Cargo, empresa ou habilidade..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              data-ocid="hero.search_input"
            />
          </div>
          <div className="relative w-full sm:w-48">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <select
              className="w-full pl-9 pr-3 py-2 text-sm border-0 sm:border-l border-border bg-transparent focus:outline-none focus:ring-0 rounded-lg"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              data-ocid="hero.select"
            >
              {CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <Button
            onClick={handleSearch}
            className="bg-primary hover:bg-primary/90 text-white px-6 shrink-0"
            data-ocid="hero.primary_button"
          >
            <Search className="w-4 h-4 mr-2" />
            Buscar Vagas
          </Button>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-white/70 text-sm">
          <span>
            <strong className="text-white">247</strong> vagas ativas
          </span>
          <span>
            <strong className="text-white">25</strong> cidades
          </span>
          <span>
            <strong className="text-white">+50</strong> empresas parceiras
          </span>
        </div>
      </div>
    </section>
  );
}
