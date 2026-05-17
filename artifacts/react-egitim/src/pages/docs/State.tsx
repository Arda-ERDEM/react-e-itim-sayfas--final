import { useState } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DeneBox } from "@/components/ui/DeneBox";
import { Button } from "@/components/ui/button";
import { QuizBlock } from "@/components/ui/QuizBlock";
import { Input } from "@/components/ui/input";

export function State() {
  const [sayac, setSayac] = useState(0);
  const [renk, setRenk] = useState("red");
  
  // New states for expanded demos
  const [todos, setTodos] = useState<{id: number, text: string}[]>([]);
  const [todoInput, setTodoInput] = useState("");
  
  const [userProfile, setUserProfile] = useState({ firstName: "", age: 0 });
  
  const [wizardStep, setWizardStep] = useState(1);

  const renkler = [
    { ad: "red", hex: "#E40303" },
    { ad: "orange", hex: "#FF8C00" },
    { ad: "yellow", hex: "#FFED00" },
    { ad: "green", hex: "#008026" },
    { ad: "blue", hex: "#004DFF" },
    { ad: "violet", hex: "#750787" },
  ];

  const addTodo = () => {
    if (!todoInput.trim()) return;
    setTodos([...todos, { id: Date.now(), text: todoInput }]);
    setTodoInput("");
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <div className="max-w-3xl prose dark:prose-invert">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-blue-800 dark:text-blue-300 font-bold m-0 mb-2">Bu derste öğreneceksin:</h3>
        <ul className="list-disc pl-5 m-0 text-blue-900 dark:text-blue-200">
          <li>State kavramını ve neden gerekli olduğunu</li>
          <li>useState hook'unu kullanmayı</li>
          <li>State'in doğrudan neden değiştirilmemesi gerektiğini</li>
          <li>Farklı state tiplerini (sayı, metin vb.) yönetmeyi</li>
        </ul>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-8">
        <strong>İpucu:</strong> State her değiştiğinde, o bileşen (Component) kendini baştan çizer (re-render). Gördüğünüz animasyonlar ve güncellemeler bu sayede olur.
      </div>

      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">State (Durum) & useState</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Uygulamanın "Hafızası". Ekranda bir şeylerin değişmesini istiyorsak, State kullanmalıyız.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">State Nedir?</h2>
        <p>
          Normal JavaScript değişkenleri değiştiğinde, React sayfayı güncellemez (re-render atmaz).
          Eğer kullanıcının bir butona basmasıyla ekrandaki sayının artmasını istiyorsak, <code>useState</code> hook'unu kullanmalıyız.
        </p>
        <CodeBlock 
          title="Sayaç Örneği"
          colorBorder="blue"
          code={`import { useState } from 'react';

function Sayac() {
  // useState bize iki şey döner: mevcut değer (sayac) ve onu güncelleyecek fonksiyon (setSayac)
  const [sayac, setSayac] = useState(0);

  return (
    <div>
      <p>Şu anki sayı: {sayac}</p>
      <button onClick={() => setSayac(sayac + 1)}>
        Arttır
      </button>
    </div>
  );
}`}
        />
        
        <DeneBox title="Sayaç Uygulaması">
          <div className="flex flex-col items-center gap-6 p-4">
            <div className="text-6xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-violet-500">
              {sayac}
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setSayac(sayac - 1)} data-testid="button-decrement">- Azalt</Button>
              <Button onClick={() => setSayac(0)} variant="secondary" data-testid="button-reset">Sıfırla</Button>
              <Button onClick={() => setSayac(sayac + 1)} className="bg-blue-500 hover:bg-blue-600 text-white" data-testid="button-increment">+ Arttır</Button>
            </div>
          </div>
        </DeneBox>
      </section>

      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-10">
        <strong>Uyarı:</strong> State doğrudan değiştirilemez! State değerini asla <code>sayac = 5</code> şeklinde değiştirmeyin. Her zaman setter fonksiyonunu (örn: <code>setSayac(5)</code>) kullanın. Çünkü React, state'in değiştiğini bu "set" fonksiyonunun çağrılmasından anlar.
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Rengarenk Bir Örnek Daha</h2>
        <p>
          State sadece sayı olmak zorunda değil; metin, dizi veya obje de olabilir.
        </p>
        <CodeBlock 
          colorBorder="rainbow"
          code={`const [renk, setRenk] = useState("red");

// ...
<div style={{ backgroundColor: renk }}>
  Rengim Değişebilir!
</div>`}
        />
        
        <DeneBox title="Gökkuşağı Renk Seçici">
          <div className="flex flex-col items-center gap-6">
            <div 
              className="w-32 h-32 rounded-2xl shadow-lg transition-colors duration-500 flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: renkler.find(r => r.ad === renk)?.hex }}
            >
              {renk.toUpperCase()}
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {renkler.map(r => (
                <button
                  key={r.ad}
                  onClick={() => setRenk(r.ad)}
                  className={"w-10 h-10 rounded-full border-2 " + (renk === r.ad ? 'border-foreground scale-110' : 'border-transparent') + " transition-transform shadow-sm"}
                  style={{ backgroundColor: r.hex }}
                  aria-label={r.ad}
                  data-testid={"button-color-" + r.ad}
                />
              ))}
            </div>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">State Güncellemelerinin Asenkron Yapısı</h2>
        <p>
          React performans optimizasyonu için (batching) state güncellemelerini anında uygulamaz, sıraya koyar.
          Aşağıdaki koda bakın:
        </p>
        <CodeBlock code={`setSayac(sayac + 1);
setSayac(sayac + 1);
setSayac(sayac + 1);`} />
        <p>
          Eğer sayac 0 ise, bu üç kod arka arkaya çalıştığında sayacın 3 olacağını düşünebilirsiniz. Fakat hepsi bellekteki 0 değerine bakar ve hepsi sonucu 1 yapmaya çalışır. Sonuç 1 olur.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Önceki State'e Göre Güncelleme</h2>
        <p>
          Eğer yeni state değeriniz önceki state değerine bağımlıysa, doğrudan değişkeni okumak yerine "functional update" yöntemini kullanmalısınız:
        </p>
        <CodeBlock code={`// Önceki state değerini callback ile alırız
setSayac(prev => prev + 1);
setSayac(prev => prev + 1);
setSayac(prev => prev + 1);`} />
        <p>İşte şimdi sayacımız 3 oldu!</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Obje State Yönetimi</h2>
        <p>
          State içinde nesne (object) tutuyorsanız ve sadece tek bir alanını güncellemek istiyorsanız çok dikkatli olmalısınız.
          Eğer sadece o alanı set ederseniz, nesnenin diğer alanlarını silmiş olursunuz.
        </p>
        <div className="bg-red-50 p-4 border border-red-200 rounded text-sm mb-4">
          <span className="font-bold text-red-500">❌ YANLIŞ: </span> <code>setProfil(&#123; age: 30 &#125;)</code> (İsim silinir!)
        </div>
        <p>Bunun yerine <strong>Spread Operatörü (...)</strong> kullanarak eski objenin kopyasını alıp üstüne değişiklikleri yazarız:</p>
        <CodeBlock code={`setProfil(prev => ({
  ...prev,       // Eski tüm verileri kopyala
  age: 30        // Sadece yaşı ez
}));`} />

        <DeneBox title="Obje State Formu">
          <div className="max-w-sm mx-auto p-6 bg-card border rounded-lg shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold block mb-1">Adınız</label>
                <Input name="firstName" value={userProfile.firstName} onChange={handleProfileChange} placeholder="John Doe" />
              </div>
              <div>
                <label className="text-sm font-bold block mb-1">Yaşınız</label>
                <Input type="number" name="age" value={userProfile.age || ''} onChange={handleProfileChange} />
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-slate-900 text-green-400 rounded-md font-mono text-sm whitespace-pre">
              {JSON.stringify(userProfile, null, 2)}
            </div>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Dizi (Array) State Yönetimi</h2>
        <p>
          Dizilerde de objeler gibi aynı kural geçerlidir. State içindeki diziyi doğrudan değiştiremeyiz (push, pop, splice vb. KULLANILMAZ).
          Bunun yerine her zaman yeni bir dizi oluşturup içine elemanları atarız.
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Ekleme:</strong> <code>setDizi([...dizi, yeniEleman])</code></li>
          <li><strong>Silme:</strong> <code>setDizi(dizi.filter(eleman ={'>'} eleman.id !== silinecekId))</code></li>
          <li><strong>Güncelleme:</strong> <code>setDizi(dizi.map(eleman ={'>'} eleman.id === id ? yenilenmisEleman : eleman))</code></li>
        </ul>

        <DeneBox title="Dizi State ile Todo Listesi">
          <div className="max-w-md mx-auto space-y-4">
            <div className="flex gap-2">
              <Input 
                value={todoInput} 
                onChange={e => setTodoInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTodo()}
                placeholder="Ne yapacaksın?" 
              />
              <Button onClick={addTodo}>Ekle</Button>
            </div>
            
            <ul className="space-y-2">
              {todos.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">Liste boş, bir şeyler ekleyin!</p>}
              {todos.map(todo => (
                <li key={todo.id} className="flex justify-between items-center p-3 bg-card border rounded shadow-sm">
                  <span>{todo.text}</span>
                  <Button variant="destructive" size="sm" onClick={() => removeTodo(todo.id)}>Sil</Button>
                </li>
              ))}
            </ul>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Çoklu useState vs Tek Obje State</h2>
        <p>Ne zaman birden fazla state kullanmalı, ne zaman her şeyi tek objede toplamalıyım?</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Eğer değişkenler birbirinden tamamen bağımsızsa (örn: sekmeler, arama çubuğu ve menü aç/kapa) <strong>ayrı useState()</strong> kullanın.</li>
          <li>Eğer değişkenler mantıksal olarak bir bütünü oluşturuyorsa (bir formun 10 input alanı veya farenin X ve Y koordinatları) <strong>tek bir object state</strong> kullanın.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Lifting State Up (State'i Yukarı Taşıma)</h2>
        <p>
          Bazen iki kardeş (sibling) bileşen aynı veriye ihtiyaç duyar. Fakat props sadece yukarıdan aşağı akar. 
          Bu durumda state'i kardeşlerden alıp, her ikisinin de ortak ebeveynine (parent) taşıyıp oradan her iki kardeşe prop olarak göndeririz.
          Buna "Lifting State Up" denir.
        </p>

        <DeneBox title="State Taşıma (Wizard)">
          <div className="max-w-md mx-auto p-4 border rounded-xl bg-card shadow-sm space-y-6">
            <div className="flex gap-1 mb-4">
              {[1,2,3].map(step => (
                <div key={step} className={"h-2 flex-1 rounded-full transition-colors " + (step <= wizardStep ? 'bg-blue-500' : 'bg-muted')}></div>
              ))}
            </div>
            
            <div className="h-24 flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/50 text-muted-foreground">
              {wizardStep === 1 && "Adım 1: Hesap Bilgileri"}
              {wizardStep === 2 && "Adım 2: Profil Resmi"}
              {wizardStep === 3 && "Adım 3: Tamamlandı!"}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setWizardStep(prev => Math.max(1, prev - 1))} disabled={wizardStep === 1}>Geri</Button>
              <span className="font-mono text-sm self-center">Step State: {wizardStep}</span>
              <Button onClick={() => setWizardStep(prev => Math.min(3, prev + 1))} disabled={wizardStep === 3}>İleri</Button>
            </div>
            <p className="text-xs text-center text-muted-foreground">wizardStep state'i parent bileşende duruyor ve hem progress bara hem de içerik alanına yön veriyor.</p>
          </div>
        </DeneBox>
      </section>

      <QuizBlock lessonKey="state" />
    </div>
  );
}