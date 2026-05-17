import { useState, useRef, useEffect } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DeneBox } from "@/components/ui/DeneBox";
import { QuizBlock } from "@/components/ui/QuizBlock";

export function Events() {
  const [konum, setKonum] = useState({ x: 0, y: 0 });
  const [lastEvent, setLastEvent] = useState<string>("Henüz bir olay tetiklenmedi");
  const [keys, setKeys] = useState<string[]>([]);
  const [doubleClickCount, setDoubleClickCount] = useState(0);
  
  const trailRef = useRef<HTMLDivElement>(null);

  const logEvent = (e: React.SyntheticEvent) => {
    setLastEvent(e.type + " olayı tetiklendi!");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    setKeys(prev => {
      const newKeys = [...prev, e.key];
      if (newKeys.length > 5) newKeys.shift();
      return newKeys;
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!trailRef.current) return;
      const trail = document.createElement("div");
      trail.className = "absolute w-2 h-2 rounded-full bg-violet-500 pointer-events-none transition-all duration-500 opacity-50";
      trail.style.left = e.clientX + "px";
      trail.style.top = e.clientY + "px";
      document.body.appendChild(trail);
      
      setTimeout(() => {
        trail.style.opacity = "0";
        trail.style.transform = "scale(2)";
      }, 50);

      setTimeout(() => {
        document.body.removeChild(trail);
      }, 500);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="max-w-3xl prose dark:prose-invert relative">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-blue-800 dark:text-blue-300 font-bold m-0 mb-2">Bu derste öğreneceksin:</h3>
        <ul className="list-disc pl-5 m-0 text-blue-900 dark:text-blue-200">
          <li>Kullanıcı etkileşimlerini (tıklama, yazma) yakalamayı</li>
          <li>Event fonksiyonlarını bağlamayı</li>
          <li>Event nesnesini (e) ve özelliklerini kullanmayı</li>
          <li>Varsayılan tarayıcı davranışını engellemeyi (e.preventDefault)</li>
        </ul>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-8">
        <strong>İpucu:</strong> Olay isimleri React'te her zaman camelCase ile yazılır. Örneğin HTML'de <code>onclick</code> iken, JSX'te <code>onClick</code> olur.
      </div>

      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">Olay Yönetimi (Events)</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Kullanıcı tıklar, yazar, fareyi hareket ettirir. React ile bunlara nasıl cevap vereceğiz?
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Temel Kullanım</h2>
        <p>
          HTML'deki olay dinleyicilerine çok benzerler.
          Ancak React'te string yerine bir fonksiyon referansı beklerler.
        </p>
        <CodeBlock 
          colorBorder="blue"
          code={`// HTML
<button onclick="tikla()">Tıkla</button>

// React (JSX)
<button onClick={tikla}>Tıkla</button>`}
        />
        
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-10 mt-4">
          <strong>Uyarı:</strong> Fonksiyonu çağırarak (<code>onClick=&#123;tikla()&#125;</code>) vermeyin, sadece referansını (<code>onClick=&#123;tikla&#125;</code>) verin. 
          Çağırırsanız, sayfa yüklenir yüklenmez kendi kendine çalışır!
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Sentetik Olaylar (SyntheticEvent)</h2>
        <p>
          React, tarayıcılar arasındaki farklılıkları gidermek için orijinal tarayıcı event'lerini kendi "SyntheticEvent" sarmalayıcısı içine alır. 
          Bu sayede Chrome'da çalışan kodunuz Safari'de de aynı şekilde davranır.
        </p>
        <p>
          Olay tetiklendiğinde, React fonksiyonunuza bir <code>event</code> (kısaca <code>e</code>) nesnesi gönderir.
          Bu nesnenin içinde o anki olayla ilgili çok değerli bilgiler vardır.
        </p>
        
        <DeneBox title="Canlı Fare Takibi">
          <div 
            className="w-full h-48 bg-gradient-to-br from-blue-500/10 to-violet-500/10 border-2 border-dashed border-blue-300 dark:border-blue-800 rounded-xl relative overflow-hidden cursor-crosshair"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setKonum({
                x: Math.round(e.clientX - rect.left),
                y: Math.round(e.clientY - rect.top)
              });
            }}
            onMouseLeave={() => setKonum({ x: 0, y: 0 })}
            data-testid="area-mouse-track"
          >
            {konum.x !== 0 && (
              <div 
                className="absolute w-4 h-4 bg-blue-500 rounded-full blur-[2px] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-75"
                style={{ left: konum.x, top: konum.y }}
              />
            )}
            <div className="absolute top-4 left-4 font-mono bg-background/80 px-2 py-1 rounded border shadow-sm text-sm">
              X: {konum.x} | Y: {konum.y}
            </div>
          </div>
        </DeneBox>

        <div className="mt-8"></div>

        <DeneBox title="Olay İzleyici (Event Logger)">
          <div className="flex flex-col gap-4">
            <div className="font-mono text-sm bg-muted p-2 rounded border">
              Son Olay: <strong className="text-orange-500">{lastEvent}</strong>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={logEvent} 
                onDoubleClick={logEvent}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Bana Tıkla (veya Çift Tıkla)
              </button>
              <input 
                onFocus={logEvent} 
                onBlur={logEvent}
                onChange={logEvent}
                placeholder="Bana tıkla veya yaz"
                className="px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Olay Yayılımı (Event Propagation)</h2>
        <p>Bir elemente tıkladığınızda, o olay DOM ağacında yukarı doğru (ebeveynlere) yayılır (Bubbling). İç içe elementlerde bu istenmeyen sonuçlara yol açabilir.</p>
        <CodeBlock code={`<div onClick={() => alert("Kutuya Tıklandı!")}>
  <button onClick={(e) => {
    e.stopPropagation(); // Yayılımı durdur!
    alert("Butona Tıklandı!");
  }}>
    Tıkla
  </button>
</div>`} />
        <p><code>e.stopPropagation()</code> demezseniz butona tıkladığınızda önce "Butona Tıklandı", sonra "Kutuya Tıklandı" uyarıları gelir.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">e.preventDefault()</h2>
        <p>
          Özellikle form gönderimlerinde, tarayıcının varsayılan davranışını (sayfayı yenileme) durdurmak için 
          <code>e.preventDefault()</code> kullanılır.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Klavye Olayları</h2>
        <p><code>onKeyDown</code>, <code>onKeyUp</code> gibi olaylarla kullanıcının klavyede hangi tuşlara bastığını yakalayabilirsiniz.</p>
        <DeneBox title="Key Logger Demo">
          <div className="flex flex-col gap-4 items-center">
            <input 
              type="text" 
              onKeyDown={handleKeyDown} 
              placeholder="Buraya tıklayıp yazın..." 
              className="px-4 py-2 border border-gray-300 rounded focus:border-blue-500 outline-none text-center"
            />
            <div className="flex gap-2">
              {keys.map((k, i) => (
                <div key={i} className="px-3 py-1 bg-gray-800 text-white rounded font-mono shadow-sm">
                  {k === " " ? "Space" : k}
                </div>
              ))}
              {keys.length === 0 && <span className="text-muted-foreground text-sm py-1">Tuşlar burada görünecek</span>}
            </div>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Özel Etkileşimler</h2>
        
        <DeneBox title="Çift Tıklama Sayacı">
          <div className="flex flex-col items-center gap-4 py-6">
            <div 
              onDoubleClick={() => setDoubleClickCount(prev => prev + 1)}
              className="w-40 h-40 bg-gradient-to-tr from-pink-500 to-orange-400 rounded-full flex flex-col items-center justify-center text-white cursor-pointer select-none shadow-lg hover:scale-105 transition-transform active:scale-95"
            >
              <span className="font-bold">BANA ÇİFT TIKLA</span>
              <span className="text-3xl font-black">{doubleClickCount}</span>
            </div>
          </div>
        </DeneBox>
        
        <div className="mt-8"></div>

        <DeneBox title="Fare İzi (Hover Trail)">
          <div className="flex flex-col items-center gap-4 py-12">
            <p className="text-xl font-bold text-center">
              Farenizi ekranda dolaştırın, mor izi göreceksiniz.
              <br />
              <span className="text-sm font-normal text-muted-foreground">(Bu efekt sayfa geneline bir useEffect ile eklendi)</span>
            </p>
          </div>
        </DeneBox>
      </section>

      <QuizBlock lessonKey="events" />
    </div>
  );
}