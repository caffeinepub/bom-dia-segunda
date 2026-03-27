import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contato() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setContactLoading(false);
    toast.success("Mensagem enviada! Retornaremos em breve.");
    setContactForm({ name: "", email: "", message: "" });
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setNewsletterLoading(false);
    toast.success(
      "Inscrição realizada! Você receberá as vagas toda segunda-feira.",
    );
    setNewsletterEmail("");
  };

  return (
    <section
      id="contato"
      className="py-16 px-4"
      style={{ background: "#f0f0f0" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Fale Conosco
          </h2>
          <p className="text-muted-foreground">
            Tem alguma dúvida ou sugestão? Entre em contato!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card rounded-2xl border border-border shadow-card p-6">
            <h3 className="font-semibold text-lg mb-5">Enviar Mensagem</h3>
            <form onSubmit={handleContact} className="space-y-4">
              <div>
                <Label htmlFor="contact-name">Nome</Label>
                <Input
                  id="contact-name"
                  placeholder="Seu nome completo"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                  required
                  data-ocid="contato.input"
                />
              </div>
              <div>
                <Label htmlFor="contact-email">E-mail</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  required
                  data-ocid="contato.input"
                />
              </div>
              <div>
                <Label htmlFor="contact-msg">Mensagem</Label>
                <Textarea
                  id="contact-msg"
                  placeholder="Escreva sua mensagem..."
                  className="h-28 resize-none"
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  required
                  data-ocid="contato.textarea"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white"
                disabled={contactLoading}
                data-ocid="contato.submit_button"
              >
                {contactLoading ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border shadow-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Newsletter Semanal</h3>
                  <p className="text-xs text-muted-foreground">
                    Vagas toda segunda-feira no seu e-mail
                  </p>
                </div>
              </div>
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="flex-1"
                  data-ocid="contato.input"
                />
                <Button
                  type="submit"
                  className="bg-primary text-white shrink-0"
                  disabled={newsletterLoading}
                  data-ocid="contato.submit_button"
                >
                  {newsletterLoading ? "..." : "Assinar"}
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-2">
                ✓ Sem spam. Cancele a qualquer momento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
