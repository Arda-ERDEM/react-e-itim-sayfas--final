import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/data/projects";

export function Projeler() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Uygulamalı Projeler</h1>
          <p className="text-muted-foreground text-lg">Öğrendiklerinizi pekiştirmek için gerçek dünya projeleri geliştirin.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PROJECTS.map((p) => (
            <div key={p.id} className="border bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-xl">{p.ad}</h3>
                <span className={"text-xs font-bold text-white px-2 py-1 rounded " + p.zorlukRenk}>{p.zorluk}</span>
              </div>
              <p className="text-muted-foreground mb-6 flex-1">{p.aciklama}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {p.etiketler.map((t) => (
                  <span key={t} className="bg-muted text-xs px-2 py-1 rounded-md border">{t}</span>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/projeler/${p.id}`}>Projeyi Gör</Link>
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}