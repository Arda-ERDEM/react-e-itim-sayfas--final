import { useState } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DeneBox } from "@/components/ui/DeneBox";
import { Button } from "@/components/ui/button";
import { QuizBlock } from "@/components/ui/QuizBlock";

export function StilYonetimi() {
  const [r, setR] = useState(100);
  const [g, setG] = useState(150);
  const [b, setB] = useState(255);
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="max-w-3xl prose dark:prose-invert">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-blue-800 dark:text-blue-300 font-bold m-0 mb-2">Bu derste öğreneceksin:</h3>
        <ul className="list-disc pl-5 m-0 text-blue-900 dark:text-blue-200">
          <li>Inline Styles kullanımı</li>
          <li>CSS Modules ile izole stiller</li>
          <li>Tailwind CSS ile utility sınıfları</li>
          <li>Conditional (Koşullu) sınıf atamaları ve cn() utility</li>
        </ul>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-8">
        <strong>İpucu:</strong> Modern React projelerinde çoğunlukla Tailwind CSS veya CSS Modules (ya da Styled Components) tercih edilir. Düz CSS dosyaları çakışmalara yol açabilir.
      </div>

      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">Stil Yönetimi</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Inline Styles (Satıriçi Stiller)</h2>
        <p>JavaScript objesi olarak yazılırlar. Özellik isimleri camelCase olmalıdır (örn: <code>backgroundColor</code>).</p>
        <CodeBlock 
          title="Inline Style"
          colorBorder="blue"
          code={"const pStili = {\n  fontSize: '18px',\n  marginTop: 20 // birim yazılmazsa px sayılır\n};\n\n<p style={pStili}>Merhaba</p>\n<div style={{ color: 'red' }}>Kırmızı</div>"}
        />
        <DeneBox title="Dinamik Inline Style (Renk Karıştırıcı)">
          <div className="flex flex-col gap-4">
            <div className="h-24 rounded-lg shadow-inner transition-colors" style={{ backgroundColor: "rgb(" + r + "," + g + "," + b + ")" }}></div>
            <div className="flex gap-4 items-center">
              <span className="text-red-500 font-bold w-4">R</span>
              <input type="range" min="0" max="255" value={r} onChange={e => setR(Number(e.target.value))} className="flex-1" />
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-green-500 font-bold w-4">G</span>
              <input type="range" min="0" max="255" value={g} onChange={e => setG(Number(e.target.value))} className="flex-1" />
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-blue-500 font-bold w-4">B</span>
              <input type="range" min="0" max="255" value={b} onChange={e => setB(Number(e.target.value))} className="flex-1" />
            </div>
          </div>
        </DeneBox>
      </section>

      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-10">
        <strong>Uyarı:</strong> Çok fazla Inline Style kullanmak kodu okunmaz hale getirir ve hover (:hover) veya media queries (@media) gibi özellikleri desteklemez.
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Tailwind CSS ve Utility Sınıfları</h2>
        <p>Tailwind CSS önceden tanımlanmış küçük parçalar halinde class'lar sunar. React ile mükemmel uyumludur çünkü stiller için dosyalar arasında gidip gelmeniz gerekmez.</p>
        <CodeBlock 
          title="Tailwind Örneği"
          colorBorder="green"
          code={"<button className=\"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded\">\n  Gönder\n</button>"}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Koşullu Sınıflar (Conditional Classes)</h2>
        <p>React'te state'e göre sınıf değiştirmek çok yaygındır. <code>cn()</code> veya <code>clsx</code> araçları işi kolaylaştırır.</p>
        <CodeBlock 
          title="Koşullu Class Ekleme"
          colorBorder="orange"
          code={"// Kötü yöntem (Template literals riskli olabilir)\n<div className={`btn ${isActive ? 'active' : ''}`}>\n\n// İyi yöntem (cn veya clsx)\n<div className={cn(\"btn\", isActive && \"active\")}>"}
        />
        <DeneBox title="Dark / Light Card Toggle">
          <div className={"p-6 rounded-xl transition-colors duration-300 " + (isDark ? "bg-slate-800 text-white" : "bg-white text-slate-800 border")}>
            <h3 className="text-xl font-bold mb-2">Tema Kartı</h3>
            <p className="mb-4 text-sm opacity-80">Şu anda {isDark ? "koyu" : "açık"} temadasınız.</p>
            <Button variant={isDark ? "secondary" : "default"} onClick={() => setIsDark(!isDark)}>
              Temayı Değiştir
            </Button>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Animasyonlar</h2>
        <p>React'te basit animasyonlar Tailwind'in <code>transition</code> sınıflarıyla yapılır. Kompleks animasyonlar için <strong>Framer Motion</strong> tavsiye edilir.</p>
        <CodeBlock 
          title="Hover ve Transition"
          colorBorder="violet"
          code={"<div className=\"transform transition-all duration-300 hover:scale-110 hover:-translate-y-2\">\n  Havalanan Kart\n</div>"}
        />
        <DeneBox title="Transition Demo">
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-blue-500 rounded flex items-center justify-center text-white cursor-pointer transition-colors hover:bg-blue-700">
              Renk
            </div>
            <div className="w-24 h-24 bg-green-500 rounded flex items-center justify-center text-white cursor-pointer transform transition-transform hover:scale-110">
              Büyüme
            </div>
            <div className="w-24 h-24 bg-violet-500 rounded flex items-center justify-center text-white cursor-pointer transform transition-all duration-500 hover:rotate-180 hover:rounded-full">
              Dönüşüm
            </div>
          </div>
        </DeneBox>
      </section>

      <QuizBlock lessonKey="stil" />
    </div>
  );
}
