import React, { useState } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DeneBox } from "@/components/ui/DeneBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadCloud, Star } from "lucide-react";
import { QuizBlock } from "@/components/ui/QuizBlock";

export function Formlar() {
  const [isim, setIsim] = useState("");
  const [hata, setHata] = useState("");
  const [step, setStep] = useState(1);
  const [prefs, setPrefs] = useState({ bildirimler: true, bulten: false, sms: false });
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const formGonder = (e: React.FormEvent) => {
    e.preventDefault();
    if (isim.length < 3) {
      setHata("İsim en az 3 karakter olmalıdır!");
    } else {
      setHata("");
      alert(`Hoşgeldin, ${isim}! Form başarıyla gönderildi.`);
      setIsim("");
    }
  };

  return (
    <div className="max-w-3xl prose dark:prose-invert">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-blue-800 dark:text-blue-300 font-bold m-0 mb-2">Bu derste öğreneceksin:</h3>
        <ul className="list-disc pl-5 m-0 text-blue-900 dark:text-blue-200">
          <li>Kontrollü bileşenleri (Controlled Components)</li>
          <li>Form değerlerini state'e bağlamayı</li>
          <li>Form submit olayını yönetmeyi</li>
          <li>Basit validasyon kuralları yazmayı</li>
        </ul>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-8">
        <strong>İpucu:</strong> Form elemanlarına her zaman <code>value</code> prop'u verin, aksi takdirde "uncontrolled" kalırlar ve React kontrolünden çıkarlar.
      </div>

      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">Formlar (Controlled Components)</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Kullanıcıdan veri almak. React'te formları HTML'deki klasik yöntemden biraz farklı ele alırız.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Kontrollü vs Kontrolsüz Giriş</h2>
        <p>
          HTML formları doğal olarak kendi state'lerini (içlerindeki değeri) saklarlar. Fakat React'te single source of truth (tek doğruluk kaynağı) prensibi gereği veriyi React state'inde tutmak isteriz.
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4 text-sm">
          <li><strong>Kontrollü:</strong> Değerini <code>value=&#123;state&#125;</code> prop'undan alır, değişikliği <code>onChange</code> ile bildirir. Her an inputun ne yazdığını bilirsiniz (Canlı validasyon için şarttır).</li>
          <li><strong>Kontrolsüz:</strong> <code>useRef</code> ile inputa doğrudan DOM'dan erişilerek değeri okunur. Sadece form gönderildiğinde değere ihtiyaç duyduğunuz basit durumlarda kullanılır.</li>
        </ul>
        <CodeBlock 
          title="Temel Input"
          colorBorder="blue"
          code={`function IsimFormu() {
  const [isim, setIsim] = useState("");

  return (
    <input 
      value={isim} 
      onChange={(e) => setIsim(e.target.value)} 
      placeholder="İsminiz"
    />
  );
}`}
        />
      </section>

      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-10">
        <strong>Uyarı:</strong> Form gönderiminde (submit) <code>e.preventDefault()</code> yazmayı unutursanız, sayfanız komple yenilenir ve tüm state değerlerinizi kaybedersiniz!
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Select, Checkbox, Radio Yönetimi</h2>
        <p>Input text dışındaki form elemanları da benzer mantıkla kontrol edilir. Checkbox'larda <code>value</code> yerine <code>checked</code>, olayı yakalamak içinse <code>e.target.checked</code> kullanılır.</p>
        
        <DeneBox title="Tercih Seçici">
          <div className="max-w-sm mx-auto p-4 border rounded-xl bg-card shadow-sm space-y-4">
            <h3 className="font-bold text-lg mb-2">İletişim Tercihleri</h3>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="c1" 
                checked={prefs.bildirimler} 
                onCheckedChange={(c) => setPrefs({...prefs, bildirimler: !!c})} 
              />
              <Label htmlFor="c1">Uygulama içi bildirim al</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="c2" 
                checked={prefs.bulten} 
                onCheckedChange={(c) => setPrefs({...prefs, bulten: !!c})} 
              />
              <Label htmlFor="c2">Haftalık e-posta bülteni al</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="c3" 
                checked={prefs.sms} 
                onCheckedChange={(c) => setPrefs({...prefs, sms: !!c})} 
              />
              <Label htmlFor="c3">SMS bildirimleri al</Label>
            </div>

            <div className="mt-4 pt-4 border-t">
              <RadioGroup defaultValue="bireysel">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bireysel" id="r1" />
                  <Label htmlFor="r1">Bireysel Üye</Label>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="kurumsal" id="r2" />
                  <Label htmlFor="r2">Kurumsal Üye</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mt-4 pt-4 border-t">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Mesleğiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dev">Yazılım Geliştirici</SelectItem>
                  <SelectItem value="design">Tasarımcı</SelectItem>
                  <SelectItem value="manager">Yönetici</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Adımlı Form Demoları</h2>
        
        <DeneBox title="Canlı Form Örneği (Validasyon)">
          <form onSubmit={formGonder} className="space-y-4 max-w-sm mx-auto p-4 border rounded-xl bg-card shadow-sm mb-8">
            <div className="space-y-2">
              <Label htmlFor="isim">Adınız</Label>
              <Input 
                id="isim"
                value={isim}
                onChange={(e) => {
                  setIsim(e.target.value);
                  if (e.target.value.length >= 3) setHata("");
                }}
                placeholder="Örn: Ayşe"
                className={hata ? "border-red-500 focus-visible:ring-red-500" : ""}
                data-testid="input-name"
              />
              {hata && <p className="text-sm text-red-500" data-testid="text-error">{hata}</p>}
            </div>
            <div className="pt-2">
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white" data-testid="button-submit">
                Gönder
              </Button>
            </div>
          </form>
        </DeneBox>

        <DeneBox title="Multi-Step Form">
          <div className="max-w-sm mx-auto p-4 border rounded-xl bg-card shadow-sm space-y-6">
            <Progress value={(step / 3) * 100} className="w-full" />
            
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-bold">Adım 1: Kişisel Bilgiler</h3>
                <Input placeholder="Ad Soyad" />
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-bold">Adım 2: İletişim</h3>
                <Input placeholder="E-posta" />
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-bold">Adım 3: Onay</h3>
                <p className="text-sm text-muted-foreground">Bilgilerinizi onaylıyor musunuz?</p>
              </div>
            )}

            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>Geri</Button>
              <Button onClick={() => setStep(Math.min(3, step + 1))} disabled={step === 3}>İleri</Button>
            </div>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Özel Girdi Bileşenleri</h2>
        
        <DeneBox title="Yıldız Derecelendirme (Star Rating)">
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  className={"w-8 h-8 cursor-pointer transition-all " + ((hoverRating || rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300")}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <p className="text-sm font-medium">{rating > 0 ? rating + " yıldız verdiniz!" : "Puan verin"}</p>
          </div>
        </DeneBox>

        <div className="mt-8"></div>

        <DeneBox title="Dosya Yükleme (Sürükle Bırak)">
          <div 
            className={"flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg transition-colors " + (isDragging ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-700")}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); alert("Dosya yakalandı (Demo)!"); }}
          >
            <UploadCloud className={"w-12 h-12 mb-4 " + (isDragging ? "text-blue-500" : "text-gray-400")} />
            <p className="font-medium text-center">
              {isDragging ? "Şimdi bırakın!" : "Dosyaları buraya sürükleyin veya tıklayın"}
            </p>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Form Kütüphaneleri Neden Var?</h2>
        <p>
          Formda 10-15 tane inputunuz olduğunda, hepsini state ile bağlamak, hataları yönetmek, dokunulup dokunulmadığını (touched) takip etmek işkenceye dönüşür. Performans sorunları başlar.
          İşte bu yüzden büyük projelerde <strong>React Hook Form</strong> veya <strong>Formik</strong> gibi kütüphaneler kullanılır. Bu kütüphaneler form state yönetimini ve validasyonu çok daha verimli hale getirir. Zod veya Yup gibi şema validasyon araçlarıyla kusursuz çalışırlar.
        </p>
      </section>

      <QuizBlock lessonKey="formlar" />
    </div>
  );
}