import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const DICTIONARY_TERMS = [
  { term: "Component", def: "Kullanıcı arayüzünü (UI) oluşturan, bağımsız ve yeniden kullanılabilir kod parçacıklarıdır." },
  { term: "Props", def: "Bileşenler arası veri aktarımını sağlayan sadece okunabilir (read-only) özelliklerdir." },
  { term: "State", def: "Bir bileşenin kendi içinde tuttuğu ve değiştiğinde bileşeni yeniden render eden dinamik veridir." },
  { term: "Hook", def: "Fonksiyonel bileşenlerde state ve yaşam döngüsü özelliklerini kullanmamızı sağlayan React fonksiyonlarıdır." },
  { term: "JSX", def: "JavaScript içinde HTML benzeri sözdizimi kullanmamızı sağlayan bir eklentidir." },
  { term: "Virtual DOM", def: "Gerçek DOM'un bellekte tutulan hafif bir kopyasıdır. React performansı artırmak için kullanır." },
  { term: "Re-render", def: "State veya propların değişmesi durumunda bileşenin tekrar çalışıp UI'ın güncellenmesi işlemidir." },
  { term: "Effect", def: "Bileşen render olduktan sonra çalışan API çağrıları, abonelikler gibi yan etkilerdir (side effects)." },
  { term: "Context", def: "Uygulama genelinde verileri (tema, kullanıcı) prop drilling yapmadan paylaşmayı sağlayan yapıdır." },
  { term: "Reducer", def: "Karmaşık state mantığını yönetmek için kullanılan, mevcut state ve action alıp yeni state dönen fonksiyondur." },
  { term: "Ref", def: "DOM elemanlarına doğrudan erişmek veya re-render tetiklemeden değer saklamak için kullanılır." },
  { term: "Memoization", def: "Ağır hesaplamaların sonuçlarını veya bileşenleri önbelleğe alarak performansı artıran tekniktir." },
  { term: "Reconciliation", def: "React'in Virtual DOM'daki değişiklikleri gerçek DOM'a en verimli şekilde yansıtma algoritmasıdır." },
  { term: "Hydration", def: "Sunucuda render edilen (SSR) statik HTML'in, tarayıcıda React tarafından etkileşimli hale getirilmesi sürecidir." },
  { term: "Server Component", def: "Sadece sunucuda çalışan ve istemciye (client) JavaScript kodu göndermeyen modern React bileşenleridir." },
  { term: "Client Component", def: "Tarayıcıda çalışan ve state/effect kullanabilen standart React bileşenleridir." },
  { term: "Suspense", def: "Asenkron işlemler (veri çekme, kod bölme) tamamlanana kadar ekranda bir yükleniyor (fallback) UI göstermeyi sağlar." },
  { term: "Error Boundary", def: "Alt bileşenlerde oluşan JavaScript hatalarını yakalayıp, uygulamanın çökmesini engelleyen bileşenlerdir." },
  { term: "Portal", def: "Bir bileşeni, DOM hiyerarşisinde kendi ebeveyninin dışında başka bir DOM düğümüne render etmeyi sağlar." },
  { term: "Higher-Order Component", def: "HOC, bir bileşeni alıp ona yeni özellikler ekleyerek yeni bir bileşen dönen gelişmiş bir desendir." },
  { term: "Render Props", def: "Bir bileşene ne render edeceğini söylemek için fonksiyon prop'u geçme tekniğidir." },
  { term: "Compound Component", def: "Birlikte çalışan ve iç state'i paylaşan birden fazla bileşenin oluşturduğu esnek bir desendir (örn: Select ve Option)." },
  { term: "Controlled Input", def: "Değeri tamamen React state'i tarafından kontrol edilen form elemanlarıdır." },
  { term: "Uncontrolled Input", def: "Değeri React state'i yerine doğrudan DOM (ref ile) tarafından yönetilen form elemanlarıdır." },
  { term: "Lifting State Up", def: "Aynı veriye ihtiyaç duyan bileşenler için state'i, bu bileşenlerin en yakın ortak ebeveynine taşıma işlemidir." },
  { term: "Prop Drilling", def: "Veriyi derindeki bir alt bileşene iletmek için, aradaki birçok bileşenden gereksiz yere prop geçme durumudur." },
  { term: "Code Splitting", def: "Uygulamanın JavaScript paketini küçük parçalara bölüp sadece ihtiyaç duyulanları yükleme işlemidir." },
  { term: "Lazy Loading", def: "Bileşenlerin veya kod parçalarının sadece ekranda gösterilecekleri zaman asenkron olarak yüklenmesidir." },
  { term: "Tree Shaking", def: "Paketleme sırasında (build), kullanılmayan kodların (dead code) nihai paketten çıkarılması işlemidir." },
  { term: "Bundle", def: "Tüm JavaScript, CSS ve diğer dosyaların tarayıcının okuyabileceği şekilde birleştirilmiş nihai dosyadır." },
  { term: "Transpiler", def: "Modern JavaScript ve JSX kodunu (Babel, SWC gibi), eski tarayıcıların anlayabileceği standart JS'ye dönüştüren araçtır." },
  { term: "Babel", def: "Yeni nesil JavaScript kodunu geriye dönük uyumlu versiyonlara derleyen popüler bir transpilerdır." },
  { term: "Vite", def: "Geliştirme sunucusunun anında başlamasını sağlayan ve çok hızlı HMR sunan modern bir build aracıdır." },
  { term: "Webpack", def: "Uygulama modüllerini ve bağımlılıklarını tarayıcı için paketleyen (bundler) güçlü bir araçtır." },
  { term: "ESLint", def: "JavaScript ve React kodunda olası hataları bulan ve belirli kodlama standartlarını zorlayan analiz aracıdır." },
  { term: "TypeScript", def: "JavaScript'e statik tip denetimi (type checking) ekleyen ve hataları yazım aşamasında yakalayan dildir." },
  { term: "Interface", def: "TypeScript'te nesnelerin ve bileşen proplarının yapısını, hangi özellikleri içereceğini tanımlayan yapıdır." },
  { term: "Type", def: "TypeScript'te tür eş tanımları yapmak için kullanılan, union veya intersection tiplerine izin veren yapıdır." },
  { term: "Generic", def: "Farklı türlerle çalışabilen ancak tür güvenliğini kaybetmeyen yeniden kullanılabilir fonksiyon/bileşen şablonlarıdır." },
  { term: "Async/Await", def: "Asenkron işlemleri, senkron kod gibi daha okunabilir yazmayı sağlayan JavaScript sözdizimidir." },
  { term: "Promise", def: "Gelecekte tamamlanacak veya başarısız olacak bir işlemin (örn: API çağrısı) sonucunu temsil eden nesnedir." },
  { term: "Fetch API", def: "Tarayıcılarda ağ istekleri (HTTP istekleri) yapmak için kullanılan modern ve Promise tabanlı bir arayüzdür." },
  { term: "CORS", def: "Farklı domain'ler (kökenler) arasındaki API isteklerinin güvenliğini sağlayan tarayıcı politikasıdır." },
  { term: "SPA", def: "Tek Sayfa Uygulaması (Single Page Application), tüm sayfaların baştan yüklenmeden sadece verilerin değiştiği web uygulamasıdır." },
  { term: "SSR", def: "Sunucu Tarafı Render (Server-Side Rendering), sayfanın HTML'inin tarayıcıya gönderilmeden önce sunucuda oluşturulmasıdır." },
  { term: "SSG", def: "Statik Site Üretimi (Static Site Generation), HTML sayfalarının build aşamasında önceden oluşturulması işlemidir." },
  { term: "Routing", def: "SPA'larda kullanıcının farklı URL'lere gitmesiyle farklı bileşenlerin gösterilmesini sağlayan yönlendirme sistemidir." },
  { term: "Custom Hook", def: "İçinde başka React Hook'ları kullanan ve state/logic'i tekrar kullanılabilir hale getiren 'use' ile başlayan fonksiyonlardır." },
].sort((a, b) => a.term.localeCompare(b.term));

export function Sozluk() {
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const letters = Array.from(new Set(DICTIONARY_TERMS.map(t => t.term[0].toUpperCase()))).sort();

  const filteredTerms = DICTIONARY_TERMS.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(search.toLowerCase()) || item.def.toLowerCase().includes(search.toLowerCase());
    const matchesLetter = activeLetter ? item.term[0].toUpperCase() === activeLetter : true;
    return matchesSearch && matchesLetter;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500">
            React Geliştirici Sözlüğü
          </h1>
          <p className="text-muted-foreground text-lg">
            React ekosisteminde sıkça karşılaşılan terimler ve kavramlar.
          </p>
          
          <div className="relative max-w-md pt-4">
            <Search className="absolute left-3 top-7 h-4 w-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Terim veya açıklama ara..." 
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 pt-4">
            <button
              onClick={() => setActiveLetter(null)}
              className={"px-3 py-1 text-sm rounded-md transition-colors " + (!activeLetter ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80")}
            >
              Tümü
            </button>
            {letters.map(letter => (
              <button
                key={letter}
                onClick={() => setActiveLetter(letter)}
                className={"px-3 py-1 text-sm rounded-md transition-colors " + (activeLetter === letter ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80")}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTerms.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg text-primary mb-2">{item.term}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {item.def}
              </p>
            </div>
          ))}
        </div>
        
        {filteredTerms.length === 0 && (
          <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl mt-4">
            Aramanızla eşleşen bir terim bulunamadı.
          </div>
        )}
      </main>
    </div>
  );
}