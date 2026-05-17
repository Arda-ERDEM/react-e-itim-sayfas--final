import { Link, useLocation } from "wouter";
import { Navbar } from "./Navbar";
import { useProgress } from "@/hooks/useProgress";
import { useEffect } from "react";
import { CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const LESSON_SECTIONS = [
  {
    title: "Temel Konular",
    color: "text-green-600 dark:text-green-400",
    lessons: [
      { path: "/docs/giris", title: "Giriş: React Nedir?" },
      { path: "/docs/kurulum", title: "Kurulum ve Başlangıç" },
      { path: "/docs/jsx", title: "JSX'i Anlamak" },
      { path: "/docs/componentler", title: "Componentler" },
      { path: "/docs/state", title: "State (useState)" },
      { path: "/docs/effect", title: "Effects (useEffect)" },
      { path: "/docs/events", title: "Olay Yönetimi (Events)" },
      { path: "/docs/listeler", title: "Listeler ve Keyler" },
      { path: "/docs/formlar", title: "Formlar" },
      { path: "/docs/hooks", title: "Diğer Hooklar" },
      { path: "/docs/router", title: "React Router" },
    ]
  },
  {
    title: "İleri Seviye",
    color: "text-orange-600 dark:text-orange-400",
    lessons: [
      { path: "/docs/typescript", title: "TypeScript ile React" },
      { path: "/docs/api", title: "API'den Veri Çekme" },
      { path: "/docs/custom-hooks", title: "Custom Hook Yazımı" },
      { path: "/docs/context", title: "Context API" },
      { path: "/docs/performans", title: "Performans Optimizasyonu" },
      { path: "/docs/ileri", title: "İleri Seviye Konular" },
      { path: "/docs/stil", title: "Stil Yönetimi" },
      { path: "/docs/form-validasyon", title: "Form Validasyonu" },
    ]
  }
];

const LESSONS = LESSON_SECTIONS.flatMap(section => section.lessons);

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { isCompleted, markCompleted } = useProgress();

  useEffect(() => {
    markCompleted(location);
  }, [location, markCompleted]);

  const currentIndex = LESSONS.findIndex(l => l.path === location);
  const prevLesson = currentIndex > 0 ? LESSONS[currentIndex - 1] : null;
  const nextLesson = currentIndex < LESSONS.length - 1 ? LESSONS[currentIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 mx-auto px-4 sm:px-8 py-8">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 pr-6 lg:py-8 border-r">
            <div className="w-full">
              {LESSON_SECTIONS.map((section, idx) => (
                <div key={idx} className="mb-6">
                  <h4 className={`mb-2 px-2 text-sm font-semibold ${section.color}`}>
                    {section.title}
                  </h4>
                  <div className="grid grid-flow-row auto-rows-max text-sm">
                    {section.lessons.map((lesson) => {
                      const isActive = location === lesson.path;
                      const completed = isCompleted(lesson.path);
                      return (
                        <Link
                          key={lesson.path}
                          href={lesson.path}
                          className={`flex w-full items-center justify-between rounded-md border border-transparent px-2 py-1.5 hover:underline ${
                            isActive 
                              ? "bg-muted font-medium text-foreground" 
                              : "text-muted-foreground"
                          }`}
                          data-testid={`link-sidebar-${lesson.path.replace('/docs/', '')}`}
                        >
                          {lesson.title}
                          {completed && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </aside>
        
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            {children}
            
            <div className="mt-12 flex flex-row items-center justify-between pt-6 border-t border-border">
              {prevLesson ? (
                <Button variant="outline" asChild className="border-orange-500/20 hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400">
                  <Link href={prevLesson.path} data-testid="link-prev">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Önceki: {prevLesson.title}
                  </Link>
                </Button>
              ) : <div />}
              
              {nextLesson ? (
                <Button variant="outline" asChild className="border-blue-500/20 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                  <Link href={nextLesson.path} data-testid="link-next">
                    Sonraki: {nextLesson.title}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : <div />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}