import { useState } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DeneBox } from "@/components/ui/DeneBox";
import { QuizBlock } from "@/components/ui/QuizBlock";
import { ChevronRight, Home, Settings, User } from "lucide-react";

export function Router() {
  const [animStage, setAnimStage] = useState(0);

  return (
    <div className="max-w-3xl prose dark:prose-invert">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-blue-800 dark:text-blue-300 font-bold m-0 mb-2">Bu derste öğreneceksin:</h3>
        <ul className="list-disc pl-5 m-0 text-blue-900 dark:text-blue-200">
          <li>Single Page Application (SPA) yönlendirmesini</li>
          <li>Wouter ile Route yapısını kurmayı</li>
          <li>Link bileşeni ile sayfalar arası geçişi</li>
          <li>URL'den dinamik parametre okumayı</li>
        </ul>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-8">
        <strong>İpucu:</strong> Sayfalar arası geçişlerde state'inizin kaybolmaması için standart <code>&lt;a&gt;</code> etiketi yerine yönlendiricinin Link bileşenini kullanın.
      </div>

      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">React Router (wouter)</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Single Page Application (SPA) dünyasında sayfalar arası geçiş yapmak.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">SPA vs MPA Ne Demek?</h2>
        <p>Eskiden her tıkladığımızda sayfa bembeyaz olur, sunucuya gidilir, yeni HTML indirilip baştan çizilirdi (MPA - Multi Page Application).</p>
        <p>React ile yaptığımız uygulamalar genelde <strong>SPA (Single Page Application)</strong>'dır. Sayfa aslında teknik olarak hiçbir zaman değişmez (index.html), sadece JavaScript sayesinde URL değişmiş gibi görünür ve içindeki Componentler saniyesinde değişir. Aşırı hızlı bir deneyim sunar.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Wouter Nedir?</h2>
        <p>
          React ekosisteminde en popüler yönlendirici "react-router-dom" olsa da, <strong>wouter</strong> onun çok daha hafif (sadece 1.5kb) ve modern bir alternatifidir.
          Kullanımı son derece kolaydır.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Temel Kurulum</h2>
        <p>
          Uygulamanın ana bileşeninde (genelde <code>App.jsx</code>), URL'ye göre hangi bileşenin gösterileceğini tanımlarız.
        </p>
        <CodeBlock 
          title="App.jsx"
          colorBorder="red"
          code={`import { Switch, Route } from "wouter";

function App() {
  return (
    <Switch>
      <Route path="/" component={AnaSayfa} />
      <Route path="/hakkimizda" component={Hakkimizda} />
      <Route path="/kullanici/:id" component={KullaniciProfili} />
      
      {/* Hiçbiri eşleşmezse 404 göster */}
      <Route component={Bulunamadi} />
    </Switch>
  );
}`}
        />
      </section>

      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-10">
        <strong>Uyarı:</strong> Wouter'ın Link bileşeni HTML'e dönüştüğünde otomatik olarak bir <code>&lt;a&gt;</code> etiketi oluşturur. Bu nedenle <code>&lt;Link&gt;&lt;a&gt;Metin&lt;/a&gt;&lt;/Link&gt;</code> şeklinde içe içe a etiketi KULLANMAYIN.
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Sayfalar Arası Geçiş (Link)</h2>
        <p>
          React uygulamalarında <code>&lt;a href="..."&gt;</code> kullanmaktan kaçınırız, çünkü bu sayfanın tamamen baştan yüklenmesine (ve state'lerin sıfırlanmasına) sebep olur.
        </p>
        <CodeBlock 
          title="Navigasyon"
          colorBorder="blue"
          code={`import { Link } from "wouter";

function Navbar() {
  return (
    <nav>
      {/* Doğru Kullanım */}
      <Link href="/hakkimizda">Hakkımızda</Link>
    </nav>
  );
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Parametreleri Okumak</h2>
        <p>
          Eğer rotanız dinamikse (örn: <code>/profil/:kullaniciId</code>), bu değeri bileşen içinden alabilirsiniz.
        </p>
        <CodeBlock 
          title="useParams"
          colorBorder="green"
          code={`import { useParams } from "wouter";

function Profil() {
  const params = useParams(); // params.kullaniciId gelecek
  
  return <h1>Kullanıcı ID: {params.kullaniciId}</h1>;
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Programatik Yönlendirme (setLocation)</h2>
        <p>Bazen kullanıcıyı bir butona tıkladığında değil, bir işlem bittikten sonra (örneğin form kaydedildiğinde) yönlendirmek isteriz. Bunun için wouter'ın <code>useLocation</code> hook'u kullanılır.</p>
        <CodeBlock code={`import { useLocation } from "wouter";

function Form() {
  const [location, setLocation] = useLocation();

  const kaydet = () => {
    // ... API çağrısı yapıldı ...
    setLocation("/basarili"); // Kullanıcıyı yeni sayfaya gönder
  };

  return <button onClick={kaydet}>Kaydet</button>;
}`} />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Route Koruma (Protected Routes) Yöntemi</h2>
        <p>Giriş yapmamış kullanıcıların bazı sayfaları görmesini engellemek için Router içinde basit mantıklar kurabiliriz.</p>
        <CodeBlock code={`// Basit bir koruma kalkanı bileşeni
function ProtectedRoute({ component: Component, isLoggedIn, ...rest }) {
  if (!isLoggedIn) {
    setLocation("/login"); // Giriş yapmadıysa kov!
    return null;
  }
  return <Component {...rest} />;
}

// Kullanımı:
<Route path="/gizli-sayfa">
  <ProtectedRoute isLoggedIn={kullaniciGirisYaptiMi} component={Gizli} />
</Route>`} />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Demolar</h2>

        <DeneBox title="Breadcrumb (Ekmek Kırıntısı) Navigasyon">
          <div className="flex items-center space-x-2 text-sm">
            <a href="#" className="flex items-center hover:text-blue-500 text-muted-foreground"><Home className="w-4 h-4 mr-1" /> Anasayfa</a>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <a href="#" className="flex items-center hover:text-blue-500 text-muted-foreground"><Settings className="w-4 h-4 mr-1" /> Ayarlar</a>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="flex items-center font-bold text-foreground"><User className="w-4 h-4 mr-1" /> Profil</span>
          </div>
        </DeneBox>

        <div className="mt-8"></div>

        <DeneBox title="Sayfa Geçiş Animasyonu (Simülasyon)">
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              <button 
                className={"px-4 py-2 border rounded " + (animStage === 0 ? "bg-primary text-primary-foreground" : "bg-card")}
                onClick={() => setAnimStage(0)}
              >
                Sayfa 1
              </button>
              <button 
                className={"px-4 py-2 border rounded " + (animStage === 1 ? "bg-primary text-primary-foreground" : "bg-card")}
                onClick={() => setAnimStage(1)}
              >
                Sayfa 2
              </button>
            </div>
            
            <div className="relative w-full max-w-sm h-32 overflow-hidden border rounded-lg bg-card">
              <div className={"absolute inset-0 p-6 flex flex-col justify-center transition-all duration-500 ease-in-out " + (animStage === 0 ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0")}>
                <h3 className="font-bold text-xl text-blue-500">Ana Sayfa Modülü</h3>
                <p className="text-sm text-muted-foreground">Sayfa geçişleri SPA'larda işte böyle yumuşak hissettirebilir.</p>
              </div>
              <div className={"absolute inset-0 p-6 flex flex-col justify-center transition-all duration-500 ease-in-out " + (animStage === 1 ? "translate-x-0 opacity-100" : "translate-x-full opacity-0")}>
                <h3 className="font-bold text-xl text-violet-500">Detay Modülü</h3>
                <p className="text-sm text-muted-foreground">Çünkü aslında tarayıcı sekmeyi hiç yenilemedi.</p>
              </div>
            </div>
          </div>
        </DeneBox>

        <div className="mt-8"></div>

        <DeneBox title="Özel 404 Sayfası">
          <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-xl text-center">
            <div className="text-6xl font-black text-gray-300 dark:text-gray-700 mb-4">404</div>
            <h3 className="text-xl font-bold mb-2">Eyvah! Kaybolduk.</h3>
            <p className="text-sm text-muted-foreground mb-4">Aradığınız sayfayı bulamadık. URL'yi kontrol edin veya güvenli sulara dönün.</p>
            <button className="px-4 py-2 bg-foreground text-background font-medium rounded-md">Anasayfaya Dön</button>
          </div>
        </DeneBox>
      </section>

      <QuizBlock lessonKey="router" />
    </div>
  );
}