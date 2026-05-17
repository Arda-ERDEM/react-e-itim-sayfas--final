import { CheckCircle2, Trophy, ArrowLeft, ArrowRight, PlayCircle, Star } from "lucide-react";
import { Link } from "wouter";
import { useQuiz } from "@/hooks/useQuiz";
import { Button } from "@/components/ui/button";

const LESSONS = [
  { key: "giris", title: "Giriş: React Nedir?" },
  { key: "kurulum", title: "Kurulum ve Başlangıç" },
  { key: "jsx", title: "JSX'i Anlamak" },
  { key: "componentler", title: "Componentler" },
  { key: "state", title: "State (useState)" },
  { key: "effect", title: "Effects (useEffect)" },
  { key: "events", title: "Olay Yönetimi (Events)" },
  { key: "listeler", title: "Listeler ve Keyler" },
  { key: "formlar", title: "Formlar" },
  { key: "hooks", title: "Diğer Hooklar" },
  { key: "router", title: "React Router" },
];

export function Ilerleme() {
  const { getScore, hasPassedAll } = useQuiz();
  
  const passedCount = LESSONS.filter(l => (getScore(l.key) || 0) >= 70).length;
  const progressPercentage = Math.round((passedCount / LESSONS.length) * 100);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Geri dön
          </Link>
        </Button>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">Öğrenme İlerleme Durumun</h1>
        <p className="text-xl text-muted-foreground">React temellerini ne kadar iyi anladığını takip et.</p>
      </div>

      <div className="mb-12">
        <div className="flex justify-between mb-2">
          <span className="font-semibold text-lg">Toplam İlerleme</span>
          <span className="font-bold">{passedCount} / {LESSONS.length} Ders ({progressPercentage}%)</span>
        </div>
        <div className="h-4 w-full bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-1000"
            style={{ width: progressPercentage + '%' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {LESSONS.map((lesson) => {
          const score = getScore(lesson.key);
          const hasAttempted = score !== null;
          
          let badgeClass = "bg-muted text-muted-foreground";
          let badgeText = "Henüz denenmedi";
          
          if (hasAttempted) {
            if (score >= 90) { badgeClass = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"; badgeText = "Mükemmel (" + score + ")"; }
            else if (score >= 70) { badgeClass = "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500"; badgeText = "Geçti (" + score + ")"; }
            else { badgeClass = "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"; badgeText = "Tekrar Çalış (" + score + ")"; }
          }

          return (
            <div key={lesson.key} className="p-5 border rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">{lesson.title}</h3>
                <div className={"inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-4 " + badgeClass}>
                  {badgeText}
                </div>
              </div>
              <Button asChild variant="outline" className="w-full mt-4 justify-between group">
                <Link href={"/docs/" + lesson.key}>
                  Derse Git
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          );
        })}
      </div>

      <div className="p-8 border-2 rounded-2xl bg-gradient-to-br from-background to-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-blue-500/10" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <Trophy className={"w-16 h-16 mb-4 " + (hasPassedAll() ? "text-yellow-500" : "text-muted-foreground")} />
          <h2 className="text-3xl font-bold mb-4">Sertifika</h2>
          
          {hasPassedAll() ? (
            <div className="w-full max-w-2xl bg-white dark:bg-zinc-950 border-4 border-double border-yellow-400 p-8 rounded-xl shadow-2xl relative">
              <div className="absolute top-4 left-4 text-yellow-500"><Star fill="currentColor" /></div>
              <div className="absolute top-4 right-4 text-yellow-500"><Star fill="currentColor" /></div>
              <div className="absolute bottom-4 left-4 text-yellow-500"><Star fill="currentColor" /></div>
              <div className="absolute bottom-4 right-4 text-yellow-500"><Star fill="currentColor" /></div>
              
              <h3 className="text-2xl font-serif mb-6 mt-4 text-foreground">ReactLearn Tamamlama Sertifikası</h3>
              <p className="text-xl text-muted-foreground mb-8">
                Bu belge ile React Temellerini başarıyla tamamladın!
              </p>
              <div className="text-sm text-muted-foreground font-mono">
                Tarih: {new Date().toLocaleDateString('tr-TR')}
              </div>
              <Button onClick={() => window.print()} className="mt-8">Sertifikayı Yazdır</Button>
            </div>
          ) : (
            <div className="text-xl text-muted-foreground">
              Henüz tüm quizleri geçmedin. Sertifikanı almak için tüm derslerde %70 başarıya ulaş!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}