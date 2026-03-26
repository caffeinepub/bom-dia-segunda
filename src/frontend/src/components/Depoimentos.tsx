import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TESTIMONIALS } from "@/data/mockData";
import { useActor } from "@/hooks/useActor";
import { ChevronLeft, ChevronRight, Quote, Send, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TestimonialDisplay {
  id: string;
  name: string;
  role: string;
  city: string;
  text: string;
  stars: number;
  initials: string;
  color: string;
}

const AVATAR_COLORS = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-teal-500",
];

export default function Depoimentos() {
  const { actor } = useActor();
  const [items, setItems] = useState<TestimonialDisplay[]>(
    TESTIMONIALS.map((t, i) => ({
      id: t.id,
      name: t.name,
      role: t.role,
      city: t.city,
      text: t.text,
      stars: t.stars,
      initials: t.initials,
      color: t.color || AVATAR_COLORS[i % AVATAR_COLORS.length],
    })),
  );
  const [current, setCurrent] = useState(0);

  // Form state
  const [fname, setFname] = useState("");
  const [fprofession, setFprofession] = useState("");
  const [fcity, setFcity] = useState("");
  const [ftext, setFtext] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function load() {
      if (!actor) return;
      try {
        const list = await actor.getApprovedTestimonials();
        if (list && list.length > 0) {
          const mapped: TestimonialDisplay[] = list.map((t, i) => ({
            id: t.id,
            name: t.name,
            role: t.profession,
            city: t.city,
            text: t.text,
            stars: 5,
            initials: t.name
              .split(" ")
              .slice(0, 2)
              .map((w) => w[0])
              .join(""),
            color: AVATAR_COLORS[i % AVATAR_COLORS.length],
          }));
          setItems(mapped);
        }
      } catch {
        // keep mockData
      }
    }
    load();
  }, [actor]);

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  const t = items[current];
  const stars = Array.from({ length: t?.stars ?? 5 }, (_, i) => `star-${i}`);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fname || !fprofession || !fcity || !ftext) {
      toast.error("Preencha todos os campos.");
      return;
    }
    setSubmitting(true);
    try {
      if (actor) {
        await actor.submitTestimonial({
          id: crypto.randomUUID(),
          name: fname,
          profession: fprofession,
          city: fcity,
          text: ftext,
          approved: false,
          createdAt: BigInt(Date.now() * 1_000_000),
        });
      }
      toast.success(
        "Depoimento enviado! Será exibido após aprovação da moderação.",
      );
      setSubmitted(true);
      setFname("");
      setFprofession("");
      setFcity("");
      setFtext("");
    } catch {
      toast.error("Erro ao enviar depoimento. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) return null;

  return (
    <section
      id="depoimentos"
      className="py-16 px-4"
      style={{ background: "#1a1a1a" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">
            Histórias de Sucesso
          </h2>
          <p className="text-white/60">
            Pessoas que encontraram sua oportunidade pelo Bom Dia Segunda
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mb-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 text-white">
            <Quote className="w-10 h-10 text-primary/60 mb-6" />
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center text-white font-bold`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-white/60 text-sm">
                    {t.role} &middot; {t.city}
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                {stars.map((key) => (
                  <Star
                    key={key}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              data-ocid="depoimentos.pagination_prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {items.map((item, i) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current ? "bg-primary" : "bg-white/30"
                  }`}
                  aria-label={`Depoimento de ${item.name}`}
                  data-ocid="depoimentos.toggle"
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              data-ocid="depoimentos.pagination_next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Submit Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-2">
            Compartilhe sua experiência
          </h3>
          <p className="text-white/50 text-sm mb-6">
            Sua história pode inspirar outras pessoas. O depoimento será exibido
            após aprovação.
          </p>

          {submitted ? (
            <div
              className="text-center py-8"
              data-ocid="depoimentos.success_state"
            >
              <div className="text-4xl mb-3">🎉</div>
              <p className="text-green-400 font-semibold text-lg">
                Depoimento enviado com sucesso!
              </p>
              <p className="text-white/50 text-sm mt-1">
                Obrigado por compartilhar. Publicaremos em breve.
              </p>
              <button
                type="button"
                className="mt-4 text-xs text-white/40 hover:text-white/70 underline"
                onClick={() => setSubmitted(false)}
              >
                Enviar outro depoimento
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label className="text-white/70 text-sm">Nome *</Label>
                  <Input
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/30"
                    placeholder="Seu nome"
                    data-ocid="depoimentos.input"
                  />
                </div>
                <div>
                  <Label className="text-white/70 text-sm">Profissão *</Label>
                  <Input
                    value={fprofession}
                    onChange={(e) => setFprofession(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/30"
                    placeholder="Ex: Analista de RH"
                    data-ocid="depoimentos.input"
                  />
                </div>
                <div>
                  <Label className="text-white/70 text-sm">Cidade *</Label>
                  <Input
                    value={fcity}
                    onChange={(e) => setFcity(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/30"
                    placeholder="Ex: Resende"
                    data-ocid="depoimentos.input"
                  />
                </div>
              </div>
              <div>
                <Label className="text-white/70 text-sm">Depoimento *</Label>
                <Textarea
                  value={ftext}
                  onChange={(e) => setFtext(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/30 min-h-[100px]"
                  placeholder="Conte como o Bom Dia Segunda te ajudou..."
                  data-ocid="depoimentos.textarea"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                  data-ocid="depoimentos.submit_button"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? "Enviando..." : "Enviar Depoimento"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
