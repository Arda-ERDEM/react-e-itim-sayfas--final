import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";

export function Hakkinda() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500">Hakkımızda</h1>
        
        <div className="prose dark:prose-invert max-w-none text-lg">
          <p className="lead text-xl text-muted-foreground mb-8 text-center">
            ReactLearn, Türkiye'deki yazılımcı adaylarının React'i modern ve interaktif bir şekilde öğrenmesi için tasarlandı.
          </p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Misyonumuz</h2>
          <p>Yazılım öğrenmek sıkıcı olmak zorunda değil. Renkler, canlı örnekler ve samimi bir dille, en karmaşık konuları bile anlaşılır kılmayı hedefliyoruz.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4">Teknoloji Yığınımız</h2>
          <ul className="grid grid-cols-2 gap-4 list-none pl-0">
            <li className="bg-card border p-4 rounded-lg flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-blue-400"></span> React
            </li>
            <li className="bg-card border p-4 rounded-lg flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-yellow-400"></span> Vite
            </li>
            <li className="bg-card border p-4 rounded-lg flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-cyan-400"></span> Tailwind CSS
            </li>
            <li className="bg-card border p-4 rounded-lg flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-blue-600"></span> TypeScript
            </li>
          </ul>
        </div>
        
        <div className="mt-16 text-center bg-muted/50 p-8 rounded-2xl border">
          <h2 className="text-2xl font-bold mb-4">Başlamaya Hazır mısın?</h2>
          <p className="mb-6 text-muted-foreground">Hemen ilk derse başla ve kendi React projeni geliştir.</p>
          <Button size="lg" asChild>
            <Link href="/docs/giris">Derslere Başla</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}