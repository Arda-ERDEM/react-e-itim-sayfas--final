import React, { useState } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DeneBox } from "@/components/ui/DeneBox";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { QuizBlock } from "@/components/ui/QuizBlock";

export function Jsx() {
  const [showJsx, setShowJsx] = useState(true);
  const [demoState, setDemoState] = useState<'loading' | 'error' | 'success'>('success');
  const [listItems, setListItems] = useState(['Elma', 'Armut']);
  const [newItem, setNewItem] = useState('');

  return (
    <div className="max-w-3xl prose dark:prose-invert">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-blue-800 dark:text-blue-300 font-bold m-0 mb-2">Bu derste öğreneceksin:</h3>
        <ul className="list-disc pl-5 m-0 text-blue-900 dark:text-blue-200">
          <li>JSX'in ne olduğunu ve nasıl çalıştığını</li>
          <li>JSX'in altın kurallarını (Tek ebeveyn, kapanan etiketler)</li>
          <li>HTML ve JSX farklarını (camelCase isimlendirme)</li>
          <li>JSX içine dinamik JavaScript değerleri koymayı</li>
        </ul>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-8">
        <strong>İpucu:</strong> JSX yazarken süslü parantezlerin `{ }` içi, JavaScript evrenine açılan bir penceredir!
      </div>

      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">JSX'i Anlamak</h1>
      <p className="text-xl text-muted-foreground mb-8">
        JavaScript içinde HTML yazmak mı? İlk başta delice gelebilir, ama JSX'e aşık olacaksınız.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">JSX Nedir?</h2>
        <p>
          JSX, JavaScript'in bir sözdizimi (syntax) uzantısıdır. UI öğelerini görsel olarak oluşturmamıza izin verir,
          ancak arka planda tamamen JavaScript'in gücünü taşır.
        </p>
        <CodeBlock 
          title="JSX Örneği"
          code={`const baslik = <h1 className="renkli">Merhaba Dünya</h1>;`}
        />
        <p className="mt-4">
          Bu ne tam HTML'dir, ne de tam bir string. React bu yapıyı anlar ve DOM'a dönüştürür.
        </p>

        <DeneBox title="HTML vs JSX Karşılaştırması">
          <div className="flex flex-col gap-4">
            <Button onClick={() => setShowJsx(!showJsx)} variant="outline">
              Görünümü Değiştir: {showJsx ? "JSX" : "HTML"}
            </Button>
            <CodeBlock 
              language="html"
              code={showJsx ? 
`<div className="kart" onClick={tikla}>\n  <br />\n  <label htmlFor="isim">İsim</label>\n  <input tabIndex="1" />\n</div>` 
                : 
`<div class="kart" onclick="tikla()">\n  <br>\n  <label for="isim">İsim</label>\n  <input tabindex="1">\n</div>`
              }
            />
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">JSX Kuralları Tam Listesi</h2>
        <p>JSX yazarken uymanız gereken kesin kurallar vardır. Bunlara uymazsanız derleme hatası alırsınız.</p>
        
        <div className="space-y-8 mt-6">
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">Kural 1</span> Sadece TEK BİR ana (root) kapsayıcı döndürebilirsiniz</h3>
            <p className="mt-2 text-sm">Bir bileşenden birden fazla etiket döndüremezsiniz. Hepsini saran bir ana etiket olmalıdır.</p>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div className="border border-red-200 bg-red-50/50 p-4 rounded-md">
                <span className="text-sm font-bold text-red-500 mb-2 block">❌ Hatalı</span>
                <code className="text-sm">
                  return (<br/>
                  &nbsp;&nbsp;&lt;h1&gt;Selam&lt;/h1&gt;<br/>
                  &nbsp;&nbsp;&lt;p&gt;Naber?&lt;/p&gt;<br/>
                  );
                </code>
              </div>
              <div className="border border-green-200 bg-green-50/50 p-4 rounded-md">
                <span className="text-sm font-bold text-green-600 mb-2 block">✅ Doğru</span>
                <code className="text-sm">
                  return (<br/>
                  &nbsp;&nbsp;&lt;div&gt;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;Selam&lt;/h1&gt;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;Naber?&lt;/p&gt;<br/>
                  &nbsp;&nbsp;&lt;/div&gt;<br/>
                  );
                </code>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2"><span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm">Kural 2</span> Bütün etiketler kapatılmalıdır</h3>
            <p className="mt-2 text-sm">HTML'de <code>&lt;br&gt;</code> veya <code>&lt;input&gt;</code> kapatılmadan yazılabilir ama JSX'te self-closing (kendi kendine kapanan) etiketlerin sonuna <code>/</code> konulmalıdır.</p>
            <CodeBlock colorBorder="orange" code={`// HTML: <img src="logo.png">\n// JSX:  <img src="logo.png" />`} />
          </div>

          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">Kural 3</span> Özellik (attribute) isimleri camelCase yazılır</h3>
            <p className="mt-2 text-sm">JSX aslında JavaScript'e dönüştüğü için değişken isimlendirme kuralları geçerlidir. Tire (dash) içeren isimler bitişik ve ikinci kelimenin baş harfi büyük yazılır.</p>
            <ul className="list-none text-sm space-y-1 mt-2 p-4 bg-muted/30 rounded font-mono">
              <li>onclick → <strong>onClick</strong></li>
              <li>tabindex → <strong>tabIndex</strong></li>
              <li>stroke-width → <strong>strokeWidth</strong></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2"><span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">Kural 4</span> class yerine className, for yerine htmlFor kullanılır</h3>
            <p className="mt-2 text-sm"><code>class</code> ve <code>for</code> kelimeleri JavaScript'te ayrılmış kelimeler (reserved words) oldukları için JSX içinde kullanılamazlar.</p>
            <CodeBlock colorBorder="violet" code={`// HTML: <label for="isim" class="kirmizi">İsim</label>\n// JSX:  <label htmlFor="isim" className="kirmizi">İsim</label>`} />
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Parçalar (Fragments)</h2>
        <p>
          Kurallarda bahsettiğimiz gibi, birden fazla öğe döndürmek için bir kapsayıcıya ihtiyaç vardır. Fakat sırf bu kural yüzünden HTML yapımızı gereksiz <code>&lt;div&gt;</code> etiketleriyle doldurmak istemeyiz (div soup - div çorbası). 
        </p>
        <p className="mt-2">
          İşte bu durumda <strong>Fragment</strong> kullanırız. DOM'da hiçbir iz bırakmayan, sadece React'in kurallarını tatmin eden hayalet bir kapsayıcıdır.
        </p>
        <CodeBlock 
          title="Fragment Kullanımı"
          code={`import { Fragment } from "react";\n\n// Uzun yazım\nreturn (\n  <Fragment>\n    <li>Elma</li>\n    <li>Armut</li>\n  </Fragment>\n);\n\n// Kısa yazım (En çok tercih edilen)\nreturn (\n  <>\n    <li>Elma</li>\n    <li>Armut</li>\n  </>\n);`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">JSX vs createElement</h2>
        <p>
          Aslında JSX kullanmak zorunda değilsiniz. Tarayıcı JSX'i anlamaz; derleyiciniz (Vite/Babel) siz projeyi kaydettiğinizde tüm JSX'i JavaScript'in yerleşik <code>React.createElement()</code> fonksiyonlarına çevirir. 
          JSX sadece bizim kodu okumamızı ve yazmamızı kolaylaştıran bir "şeker"dir (syntactic sugar).
        </p>
        <CodeBlock 
          title="Kaputun Altında Ne Oluyor?"
          colorBorder="yellow"
          code={`// Bizim Yazdığımız (JSX)\nconst element = (\n  <h1 className="baslik">\n    Merhaba Dünya\n  </h1>\n);\n\n// Derlendikten Sonraki Hali (JavaScript)\nconst element = React.createElement(\n  "h1",\n  { className: "baslik" },\n  "Merhaba Dünya"\n);`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">JSX İçinde JavaScript (Expressions)</h2>
        <p>
          JSX'in en büyük gücü, süslü parantezler <code>{`{}`}</code> içinde dilediğiniz JavaScript ifadesini (expression) çalıştırabilmenizdir.
        </p>
        <CodeBlock 
          title="Değişken Enjeksiyonu"
          colorBorder="rainbow"
          code={`function Profil() {\n  const isim = "Ayşe";\n  const yas = 25;\n\n  return (\n    <div>\n      <h2>Benim adım {isim}</h2>\n      <p>Önümüzdeki yıl {yas + 1} yaşında olacağım.</p>\n      <p>Büyük harfle: {isim.toUpperCase()}</p>\n    </div>\n  );\n}`}
        />
        
        <DeneBox title="İfade Oyna Alanı">
          <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-6 rounded-lg text-center font-mono">
            <div>2 + 2 = <span className="text-yellow-300 font-bold text-2xl">{2 + 2}</span></div>
            <div className="mt-2">Rastgele Sayı: <span className="text-pink-300 font-bold text-2xl">{Math.floor(Math.random() * 100)}</span></div>
            <div className="mt-2">Şu anki yıl: <span className="text-green-300 font-bold text-2xl">{new Date().getFullYear()}</span></div>
          </div>
        </DeneBox>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">JSX'te Yorum Satırları</h2>
        <p>JSX içinde normal JavaScript veya HTML yorumları (<code>&lt;!-- --&gt;</code>) çalışmaz. Süslü parantezler içinde JavaScript yorum operatörlerini kullanmalısınız.</p>
        <CodeBlock 
          code={`return (\n  <div>\n    {/* Bu bir JSX yorumudur. Ekranda görünmez. */}\n    <h1>Başlık</h1>\n  </div>\n);`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Koşullu Render ve Döngüler</h2>
        <p>JSX içinde if/else blokları veya for döngüleri YAZAMAZSINIZ (çünkü bunlar expression değil, statement'tır). Bunlar yerine kısa devre (short-circuit), ternary operatörü ve <code>map()</code> metodu kullanılır.</p>
        
        <DeneBox title="Koşullu Render (Ternary & Mantıksal VE)">
          <div className="flex flex-col gap-6">
            <div className="flex justify-center gap-4">
              <Button variant={demoState === 'loading' ? 'default' : 'outline'} onClick={() => setDemoState('loading')}>Yükleniyor</Button>
              <Button variant={demoState === 'error' ? 'destructive' : 'outline'} onClick={() => setDemoState('error')}>Hata</Button>
              <Button variant={demoState === 'success' ? 'default' : 'outline'} className={demoState === 'success' ? 'bg-green-600' : ''} onClick={() => setDemoState('success')}>Başarılı</Button>
            </div>
            
            <div className="p-8 border rounded-lg flex items-center justify-center min-h-[120px] bg-card text-card-foreground">
              {demoState === 'loading' && (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              )}
              
              {demoState === 'error' && (
                <div className="text-red-500 flex items-center gap-2 font-bold">
                  <span>⚠️</span> Bir şeyler ters gitti!
                </div>
              )}
              
              {demoState === 'success' ? (
                <div className="text-green-600 flex items-center gap-2 font-bold">
                  <span>🎉</span> Veriler başarıyla yüklendi.
                </div>
              ) : null}
            </div>
            
            <CodeBlock 
              code={`// Nasıl yazıldı?\n{demoState === 'loading' && <Spinner />}\n\n{demoState === 'success' \n  ? <SuccessMessage /> \n  : null\n}`}
            />
          </div>
        </DeneBox>

        <div className="mt-8"></div>

        <DeneBox title="JSX İçinde Liste (map)">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Input 
                value={newItem} 
                onChange={(e) => setNewItem(e.target.value)} 
                placeholder="Yeni öğe yazın" 
              />
              <Button onClick={() => {
                if(newItem) { setListItems([...listItems, newItem]); setNewItem(''); }
              }}>Ekle</Button>
            </div>
            
            <div className="bg-muted p-4 rounded-md">
              <ul className="list-disc pl-5 space-y-1">
                {listItems.map((item, index) => (
                  <li key={index} className="font-medium">{item}</li>
                ))}
              </ul>
            </div>
            
            <CodeBlock code={`<ul>\n  {listItems.map((item, index) => (\n    <li key={index}>{item}</li>\n  ))}\n</ul>`} />
          </div>
        </DeneBox>
      </section>

      <QuizBlock lessonKey="jsx" />
    </div>
  );
}