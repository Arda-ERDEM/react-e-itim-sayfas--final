import { useState, useMemo } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DeneBox } from "@/components/ui/DeneBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuizBlock } from "@/components/ui/QuizBlock";
import { ChevronDown, ChevronUp } from "lucide-react";

export function Listeler() {
  const [meyveler, setMeyveler] = useState([
    { id: 1, ad: "Elma", renk: "bg-red-500", stok: 15 },
    { id: 2, ad: "Muz", renk: "bg-yellow-500", stok: 5 },
    { id: 3, ad: "Kivi", renk: "bg-green-500", stok: 0 },
  ]);
  const [goster, setGoster] = useState(true);
  const [yeniMeyve, setYeniMeyve] = useState("");
  const [aramaMetni, setAramaMetni] = useState("");
  const [siralamaYonu, setSiralamaYonu] = useState<'asc' | 'desc'>('asc');
  
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const meyveEkle = () => {
    if (!yeniMeyve.trim()) return;
    setMeyveler([...meyveler, { id: Date.now(), ad: yeniMeyve, renk: "bg-blue-500", stok: 10 }]);
    setYeniMeyve("");
  };

  const filtrelenmisMeyveler = useMemo(() => {
    let sonuc = meyveler.filter(m => m.ad.toLowerCase().includes(aramaMetni.toLowerCase()));
    
    sonuc.sort((a, b) => {
      if (siralamaYonu === 'asc') return a.ad.localeCompare(b.ad);
      return b.ad.localeCompare(a.ad);
    });
    
    return sonuc;
  }, [meyveler, aramaMetni, siralamaYonu]);

  const sssVerisi = [
    { id: 1, soru: "React ücretsiz mi?", cevap: "Evet, React açık kaynaklı ve ücretsizdir." },
    { id: 2, soru: "JSX zorunlu mu?", cevap: "Zorunlu değil ama kesinlikle önerilir. JSX olmadan React yazmak eziyettir." },
    { id: 3, soru: "Component isimleri büyük harfle mi başlamalı?", cevap: "Evet, küçük harfle başlayanlar HTML etiketi sayılır." }
  ];

  return (
    <div className="max-w-3xl prose dark:prose-invert">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-blue-800 dark:text-blue-300 font-bold m-0 mb-2">Bu derste öğreneceksin:</h3>
        <ul className="list-disc pl-5 m-0 text-blue-900 dark:text-blue-200">
          <li>Dizileri .map() ile JSX'e çevirmeyi</li>
          <li>Key prop'unun önemini ve neden kullanılması gerektiğini</li>
          <li>Koşullu render (conditional rendering) yapmayı</li>
          <li>Listeye dinamik olarak eleman eklemeyi</li>
        </ul>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-8">
        <strong>İpucu:</strong> Map fonksiyonu her zaman bir dizi döndürür. React, dizilerin içindeki JSX elemanlarını otomatik olarak ekrana çizer.
      </div>

      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">Listeler ve Keyler</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Veri dizilerini ekrana dökmek (render etmek) React'te en sık yapacağınız işlemlerden biridir.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Dizileri Map'lemek</h2>
        <p>
          JavaScript'in yerleşik <code>.map()</code> fonksiyonunu kullanarak veri dizilerini JSX elemanlarına dönüştürürüz.
        </p>
        <CodeBlock 
          title="Liste Render Etme"
          colorBorder="blue"
          code={`const sehirler = ["İstanbul", "Ankara", "İzmir"];

function SehirListesi() {
  return (
    <ul>
      {sehirler.map((sehir) => (
        <li key={sehir}>{sehir}</li>
      ))}
    </ul>
  );
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Key (Anahtar) Prop'u Derinlemesine</h2>
        <p>
          Dikkat ettiyseniz yukarıdaki örnekte <code>&lt;li key=&#123;sehir&#125;&gt;</code> yazdık. 
          React, bir listede hangi öğenin değiştiğini, eklendiğini veya silindiğini takip etmek için <strong>benzersiz bir kimliğe (key)</strong> ihtiyaç duyar.
        </p>
        <p>Key kuralları:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Kardeş elemanlar arasında <strong>benzersiz (unique)</strong> olmalıdır.</li>
          <li>Zaman içinde <strong>değişmemelidir</strong>.</li>
        </ul>
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-10 mt-4 text-sm">
          <strong className="text-red-600 block mb-1">Neden "index" kullanmak kötüdür?</strong>
          Eğer dizinin indexini (0,1,2) key olarak kullanırsanız ve listenin başına yeni bir eleman eklerseniz, tüm elemanların indexi değişir. React tüm listeyi baştan çöpe atıp yeniden oluşturur (performans kaybı) veya input odaklanmaları (focus) gibi durumları karıştırabilir. Veritabanından gelen benzersiz ID'leri veya UUID gibi kütüphaneleri kullanın.
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Filtreleme ve Arama</h2>
        <p>Verileri ekrana basmadan önce <code>.filter()</code> fonksiyonu ile filtreleyebiliriz.</p>
        
        <DeneBox title="Aramalı ve Sıralanabilir Liste">
          <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
            <div className="flex gap-2 w-full">
              <Input 
                value={aramaMetni} 
                onChange={(e) => setAramaMetni(e.target.value)} 
                placeholder="Meyve ara..." 
                className="flex-1"
              />
              <Button 
                variant="secondary" 
                onClick={() => setSiralamaYonu(prev => prev === 'asc' ? 'desc' : 'asc')}
                title="A-Z / Z-A Sırala"
              >
                {siralamaYonu === 'asc' ? 'A-Z' : 'Z-A'}
              </Button>
            </div>

            <ul className="w-full space-y-2">
              {filtrelenmisMeyveler.map(m => (
                <li key={m.id} className="flex items-center justify-between p-3 bg-muted rounded-md shadow-sm border">
                  <div className="flex items-center gap-3">
                    <div className={"w-4 h-4 rounded-full " + m.renk} />
                    <span className="font-medium">{m.ad}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Stok: {m.stok}</span>
                </li>
              ))}
              {filtrelenmisMeyveler.length === 0 && (
                <li className="text-center py-4 text-muted-foreground italic">Sonuç bulunamadı.</li>
              )}
            </ul>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Çok Boyutlu (Nested) Listeler</h2>
        <p>Eğer listenizdeki her bir elemanın içinde başka listeler varsa, iç içe map kullanabilirsiniz.</p>
        <CodeBlock code={`<ul>
  {kategoriler.map(kategori => (
    <li key={kategori.id}>
      <h3>{kategori.isim}</h3>
      <ul>
        {kategori.urunler.map(urun => (
          <li key={urun.id}>{urun.isim}</li>
        ))}
      </ul>
    </li>
  ))}
</ul>`} />

        <div className="mt-8"></div>

        <DeneBox title="Accordion Menü Demo (İç İçe Mantığı)">
          <div className="w-full max-w-md mx-auto space-y-2 border rounded-md p-4 bg-card">
            {sssVerisi.map(item => (
              <div key={item.id} className="border-b last:border-0">
                <button 
                  className="flex w-full justify-between items-center py-3 font-medium text-left"
                  onClick={() => setOpenFaqId(openFaqId === item.id ? null : item.id)}
                >
                  {item.soru}
                  {openFaqId === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openFaqId === item.id && (
                  <div className="pb-3 text-muted-foreground text-sm">
                    {item.cevap}
                  </div>
                )}
              </div>
            ))}
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Koşullu Render (Conditional Rendering)</h2>
        <p>
          Bir bileşeni belirli bir şarta göre gösterip gizlemek için JSX içinde <code>&&</code> (ve) veya Ternary <code>? :</code> operatörü kullanırız.
        </p>
        
        <DeneBox title="Canlı Liste ve Koşul">
          <div className="flex flex-col items-center gap-6">
            <Button 
              onClick={() => setGoster(!goster)}
              variant="outline"
              data-testid="button-toggle-list"
            >
              Listeyi {goster ? 'Gizle' : 'Göster'}
            </Button>

            {goster && (
              <div className="w-full max-w-sm flex gap-2 mb-4">
                <Input 
                  value={yeniMeyve}
                  onChange={(e) => setYeniMeyve(e.target.value)}
                  placeholder="Yeni meyve ekle"
                  onKeyDown={(e) => e.key === "Enter" && meyveEkle()}
                />
                <Button onClick={meyveEkle}>Ekle</Button>
              </div>
            )}

            {goster ? (
              <ul className="w-full max-w-sm space-y-2">
                {meyveler.map(m => (
                  <li key={m.id} className="flex items-center gap-3 p-3 bg-muted rounded-md shadow-sm border">
                    <div className={"w-4 h-4 rounded-full " + m.renk} />
                    <span className="font-medium">{m.ad}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-muted-foreground italic py-8 border border-dashed rounded w-full max-w-sm text-center">
                Liste şu an gizli. Görmek için butona tıklayın.
              </div>
            )}
          </div>
        </DeneBox>
      </section>

      <QuizBlock lessonKey="listeler" />
    </div>
  );
}