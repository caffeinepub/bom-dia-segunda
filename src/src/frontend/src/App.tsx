import Avaliador from "@/components/Avaliador";
import Blog from "@/components/Blog";
import Concursos from "@/components/Concursos";
import Contato from "@/components/Contato";
import Depoimentos from "@/components/Depoimentos";
import Estatisticas from "@/components/Estatisticas";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Loja from "@/components/Loja";
import Mentoria from "@/components/Mentoria";
import Vagas from "@/components/Vagas";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import AdminPanel from "@/components/admin/AdminPanel";
import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";

export default function App() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchCity, setSearchCity] = useState("Todas");
  const [isAdmin, setIsAdmin] = useState(window.location.hash === "#admin");

  useEffect(() => {
    function onHashChange() {
      setIsAdmin(window.location.hash === "#admin");
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleSearch = (keyword: string, city: string) => {
    setSearchKeyword(keyword);
    setSearchCity(city);
  };

  if (isAdmin) {
    return (
      <>
        <AdminPanel />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero onSearch={handleSearch} />
        <Vagas initialKeyword={searchKeyword} initialCity={searchCity} />
        <Estatisticas />
        <Avaliador />
        <Loja />
        <Concursos />
        <Blog />
        <Depoimentos />
        <Mentoria />
        <Contato />
      </main>
      <Footer />
      <WhatsAppFloat />
      <Toaster />
    </div>
  );
}
