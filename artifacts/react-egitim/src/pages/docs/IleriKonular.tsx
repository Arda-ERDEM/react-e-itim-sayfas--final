import { useState, useRef } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DeneBox } from "@/components/ui/DeneBox";
import { Button } from "@/components/ui/button";
import { QuizBlock } from "@/components/ui/QuizBlock";
import { createPortal } from "react-dom";

function ErrorThrower() {
  const [throwErr, setThrowErr] = useState(false);
  if (throwErr) throw new Error("Kasıtlı Hata!");
  return <Button onClick={() => setThrowErr(true)} variant="destructive">Boz!</Button>;
}

export function IleriKonular() {
  const [showPortal, setShowPortal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="max-w-3xl prose dark:prose-invert">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-blue-800 dark:text-blue-300 font-bold m-0 mb-2">Bu derste öğreneceksin:</h3>
        <ul className="list-disc pl-5 m-0 text-blue-900 dark:text-blue-200">
          <li>React Portals ile DOM dışına çıkmayı</li>
          <li>Ref'lerin ileri kullanımı ve forwardRef</li>
          <li>Error Boundaries (Hata Sınırları)</li>
          <li>Fragment Shorthand {"<> </>"}</li>
        </ul>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-8">
        <strong>İpucu:</strong> Portallar özellikle Modal, Tooltip ve Dropdown menüler gibi CSS "overflow: hidden" sorunlarına takılan yapılar için kurtarıcıdır.
      </div>

      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">İleri Seviye Konular</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">React Portals</h2>
        <p>Bazen bir bileşeni, DOM ağacında ebeveyninin dışına (örneğin doğrudan <code>body</code> etiketinin içine) çizmek isteriz.</p>
        <CodeBlock 
          title="createPortal"
          colorBorder="blue"
          code={"import { createPortal } from 'react-dom';\n\nfunction Modal({ children }) {\n  return createPortal(\n    <div className=\"modal\">{children}</div>,\n    document.body\n  );\n}"}
        />
        <DeneBox title="Portal Demo">
          <div className="border p-4 overflow-hidden rounded h-32 relative bg-muted">
            <p>Bu alan <code>overflow: hidden</code>. Normal bir tooltip kesilir.</p>
            <Button onClick={() => setShowPortal(!showPortal)} size="sm" className="mt-2">
              {showPortal ? "Portalı Gizle" : "Portalı Göster"}
            </Button>
            {showPortal && createPortal(
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white p-4 rounded shadow-2xl z-50">
                Ben bir Portalım! DOM hiyerarşisinden kurtuldum.
                <div className="mt-4"><Button variant="secondary" size="sm" onClick={() => setShowPortal(false)}>Kapat</Button></div>
              </div>,
              document.body
            )}
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">forwardRef</h2>
        <p>Özel bileşenlerimize dışarıdan `ref` geçmek istediğimizde React varsayılan olarak buna izin vermez. <code>forwardRef</code> kullanmalıyız.</p>
        <CodeBlock 
          title="forwardRef Kullanımı"
          colorBorder="green"
          code={"import { forwardRef } from 'react';\n\nconst CustomInput = forwardRef((props, ref) => (\n  <input ref={ref} className=\"my-input\" {...props} />\n));"}
        />
        <DeneBox title="Ref Yönlendirme Demo">
          <div className="flex gap-2">
            <input ref={inputRef} type="text" className="border p-2 rounded" placeholder="Bana odaklan" />
            <Button onClick={focusInput}>Dışarıdan Odakla</Button>
          </div>
        </DeneBox>
      </section>

      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-10">
        <strong>Uyarı:</strong> Hooks çıksa bile, Error Boundary'ler (Hata Sınırları) ŞU AN İÇİN hala Sınıf (Class) Bileşenleri olarak yazılmak zorundadır. Veya `react-error-boundary` kütüphanesi kullanılabilir.
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Error Boundaries</h2>
        <p>Uygulamanın bir yerinde patlayan bir kod, tüm beyaz sayfa (White Screen of Death) hatasına neden olmasın diye kullanılır.</p>
        <CodeBlock 
          title="Kavramsal Error Boundary"
          colorBorder="red"
          code={"class ErrorBoundary extends React.Component {\n  state = { hasError: false };\n  static getDerivedStateFromError(error) { return { hasError: true }; }\n  render() {\n    if (this.state.hasError) return <h1>Bir şeyler ters gitti.</h1>;\n    return this.props.children;\n  }\n}"}
        />
        <DeneBox title="Hata Fırlat">
          <div className="p-4 border rounded">
            <p className="mb-2 text-sm text-muted-foreground">Normalde bu butona basınca sayfa çöker. Ancak eğitim sitemizin root seviyesinde bir ErrorBoundary veya geliştirici ortamı yakalayıcısı olduğu için bunu yönetecek.</p>
            <ErrorThrower />
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">React.Fragment {"<>"}</h2>
        <p>Bazen yan yana iki div döndürmek isteriz ama React bir kök kapsayıcı (root wrapper) ister. Gereksiz bir div eklememek için Fragment kullanırız.</p>
        <CodeBlock 
          title="Fragment"
          colorBorder="violet"
          code={"// KÖTÜ: DOM'u div çöplüğüne çevirir\nreturn (\n  <div>\n    <li>Öğe 1</li>\n    <li>Öğe 2</li>\n  </div>\n);\n\n// İYİ: Kısa Fragment yazımı\nreturn (\n  <>\n    <li>Öğe 1</li>\n    <li>Öğe 2</li>\n  </>\n);"}
        />
      </section>

      <QuizBlock lessonKey="ileri" />
    </div>
  );
}
