import { useState } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DeneBox } from "@/components/ui/DeneBox";
import { Button } from "@/components/ui/button";
import { QuizBlock } from "@/components/ui/QuizBlock";

export function TypeScriptDersi() {
  const [count, setCount] = useState<number>(0);
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState<{id: number, text: string}[]>([]);
  const [color, setColor] = useState<"red" | "green" | "blue">("red");

  return (
    <div className="max-w-3xl prose dark:prose-invert">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-blue-800 dark:text-blue-300 font-bold m-0 mb-2">Bu derste öğreneceksin:</h3>
        <ul className="list-disc pl-5 m-0 text-blue-900 dark:text-blue-200">
          <li>TypeScript'in temel tiplerini</li>
          <li>Interface ve Type kavramlarını</li>
          <li>React proplerini nasıl tiplendireceğinizi</li>
          <li>useState ile Generics kullanımını</li>
          <li>Event tiplerini (onClick, onChange)</li>
        </ul>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-8">
        <strong>İpucu:</strong> TypeScript hataları başlangıçta can sıkıcı olabilir, ancak çalışma zamanında (runtime) karşılaşacağınız hataları kod yazarken yakalamanızı sağlar.
      </div>

      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">TypeScript ile React</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Neden TypeScript?</h2>
        <p>JavaScript zayıf tipli bir dildir. TypeScript ise kodumuza tip güvenliği ekler. Değişkenlerin hangi tipte değer alabileceğini önceden belirtiriz.</p>
        <CodeBlock 
          title="Temel Tipler"
          colorBorder="blue"
          code={"let isim: string = \"Ahmet\";\nlet yas: number = 25;\nlet aktif: boolean = true;"}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Interface ve Type</h2>
        <p>Nesnelerin şeklini tanımlamak için interface veya type kullanırız. Propleri tiplendirirken genellikle interface tercih edilir.</p>
        <CodeBlock 
          title="Interface Kullanımı"
          colorBorder="green"
          code={"interface UserProps {\n  name: string;\n  age: number;\n  isAdmin?: boolean; // Opsiyonel prop\n}\n\nfunction UserCard(props: UserProps) {\n  return <div>{props.name}</div>;\n}"}
        />
      </section>

      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-10">
        <strong>Uyarı:</strong> Her şeyi "any" tipi ile geçiştirmek TypeScript kullanmanın mantığına aykırıdır. Olabildiğince doğru tipleri kullanmaya özen gösterin.
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">useState ile Tipler</h2>
        <p>useState çoğu zaman tipi kendisi anlar (inference). Ancak karmaşık veri yapılarında (örneğin diziler veya objeler) bizim belirtmemiz gerekir.</p>
        <CodeBlock 
          title="useState Generics"
          colorBorder="violet"
          code={"import { useState } from 'react';\n\ninterface Todo {\n  id: number;\n  text: string;\n}\n\nconst [todos, setTodos] = useState<Todo[]>([]);\n// Sadece Todo dizisi kabul eder."}
        />
        <DeneBox title="Tiplendirilmiş Sayaç">
          <div className="flex flex-col items-center gap-4">
            <div className="text-4xl font-bold">{count}</div>
            <div className="flex gap-2">
              <Button onClick={() => setCount(count - 1)}>-</Button>
              <Button onClick={() => setCount(count + 1)}>+</Button>
            </div>
            <p className="text-sm text-muted-foreground">Bu state <code>{"useState<number>(0)"}</code> olarak tanımlandı.</p>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Event Tipleri</h2>
        <p>Input değişimleri veya form gönderimi gibi olaylar için özel tipler vardır.</p>
        <CodeBlock 
          title="Event Handlers"
          colorBorder="orange"
          code={"function handleChange(e: React.ChangeEvent<HTMLInputElement>) {\n  console.log(e.target.value);\n}\n\nfunction handleSubmit(e: React.FormEvent<HTMLFormElement>) {\n  e.preventDefault();\n}"}
        />
        <DeneBox title="Tiplendirilmiş Todo Ekleme">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (todoText) {
                setTodos([...todos, { id: Date.now(), text: todoText }]);
                setTodoText("");
              }
            }}
            className="flex flex-col gap-4"
          >
            <div className="flex gap-2">
              <input 
                type="text" 
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                className="border p-2 rounded"
                placeholder="Todo ekle..."
              />
              <Button type="submit">Ekle</Button>
            </div>
            <ul className="list-disc pl-5">
              {todos.map(t => <li key={t.id}>{t.text}</li>)}
            </ul>
          </form>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Belirli Değerlerle Tiplendirme</h2>
        <p>Bir state sadece belirli kelimeleri alabilir (Union Types).</p>
        <DeneBox title="Renk Seçici">
          <div className="flex flex-col items-center gap-4">
            <div className={"w-20 h-20 rounded bg-" + color + "-500"} style={{ backgroundColor: color === "red" ? "#ef4444" : color === "green" ? "#22c55e" : "#3b82f6" }}></div>
            <div className="flex gap-2">
              <Button variant={color === "red" ? "default" : "outline"} onClick={() => setColor("red")}>Kırmızı</Button>
              <Button variant={color === "green" ? "default" : "outline"} onClick={() => setColor("green")}>Yeşil</Button>
              <Button variant={color === "blue" ? "default" : "outline"} onClick={() => setColor("blue")}>Mavi</Button>
            </div>
            <p className="text-sm">State: <code>{"useState<\"red\" | \"green\" | \"blue\">"}</code></p>
          </div>
        </DeneBox>
      </section>

      <QuizBlock lessonKey="typescript" />
    </div>
  );
}
