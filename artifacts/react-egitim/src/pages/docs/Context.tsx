import { useState, createContext, useContext } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DeneBox } from "@/components/ui/DeneBox";
import { Button } from "@/components/ui/button";
import { QuizBlock } from "@/components/ui/QuizBlock";

const ThemeContext = createContext<{ theme: string; toggleTheme: () => void } | null>(null);

function ThemeDemo() {
  const [theme, setTheme] = useState("açık");
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme(t => t === "açık" ? "koyu" : "açık") }}>
      <ChildComponent />
    </ThemeContext.Provider>
  );
}

function ChildComponent() {
  const ctx = useContext(ThemeContext);
  return (
    <div className={"p-6 rounded border " + (ctx?.theme === "koyu" ? "bg-gray-800 text-white" : "bg-white text-black")}>
      <p>Aktif Tema: {ctx?.theme}</p>
      <Button onClick={ctx?.toggleTheme} className="mt-2" variant={ctx?.theme === "koyu" ? "secondary" : "default"}>Temayı Değiştir</Button>
    </div>
  );
}

const CartContext = createContext<{ items: number; addItem: () => void }>({ items: 0, addItem: () => {} });

export function ContextDersi() {
  const [cartItems, setCartItems] = useState(0);

  return (
    <div className="max-w-3xl prose dark:prose-invert">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-blue-800 dark:text-blue-300 font-bold m-0 mb-2">Bu derste öğreneceksin:</h3>
        <ul className="list-disc pl-5 m-0 text-blue-900 dark:text-blue-200">
          <li>Prop Drilling sorunu nedir?</li>
          <li>createContext ve Provider kullanımı</li>
          <li>useContext ile veriye erişme</li>
          <li>Global state yönetimi</li>
        </ul>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-8">
        <strong>İpucu:</strong> Her veri için Context kullanmayın. Eğer bir veriye sadece birkaç bileşen ihtiyaç duyuyorsa normal prop'ları kullanmak daha performanslıdır.
      </div>

      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">Context API</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Prop Drilling Sorunu</h2>
        <p>Bazen bir veriyi en üstteki bileşenden en alttaki bileşene iletmek için, o veriye ihtiyaç duymayan aradaki bileşenlerden geçirmek zorunda kalırız.</p>
        <CodeBlock 
          title="Prop Drilling"
          colorBorder="red"
          code={"// App -> Layout -> Sidebar -> MenuItem -> UserProfile (props taşıma zahmeti)"}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Context Oluşturma</h2>
        <p>Veriyi paylaşıma açmak için <code>createContext</code> kullanılır ve paylaşılacak alan <code>Provider</code> ile sarılır.</p>
        <CodeBlock 
          title="Context Provider"
          colorBorder="blue"
          code={"import { createContext } from 'react';\n\nexport const ThemeContext = createContext('light');\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value=\"dark\">\n      <AppRouter />\n    </ThemeContext.Provider>\n  );\n}"}
        />
      </section>

      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-10">
        <strong>Uyarı:</strong> Provider'ın value prop'una direkt obje (örn: <code>value={"{{ color: 'red' }}"}</code>) vermek, Provider her render olduğunda yeni bir obje referansı yaratacağı için alt bileşenlerin gereksiz render olmasına yol açabilir. Mümkünse useMemo kullanın.
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Veriyi Tüketme (useContext)</h2>
        <p>Provider içindeki herhangi bir bileşen, hiyerarşide nerede olursa olsun bu veriye erişebilir.</p>
        <CodeBlock 
          title="useContext"
          colorBorder="green"
          code={"import { useContext } from 'react';\nimport { ThemeContext } from './App';\n\nfunction Button() {\n  const theme = useContext(ThemeContext);\n  return <button className={theme}>Tıkla</button>;\n}"}
        />
        <DeneBox title="Tema Değiştirici Demo">
          <ThemeDemo />
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Global Sepet Örneği</h2>
        <p>E-ticaret sitelerindeki üst navbar'da sepet sayısının güncellenmesi klasik bir Context örneğidir.</p>
        <CodeBlock 
          title="Sepet Context"
          colorBorder="orange"
          code={"const [items, setItems] = useState([]);\n\n<CartContext.Provider value={{ items, addItem }}>\n  <Navbar />\n  <ProductList />\n</CartContext.Provider>"}
        />
        <DeneBox title="Mini Sepet">
          <CartContext.Provider value={{ items: cartItems, addItem: () => setCartItems(c => c + 1) }}>
            <div className="border p-4 rounded flex flex-col gap-4 bg-muted">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-bold">Mağaza</span>
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Sepet: {cartItems}</span>
              </div>
              <div className="flex justify-between items-center bg-card p-3 rounded shadow-sm">
                <span>React Kitabı</span>
                <Button onClick={() => setCartItems(c => c + 1)} size="sm">Sepete Ekle</Button>
              </div>
            </div>
          </CartContext.Provider>
        </DeneBox>
      </section>

      <QuizBlock lessonKey="context" />
    </div>
  );
}
