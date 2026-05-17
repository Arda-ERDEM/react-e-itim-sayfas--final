import { useState } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DeneBox } from "@/components/ui/DeneBox";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Folder, File, FileCode2, FileJson, Terminal } from "lucide-react";
import { QuizBlock } from "@/components/ui/QuizBlock";

export function Kurulum() {
  const [logs, setLogs] = useState<string[]>([]);
  const [installing, setInstalling] = useState(false);
  const [extensions, setExtensions] = useState<Record<string, boolean>>({
    es7: false,
    prettier: false,
    eslint: false,
    gitlens: false
  });

  const simulateNpm = () => {
    if (installing) return;
    setInstalling(true);
    setLogs(["$ npm install"]);
    
    setTimeout(() => setLogs(l => [...l, "fetchMetadata: sill resolveWithNewModule axios@1.6.0 checking installable status"]), 500);
    setTimeout(() => setLogs(l => [...l, "reify:react: timing reifyNode:node_modules/react Completed in 120ms"]), 1200);
    setTimeout(() => setLogs(l => [...l, "reify:react-dom: timing reifyNode:node_modules/react-dom Completed in 250ms"]), 2000);
    setTimeout(() => {
      setLogs(l => [...l, "", "added 248 packages, and audited 249 packages in 3s", "found 0 vulnerabilities"]);
      setInstalling(false);
    }, 3000);
  };

  return (
    <div className="max-w-3xl prose dark:prose-invert">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-blue-800 dark:text-blue-300 font-bold m-0 mb-2">Bu derste öğreneceksin:</h3>
        <ul className="list-disc pl-5 m-0 text-blue-900 dark:text-blue-200">
          <li>Node.js'in gerekliliğini</li>
          <li>Vite ile modern ve hızlı React projesi oluşturmayı</li>
          <li>Yerel geliştirme sunucusunu başlatmayı</li>
          <li>Temel klasör yapısını</li>
        </ul>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-8">
        <strong>İpucu:</strong> Node.js ile birlikte gelen <strong>npm</strong> (Node Package Manager), başkalarının yazdığı kod paketlerini projemize dahil etmemizi sağlar.
      </div>

      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">Kurulum ve Başlangıç</h1>
      <p className="text-xl text-muted-foreground mb-8">
        React projesi oluşturmak eskisinden çok daha kolay. Hadi başlayalım!
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Node.js ve npm Nedir?</h2>
        <p>
          Bilgisayarınızda React çalıştırabilmek için öncelikle <a href="https://nodejs.org" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Node.js</a> yüklü olmalıdır. 
          Bu, JavaScript'i tarayıcı dışında da çalıştırmamızı sağlayan bir ortamdır. React projeleri arka planda bir geliştirme sunucusuna ve kodları tarayıcının anlayacağı hale getirecek derleyicilere ihtiyaç duyar, tüm bunlar Node.js üzerinde çalışır.
        </p>
        <p>
          Node.js kurduğunuzda <strong>npm</strong> (Node Package Manager) da otomatik olarak yüklenir. npm ile dünyadaki diğer geliştiricilerin yazdığı milyonlarca ücretsiz paketi (örneğin tarih formatlama paketleri, hazır UI bileşenleri vb.) projenize indirebilirsiniz.
        </p>
        
        <p>Sisteminizde Node.js olup olmadığını terminalinize şu komutları yazarak kontrol edebilirsiniz:</p>
        <CodeBlock 
          language="bash"
          code={`node -v\n# Çıktı örneği: v20.10.0\n\nnpm -v\n# Çıktı örneği: 10.2.3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Paket Yöneticileri Karşılaştırması</h2>
        <p>Eskiden sadece npm vardı ama artık çok daha hızlı alternatifler var. Hangisini kullanacağınız tamamen size kalmış, komutları hemen hemen aynıdır.</p>
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse border text-sm text-left">
            <thead>
              <tr className="bg-muted">
                <th className="border p-2 font-bold w-1/3">Araç</th>
                <th className="border p-2 font-bold w-2/3">Açıklama</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-medium text-red-500">npm</td>
                <td className="border p-2">Node.js ile varsayılan gelir. En yaygın olanıdır. Yeterince hızlıdır.</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium text-blue-500">yarn</td>
                <td className="border p-2">Facebook tarafından geliştirilmiştir. Eskiden npm'den çok daha hızlıydı ama artık fark kapandı. Workspace özellikleri için hala çok sevilir.</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium text-yellow-500">pnpm</td>
                <td className="border p-2">En yeni ve en performanslı olanı. Aynı paketi diskte sadece bir kez tutar, bu sayede hem aşırı hızlıdır hem de disk alanından tasarruf sağlar.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Vite Neden Tercih Ediyoruz?</h2>
        <p>
          Eğer eski React eğitim videoları izlerseniz, sürekli <code>create-react-app (CRA)</code> komutunu görürsünüz. Fakat o devir kapandı!
          Artık modern dünyada <strong>Vite</strong> kullanıyoruz.
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><strong>CRA (Eski Yöntem):</strong> Webpack kullanırdı. Proje büyüdükçe geliştirme sunucusunun (dev server) başlaması saniyeler, hatta dakikalar alabiliyordu. Her dosyayı baştan derlerdi.</li>
          <li><strong>Vite (Yeni Yöntem):</strong> ES Modules (ESM) ve Go ile yazılmış esbuild kullanır. Sunucu saniyenin onda biri sürede (anında) başlar. Sadece ekranda gördüğünüz değiştirilen dosyayı derler. İnanılmaz hızlıdır.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Vite ile Proje Oluşturma</h2>
        <p>
          Terminali açın ve projenizi oluşturmak istediğiniz klasöre gidip şu komutu yazın:
        </p>
        <CodeBlock 
          title="Terminal"
          language="bash"
          colorBorder="blue"
          code={`npm create vite@latest ilk-projem -- --template react`}
        />
        <p className="mt-4">
          Bu komut, "ilk-projem" adında yeni bir klasör oluşturur ve içine React için gereken tüm temel dosyaları yerleştirir.
          Eğer Typescript kullanmak isterseniz <code>--template react-ts</code> yazabilirsiniz.
        </p>
      </section>
      
      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-10">
        <strong>Uyarı:</strong> Proje adında büyük harf veya boşluk kullanmamaya özen gösterin (örn: ilk-projem). npm paket isim kuralları gereği hata alabilirsiniz.
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Projeyi Çalıştırma</h2>
        <p>Projemiz oluştuğuna göre, içine girip bağımlılıkları yükleyelim ve çalıştıralım:</p>
        <CodeBlock 
          title="Terminal"
          language="bash"
          colorBorder="green"
          code={`cd ilk-projem
npm install
npm run dev`}
        />
        <p className="mt-4">
          Ve bingo! 🎉 Tarayıcınızda <code>http://localhost:5173</code> adresine giderek çalışan uygulamanızı görebilirsiniz.
        </p>
        
        <DeneBox title="Simülatör: npm install">
          <div className="flex flex-col gap-4">
            <p>Aşağıdaki butona basarak terminalin nasıl göründüğünü simüle edin:</p>
            <Button onClick={simulateNpm} disabled={installing} className="w-fit">
              <Terminal className="mr-2 h-4 w-4" /> npm install Çalıştır
            </Button>
            
            <div className="bg-black text-green-400 p-4 rounded-md h-48 overflow-y-auto font-mono text-sm leading-tight mt-2">
              {logs.length === 0 && <span className="text-gray-500">Terminal hazır. Bekleniyor...</span>}
              {logs.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Proje Dosya Yapısı (Detaylı)</h2>
        <p>Editörünüzde projeyi açtığınızda karşınızda bir sürü dosya göreceksiniz. Hepsini tek tek inceleyelim:</p>
        
        <DeneBox title="Görsel Dosya Gezgini">
          <div className="border rounded-md bg-card p-4 font-mono text-sm">
            <div className="flex items-center gap-2 py-1 text-muted-foreground"><Folder className="w-4 h-4 text-blue-400" /> node_modules/</div>
            <div className="pl-6 text-xs text-muted-foreground pb-2 border-l border-border ml-2 mb-2">→ İndirilen yüzlerce paketin durduğu klasör. Asla içine girmeyin veya bir şeyi silmeyin. Github'a gönderilmez.</div>
            
            <div className="flex items-center gap-2 py-1 text-muted-foreground"><Folder className="w-4 h-4 text-blue-400" /> public/</div>
            <div className="flex items-center gap-2 py-1 pl-6"><File className="w-4 h-4 text-orange-400" /> vite.svg</div>
            <div className="pl-6 text-xs text-muted-foreground pb-2 border-l border-border ml-2 mb-2">→ Derlenmeyecek, doğrudan siteye eklenecek statik varlıklar (resimler, fontlar).</div>
            
            <div className="flex items-center gap-2 py-1 font-bold"><Folder className="w-4 h-4 text-blue-400" /> src/</div>
            <div className="pl-6 text-xs text-muted-foreground pb-2 border-l border-border ml-2 mb-2">→ Burası bizim oyun alanımız. Tüm React kodlarımızı buraya yazarız.</div>
            <div className="flex items-center gap-2 py-1 pl-6"><FileCode2 className="w-4 h-4 text-yellow-400" /> App.jsx</div>
            <div className="flex items-center gap-2 py-1 pl-6"><FileCode2 className="w-4 h-4 text-blue-500" /> index.css</div>
            <div className="flex items-center gap-2 py-1 pl-6"><FileCode2 className="w-4 h-4 text-yellow-400" /> main.jsx</div>
            
            <div className="flex items-center gap-2 py-1 mt-4"><FileCode2 className="w-4 h-4 text-orange-600" /> index.html</div>
            <div className="flex items-center gap-2 py-1"><FileJson className="w-4 h-4 text-green-500" /> package.json</div>
            <div className="pl-6 text-xs text-muted-foreground pb-2 border-l border-border ml-2 mb-2">→ Uygulamanın adı, versiyonu, script komutları (dev, build) ve bağımlılıkların yazılı olduğu ayar dosyası.</div>
            
            <div className="flex items-center gap-2 py-1"><FileCode2 className="w-4 h-4 text-blue-400" /> vite.config.js</div>
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Yaygın Kurulum Hataları</h2>
        <p>İlk kurulumlarda sıklıkla karşılaşılan hatalar ve çözümleri:</p>
        <ul className="space-y-4 list-none pl-0">
          <li className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-900">
            <strong className="text-red-600 dark:text-red-400">Hata: <code>npm command not found</code></strong><br/>
            <span className="text-sm mt-1 block">Çözüm: Node.js yüklü değil veya kurulum sırasında sistem PATH değişkenine eklenmemiş. Node.js'i yeniden kurup bilgisayarı yeniden başlatın.</span>
          </li>
          <li className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-900">
            <strong className="text-red-600 dark:text-red-400">Hata: <code>'vite' is not recognized as an internal or external command</code></strong><br/>
            <span className="text-sm mt-1 block">Çözüm: Proje klasörüne girdikten sonra <code>npm install</code> komutunu çalıştırmayı unuttunuz. Bu yüzden Vite indirilemedi.</span>
          </li>
          <li className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-900">
            <strong className="text-red-600 dark:text-red-400">Hata: <code>Error: EPERM: operation not permitted</code></strong><br/>
            <span className="text-sm mt-1 block">Çözüm: İzin sorunu. Terminali veya VS Code'u "Yönetici olarak (Administrator)" çalıştırın veya macOS/Linux kullanıyorsanız klasör izinlerini düzeltin.</span>
          </li>
          <li className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-900">
            <strong className="text-red-600 dark:text-red-400">Hata: <code>Port 5173 is already in use</code></strong><br/>
            <span className="text-sm mt-1 block">Çözüm: Başka bir terminalde zaten bir React projesi çalışıyor. Onu kapatın veya Vite'in size verdiği alternatif portu (örn: 5174) kullanın.</span>
          </li>
          <li className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-900">
            <strong className="text-red-600 dark:text-red-400">Hata: <code>npm ERR! code ERESOLVE</code></strong><br/>
            <span className="text-sm mt-1 block">Çözüm: Paket versiyon uyuşmazlığı var. <code>npm install --legacy-peer-deps</code> komutunu deneyebilirsiniz.</span>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">VS Code Eklentileri (Önerilen)</h2>
        <p>React geliştirirken hayatınızı kurtaracak ve kod yazma hızınızı katlayacak VS Code eklentileri:</p>
        
        <DeneBox title="Kurulum Kontrol Listesi">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">Aşağıdaki eklentileri VS Code "Extensions" sekmesinden aratıp kurun ve işaretleyin.</p>
            
            <div className="flex items-start space-x-3 bg-muted/50 p-3 rounded-md">
              <Checkbox 
                id="es7" 
                checked={extensions.es7}
                onCheckedChange={(c) => setExtensions(prev => ({...prev, es7: !!c}))} 
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="es7" className={"font-bold cursor-pointer " + (extensions.es7 ? "line-through text-muted-foreground" : "")}>
                  ES7+ React/Redux/React-Native snippets
                </Label>
                <p className="text-sm text-muted-foreground">Boş bir dosyaya <code>rfce</code> yazıp tab'a bastığınızda anında bir React bileşeni iskeleti oluşturur.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-muted/50 p-3 rounded-md">
              <Checkbox 
                id="prettier" 
                checked={extensions.prettier}
                onCheckedChange={(c) => setExtensions(prev => ({...prev, prettier: !!c}))} 
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="prettier" className={"font-bold cursor-pointer " + (extensions.prettier ? "line-through text-muted-foreground" : "")}>
                  Prettier - Code formatter
                </Label>
                <p className="text-sm text-muted-foreground">Ctrl+S ile dosyayı kaydettiğiniz an tüm girintileri, boşlukları ve parantezleri mükemmel şekilde hizalar.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-muted/50 p-3 rounded-md">
              <Checkbox 
                id="eslint" 
                checked={extensions.eslint}
                onCheckedChange={(c) => setExtensions(prev => ({...prev, eslint: !!c}))} 
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="eslint" className={"font-bold cursor-pointer " + (extensions.eslint ? "line-through text-muted-foreground" : "")}>
                  ESLint
                </Label>
                <p className="text-sm text-muted-foreground">Kodunuzdaki sözdizimi hatalarını ve React kurallarına uymayan yerleri siz kodu kaydetmeden önce kırmızıyla çizer.</p>
              </div>
            </div>
          </div>
        </DeneBox>
      </section>

      <QuizBlock lessonKey="kurulum" />
    </div>
  );
}