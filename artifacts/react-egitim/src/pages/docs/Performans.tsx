import { useState, useMemo, useCallback, useRef } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DeneBox } from "@/components/ui/DeneBox";
import { Button } from "@/components/ui/button";
import { QuizBlock } from "@/components/ui/QuizBlock";

export function Performans() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  // useMemo demo
  const expensiveCalculation = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < 100000; i++) sum += 1;
    return sum + count;
  }, [count]);

  return (
    <div className="max-w-3xl prose dark:prose-invert">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-blue-800 dark:text-blue-300 font-bold m-0 mb-2">Bu derste öğreneceksin:</h3>
        <ul className="list-disc pl-5 m-0 text-blue-900 dark:text-blue-200">
          <li>React neden re-render yapar?</li>
          <li>React.memo ile gereksiz render'ları önleme</li>
          <li>useMemo ile ağır hesaplamaları önbelleğe alma</li>
          <li>useCallback ile fonksiyon referanslarını sabit tutma</li>
        </ul>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-8">
        <strong>İpucu:</strong> Optimizasyonu baştan yapmayın (Premature Optimization). Sadece uygulamanız yavaşladığında veya hissedilir bir gecikme olduğunda memoization tekniklerini kullanın.
      </div>

      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">Performans Optimizasyonu</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Re-render Nedir?</h2>
        <p>Bir bileşenin state'i veya propları değiştiğinde, o bileşen (ve tüm alt bileşenleri) fonksiyon olarak baştan çalıştırılır. Buna re-render denir.</p>
        <DeneBox title="Render Sayacı">
          <div className="p-4 border rounded flex flex-col gap-4">
            <p>Bu bileşen <strong>{renderCountRef.current}</strong> kez render edildi.</p>
            <div className="flex gap-2">
              <Button onClick={() => setCount(c => c + 1)}>Sayacı Arttır ({count})</Button>
              <input 
                type="text" 
                value={text} 
                onChange={e => setText(e.target.value)} 
                className="border p-2 rounded" 
                placeholder="Yazı yazın..."
              />
            </div>
            <p className="text-sm text-gray-500">Her iki eylem de tüm bileşeni yeniden çizer.</p>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">React.memo</h2>
        <p>Alt bileşenin propları DEĞİŞMEDİYSE yeniden çizilmesini engeller.</p>
        <CodeBlock 
          title="React.memo Kullanımı"
          colorBorder="blue"
          code={"import { memo } from 'react';\n\nconst ChildComponent = memo(function Child({ name }) {\n  console.log('Sadece name değişince çalışırım!');\n  return <div>{name}</div>;\n});"}
        />
      </section>

      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-10">
        <strong>Uyarı:</strong> React objeleri ve fonksiyonları her render'da yeni referanslarla oluşturur. Eğer alt bileşene `onClick={"{{() => ...}}"}` gönderiyorsanız prop değişmiş sayılır ve React.memo işe yaramaz. Bu yüzden useCallback gerekir.
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">useMemo</h2>
        <p>Maliyetli (ağır) hesaplamaların sonuçlarını önbellekte tutar (cache).</p>
        <CodeBlock 
          title="useMemo"
          colorBorder="green"
          code={"const sortedList = useMemo(() => {\n  return heavySortingOperation(items);\n}, [items]); // sadece items değişirse hesaplar"}
        />
        <DeneBox title="useMemo Demo">
          <div className="p-4 border rounded">
            <p>Hesaplanan Değer: <strong>{expensiveCalculation}</strong></p>
            <Button onClick={() => setCount(c => c + 1)} className="mt-2">Hesaplamayı Tetikle</Button>
            <p className="text-xs mt-2 text-muted-foreground">Bu hesaplama sadece sayaç değiştiğinde çalışır, metin kutusuna yazı yazıldığında (text değiştiğinde) eski değeri hatırlar.</p>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">useCallback</h2>
        <p>Fonksiyon referanslarını önbelleğe alır. Özellikle React.memo ile sarılmış alt bileşenlere fonksiyon geçerken çok önemlidir.</p>
        <CodeBlock 
          title="useCallback"
          colorBorder="violet"
          code={"const handleSubmit = useCallback((data) => {\n  api.post(data);\n}, []);\n\n// handleSubmit referansı hiç değişmez.\n<MemoizedForm onSubmit={handleSubmit} />"}
        />
        <DeneBox title="Uygulama İpuçları">
          <ul className="list-disc pl-5">
            <li>Tüm app'i useMemo/useCallback ile sarmalamayın (Okunabilirliği bozar, bellek harcar).</li>
            <li>Listelerde `key` prop'unu doğru vermek (index yerine id kullanmak) en iyi performans optimizasyonudur.</li>
          </ul>
        </DeneBox>
      </section>

      <QuizBlock lessonKey="performans" />
    </div>
  );
}
