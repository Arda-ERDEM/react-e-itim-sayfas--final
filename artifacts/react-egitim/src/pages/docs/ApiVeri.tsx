import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DeneBox } from "@/components/ui/DeneBox";
import { Button } from "@/components/ui/button";
import { QuizBlock } from "@/components/ui/QuizBlock";

interface Post {
  id: number;
  title: string;
}

export function ApiVeri() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
        if (!res.ok) throw new Error("Veri çekilemedi");
        const data = await res.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [retryCount]);

  const handleSimulateLoading = () => {
    setSpinnerLoading(true);
    setTimeout(() => setSpinnerLoading(false), 2000);
  };

  return (
    <div className="max-w-3xl prose dark:prose-invert">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-blue-800 dark:text-blue-300 font-bold m-0 mb-2">Bu derste öğreneceksin:</h3>
        <ul className="list-disc pl-5 m-0 text-blue-900 dark:text-blue-200">
          <li>fetch API ile nasıl veri çekilir</li>
          <li>useEffect içerisinde async/await kullanımı</li>
          <li>Yükleniyor (Loading) ve Hata (Error) durumları yönetimi</li>
          <li>AbortController ile istek iptali</li>
        </ul>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-8">
        <strong>İpucu:</strong> useEffect'in içine doğrudan `async` fonksiyon verilemez. useEffect senkron bir cleanup fonksiyonu bekler.
      </div>

      <h1 className="text-4xl font-bold mb-4 text-violet-600 dark:text-violet-400">API'den Veri Çekme</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Temel Fetch Kullanımı</h2>
        <p>Uzak bir sunucudan (API) veri almak için tarayıcının yerleşik <code>fetch</code> fonksiyonunu kullanırız.</p>
        <CodeBlock 
          title="Temel İstek"
          colorBorder="blue"
          code={"fetch('https://api.example.com/data')\n  .then(res => res.json())\n  .then(data => console.log(data));"}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">React ile Veri Çekmek</h2>
        <p>Bileşen yüklendiğinde veri çekmek istiyorsak bunu <code>useEffect</code> içinde yapmalıyız.</p>
        <CodeBlock 
          title="useEffect + fetch"
          colorBorder="green"
          code={"useEffect(() => {\n  async function getData() {\n    const res = await fetch('/api/data');\n    const data = await res.json();\n    setData(data);\n  }\n  getData();\n}, []);"}
        />
        <DeneBox title="Canlı Veri Çekme">
          <div className="p-4 border rounded">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Son Yazılar</h3>
              <Button onClick={() => setRetryCount(c => c + 1)} size="sm">Yenile</Button>
            </div>
            {loading && <p>Yükleniyor...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
              <ul className="list-disc pl-5">
                {posts.map(p => <li key={p.id} className="text-sm">{p.title}</li>)}
              </ul>
            )}
          </div>
        </DeneBox>
      </section>

      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-10">
        <strong>Uyarı:</strong> Bileşen her render edildiğinde veri çekmemek için useEffect bağımlılık dizisini (dependency array) boş bırakmayı unutmayın.
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Loading State Yönetimi</h2>
        <p>Kullanıcıya arka planda bir işlem olduğunu bildirmek çok önemlidir.</p>
        <CodeBlock 
          title="Loading ve Error"
          colorBorder="orange"
          code={"const [loading, setLoading] = useState(false);\nconst [error, setError] = useState(null);\n\n// fetch işleminden önce setLoading(true)\n// try/catch ile hata kontrolü\n// finally bloğunda setLoading(false)"}
        />
        <DeneBox title="Simüle Edilmiş Yükleme">
          <div className="flex flex-col items-center gap-4 p-4 border rounded">
            <Button onClick={handleSimulateLoading} disabled={spinnerLoading}>
              {spinnerLoading ? "Yükleniyor..." : "Veri Çek"}
            </Button>
            {spinnerLoading && (
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            )}
            {!spinnerLoading && <p className="text-sm text-muted-foreground">Veri yok</p>}
          </div>
        </DeneBox>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">AbortController ile İptal</h2>
        <p>Bileşen ekrandan kaldırılırsa devam eden ağ isteklerini iptal etmeliyiz.</p>
        <CodeBlock 
          title="Cleanup ile İptal"
          colorBorder="red"
          code={"useEffect(() => {\n  const controller = new AbortController();\n  \n  fetch(url, { signal: controller.signal });\n\n  return () => controller.abort(); // Cleanup\n}, []);"}
        />
        <DeneBox title="Tekrar Deneme Mantığı">
          <div className="p-4 border rounded bg-red-50 text-red-800">
            <p className="mb-2">Sunucuya ulaşılamadı (Simülasyon)</p>
            <Button variant="outline" onClick={() => alert("Yeniden deneniyor...")}>Tekrar Dene</Button>
          </div>
        </DeneBox>
      </section>

      <QuizBlock lessonKey="api" />
    </div>
  );
}
