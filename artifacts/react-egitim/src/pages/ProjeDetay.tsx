import { Link, useParams } from "wouter";
import { ArrowLeft, BadgeCheck, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { PROJECTS, getProjectById } from "@/data/projects";

type RouteParams = {
  id?: string;
};

export function ProjeDetay() {
  const params = useParams() as RouteParams;
  const projectId = Number(params.id);
  const project = Number.isFinite(projectId) ? getProjectById(projectId) : undefined;

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 max-w-3xl">
          <div className="rounded-2xl border bg-card p-8 shadow-sm text-center space-y-4">
            <h1 className="text-3xl font-bold">Proje bulunamadı</h1>
            <p className="text-muted-foreground">
              Aradığınız proje henüz eklenmemiş olabilir ya da bağlantı hatalı olabilir.
            </p>
            <Button asChild>
              <Link href="/projeler">Projeler sayfasına dön</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <Button asChild variant="outline">
            <Link href="/projeler">
              <ArrowLeft className="h-4 w-4" />
              Projelere dön
            </Link>
          </Button>
          <span className={"text-xs font-bold text-white px-3 py-1 rounded-full " + project.zorlukRenk}>
            {project.zorluk} seviye
          </span>
        </div>

        <section className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-3xl border bg-card p-8 shadow-sm">
            <div className="flex flex-wrap items-start gap-4 justify-between mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-2">Proje Detayı</p>
                <h1 className="text-4xl font-bold">{project.ad}</h1>
              </div>
              <div className="rounded-2xl bg-primary/10 text-primary px-4 py-3 flex items-center gap-2 font-medium">
                <Sparkles className="h-4 w-4" />
                Canlı örnek sayfa
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-8 mb-8">{project.ozet}</p>

            <div className="grid gap-4 md:grid-cols-3 mb-8">
              {project.etiketler.map((tag) => (
                <div key={tag} className="rounded-2xl border bg-muted/40 px-4 py-3 text-sm font-medium">
                  {tag}
                </div>
              ))}
            </div>

            <div className="rounded-2xl border bg-background p-6">
              <h2 className="text-xl font-semibold mb-3">Bu projede ne yapacaksın?</h2>
              <p className="text-muted-foreground leading-7 mb-4">{project.aciklama}</p>
              <ul className="space-y-3">
                {project.ogrenmeHedefleri.map((goal) => (
                  <li key={goal} className="flex items-start gap-3 text-sm">
                    <BadgeCheck className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Proje Özeti</h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Seviye</span>
                  <span className="font-medium">{project.zorluk}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Parça sayısı</span>
                  <span className="font-medium">{project.etiketler.length} konu</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Toplam proje</span>
                  <span className="font-medium">{PROJECTS.length}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Benzer Projeler</h2>
              <div className="space-y-3">
                {PROJECTS.filter((item) => item.id !== project.id).slice(0, 3).map((item) => (
                  <Button key={item.id} asChild variant="outline" className="w-full justify-start">
                    <Link href={`/projeler/${item.id}`}>{item.ad}</Link>
                  </Button>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}