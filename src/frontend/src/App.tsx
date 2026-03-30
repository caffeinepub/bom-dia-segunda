import Avaliador from "@/components/Avaliador";
import Blog from "@/components/Blog";
import BlogPostPage from "@/components/BlogPostPage";
import Contato from "@/components/Contato";
import Depoimentos from "@/components/Depoimentos";
import Estatisticas from "@/components/Estatisticas";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Loja from "@/components/Loja";
import Mentoria from "@/components/Mentoria";
import MentoriaInscricao from "@/components/MentoriaInscricao";
import ProdutoDetalhe from "@/components/ProdutoDetalhe";
import PublicarVaga from "@/components/PublicarVaga";
import Vagas from "@/components/Vagas";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import AdminPanel from "@/components/admin/AdminPanel";
import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";

export default function App() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchCity, setSearchCity] = useState("Todas");
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [showMentoriaInscricao, setShowMentoriaInscricao] = useState(false);
  const [blogPostId, setBlogPostId] = useState<string | null>(null);
  const [productId, setProductId] = useState<string | null>(null);

  useEffect(() => {
    function onHashChange() {
      setCurrentHash(window.location.hash);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleSearch = (keyword: string, city: string) => {
    setSearchKeyword(keyword);
    setSearchCity(city);
  };

  if (currentHash === "#admin") {
    return (
      <>
        <AdminPanel />
        <Toaster />
      </>
    );
  }

  if (currentHash === "#publicar-vaga") {
    return (
      <>
        <PublicarVaga />
        <Toaster />
      </>
    );
  }

  if (showMentoriaInscricao) {
    return (
      <>
        <MentoriaInscricao onBack={() => setShowMentoriaInscricao(false)} />
        <Toaster />
      </>
    );
  }

  if (blogPostId) {
    return (
      <>
        <BlogPostPage
          postId={blogPostId}
          onBack={() => setBlogPostId(null)}
          onReadOther={(id) => setBlogPostId(id)}
        />
        <WhatsAppFloat />
        <Toaster />
      </>
    );
  }

  if (productId) {
    return (
      <>
        <ProdutoDetalhe
          productId={productId}
          onBack={() => setProductId(null)}
          onViewOther={(id) => setProductId(id)}
        />
        <WhatsAppFloat />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero
          onSearch={handleSearch}
          onMentoria={() => setShowMentoriaInscricao(true)}
        />
        <Vagas initialKeyword={searchKeyword} initialCity={searchCity} />
        <Estatisticas />
        <Avaliador />
        <Mentoria onInscricao={() => setShowMentoriaInscricao(true)} />
        <Loja onViewProduct={(id) => setProductId(id)} />
        <Blog onReadPost={(id) => setBlogPostId(id)} />
        <Depoimentos />
        <Contato />
      </main>
      <Footer />
      <WhatsAppFloat />
      <Toaster />
    </div>
  );
}
