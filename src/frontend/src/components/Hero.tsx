import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CITIES } from "@/data/mockData";
import { ChevronLeft, ChevronRight, MapPin, Search } from "lucide-react";
import { useEffect, useState } from "react";
import imgHeroMentoria from "/assets/generated/hero-mentoria.dim_1200x600.jpg";

interface HeroProps {
  onSearch: (keyword: string, city: string) => void;
  onMentoria?: () => void;
}

export default function Hero({ onSearch, onMentoria }: HeroProps) {
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("Todas");
  const [slide, setSlide] = useState(0);

  const slides = [{ id: "vagas" }, { id: "mentoria" }];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((s) => (s + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    onSearch(keyword, city);
    const el = document.getElementById("vagas");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ minHeight: 480 }}
    >
      {/* Slide 1 - Vagas */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          slide === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
        } hero-gradient flex items-center`}
      >
        <div className="max-w-3xl mx-auto text-center px-4 py-24 w-full">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Sua Próxima Oportunidade está no{" "}
            <span className="text-orange-300">Sul Fluminense</span>
          </h1>
          <p className="text-white/80 text-lg mb-10">
            Vagas atualizadas para você começar a semana com novas chances de
            emprego.
          </p>
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
              <Search className="w-4 h-4 mr-2" /> Buscar Vagas
            </Button>
          </div>
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
      </div>

      {/* Slide 2 - Mentoria */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          slide === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
        } flex items-center`}
        style={{ minHeight: 480 }}
      >
        <img
          src={imgHeroMentoria}
          alt="Mentoria Primeiro Emprego"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4 py-24 w-full">
          <span className="inline-block bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            Mentoria Primeiro Emprego
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Acelere sua entrada no{" "}
            <span className="text-orange-300">mercado de trabalho</span>
          </h1>
          <p className="text-white/85 text-lg mb-8">
            Orientação personalizada, análise de currículo e preparo completo
            para entrevistas com especialistas da região.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              type="button"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-base font-bold rounded-xl"
              onClick={() => {
                if (onMentoria) {
                  onMentoria();
                  return;
                }
                const el = document.getElementById("mentoria");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Quero me inscrever
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-3 text-base rounded-xl"
              onClick={() => {
                const el = document.getElementById("mentoria");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Saiba mais
            </Button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        <button
          type="button"
          onClick={() =>
            setSlide((s) => (s - 1 + slides.length) % slides.length)
          }
          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSlide(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === slide ? "bg-white w-6" : "bg-white/40"
            }`}
          />
        ))}
        <button
          type="button"
          onClick={() => setSlide((s) => (s + 1) % slides.length)}
          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
