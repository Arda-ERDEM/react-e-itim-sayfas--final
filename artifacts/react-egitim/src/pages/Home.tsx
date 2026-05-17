import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Code, BookOpen, Layout, Globe, Smartphone, Heart, Terminal, Users, Sparkles, CheckCircle2 } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

function Counter({ end, suffix = "" }: { end: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const duration = 2000;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end]);
  
  return <span>{count}{suffix}</span>;
}

const LESSONS = [
  { path: "/docs/giris", title: "Giriş: React Nedir?", icon: BookOpen, color: "border-red-500", desc: "React'in temelleri" },
  { path: "/docs/kurulum", title: "Kurulum", icon: Terminal, color: "border-orange-500", desc: "Vite ile proje oluşturma" },
  { path: "/docs/jsx", title: "JSX'i Anlamak", icon: Code, color: "border-yellow-500", desc: "JavaScript içinde HTML" },
  { path: "/docs/componentler", title: "Componentler", icon: Layout, color: "border-green-500", desc: "UI yapı taşları" },
  { path: "/docs/state", title: "State (useState)", icon: Sparkles, color: "border-teal-500", desc: "Durum yönetimi" },
  { path: "/docs/effect", title: "Effects (useEffect)", icon: Globe, color: "border-blue-500", desc: "Yan etkiler" },
  { path: "/docs/events", title: "Olay Yönetimi", icon: Smartphone, color: "border-indigo-500", desc: "Kullanıcı etkileşimi" },
  { path: "/docs/listeler", title: "Listeler", icon: Layout, color: "border-violet-500", desc: "Dizileri render etme" },
  { path: "/docs/formlar", title: "Formlar", icon: Code, color: "border-purple-500", desc: "Veri alma" },
  { path: "/docs/hooks", title: "Diğer Hooklar", icon: Terminal, color: "border-fuchsia-500", desc: "useRef, vb." },
  { path: "/docs/router", title: "React Router", icon: Globe, color: "border-pink-500", desc: "Sayfa geçişleri" },
];

export function Home() {
  const { isCompleted } = useProgress();
  const [activeTab, setActiveTab] = useState(0);

  const codeTabs = [
    { title: "Merhaba", code: "function App() {\n  return <h1>Merhaba Dünya!</h1>;\n}", result: <h1 className="text-2xl font-bold">Merhaba Dünya!</h1> },
    { title: "Sayaç", code: "const [c, setC] = useState(0);\n<button onClick={() => setC(c+1)}>\n  Tıkla: {c}\n</button>", result: <Button>Tıkla: 0</Button> },
    { title: "Liste", code: "const items = ['Elma', 'Armut'];\nitems.map(i => <li key={i}>{i}</li>)", result: <ul className="list-disc pl-4"><li>Elma</li><li>Armut</li></ul> }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-4 text-center overflow-hidden relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-500/20 via-background to-background"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              React Öğrenmenin <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-violet-500">
                En Renkli
              </span> Yolu
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              ReactLearn, Türk geliştiriciler için hazırlanmış, önyargısız, bol örnekli ve tamamen ücretsiz bir React eğitim platformudur.
            </p>
            <div className="flex justify-center gap-4 flex-wrap mb-12">
              <Button size="lg" asChild className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0">
                <Link href="/docs/giris" data-testid="link-start-learning">
                  Derslere Başla
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/projeler">
                  Projeleri Gör
                </Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <Link href="/hakkinda">
                  Hakkımızda
                </Link>
              </Button>
            </div>
            <div className="flex justify-center gap-8 text-2xl font-bold bg-muted/50 p-6 rounded-2xl max-w-xl mx-auto">
              <div><Counter end={45} /><span className="block text-sm font-normal text-muted-foreground">Ders</span></div>
              <div><Counter end={12} /><span className="block text-sm font-normal text-muted-foreground">Konu</span></div>
              <div><Counter end={150} suffix="+" /><span className="block text-sm font-normal text-muted-foreground">Örnek</span></div>
            </div>
          </motion.div>
        </section>

        {/* Canlı Kod Demo Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Canlı Kod Deneyimi</h2>
            <div className="border rounded-xl overflow-hidden shadow-xl bg-card">
              <div className="flex border-b bg-muted">
                {codeTabs.map((tab, idx) => (
                  <button key={idx} onClick={() => setActiveTab(idx)} className={"px-4 py-2 font-medium " + (activeTab === idx ? "bg-background border-b-2 border-primary" : "text-muted-foreground")}>
                    {tab.title}
                  </button>
                ))}
              </div>
              <div className="grid md:grid-cols-2 min-h-[300px]">
                <div className="bg-[#1e1e1e] p-6 text-white font-mono text-sm overflow-auto">
                  <pre>{codeTabs[activeTab].code}</pre>
                </div>
                <div className="p-6 flex items-center justify-center bg-background">
                  {codeTabs[activeTab].result}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Müfredat Grid Section */}
        <section className="py-20 bg-muted/30 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Müfredatımız</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {LESSONS.map((lesson) => (
                <Link key={lesson.path} href={lesson.path} className={"block p-6 rounded-xl bg-card border shadow-sm transition-transform hover:-translate-y-1 border-l-4 " + lesson.color}>
                  <div className="flex justify-between items-start mb-4">
                    <lesson.icon className="w-8 h-8 text-muted-foreground" />
                    {isCompleted(lesson.path) && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{lesson.title}</h3>
                  <p className="text-sm text-muted-foreground">{lesson.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Neden ReactLearn Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12">Neden ReactLearn?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Ücretsiz ve Açık", desc: "Eğitim herkes için ücretsiz olmalı.", icon: Heart },
                { title: "Gökkuşağı Tasarım", desc: "Sıkıcı siyah-beyaz dökümanlara son.", icon: Sparkles },
                { title: "Mobil Uyumlu", desc: "Her yerde, her cihazda öğrenin.", icon: Smartphone },
                { title: "Canlı Örnekler", desc: "Okuyarak değil, deneyerek öğrenin.", icon: Code },
                { title: "Türkçe İçerik", desc: "Kendi anadilinizde net anlatım.", icon: BookOpen },
                { title: "Topluluk Desteği", desc: "Birlikte öğreniyoruz.", icon: Users }
              ].map((feature, i) => (
                <div key={i} className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-all group">
                  <feature.icon className="w-10 h-10 mb-4 text-violet-500 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* İstatistikler */}
        <section className="py-20 bg-muted/50 px-4 text-center">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-red-500"><div className="text-4xl font-bold"><Counter end={11} /></div><div className="text-muted-foreground">Ders</div></div>
              <div className="text-orange-500"><div className="text-4xl font-bold"><Counter end={150} suffix="+" /></div><div className="text-muted-foreground">Örnek</div></div>
              <div className="text-blue-500"><div className="text-4xl font-bold"><Counter end={12} /></div><div className="text-muted-foreground">Konu</div></div>
              <div className="text-green-500"><div className="text-4xl font-bold"><Counter end={100} suffix="%" /></div><div className="text-muted-foreground">Ücretsiz</div></div>
            </div>
          </div>
        </section>

        {/* Öğrenme Yolu */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-12">Öğrenme Yolu</h2>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
              {LESSONS.map((l, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={"px-4 py-2 rounded-full border-2 bg-card " + l.color}>{l.title}</div>
                  {i < LESSONS.length - 1 && <span className="text-muted-foreground">→</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="py-12 border-t text-muted-foreground text-sm relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-violet-500"></div>
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl text-foreground mb-4">ReactLearn</h3>
            <p>Türkiye'nin en renkli React eğitim platformu.</p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2">
              <li><Link href="/docs/giris" className="hover:text-foreground">Başlangıç</Link></li>
              <li><Link href="/projeler" className="hover:text-foreground">Projeler</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4">İletişim</h4>
            <p>iletisim@reactlearn.dev</p>
          </div>
        </div>
      </footer>
    </div>
  );
}