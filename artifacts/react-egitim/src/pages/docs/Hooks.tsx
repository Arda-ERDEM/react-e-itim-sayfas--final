import React, { useState, useRef, useReducer, useId, useTransition } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DeneBox } from "@/components/ui/DeneBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuizBlock } from "@/components/ui/QuizBlock";

// Reducer for the counter demo
type ActionType = { type: 'INCREMENT' } | { type: 'DECREMENT' } | { type: 'RESET' };
function counterReducer(state: { count: number }, action: ActionType) {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    case 'RESET': return { count: 0 };
    default: return state;
  }
}

export function Hooks() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  const uniqueId = useId();
  
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState("");
  const [renderedList, setRenderedList] = useState<string[]>([]);

  // Simulate heavy computation
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    
    startTransition(() => {
      // Fake heavy work
      const newList = Array.from({ length: 5000 }).map((_, i) => "Sonuç " + i + " - " + val);
      setRenderedList(newList);
    });
  };
  
  return (
    <div className="max-w-3xl prose dark:prose-invert">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-blue-800 dark:text-blue-300 font-bold m-0 mb-2">Bu derste öğreneceksin:</h3>
        <ul className="list-disc pl-5 m-0 text-blue-900 dark:text-blue-200">
          <li>useRef ile DOM'a erişmeyi</li>
          <li>useContext ile veri taşımayı</li>
          <li>useMemo ve useCallback mantığını</li>
          <li>useReducer ile karmaşık state yönetmeyi</li>
          <li>useId ve useTransition gibi modern hook'ları</li>
        </ul>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-8">
        <strong>İpucu:</strong> Hook kurallarını unutmayın: Sadece bileşenin en üst seviyesinde çağrılabilirler!
      </div>

      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">Diğer Önemli Hooklar</h1>
      <p className="text-xl text-muted-foreground mb-8">
        useState ve useEffect en çok kullanılanlar olsa da, React'in kemerindeki diğer aletlere de göz atmakta fayda var.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">Hooks Kuralları Tam Liste</h2>
        <ul className="space-y-2 list-disc pl-6 text-sm mb-4">
          <li><strong className="text-red-500">Sadece En Üstte Çağırın:</strong> Hook'ları if, for, while blokları içinde veya iç içe geçmiş fonksiyonlarda ÇAĞIRMAYIN. React, hook çağrı sırasına güvenir.</li>
          <li><strong className="text-blue-500">Sadece React Fonksiyonlarında Çağırın:</strong> Normal JavaScript fonksiyonlarında hook kullanamazsınız. Sadece React componentlerinde ve Custom Hook'larda (use ile başlayan fonksiyonlarda) kullanılabilir.</li>
        </ul>
        <p className="text-sm italic text-muted-foreground">Eğer <code>eslint-plugin-react-hooks</code> kullanırsanız, bu kuralları ihlal ettiğiniz an editörünüz sizi uyaracaktır.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">useRef</h2>
        <p>
          HTML DOM elemanlarına doğrudan erişmek veya bileşen yeniden çizilse (re-render) bile değişmeyen (ve değiştiğinde render'ı tetiklemeyen)
          değişkenler tutmak için kullanılır.
        </p>
        <CodeBlock 
          title="Input'a Odaklanma"
          colorBorder="blue"
          code={`const inputRef = useRef(null);

const odaklan = () => {
  // DOM elementine doğrudan erişim
  inputRef.current.focus();
};

return (
  <>
    <input ref={inputRef} />
    <button onClick={odaklan}>Odaklan</button>
  </>
);`}
        />
        
        <DeneBox title="useRef Demo">
          <div className="flex gap-4 items-center">
            <Input 
              ref={inputRef} 
              placeholder="Bana odaklan!"
            />
            <Button onClick={() => inputRef.current?.focus()}>Odaklan</Button>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">useReducer</h2>
        <p>
          State yönetimi çok karmaşıklaştığında (örneğin birden fazla alt state birbiriyle ilişkiliyse), <code>useState</code> yerine <code>useReducer</code> tercih edilir. Redux mantığına çok benzer. State'i doğrudan değiştirmek yerine ona "Eylemler" (Actions) gönderirsiniz.
        </p>
        <CodeBlock code={`function reducer(state, action) {
  switch (action.type) {
    case 'ARTTIR': return { sayac: state.sayac + 1 };
    case 'AZALT': return { sayac: state.sayac - 1 };
    default: return state;
  }
}

const [state, dispatch] = useReducer(reducer, { sayac: 0 });`} />
        
        <DeneBox title="useReducer Sayaç">
          <div className="flex flex-col items-center gap-6">
            <div className="text-5xl font-mono p-4 bg-muted rounded-xl">{state.count}</div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => dispatch({ type: 'DECREMENT' })}>-1 Azalt</Button>
              <Button variant="destructive" onClick={() => dispatch({ type: 'RESET' })}>Sıfırla</Button>
              <Button onClick={() => dispatch({ type: 'INCREMENT' })}>+1 Arttır</Button>
            </div>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">useId</h2>
        <p>Erişilebilirlik (Accessibility) kuralları gereği etiketlerin (label) for değerleri ile inputların id değerleri eşleşmelidir. Fakat aynı component sayfada iki kez kullanılırsa ID'ler çakışır. <code>useId</code> bu sorunu çözüp uygulamanın her yerinde benzersiz olan bir ID üretir.</p>
        
        <DeneBox title="useId Demo">
          <div className="space-y-4 max-w-sm">
            <div className="space-y-1">
              <Label htmlFor={uniqueId + "-isim"}>İsim</Label>
              <Input id={uniqueId + "-isim"} placeholder="John" />
            </div>
            <div className="space-y-1">
              <Label htmlFor={uniqueId + "-soyisim"}>Soyisim</Label>
              <Input id={uniqueId + "-soyisim"} placeholder="Doe" />
            </div>
            <p className="text-xs text-muted-foreground">Bu inputların arkasında şu an <code>{uniqueId}-isim</code> gibi eşsiz bir ID çalışıyor.</p>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">useTransition</h2>
        <p>React 18 ile gelen çok güçlü bir hook'tur. Bazı state güncellemelerinin acil olmadığını, eğer gerekiyorsa diğer animasyonları veya inputları kitlememesi için bu güncellemelerin arkada geciktirilebileceğini React'e söyler.</p>
        
        <DeneBox title="useTransition Demo (Ağır Liste)">
          <div className="space-y-4">
            <Input value={searchTerm} onChange={handleSearch} placeholder="Yazmaya başlayın..." />
            {isPending && <span className="text-sm text-blue-500 animate-pulse">Liste hesaplanıyor, ama input kilitlenmedi!</span>}
            <div className="h-32 overflow-y-auto bg-muted p-2 rounded text-xs opacity-50">
              {renderedList.slice(0, 50).map((item, i) => <div key={i}>{item}</div>)}
              {renderedList.length > 50 && <div>...ve 4950 kayıt daha</div>}
            </div>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">useContext</h2>
        <p>
          "Prop Drilling" denilen, veriyi en üst bileşenden en alt bileşene onlarca katman arasından taşımak zorunda kalma sorununu çözer.
          Global verileri (örneğin seçili tema, giriş yapmış kullanıcı) her bileşenden erişilebilir yapar.
        </p>
        <CodeBlock 
          title="Tema Context"
          colorBorder="violet"
          code={`const TemaContext = createContext();

// En üstte sarmalıyoruz
<TemaContext.Provider value="dark">
  <Uygulama />
</TemaContext.Provider>

// İçerideki herhangi bir bileşende kullanıyoruz
function Buton() {
  const tema = useContext(TemaContext);
  return <button className={tema}>Gönder</button>;
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">useMemo & useCallback</h2>
        <p>
          React performansını optimize etmek için kullanılan "hatırlama" (memoization) araçlarıdır. İleri seviye konulardır,
          uygulamanız yavaşlamadıkça kullanmanıza gerek yoktur.
        </p>
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-4">
          <strong>Uyarı:</strong> Her şeyi useMemo ile sarmalamayın. Memoization'ın kendisi de bir maliyettir!
        </div>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>useMemo:</strong> Ağır hesaplamaların sonuçlarını hafızada tutar. Sadece bağımlılıkları değiştiğinde yeniden hesaplar.</li>
          <li><strong>useCallback:</strong> Fonksiyonların bellekteki referanslarını tutar. (Özellikle React.memo ile sarmalanmış child componentlere props olarak fonksiyon gönderirken render'ı engellemek için kullanılır).</li>
        </ul>
      </section>

      <section className="mb-10 text-center py-10 border-t border-b">
        <h2 className="text-2xl font-bold mb-2">Kendi Hook'unu Yaz!</h2>
        <p className="text-muted-foreground">Tüm bu yapıtaşlarını kullanarak kendi `useLocalStroage`, `useWindowSize` gibi hook'larımızı yazabiliriz. Bunu özel bir bölümde inceleyeceğiz.</p>
      </section>

      <QuizBlock lessonKey="hooks" />
    </div>
  );
}