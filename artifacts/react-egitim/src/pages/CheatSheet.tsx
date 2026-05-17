import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type CheatSheetSnippet = {
  desc: string;
  code?: string;
};

type CheatSheetSection = {
  title: string;
  color: string;
  snippets: CheatSheetSnippet[];
};

const CHEAT_SHEET_DATA: CheatSheetSection[] = [
  {
    title: "useState",
    color: "from-blue-500 to-cyan-500",
    snippets: [
      {
        desc: "Temel Kullanım",
        code: `const [sayac, setSayac] = useState(0);\n// Güncelleme\nsetSayac(sayac + 1);`
      },
      {
        desc: "Obje State Güncelleme",
        code: `const [kullanici, setKullanici] = useState({ ad: '', yas: 0 });\nsetKullanici({ ...kullanici, yas: 25 });`
      }
    ]
  },
  {
    title: "useEffect",
    color: "from-green-500 to-emerald-500",
    snippets: [
      {
        desc: "Sadece İlk Render",
        code: `useEffect(() => {\n  console.log("Sadece 1 kere çalışır");\n}, []);`
      },
      {
        desc: "Bağımlılığa Göre",
        code: `useEffect(() => {\n  console.log("id değişti", id);\n}, [id]);`
      },
      {
        desc: "Cleanup (Temizlik)",
        code: `useEffect(() => {\n  const timer = setInterval(() => {}, 1000);\n  return () => clearInterval(timer);\n}, []);`
      }
    ]
  },
  {
    title: "useRef",
    color: "from-purple-500 to-indigo-500",
    snippets: [
      {
        desc: "DOM Elemanına Erişim",
        code: `const inputRef = useRef<HTMLInputElement>(null);\n// Odaklanmak için:\ninputRef.current?.focus();`
      },
      {
        desc: "Değer Saklama (Re-render Tetiklemez)",
        code: `const timerRef = useRef(0);\ntimerRef.current = 5; // Bileşen render edilmez`
      }
    ]
  },
  {
    title: "useContext",
    color: "from-yellow-400 to-orange-500",
    snippets: [
      {
        desc: "Oluşturma & Sağlayıcı",
        code: `const TemaContext = createContext('light');\n\n<TemaContext.Provider value="dark">\n  <App />\n</TemaContext.Provider>`
      },
      {
        desc: "Tüketim",
        code: `const tema = useContext(TemaContext);`
      }
    ]
  },
  {
    title: "useReducer",
    color: "from-pink-500 to-rose-500",
    snippets: [
      {
        desc: "Kullanım",
        code: `const [state, dispatch] = useReducer(reducer, initialState);\ndispatch({ type: 'ARTTIR', payload: 1 });`
      }
    ]
  },
  {
    title: "useCallback",
    color: "from-red-500 to-orange-500",
    snippets: [
      {
        desc: "Fonksiyonu Önbelleğe Alma",
        code: `const islemYap = useCallback(() => {\n  console.log(deger);\n}, [deger]);`
      }
    ]
  },
  {
    title: "useMemo",
    color: "from-teal-400 to-emerald-600",
    snippets: [
      {
        desc: "Değeri Önbelleğe Alma",
        code: `const agirHesap = useMemo(() => {\n  return hesapla(deger);\n}, [deger]);`
      }
    ]
  },
  {
    title: "JSX Kuralları",
    color: "from-cyan-500 to-blue-600",
    snippets: [
      {
        desc: "1. Tek kök eleman dönmeli\n2. Tüm etiketler kapanmalı (<img />)\n3. class yerine className\n4. JavaScript ifadeleri { } içinde yazılır"
      }
    ]
  },
  {
    title: "Props",
    color: "from-indigo-400 to-purple-600",
    snippets: [
      {
        desc: "Parçalama (Destructuring) & Varsayılanlar",
        code: `function Buton({ metin, renk = 'mavi' }) {\n  return <button className={renk}>{metin}</button>\n}`
      }
    ]
  },
  {
    title: "Event Handlers",
    color: "from-violet-500 to-fuchsia-500",
    snippets: [
      {
        desc: "Tıklama ve Form",
        code: `<button onClick={(e) => islem(e)}>Tıkla</button>\n<form onSubmit={(e) => e.preventDefault()}>\n<input onChange={(e) => setVal(e.target.value)} />`
      }
    ]
  },
  {
    title: "Koşullu Render (Conditional)",
    color: "from-orange-400 to-red-500",
    snippets: [
      {
        desc: "&& Operatörü",
        code: `{yukleniyor && <Spinner />}`
      },
      {
        desc: "Ternary Operatörü",
        code: `{girisYaptiMi ? <Profil /> : <GirisYap />}`
      }
    ]
  },
  {
    title: "Liste Render Etme",
    color: "from-lime-400 to-green-600",
    snippets: [
      {
        desc: "map ve key Kullanımı",
        code: `<ul>\n  {ogeler.map(oge => (\n    <li key={oge.id}>{oge.isim}</li>\n  ))}\n</ul>`
      }
    ]
  },
  {
    title: "fetch + useEffect",
    color: "from-sky-400 to-cyan-600",
    snippets: [
      {
        desc: "API'den Veri Çekme Modeli",
        code: `useEffect(() => {\n  fetch('/api/veri')\n    .then(res => res.json())\n    .then(data => setVeri(data));\n}, []);`
      }
    ]
  },
  {
    title: "Component Types",
    color: "from-fuchsia-400 to-pink-600",
    snippets: [
      {
        desc: "Fonksiyon Bileşen Şablonu",
        code: `export function Kart({ baslik }) {\n  return (\n    <div>{baslik}</div>\n  );\n}`
      }
    ]
  },
  {
    title: "CSS Classes",
    color: "from-gray-600 to-slate-800",
    snippets: [
      {
        desc: "Koşullu Sınıflar (cn)",
        code: `className={cn(\n  "temel-sinif",\n  aktif ? "bg-mavi" : "bg-gri"\n)}`
      }
    ]
  }
];

export function CheatSheet() {
  const [search, setSearch] = useState("");

  const filteredData = CHEAT_SHEET_DATA.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.snippets.some(s => s.desc?.toLowerCase().includes(search.toLowerCase()) || s.code?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
            React Hızlı Başvuru Kılavuzu
          </h1>
          <p className="text-muted-foreground text-lg">
            Sık kullanılan React yapıları, hooklar ve sözdizimi kuralları.
          </p>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Ara (örn: useState, useEffect)..." 
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((section, idx) => (
            <div key={idx} className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col h-full">
              <div className={"h-2 w-full bg-gradient-to-r " + section.color} />
              <div className="p-5 flex-1 flex flex-col gap-4">
                <h3 className="font-semibold text-xl">{section.title}</h3>
                <div className="space-y-4 flex-1">
                  {section.snippets.map((snippet, sIdx) => (
                    <div key={sIdx} className="space-y-2">
                      {snippet.desc && (
                        <p className="text-sm font-medium text-muted-foreground">{snippet.desc}</p>
                      )}
                      {snippet.code && (
                        <pre className="p-3 rounded-md bg-zinc-950 text-zinc-50 text-xs overflow-x-auto whitespace-pre-wrap break-all font-mono leading-relaxed border border-zinc-800">
                          <code>{snippet.code}</code>
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredData.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Aramanızla eşleşen bir sonuç bulunamadı.
          </div>
        )}
      </main>
    </div>
  );
}