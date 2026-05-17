import { useState } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DeneBox } from "@/components/ui/DeneBox";
import { Button } from "@/components/ui/button";
import { QuizBlock } from "@/components/ui/QuizBlock";

export function FormValidasyon() {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  
  const [age, setAge] = useState("");
  const [ageErr, setAgeErr] = useState("");

  const validateEmail = (val: string) => {
    setEmail(val);
    if (!val) {
      setEmailErr("Email zorunludur");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setEmailErr("Geçersiz email formatı");
    } else {
      setEmailErr("");
    }
  };

  const validateAge = (val: string) => {
    setAge(val);
    const num = Number(val);
    if (!val) {
      setAgeErr("Yaş zorunludur");
    } else if (isNaN(num)) {
      setAgeErr("Sayı girmelisiniz");
    } else if (num < 18) {
      setAgeErr("18 yaşından büyük olmalısınız");
    } else if (num > 120) {
      setAgeErr("Geçerli bir yaş girin");
    } else {
      setAgeErr("");
    }
  };

  return (
    <div className="max-w-3xl prose dark:prose-invert">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-blue-800 dark:text-blue-300 font-bold m-0 mb-2">Bu derste öğreneceksin:</h3>
        <ul className="list-disc pl-5 m-0 text-blue-900 dark:text-blue-200">
          <li>Form state ve hata yönetimi</li>
          <li>Real-time (eşzamanlı) vs Submit-time validasyon</li>
          <li>Regex (Düzenli İfadeler) ile kontrol</li>
          <li>Erişilebilirlik (aria-invalid) kuralları</li>
        </ul>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-8">
        <strong>İpucu:</strong> Modern projelerde form validasyonu için her şeyi manuel yazmak yerine genellikle <code>react-hook-form</code> ve şema doğrulayıcı olan <code>Zod</code> veya <code>Yup</code> ikilisi kullanılır.
      </div>

      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">Form Validasyonu</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Manuel Validasyon Mantığı</h2>
        <p>Her input için bir değer state'i ve bir de hata state'i tutarak işe başlarız.</p>
        <CodeBlock 
          title="Temel State Yapısı"
          colorBorder="blue"
          code={"const [email, setEmail] = useState('');\nconst [error, setError] = useState('');\n\nconst handleSubmit = (e) => {\n  e.preventDefault();\n  if (!email.includes('@')) {\n    setError('Geçersiz e-posta!');\n    return;\n  }\n  // Gönderim başarılı\n}"}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Real-Time (Anlık) Validasyon</h2>
        <p>Kullanıcı yazarken (onChange anında) veya inputtan çıkarken (onBlur anında) hata gösterimi daha iyi bir kullanıcı deneyimi (UX) sunar.</p>
        <CodeBlock 
          title="Regex ile Kontrol"
          colorBorder="orange"
          code={"const handleChange = (val) => {\n  setValue(val);\n  if (!/^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/.test(val)) {\n    setError('Format hatalı');\n  } else {\n    setError('');\n  }\n}"}
        />
        <DeneBox title="Anlık E-posta ve Yaş Kontrolü">
          <div className="flex flex-col gap-6 p-4 border rounded bg-muted/30">
            <div>
              <label className="block text-sm font-medium mb-1">E-posta</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => validateEmail(e.target.value)}
                className={"w-full border p-2 rounded outline-none focus:ring-2 " + (emailErr ? "border-red-500 focus:ring-red-500/50" : "border-gray-300 focus:ring-blue-500/50")}
                placeholder="ornek@mail.com"
                aria-invalid={!!emailErr}
              />
              {emailErr && <span className="text-red-500 text-xs mt-1 inline-block">{emailErr}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Yaş (Min 18)</label>
              <input 
                type="text" 
                value={age}
                onChange={(e) => validateAge(e.target.value)}
                className={"w-full border p-2 rounded outline-none focus:ring-2 " + (ageErr ? "border-red-500 focus:ring-red-500/50" : "border-gray-300 focus:ring-blue-500/50")}
                placeholder="18"
              />
              {ageErr && <span className="text-red-500 text-xs mt-1 inline-block">{ageErr}</span>}
            </div>

            <Button disabled={!!emailErr || !!ageErr || !email || !age}>Kayıt Ol</Button>
          </div>
        </DeneBox>
      </section>

      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-10">
        <strong>Uyarı:</strong> Erişilebilirlik (Accessibility) için hatalı inputlara <code>aria-invalid="true"</code> vermeyi ve hata mesajlarını ekran okuyucular için düzgün bağlamayı (aria-describedby) unutmayın.
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Zod ve Kavramsal Şemalar</h2>
        <p>Gelişmiş uygulamalarda kuralları uzun if/else bloklarıyla yazmak yerine bir Şema (Schema) tanımlanır.</p>
        <CodeBlock 
          title="Zod Şema Örneği"
          colorBorder="violet"
          code={"import { z } from 'zod';\n\nconst userSchema = z.object({\n  email: z.string().email({ message: 'Geçersiz mail' }),\n  age: z.number().min(18, { message: '18 yaşından büyük olmalısınız' }),\n  password: z.string().min(6, 'En az 6 karakter')\n});\n// Daha sonra form kütüphanesi bu şemayı kullanarak otomatik validasyon yapar."}
        />
        <DeneBox title="Şifre Gücü Demposu (Simülasyon)">
          <div className="p-4 border rounded">
            <p className="text-sm mb-2 text-muted-foreground">Şifre kuralları formlarda sık rastlanan detaylı validasyon türüdür.</p>
            <div className="flex gap-2 mb-2">
              <div className="h-2 w-1/3 bg-red-500 rounded"></div>
              <div className="h-2 w-1/3 bg-yellow-500 rounded opacity-20"></div>
              <div className="h-2 w-1/3 bg-green-500 rounded opacity-20"></div>
            </div>
            <ul className="text-xs space-y-1">
              <li className="text-green-600">✓ En az 8 karakter</li>
              <li className="text-red-600">✗ Büyük harf içermeli</li>
              <li className="text-red-600">✗ Sayı içermeli</li>
            </ul>
          </div>
        </DeneBox>
      </section>

      <QuizBlock lessonKey="formvalidasyon" />
    </div>
  );
}
