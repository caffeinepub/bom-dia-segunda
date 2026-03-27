import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function WhatsAppFloat() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    function onHashChange() {
      setHash(window.location.hash);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Ocultar na área administrativa
  if (hash === "#admin") return null;

  return (
    <a
      href="https://wa.me/5524992001100?text=Olá!%20Vim%20pelo%20Bom%20Dia%20Segunda!"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      data-ocid="whatsapp.primary_button"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-semibold hidden sm:inline">
        Fale Conosco
      </span>
    </a>
  );
}
