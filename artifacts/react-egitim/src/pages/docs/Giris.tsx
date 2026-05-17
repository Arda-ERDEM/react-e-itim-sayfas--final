import { useState } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DeneBox } from "@/components/ui/DeneBox";
import { Button } from "@/components/ui/button";
import { QuizBlock } from "@/components/ui/QuizBlock";

export function Giris() {
  const [liked, setLiked] = useState(false);
  const [theme, setTheme] = useState('light');

  return (
    <div className="max-w-3xl prose dark:prose-invert">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-blue-800 dark:text-blue-300 font-bold m-0 mb-2">Bu derste öğreneceksin:</h3>
        <ul className="list-disc pl-5 m-0 text-blue-900 dark:text-blue-200">
          <li>React'in ne olduğunu ve neden bu kadar popüler olduğunu</li>
          <li>Bileşen (Component) bazlı mimariyi</li>
          <li>Virtual DOM kavramını</li>
          <li>İlk React bileşeninizi yazmayı</li>
        </ul>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-4">
        <strong>İpucu:</strong> React öğrenirken JavaScript temellerinizin (fonksiyonlar, array metotları, destructuring) iyi olması işinizi çok kolaylaştırır.
      </div>

      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">React Nedir?</h1>
      <p className="text-xl text-muted-foreground mb-8">
        React, kullanıcı arayüzleri (UI) oluşturmak için kullanılan bir JavaScript kütüphanesidir.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Neden React?</h2>
        <p>
          Facebook tarafından geliştirilen React, modern web uygulamalarının vazgeçilmez bir parçası haline gelmiştir. 
          Peki neden bu kadar popüler?
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><strong>Bileşen (Component) Bazlı Mimari:</strong> Uygulamanızı küçük, tekrar kullanılabilir parçalara bölebilirsiniz.</li>
          <li><strong>Virtual DOM:</strong> React, DOM üzerinde sadece değişen yerleri güncelleyerek inanılmaz bir performans sağlar.</li>
          <li><strong>Geniş Ekosistem:</strong> Aradığınız her problem için hazır bir çözüm, devasa bir topluluk.</li>
          <li><strong>Tek Yönlü Veri Akışı (One-way Data Binding):</strong> Veri her zaman parent'tan child'a doğru akar, bu da hataları takip etmeyi çok daha kolaylaştırır.</li>
          <li><strong>Zengin Tooling:</strong> React DevTools gibi muazzam geliştirici araçlarına sahiptir. State ve props denetimi saniyeler sürer.</li>
          <li><strong>Öğrenmesi Kolay, Ustalığı Keyifli:</strong> API yüzeyi oldukça dardır. JavaScript biliyorsanız, temel React konseptlerini birkaç günde kavrayabilirsiniz.</li>
          <li><strong>Geriye Dönük Uyumluluk:</strong> React ekibi eski kodları kırmamaya çok özen gösterir. Yıllar önce yazılan bileşenler yeni versiyonlarda bile çoğunlukla sorunsuz çalışır.</li>
          <li><strong>Mobil Geliştirme İmkanı:</strong> "Learn once, write anywhere" mottosuyla React bilginizi React Native'de kullanarak mobil uygulamalar da yazabilirsiniz.</li>
        </ul>
      </section>

      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-10">
        <strong>Uyarı:</strong> React bir "framework" değil, "kütüphane"dir. Routing, state yönetimi gibi konularda dışarıdan paketlere (örn: react-router, redux, wouter) ihtiyaç duyar.
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">İlk React Kodumuz</h2>
        <p>
          Aşağıdaki örnekte en basit haliyle bir React bileşenini görüyoruz. Bu bir fonksiyondur ve HTML benzeri
          bir yapı (JSX) döndürür.
        </p>
        <CodeBlock 
          title="MerhabaReact.jsx"
          code={`function MerhabaReact() {
  return (
    <div className="selamlama">
      <h1>Merhaba Dünya! 🌈</h1>
      <p>React öğrenmek çok keyifli.</p>
    </div>
  );
}

export default MerhabaReact;`}
        />
        <p className="mt-4">
          Gördüğünüz gibi, JavaScript dosyasının içine HTML yazıyoruz gibi duruyor! Buna <strong>JSX</strong> diyoruz. 
          İlerleyen bölümlerde bunu detaylıca inceleyeceğiz.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Dene Bakalım!</h2>
        <p>
          Her bölümde öğrendiklerimizi canlı olarak deneyebileceğiniz kutucuklar olacak. 
          Mesela bu butona tıklayarak React'in interaktif doğasını hissedin:
        </p>
        <DeneBox title="İlk Etkileşim">
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-medium">Bu buton ne kadar tıklanmış?</h3>
            <Button 
              onClick={() => alert("Harika! İlk etkileşimini gerçekleştirdin! 🎉")}
              className="bg-gradient-to-r from-red-500 via-yellow-500 to-violet-500 text-white border-0"
              data-testid="button-first-interaction"
            >
              Bana Tıkla
            </Button>
          </div>
        </DeneBox>
        
        <div className="mt-8"></div>
        
        <DeneBox title="Beğeni Butonu (Like)">
          <div className="flex flex-col items-center gap-4">
            <p>Aşağıdaki kalp ikonuna tıklayarak favoriye ekleyin.</p>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => setLiked(!liked)}
              className={"text-2xl " + (liked ? "text-red-500 border-red-500 bg-red-50 dark:bg-red-950/30" : "text-gray-500")}
            >
              {liked ? '❤️ Beğendin' : '🤍 Beğen'}
            </Button>
          </div>
        </DeneBox>

        <div className="mt-8"></div>

        <DeneBox title="Tema Değiştirici">
          <div className={"flex flex-col items-center gap-4 p-8 rounded-lg transition-colors " + (theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black border shadow-sm')}>
            <p className="font-medium">Şu anki tema: {theme === 'dark' ? 'Karanlık 🌙' : 'Aydınlık ☀️'}</p>
            <Button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              variant={theme === 'dark' ? 'secondary' : 'default'}
            >
              Temayı Değiştir
            </Button>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">React'in Tarihi</h2>
        <p>React'in yolculuğu bir hayli etkileyicidir. 2011'den günümüze nasıl geldiğine bir göz atalım:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><strong>2011 (İlk Çıkış):</strong> React, Facebook mühendisi Jordan Walke tarafından oluşturuldu ve ilk kez Facebook'un haber kaynağında (News Feed) kullanıldı. O zamanki adı "FaxJS" idi.</li>
          <li><strong>2012 (Instagram):</strong> Instagram'ın satın alınmasıyla React Instagram'da da kullanılmaya başlandı.</li>
          <li><strong>2013 (Açık Kaynak):</strong> React, JSConf US'te açık kaynaklı olarak (open source) tüm dünyaya duyuruldu. İlk başta topluluk tarafından JSX garip karşılandı ama sonra çok sevildi.</li>
          <li><strong>2015 (React Native):</strong> Mobil uygulama geliştirme dünyasını sarsan React Native duyuruldu.</li>
          <li><strong>2019 (React 16.8 - Hooks):</strong> React dünyasındaki en büyük devrim. <code>useState</code> ve <code>useEffect</code> gibi hook'lar tanıtıldı. Artık Class componentlere gerek kalmadı.</li>
          <li><strong>2022 (React 18):</strong> "Concurrent Rendering" özelliği geldi. React artık birden fazla işi aynı anda işleyebiliyor, arka planda render yapabiliyor.</li>
          <li><strong>Günümüz (React 19 ve sonrası):</strong> Server Components (RSC) ve Actions gibi konseptlerle React, sunucu tarafına çok daha fazla yaklaşıyor.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">React Ekosistemi</h2>
        <p>React sadece bir kütüphane olsa da etrafında kocaman bir ekosistem vardır. İşte en çok duyacağınız bazı kavramlar:</p>
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse border text-sm text-left">
            <thead>
              <tr className="bg-muted">
                <th className="border p-2 font-bold">Teknoloji</th>
                <th className="border p-2 font-bold">Kullanım Amacı</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-medium text-blue-600 dark:text-blue-400">Next.js</td>
                <td className="border p-2">React tabanlı en popüler framework. SEO uyumlu (SSR/SSG), API route'ları ve daha fazlasını sunar. Vercel tarafından geliştirilir.</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium text-blue-600 dark:text-blue-400">Remix</td>
                <td className="border p-2">Next.js'in en büyük rakibi. Web standartlarına ve veri çekme (data fetching) performansına odaklanan modern bir framework.</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium text-blue-600 dark:text-blue-400">React Native</td>
                <td className="border p-2">Sadece JavaScript ve React bilginizle iOS ve Android için native mobil uygulamalar geliştirmenizi sağlar.</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium text-blue-600 dark:text-blue-400">Vite</td>
                <td className="border p-2">React projelerinizi (SPA) ışık hızında başlatıp geliştirmenizi sağlayan modern build aracı (Bundler).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">İlk Proje Yapısı</h2>
        <p>Tipik bir modern React (Vite) projesi oluşturduğunuzda karşılaşacağınız dosya ve klasör yapısı genelde şöyledir:</p>
        <ul className="list-none pl-0 space-y-3 mt-4 font-mono text-sm bg-muted/30 p-6 rounded-lg border">
          <li>📁 <strong>node_modules/</strong> <span className="text-muted-foreground ml-2">→ İndirilen tüm paketlerin durduğu, asla içine dokunmadığımız kara delik.</span></li>
          <li>📁 <strong>public/</strong> <span className="text-muted-foreground ml-2">→ Favicon, resimler vb. statik varlıklar. Derleme işleminden geçmezler.</span></li>
          <li>📁 <strong>src/</strong> <span className="text-muted-foreground ml-2">→ Tüm kodlarımızı yazdığımız ana klasör.</span>
            <ul className="list-none pl-8 mt-2 space-y-2 border-l border-muted-foreground/30 ml-4">
              <li>📄 <strong>App.jsx</strong> <span className="text-muted-foreground ml-2">→ Uygulamamızın kalbi olan ana bileşen.</span></li>
              <li>📄 <strong>main.jsx</strong> <span className="text-muted-foreground ml-2">→ React'in HTML içine monte (mount) edildiği giriş noktası.</span></li>
              <li>📄 <strong>index.css</strong> <span className="text-muted-foreground ml-2">→ Global stillerimiz.</span></li>
            </ul>
          </li>
          <li>📄 <strong>index.html</strong> <span className="text-muted-foreground ml-2">→ Uygulamayı barındıran tek HTML dosyası.</span></li>
          <li>📄 <strong>package.json</strong> <span className="text-muted-foreground ml-2">→ Proje kimliği, npm komutları ve bağımlılıkların (dependencies) listesi.</span></li>
          <li>📄 <strong>vite.config.js</strong> <span className="text-muted-foreground ml-2">→ Vite derleyicisinin ayarları.</span></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">React vs Diğerleri</h2>
        <p>Neden diğer alternatifler yerine React öğreniyoruz? İşte kısa bir karşılaştırma:</p>
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse border text-sm text-left">
            <thead>
              <tr className="bg-muted">
                <th className="border p-2 font-bold w-1/4">Özellik</th>
                <th className="border p-2 font-bold text-blue-500 w-1/4">React</th>
                <th className="border p-2 font-bold text-emerald-500 w-1/4">Vue</th>
                <th className="border p-2 font-bold text-red-500 w-1/4">Angular</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-medium">Türü</td>
                <td className="border p-2">Kütüphane</td>
                <td className="border p-2">Kütüphane/Framework</td>
                <td className="border p-2">Tam Teşekküllü Framework</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium">Öğrenme Eğrisi</td>
                <td className="border p-2 text-yellow-600">Orta</td>
                <td className="border p-2 text-green-600">Kolay</td>
                <td className="border p-2 text-red-600">Dik / Zor</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium">Mimari Yapı</td>
                <td className="border p-2">JSX (Her şey JS içinde)</td>
                <td className="border p-2">Şablonlar (.vue dosyaları)</td>
                <td className="border p-2">Şablonlar + TypeScript</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium">Arkası</td>
                <td className="border p-2">Meta (Facebook)</td>
                <td className="border p-2">Açık Topluluk (Evan You)</td>
                <td className="border p-2">Google</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium">İş İlanı Oranı</td>
                <td className="border p-2 text-green-600 font-bold">Çok Yüksek</td>
                <td className="border p-2">Orta</td>
                <td className="border p-2">Yüksek (Kurumsal)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <QuizBlock lessonKey="giris" />
    </div>
  );
}
