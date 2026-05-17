import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DeneBox } from "@/components/ui/DeneBox";
import { Button } from "@/components/ui/button";
import { QuizBlock } from "@/components/ui/QuizBlock";

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue(!value);
  return [value, toggle] as const;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export function CustomHooks() {
  const [isToggled, toggleValue] = useToggle(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  return (
    <div className="max-w-3xl prose dark:prose-invert">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-blue-800 dark:text-blue-300 font-bold m-0 mb-2">Bu derste öğreneceksin:</h3>
        <ul className="list-disc pl-5 m-0 text-blue-900 dark:text-blue-200">
          <li>Custom (Özel) Hook nedir?</li>
          <li>Kendi hooklarımızı neden yazarız?</li>
          <li>'use' prefix kuralları</li>
          <li>useLocalStorage ve useDebounce yapımı</li>
        </ul>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-8">
        <strong>İpucu:</strong> Eğer iki farklı bileşen aynı mantığı içeriyorsa, o mantığı bir custom hook'a çıkarmak iyi bir fikirdir.
      </div>

      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">Custom Hooks</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Neden Custom Hook Yazarız?</h2>
        <p>Mantığı paylaşmak için. Sadece state'i değil, state ile birlikte çalışan logic (mantık) kodlarını tekrar tekrar kullanmamızı sağlar.</p>
        <CodeBlock 
          title="Basit Bir Hook: useToggle"
          colorBorder="blue"
          code={"function useToggle(initialValue = false) {\n  const [value, setValue] = useState(initialValue);\n  const toggle = () => setValue(!value);\n  return [value, toggle] as const;\n}"}
        />
        <DeneBox title="useToggle Demo">
          <div className="p-4 border rounded flex items-center justify-between">
            <span>Durum: {isToggled ? "Açık" : "Kapalı"}</span>
            <Button onClick={toggleValue}>Değiştir</Button>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">useDebounce</h2>
        <p>Kullanıcı yazı yazarken her tuş basışında API isteği atmamak için beklememizi sağlayan bir hook.</p>
        <CodeBlock 
          title="useDebounce Mantığı"
          colorBorder="orange"
          code={"function useDebounce(value, delay) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const handler = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(handler);\n  }, [value, delay]);\n  return debounced;\n}"}
        />
        <DeneBox title="useDebounce Demo (Arama)">
          <div className="flex flex-col gap-4 p-4 border rounded">
            <input 
              type="text" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="border p-2 rounded" 
              placeholder="Bir şeyler yazın..."
            />
            <div>
              <p className="text-sm text-gray-500">Normal Değer: {search}</p>
              <p className="font-bold mt-2">Debounced Değer (500ms): <span className="text-blue-600">{debouncedSearch}</span></p>
            </div>
          </div>
        </DeneBox>
      </section>

      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-10">
        <strong>Uyarı:</strong> Custom hooklar her zaman 'use' kelimesiyle başlamak ZORUNDADIR (Örn: useUser, useAuth). Bu, React'in Hook kurallarını denetlemesi için gereklidir.
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">useWindowSize</h2>
        <p>Tarayıcı boyutlarını takip eden klasik bir custom hook.</p>
        <CodeBlock 
          title="useWindowSize"
          colorBorder="green"
          code={"function useWindowSize() {\n  const [size, setSize] = useState({ width: 0, height: 0 });\n  useEffect(() => {\n    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });\n    window.addEventListener('resize', handleResize);\n    handleResize(); // ilk boyutları al\n    return () => window.removeEventListener('resize', handleResize);\n  }, []);\n  return size;\n}"}
        />
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">useLocalStorage</h2>
        <p>State'i localStorage ile sekron tutan faydalı bir hook.</p>
        <CodeBlock 
          title="useLocalStorage"
          colorBorder="violet"
          code={"function useLocalStorage(key, initialValue) {\n  const [value, setValue] = useState(() => {\n    const item = window.localStorage.getItem(key);\n    return item ? JSON.parse(item) : initialValue;\n  });\n  // value değiştiğinde kaydet vb...\n}"}
        />
        <DeneBox title="Örnek (Kavramsal)">
          <div className="p-4 border rounded text-center">Sayfayı yenileseniz de kayıtlı kalan form alanları için kullanılır.</div>
        </DeneBox>
      </section>

      <QuizBlock lessonKey="customhooks" />
    </div>
  );
}
