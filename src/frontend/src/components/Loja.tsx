import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/data/mockData";
import { useActor } from "@/hooks/useActor";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";

interface ProductDisplay {
  id: string;
  title: string;
  author: string;
  price: string;
  image: string;
  buyUrl: string;
  badge?: string;
}

function mockToDisplay(p: (typeof PRODUCTS)[0]): ProductDisplay {
  return {
    id: p.id,
    title: p.title,
    author: p.author,
    price: p.price,
    image: p.image,
    buyUrl: p.buyUrl,
    badge: p.badge,
  };
}

export default function Loja() {
  const { actor } = useActor();
  const [products, setProducts] = useState<ProductDisplay[]>(
    PRODUCTS.map(mockToDisplay),
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function load() {
      if (!actor) return;
      try {
        const list = await actor.getProducts();
        if (list && list.length > 0) {
          const mapped: ProductDisplay[] = list
            .filter((p) => p.available)
            .map((p) => ({
              id: p.id,
              title: p.name,
              author: p.category,
              price: `R$ ${p.price.toFixed(2).replace(".", ",")}`,
              image: p.imageUrl || "/assets/generated/product-default.jpg",
              buyUrl: p.paymentLink || "#",
            }));
          if (mapped.length > 0) setProducts(mapped);
        }
      } catch {
        // keep mockData
      }
    }
    load();
  }, [actor]);

  const total = products.length;

  const prev = () => setCurrentIndex((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setCurrentIndex((i) => (i === total - 1 ? 0 : i + 1));

  const getVisible = (perPage: number): ProductDisplay[] => {
    const items: ProductDisplay[] = [];
    for (let i = 0; i < perPage; i++) {
      items.push(products[(currentIndex + i) % total]);
    }
    return items;
  };

  return (
    <section id="loja" className="py-16 px-4" style={{ background: "#f8f4f2" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2
            className="text-3xl font-bold mb-2"
            style={{ fontStyle: "italic" }}
          >
            <span style={{ color: "#1a1a1a" }}>BOM</span>
            <span style={{ color: "#d7350d" }}>DIA</span>
            <span style={{ color: "#1a1a1a" }}>SEGUNDA</span>
            <span style={{ color: "#1a1a1a" }}> SHOPPING</span>
          </h2>
          <p className="text-muted-foreground">
            E-books, cursos e produtos para impulsionar sua carreira
          </p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            aria-label="Anterior"
            data-ocid="loja.pagination_prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            aria-label="Próximo"
            data-ocid="loja.pagination_next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="overflow-hidden">
            <div className="grid grid-cols-1 sm:hidden gap-6 max-w-xs mx-auto">
              {getVisible(1).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="hidden sm:grid md:hidden grid-cols-2 gap-6 max-w-2xl mx-auto">
              {getVisible(2).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="hidden md:grid grid-cols-4 gap-6 max-w-6xl mx-auto">
              {getVisible(4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {products.map((product, i) => (
            <button
              type="button"
              key={product.id}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
              }`}
              aria-label={`Ir para produto ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: ProductDisplay }) {
  return (
    <div
      className="bg-card rounded-xl overflow-hidden shadow-card border border-border card-hover flex flex-col"
      data-ocid={`loja.item.${product.id}`}
    >
      <div className="aspect-[3/4] overflow-hidden bg-muted relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full leading-tight text-center max-w-[90%] flex items-center gap-1">
            <BookOpen className="w-3 h-3 shrink-0" />
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-sm text-foreground mb-1 line-clamp-2 flex-1">
          {product.title}
        </h3>
        <p className="text-xs text-muted-foreground mb-3">{product.author}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-primary">{product.price}</span>
          <Button
            size="sm"
            className="bg-primary text-white hover:bg-primary/90"
            asChild
            data-ocid="loja.primary_button"
          >
            <a href={product.buyUrl} target="_blank" rel="noopener noreferrer">
              <ShoppingCart className="w-3.5 h-3.5 mr-1" /> Comprar
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
