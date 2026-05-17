import { useState, useEffect, useRef } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DeneBox } from "@/components/ui/DeneBox";
import { Button } from "@/components/ui/button";
import { QuizBlock } from "@/components/ui/QuizBlock";

export function Effect() {
  const [zaman, setZaman] = useState(0);
  const [aktif, setAktif] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (aktif) {
      interval = setInterval(() => {
        setZaman(z => z + 1);
      }, 1000);
    }
    
    // Cleanup (temizlik) fonksiyonu
    return () => clearInterval(interval);
  }, [aktif]); // Bağımlılık dizisi

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="max-w-3xl prose dark:prose-invert">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-blue-800 dark:text-blue-300 font-bold m-0 mb-2">Bu derste öğreneceksin:</h3>
        <ul className="list-disc pl-5 m-0 text-blue-900 dark:text-blue-200">
          <li>useEffect'in amacını ve "yan etki" (side effect) kavramını</li>
          <li>useEffect ne zaman ve nasıl çalışır?</li>
          <li>Bağımlılık dizisinin (Dependency Array) kurallarını</li>
          <li>Cleanup (Temizlik) fonksiyonunu</li>
        </ul>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-8">
        <strong>İpucu:</strong> API'den veri çekerken her zaman bağımlılık dizisini <code>[]</code> (boş dizi) olarak verin. Aksi takdirde sonsuz döngüye girebilirsiniz!
      </div>

      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">Effects & useEffect</h1>
      <p className="text-xl text-muted-foreground mb-8">
        React'in dış dünyayla iletişim kurduğu yer. Veri çekmek (fetch), abonelikler ve DOM manipülasyonları için kullanılır.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">useEffect Nedir?</h2>
        <p>
          Bileşen (Component) ekrana çizildikten (render) hemen sonra çalışan yan etkileri yöneten hook'tur.
        </p>
        <CodeBlock 
          title="Temel Yapı"
          colorBorder="violet"
          code={`import { useEffect } from 'react';

useEffect(() => {
  // Buradaki kod bileşen ekrana çizildikten sonra çalışır
  document.title = "Sayfa Yüklendi!";
}, []); // <-- Bu boş dizi çok önemli!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Bağımlılık Dizisi (Dependency Array)</h2>
        <p>
          <code>useEffect</code>'in ikinci parametresi bir dizidir. Bu dizi, effect'in <strong>ne zaman tekrar çalışacağını</strong> belirler.
        </p>
        <ul className="space-y-4 list-none pl-0">
          <li className="bg-muted/50 p-4 rounded border-l-4 border-red-500">
            <strong>Dizi yoksa:</strong> <code>useEffect(() ={'>'} &#123;...&#125;)</code>
            <br />Her render'da çalışır. (Genelde istenmez, sonsuz döngülere yol açabilir!)
          </li>
          <li className="bg-muted/50 p-4 rounded border-l-4 border-blue-500">
            <strong>Boş dizi ise:</strong> <code>useEffect(() ={'>'} &#123;...&#125;, [])</code>
            <br />Sadece bileşen İLK kez ekrana geldiğinde (mount) 1 kere çalışır. (Veri çekmek için harikadır)
          </li>
          <li className="bg-muted/50 p-4 rounded border-l-4 border-green-500">
            <strong>Dolu dizi ise:</strong> <code>useEffect(() ={'>'} &#123;...&#125;, [isim, yas])</code>
            <br />İlk render'da VE <code>isim</code> ya da <code>yas</code> değerlerinden biri değiştiğinde çalışır.
          </li>
        </ul>
      </section>

      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-10">
        <strong>Uyarı:</strong> Effect'in içinde kullandığınız değişkenler (state veya prop) bağımlılık dizisinde belirtilmezse, effect güncel değerleri göremez. Linter uyarılarına her zaman dikkat edin!
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Canlı Örnek: Kronometre</h2>
        <p>
          Aşağıdaki örnekte <code>useEffect</code> içinde bir <code>setInterval</code> başlatıyoruz.
          Bağımlılık dizisine `aktif` state'ini koyduk, böylece `aktif` değiştiğinde effect tekrar değerlendiriliyor.
        </p>
        <CodeBlock 
          title="Kronometre Örneği"
          colorBorder="orange"
          code={`useEffect(() => {
  let interval;
  if (aktif) {
    interval = setInterval(() => setZaman(z => z + 1), 1000);
  }
  
  // Cleanup: Bileşen ekrandan kalkarken veya effect yeniden çalışmadan önce eski interval'i temizle
  return () => clearInterval(interval);
}, [aktif]);`}
        />
        
        <DeneBox title="Kronometreyi Test Et">
          <div className="flex flex-col items-center gap-6">
            <div className="text-5xl font-mono p-6 bg-muted rounded-xl shadow-inner border border-border/50">
              {zaman} <span className="text-xl text-muted-foreground">sn</span>
            </div>
            <div className="flex gap-4">
              <Button 
                onClick={() => setAktif(!aktif)}
                className={aktif ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"}
                data-testid="button-timer-toggle"
              >
                {aktif ? "Durdur" : "Başlat"}
              </Button>
              <Button variant="outline" onClick={() => { setZaman(0); setAktif(false); }} data-testid="button-timer-reset">Sıfırla</Button>
            </div>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">useEffect Çalışma Sırası</h2>
        <p>Effect'lerin ne zaman çalıştığını anlamak çok önemlidir. Sıralama şu şekildedir:</p>
        <ul className="list-decimal pl-6">
          <li>React bileşeni render eder (JSX'i hesaplar)</li>
          <li>Tarayıcı ekranı günceller (Bileşen görünür)</li>
          <li><strong>useEffect içindeki kod çalışır</strong></li>
          <li>Eğer bağımlılıklar değişirse veya bileşen kaldırılırsa önce <strong>Cleanup fonksiyonu çalışır</strong></li>
          <li>Sonra effect tekrar çalışır</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">AbortController ile API İptali</h2>
        <p>Kullanıcı hızlıca sayfa değiştirirse eski istekleri iptal etmek için Cleanup içinde AbortController kullanırız.</p>
        <CodeBlock code={`useEffect(() => {
  const controller = new AbortController();
  
  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(setData);

  return () => controller.abort(); // Unmount olursa iptal et!
}, []);`} />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">useLayoutEffect vs useEffect</h2>
        <p>Çoğu zaman <code>useEffect</code> işinizi görür. Ancak DOM üzerindeki ölçümleri yapıp (div boyutu vs.) ekran titremesini önlemek istiyorsanız <code>useLayoutEffect</code> kullanmalısınız. Çünkü useLayoutEffect tarayıcı ekranı çizmeden <strong>hemen önce</strong> çalışır.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Sık Yapılan useEffect Hataları</h2>
        <ul className="space-y-2 list-disc pl-6 text-sm">
          <li><span className="text-red-500">Unutulan Bağımlılıklar:</span> Effect içindeki state'leri diziye koymamak (Eski değeri görür).</li>
          <li><span className="text-red-500">Sonsuz Döngü:</span> Effect içinde state güncelleyip o state'i diziye koymak.</li>
          <li><span className="text-red-500">Gereksiz Effect:</span> Sadece props değişiminden yeni bir değer hesaplamak için useEffect KULLANMAYIN. Doğrudan hesaplayın.</li>
          <li><span className="text-red-500">Fonksiyon Referansları:</span> Component içinde tanımlanan fonksiyonları bağımlılık dizisine koymak (Her render'da referans değiştiği için effect sürekli çalışır). <code>useCallback</code> kullanın.</li>
          <li><span className="text-red-500">Cleanup Unutmak:</span> Event listener ekleyip silmemek (Zamanla sayfanızı kilitler).</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Gerçek Dünya Örnekleri</h2>
        <DeneBox title="Pencere Boyutu Takibi">
          <div className="flex flex-col items-center gap-4 py-8">
            <p className="text-lg">Şu anki pencere boyutunuz:</p>
            <div className="font-mono text-3xl font-bold text-blue-500">
              {windowSize.width}px x {windowSize.height}px
            </div>
            <p className="text-sm text-muted-foreground">Pencereyi yeniden boyutlandırmayı deneyin.</p>
          </div>
        </DeneBox>

        <div className="mt-8"></div>

        <DeneBox title="Scroll Pozisyonu Takibi">
          <div className="flex flex-col items-center gap-4 py-8">
            <p className="text-lg">Şu anki dikey kaydırma miktarınız:</p>
            <div className="font-mono text-3xl font-bold text-violet-500">
              {scrollY}px
            </div>
            <div className="w-full bg-muted rounded-full h-4 mt-4 overflow-hidden relative">
              <div className="bg-violet-500 h-full transition-all" style={{ width: Math.min(100, (scrollY / 1000) * 100) + "%" }}></div>
            </div>
          </div>
        </DeneBox>
      </section>

      <QuizBlock lessonKey="effect" />
    </div>
  );
}