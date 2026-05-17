import { Navbar } from "@/components/layout/Navbar";
import { LessonSection } from "@/components/odev/LessonSection";
import { TopicTabs, type TopicItem } from "@/components/odev/TopicTabs";
import { InteractiveQuiz } from "@/components/odev/InteractiveQuiz";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TOPICS: TopicItem[] = [
  {
    id: "component",
    label: "Fonksiyonel Bileşen",
    summary:
      "React tarafında modern yaklaşım fonksiyonel bileşendir. Props tipleri ile birlikte yazıldığında hem okunabilirlik hem güvenlik artar.",
    code: `interface WelcomeProps {
  name: string;
  level: "beginner" | "intermediate" | "advanced";
}

export function Welcome({ name, level }: WelcomeProps) {
  return (
    <section>
      <h2>Merhaba {name}</h2>
      <p>Seviye: {level}</p>
    </section>
  );
}`,
    highlights: [
      "Props arayüzü ile bileşenin beklediği veri net tanımlanır.",
      "Birlik (union) tipleri ile sadece izin verilen değerler geçilir.",
      "Fonksiyonel bileşenler Hook kullanımı için idealdir.",
    ],
  },
  {
    id: "state",
    label: "State ve Olay",
    summary:
      "useState ile bileşen içinde veri tutulur, event handler ile kullanıcı etkileşimi yakalanır.",
    code: `import { useState } from "react";

export function ClickCounter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((prev) => prev + 1)}>
      Tıklama: {count}
    </button>
  );
}`,
    highlights: [
      "State güncellemesi için callback formu güvenlidir.",
      "UI state değiştiğinde otomatik yeniden render edilir.",
      "Etkileşimli arayüzler küçük state parçalarıyla kurulur.",
    ],
  },
  {
    id: "mapping",
    label: "Listeleme",
    summary:
      "Array verisini TSX içinde map ile render ederken key kullanmak zorunludur.",
    code: `interface Lesson {
  id: number;
  title: string;
}

const lessons: Lesson[] = [
  { id: 1, title: "JSX" },
  { id: 2, title: "Props" },
  { id: 3, title: "State" },
];

export function LessonList() {
  return (
    <ul>
      {lessons.map((lesson) => (
        <li key={lesson.id}>{lesson.title}</li>
      ))}
    </ul>
  );
}`,
    highlights: [
      "Arayüz ile dizi elemanlarının şekli belirlenir.",
      "key prop performans ve doğru güncelleme için gereklidir.",
      "Liste render etmek React uygulamalarında çok sık kullanılır.",
    ],
  },
];

export function ReactTsxOdev() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <header className="border-b border-border/60 bg-gradient-to-b from-emerald-500/15 via-background to-background">
        <div className="container mx-auto px-4 py-14 sm:px-8 md:py-20">
          <p className="mb-3 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
            React + TypeScript Ödev Sayfası
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-5xl">
            Modern React Arayüzü: Bileşen Tabanlı ve Tip Güvenli Geliştirme
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            Bu sayfa, React TSX ile bir eğitim arayüzünün nasıl kurulacağını örnekler. Başlık, konu anlatımı, kod örnekleri,
            etkileşimli alan ve footer yapısı tek sayfada bir araya getirilmiştir.
          </p>
        </div>
      </header>

      <main className="container mx-auto space-y-8 px-4 py-10 sm:px-8 md:space-y-10 md:py-12">
        <LessonSection
          title="1) Konu Anlatımı"
          subtitle="React, yeniden kullanılabilir bileşen mantığı ile büyük arayüzleri küçük parçalara ayırır."
          tone="emerald"
        >
          <p>
            React ile geliştirirken sayfayı tek parça yazmak yerine bileşenlere böleriz. Her bileşen bir işi üstlenir ve props ile
            dışarıdan veri alır. TypeScript ise bu verinin tipini doğrulayarak hataları geliştirme aşamasında yakalar.
          </p>
          <p>
            Bu yaklaşım kodu bakım yapılabilir hale getirir: bir bileşende değişiklik yaptığında sistemin geri kalanı daha az etkilenir.
            Aynı bileşen farklı sayfalarda tekrar kullanılabilir.
          </p>
        </LessonSection>

        <LessonSection
          title="2) Kod Örnekleri"
          subtitle="Fonksiyonel bileşen, state yönetimi ve liste render etme örneklerini sekmelerde inceleyebilirsin."
          tone="sky"
        >
          <TopicTabs items={TOPICS} />
        </LessonSection>

        <LessonSection
          title="3) Görsel Anlatım"
          subtitle="Aşağıdaki basit diyagram, veri akışını ve yeniden render döngüsünü özetler."
          tone="amber"
        >
          <Card className="border-amber-500/30">
            <CardHeader>
              <CardTitle>Bileşen Akış Diyagramı</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <svg
                  viewBox="0 0 760 160"
                  className="h-40 min-w-[700px] w-full"
                  role="img"
                  aria-label="React veri akış diyagramı"
                >
                  <rect x="20" y="45" width="190" height="70" rx="14" fill="rgb(16 185 129 / 0.15)" stroke="rgb(16 185 129)" />
                  <text x="115" y="85" textAnchor="middle" className="fill-foreground" style={{ fontSize: "15px", fontWeight: 600 }}>
                    Parent Component
                  </text>

                  <rect x="285" y="45" width="190" height="70" rx="14" fill="rgb(56 189 248 / 0.15)" stroke="rgb(56 189 248)" />
                  <text x="380" y="85" textAnchor="middle" className="fill-foreground" style={{ fontSize: "15px", fontWeight: 600 }}>
                    Child Props
                  </text>

                  <rect x="550" y="45" width="190" height="70" rx="14" fill="rgb(245 158 11 / 0.15)" stroke="rgb(245 158 11)" />
                  <text x="645" y="85" textAnchor="middle" className="fill-foreground" style={{ fontSize: "15px", fontWeight: 600 }}>
                    UI Render
                  </text>

                  <line x1="210" y1="80" x2="285" y2="80" stroke="currentColor" strokeWidth="2" />
                  <polygon points="285,80 276,75 276,85" fill="currentColor" />

                  <line x1="475" y1="80" x2="550" y2="80" stroke="currentColor" strokeWidth="2" />
                  <polygon points="550,80 541,75 541,85" fill="currentColor" />
                </svg>
              </div>
            </CardContent>
          </Card>
        </LessonSection>

        <LessonSection
          title="4) Etkileşimli Bileşen"
          subtitle="Kullanıcı etkileşimi için çoktan seçmeli mini bir örnek aşağıda yer alır."
          tone="emerald"
        >
          <InteractiveQuiz
            question="React tarafında liste render ederken neden key prop kullanılır?"
            choices={[
              {
                id: "a",
                text: "Sadece CSS sınıfı vermek için",
                isCorrect: false,
                explanation: "Yanlış. key, CSS için değil React'in elemanları takip etmesi için kullanılır.",
              },
              {
                id: "b",
                text: "DOM güncellemelerini doğru ve performanslı yapmak için",
                isCorrect: true,
                explanation: "Doğru. key sayesinde React hangi öğenin değiştiğini anlayıp doğru günceller.",
              },
              {
                id: "c",
                text: "TypeScript derleyicisini hızlandırmak için",
                isCorrect: false,
                explanation: "Yanlış. key TypeScript derleyicisini etkilemez.",
              },
              {
                id: "d",
                text: "Sadece test dosyalarında gereklidir",
                isCorrect: false,
                explanation: "Yanlış. key üretim kodunda da kritik öneme sahiptir.",
              },
            ]}
          />
        </LessonSection>
      </main>

      <footer className="border-t border-border/70 bg-muted/20">
        <div className="container mx-auto px-4 py-8 sm:px-8">
          <p className="text-sm font-semibold">React TSX Eğitim Sayfası</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Hazırlayan: Öğrenci Çalışması | Amaç: React + TypeScript ile modern, responsive ve tip güvenli arayüz geliştirmek.
          </p>
        </div>
      </footer>
    </div>
  );
}
