import { useState } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DeneBox } from "@/components/ui/DeneBox";
import { QuizBlock } from "@/components/ui/QuizBlock";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

function ProfilKarti({ isim, rol, emoji, opacity = 100 }: { isim: string, rol: string, emoji: string, opacity?: number }) {
  return (
    <div 
      className="border rounded-lg p-4 shadow-sm bg-white dark:bg-black/20 flex items-center gap-4 transition-opacity"
      style={{ opacity: opacity / 100 }}
    >
      <div className="text-4xl">{emoji}</div>
      <div>
        <h4 className="font-bold text-lg">{isim}</h4>
        <p className="text-muted-foreground text-sm">{rol}</p>
      </div>
    </div>
  );
}

function Pencerem({ baslik, children }: { baslik: string, children: React.ReactNode }) {
  return (
    <div className="border rounded-md shadow-lg overflow-hidden bg-card">
      <div className="bg-muted px-4 py-2 border-b flex items-center justify-between">
        <span className="font-bold text-sm">{baslik}</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

function VaryantButon({ variant, children }: { variant: 'primary' | 'secondary' | 'danger', children: React.ReactNode }) {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors";
  let variantClasses = "";
  
  if (variant === 'primary') variantClasses = "bg-blue-600 hover:bg-blue-700 text-white";
  else if (variant === 'secondary') variantClasses = "bg-gray-200 hover:bg-gray-300 text-gray-900";
  else if (variant === 'danger') variantClasses = "bg-red-600 hover:bg-red-700 text-white";

  return <button className={baseClasses + " " + variantClasses}>{children}</button>;
}

export function Componentler() {
  const [sliderVal, setSliderVal] = useState(100);

  return (
    <div className="max-w-3xl prose dark:prose-invert">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-blue-800 dark:text-blue-300 font-bold m-0 mb-2">Bu derste öğreneceksin:</h3>
        <ul className="list-disc pl-5 m-0 text-blue-900 dark:text-blue-200">
          <li>Bileşenlerin (Components) ne olduğunu</li>
          <li>Kendi bileşenini nasıl oluşturacağını</li>
          <li>Props (Özellikler) kullanarak veri aktarımını</li>
          <li>children prop'unun gücünü</li>
        </ul>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-8">
        <strong>İpucu:</strong> Props verileri, her zaman Parent (Ebeveyn) bileşenden Child (Çocuk) bileşene doğru tek yönlü akar.
      </div>

      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">Componentler (Bileşenler)</h1>
      <p className="text-xl text-muted-foreground mb-8">
        React uygulamanızın yapı taşları. Legolarla bir şato inşa etmek gibi düşünün.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Bileşen Nedir?</h2>
        <p>
          Bileşen (Component), uygulamanızın bağımsız ve tekrar kullanılabilir bir parçasıdır.
          Buton bir bileşen olabilir, bir profil kartı, veya tüm sayfanın kendisi.
        </p>
        <p>
          Teknik olarak, React'te bir bileşen <strong>Büyük Harfle Başlayan</strong> ve JSX döndüren bir JavaScript fonksiyonudur.
        </p>
        <CodeBlock 
          title="Dugme.jsx"
          code={`function Dugme() {
  return <button className="btn">Tıkla Bana</button>;
}`}
        />
      </section>

      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-10">
        <strong>Uyarı:</strong> Bileşen isimleri DAİMA Büyük Harfle başlamalıdır. Eğer fonksiyonu küçük harfle (dugme) başlatırsanız, React bunun standart bir HTML etiketi olduğunu sanır ve hata verir!
      </div>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Bileşen İsimlendirme Kuralları</h2>
        <p>React topluluğunda kabul görmüş standartlar şunlardır:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li><strong>PascalCase:</strong> Dosya isimleri ve fonksiyon isimleri ilk harfi büyük başlar. (Örn: <code>UserProfile.jsx</code>, <code>ShoppingCart</code>)</li>
          <li><strong>Tekil İsimler:</strong> Bileşenler genelde tekil nesneleri temsil eder. Listenin kendisi <code>UserList</code>, içindeki her bir eleman <code>UserCard</code> olarak isimlendirilir.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Props: Bileşenlere Veri Göndermek</h2>
        <p>
          Bileşenler arası veri aktarımına <strong>Props</strong> diyoruz. HTML'deki "attribute"lara (örn: src, alt, class) benzer.
        </p>
        <CodeBlock 
          title="App.jsx"
          colorBorder="orange"
          code={`function ProfilKarti(props) {
  return (
    <div className="kart">
      <h3>{props.isim}</h3>
      <p>{props.meslek}</p>
    </div>
  );
}

function Uygulama() {
  return (
    <div>
      <ProfilKarti isim="Ali" meslek="Frontend Geliştirici" />
      <ProfilKarti isim="Zeynep" meslek="UX Tasarımcı" />
    </div>
  );
}`}
        />
        
        <div className="mt-8">
          <DeneBox title="Canlı Props Örneği">
            <div className="grid sm:grid-cols-2 gap-4">
              <ProfilKarti isim="Ece Gök" rol="Senior React Dev" emoji="👩‍💻" />
              <ProfilKarti isim="Can Yıldız" rol="UI Tasarımcı" emoji="🎨" />
              <ProfilKarti isim="Ahmet Çelik" rol="Backend Uzmanı" emoji="⚙️" />
            </div>
          </DeneBox>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Props Derinlemesine</h2>
        <p>Props ile sadece metin değil, her türlü veriyi (sayı, boolean, nesne, dizi, hatta fonksiyon) gönderebilirsiniz.</p>
        
        <h3 className="text-xl mt-6 mb-2">Destructuring (Parçalama)</h3>
        <p>
          <code>props.isim</code>, <code>props.meslek</code> yazmak yerine, parametre kısmında doğrudan değişkenleri alabiliriz.
          Bu React'te çok yaygın bir kalıptır.
        </p>
        <CodeBlock 
          title="Temiz Versiyon"
          colorBorder="green"
          code={`function ProfilKarti({ isim, meslek }) {
  return (
    <div className="kart">
      <h3>{isim}</h3>
      <p>{meslek}</p>
    </div>
  );
}`}
        />

        <h3 className="text-xl mt-6 mb-2">Varsayılan Props (Default Props)</h3>
        <p>Eğer parent bileşen bir prop göndermeyi unutursa, child bileşende hata almamak için ona varsayılan bir değer atayabiliriz.</p>
        <CodeBlock 
          code={`// Eğer tema gönderilmezse varsayılan olarak 'light' olur
function Baslik({ yazi, tema = "light" }) {
  return <h1 className={tema}>{yazi}</h1>;
}`}
        />

        <DeneBox title="Props Oyun Alanı">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold">Saydamlık Prop'u Değeri: {sliderVal}%</label>
              <Slider 
                value={[sliderVal]} 
                onValueChange={(val) => setSliderVal(val[0])} 
                max={100} 
                min={0}
                step={1}
              />
            </div>
            
            <div className="p-4 bg-muted rounded-lg flex justify-center">
              <div className="w-full max-w-sm">
                <ProfilKarti isim="Dinamik Kart" rol="Opaklık değeri parent'tan geliyor" emoji="🎚️" opacity={sliderVal} />
              </div>
            </div>
            <CodeBlock code={`<ProfilKarti opacity={${sliderVal}} />`} />
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Children Prop (Slot Pattern)</h2>
        <p>
          Bazen bir bileşenin içine başka bileşenler koymak isteriz, tıpkı HTML'deki <code>&lt;div&gt;...içerik...&lt;/div&gt;</code> gibi.
          Bunun için özel bir prop olan <strong><code>children</code></strong> kullanılır.
        </p>
        <p>
          Bu desen (pattern), kapsayıcı (wrapper) bileşenler oluşturmak için mükemmeldir. Modal kutuları, sayfaların layoutları veya özel tasarımlı kartlar bu yöntemle yapılır.
        </p>
        <CodeBlock 
          code={`function UyariKutusu({ children }) {
  return (
    <div className="bg-yellow-100 p-4 border border-yellow-400">
      {children}
    </div>
  );
}

// Kullanımı:
<UyariKutusu>
  <h4>Dikkat!</h4>
  <p>Şifreniz çok zayıf.</p>
</UyariKutusu>`}
        />

        <div className="mt-8">
          <DeneBox title="Children Composition Örneği">
            <div className="space-y-4">
              <Pencerem baslik="Sistem Uyarıları">
                <p className="text-sm">Disk alanı azalıyor. Lütfen gereksiz dosyaları temizleyin.</p>
                <Button variant="outline" size="sm" className="mt-2">Temizliği Başlat</Button>
              </Pencerem>

              <Pencerem baslik="Mesajlar">
                <ul className="list-disc pl-5 text-sm">
                  <li><strong>Ahmet:</strong> Toplantı saat 14:00'te</li>
                  <li><strong>Zeynep:</strong> Dosyaları gönderdim</li>
                </ul>
              </Pencerem>
            </div>
          </DeneBox>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Kompozisyon vs Kalıtım (Composition vs Inheritance)</h2>
        <p>
          Nesne Yönelimli Programlama (OOP) dillerinden gelenler (Java, C#) sınıf kalıtımına (Inheritance) alışkındır. Fakat React, kodu tekrar kullanmak için her zaman <strong>Kompozisyonu (Composition)</strong> tavsiye eder.
        </p>
        <p>
          Kalıtım yapmak yerine, bileşenleri Lego parçaları gibi birbirinin içine yerleştirerek (children kullanarak veya prop olarak başka componentler geçirerek) devasa sistemler kurabilirsiniz.
        </p>
        
        <DeneBox title="Kompozisyon (Varyant) Örneği">
          <div className="flex gap-4 p-4 border rounded bg-card justify-center">
            <VaryantButon variant="primary">Kaydet</VaryantButon>
            <VaryantButon variant="secondary">İptal</VaryantButon>
            <VaryantButon variant="danger">Sil</VaryantButon>
          </div>
          <div className="mt-4">
            <CodeBlock code={`<VaryantButon variant="primary">Kaydet</VaryantButon>\n<VaryantButon variant="secondary">İptal</VaryantButon>\n<VaryantButon variant="danger">Sil</VaryantButon>`} />
          </div>
        </DeneBox>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Kontrollü ve Kontrolsüz Bileşenler Kavramı</h2>
        <p>
          React terminolojisinde çok sık duyacağınız iki kavramdır:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><strong>Controlled Component (Kontrollü):</strong> Bileşenin içinde kendi state'i yoktur. Tüm veriyi parent'tan prop olarak alır ve değişikliği parent'a fonksiyonla bildirir. (Örn: Yukarıdaki ProfilKarti). Saf ve tahmin edilebilirdir.</li>
          <li><strong>Uncontrolled Component (Kontrolsüz):</strong> Kendi iç durumunu (state) kendi yöneten bağımsız bileşenlerdir. İçine karışılmaz, kendi kendine çalışır.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Bileşen Yaşam Döngüsü (Kısaca)</h2>
        <p>Her bileşenin bir yaşamı vardır. Doğar, yaşar ve ölür.</p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><strong>Mounting (Doğuş):</strong> Bileşen ilk kez DOM'a eklendiğinde.</li>
          <li><strong>Updating (Yaşam/Güncellenme):</strong> Props veya State değiştiğinde bileşenin baştan çizilmesi (re-render).</li>
          <li><strong>Unmounting (Ölüm):</strong> Bileşen DOM'dan kaldırıldığında (başka sayfaya geçiş vb.).</li>
        </ul>
        <p className="mt-4 text-sm text-muted-foreground italic">Not: Bu yaşam döngüsü anlarında bazı işlemleri tetiklemek için bir sonraki konularda göreceğimiz useEffect hook'unu kullanacağız.</p>
      </section>

      <QuizBlock lessonKey="componentler" />
    </div>
  );
}