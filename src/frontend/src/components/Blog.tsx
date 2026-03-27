import { Button } from "@/components/ui/button";
import { BLOG_POSTS } from "@/data/mockData";
import { useActor } from "@/hooks/useActor";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface BlogDisplay {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

function mapMockToDisplay(post: (typeof BLOG_POSTS)[0]): BlogDisplay {
  return {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    readTime: post.readTime,
    image: post.image,
  };
}

export default function Blog() {
  const { actor } = useActor();
  const [posts, setPosts] = useState<BlogDisplay[]>(
    BLOG_POSTS.map(mapMockToDisplay),
  );

  useEffect(() => {
    async function load() {
      if (!actor) return;
      try {
        const list = await actor.getBlogPosts();
        if (list && list.length > 0) {
          const mapped: BlogDisplay[] = list.map((p) => ({
            id: p.id,
            title: p.title,
            excerpt: p.summary,
            category: p.tags[0] ?? "Blog",
            date: new Date(Number(p.createdAt) / 1_000_000).toLocaleDateString(
              "pt-BR",
            ),
            readTime: "5 min",
            image: p.imageUrl || "/assets/generated/blog-default.jpg",
          }));
          setPosts(mapped);
        }
      } catch {
        // keep mockData
      }
    }
    load();
  }, [actor]);

  return (
    <section id="blog" className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            MERCADO &amp; TRABALHO
          </h2>
          <p className="text-muted-foreground">
            Conteúdo para ajudar você na sua jornada profissional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <article
              key={post.id}
              className="bg-card rounded-xl overflow-hidden shadow-card border border-border card-hover"
              data-ocid={`blog.item.${i + 1}`}
            >
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {post.category}
                </span>
                <h3 className="font-semibold text-base mt-2 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <a
                    href="#blog"
                    className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all"
                    data-ocid="blog.link"
                  >
                    Ler <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
            data-ocid="blog.secondary_button"
          >
            Ver todos os artigos <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
