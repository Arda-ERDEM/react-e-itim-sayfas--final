export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export const QUIZ_DATA: Record<string, QuizQuestion[]> = {
  giris: [
    {
      id: 1,
      question: "React nedir?",
      options: [
        "Bir backend framework'ü",
        "Kullanıcı arayüzleri oluşturmak için bir JavaScript kütüphanesi",
        "Veritabanı yönetim sistemi",
        "Bir programlama dili"
      ],
      correctIndex: 1,
      explanation: "React, Facebook (Meta) tarafından geliştirilen, kullanıcı arayüzleri oluşturmaya yarayan açık kaynaklı bir JavaScript kütüphanesidir."
    },
    {
      id: 2,
      question: "React'te 'Virtual DOM' (Sanal DOM) ne işe yarar?",
      options: [
        "Sanal gerçeklik uygulamaları yapmaya",
        "DOM manipülasyonlarını hızlandırmak için gerçek DOM'un hafızadaki bir kopyasını tutmaya",
        "CSS dosyalarını daha hızlı yüklemeye",
        "Veritabanını tarayıcıda saklamaya"
      ],
      correctIndex: 1,
      explanation: "Virtual DOM, performansı artırmak için React'in bellekte tuttuğu hafif bir DOM kopyasıdır. Sadece değişen kısımlar gerçek DOM'a yansıtılır."
    },
    {
      id: 3,
      question: "React'in mimarisi neye dayanır?",
      options: [
        "MVC (Model-View-Controller)",
        "Bileşen (Component) tabanlı mimari",
        "Mikroservis mimarisi",
        "Monolitik mimari"
      ],
      correctIndex: 1,
      explanation: "React tamamen bileşen (component) tabanlı bir mimariye sahiptir. UI, tekrar kullanılabilen küçük parçalara bölünür."
    },
    {
      id: 4,
      question: "React bir framework müdür yoksa kütüphane midir?",
      options: [
        "Tam teşekküllü bir framework'tür",
        "Sadece kullanıcı arayüzü katmanı için bir kütüphanedir",
        "Her ikisi de değildir",
        "Bir dildir"
      ],
      correctIndex: 1,
      explanation: "React, Angular veya Vue gibi tam teşekküllü bir framework değil, sadece 'View' (görünüm) katmanıyla ilgilenen bir kütüphanedir."
    },
    {
      id: 5,
      question: "React'te HTML ve JavaScript'i bir arada yazmamızı sağlayan sözdizimi nedir?",
      options: [
        "HTML5",
        "TypeScript",
        "JSX",
        "XML"
      ],
      correctIndex: 2,
      explanation: "JSX (JavaScript XML), React'te arayüz yapısını yazmak için kullanılan ve HTML'e çok benzeyen bir JavaScript sözdizimi uzantısıdır."
    }
  ],
  kurulum: [
    {
      id: 1,
      question: "Vite ile yeni bir React projesi oluşturmak için hangi komut kullanılır?",
      options: [
        "npm start react",
        "npm create vite@latest",
        "create-react-app my-app",
        "npm install react"
      ],
      correctIndex: 1,
      explanation: "Vite kullanarak modern ve hızlı bir React projesi başlatmak için 'npm create vite@latest' komutu kullanılır."
    },
    {
      id: 2,
      question: "npm ve npx arasındaki temel fark nedir?",
      options: [
        "İkisi de aynıdır",
        "npm paket yükler, npx paketleri indirmeden çalıştırır",
        "npm daha hızlıdır",
        "npx sadece backend için kullanılır"
      ],
      correctIndex: 1,
      explanation: "npm (Node Package Manager) paketleri kurar. npx ise bir paketi global olarak kurmaya gerek kalmadan bir kez çalıştırmanızı sağlar."
    },
    {
      id: 3,
      question: "package.json dosyası ne işe yarar?",
      options: [
        "Tüm JavaScript kodlarını tutar",
        "Projenin bağımlılıklarını (dependencies) ve betiklerini (scripts) yapılandırır",
        "Sadece HTML yapısını belirler",
        "Veritabanı bağlantı bilgilerini saklar"
      ],
      correctIndex: 1,
      explanation: "package.json, projedeki paket sürümlerini, projenin adını ve 'npm run dev' gibi komutların tanımlarını barındırır."
    },
    {
      id: 4,
      question: "node_modules klasörü neden genellikle GitHub'a (git'e) yüklenmez?",
      options: [
        "Çok güvenli olduğu için",
        "Çok büyük boyutta olduğu ve package.json'dan tekrar indirilebildiği için",
        "GitHub bu klasörü desteklemediği için",
        "Gizli şifreler içerdiği için"
      ],
      correctIndex: 1,
      explanation: "node_modules çok fazla dosya içerir ve boyutu büyüktür. npm install komutuyla kolayca yeniden oluşturulabildiği için git'e eklenmez."
    },
    {
      id: 5,
      question: "Vite projesinde geliştirme sunucusunu başlatmak için varsayılan komut nedir?",
      options: [
        "npm start",
        "npm run serve",
        "npm run dev",
        "node index.js"
      ],
      correctIndex: 2,
      explanation: "Vite projelerinde package.json içindeki 'dev' script'i, yerel geliştirme sunucusunu başlatmak için 'npm run dev' komutuyla çalıştırılır."
    }
  ],
  jsx: [
    {
      id: 1,
      question: "JSX'te bir değişkene ait değeri ekranda göstermek için hangi işaretler kullanılır?",
      options: [
        "{{ değişken }}",
        "[değişken]",
        "{değişken}",
        "<% değişken %>"
      ],
      correctIndex: 2,
      explanation: "JSX içerisinde JavaScript ifadelerini kullanmak için tek süslü parantez { } kullanılır."
    },
    {
      id: 2,
      question: "HTML'deki 'class' niteliği JSX'te nasıl yazılır?",
      options: [
        "class",
        "className",
        "classList",
        "cssClass"
      ],
      correctIndex: 1,
      explanation: "'class' JavaScript'te ayrılmış bir kelime (reserved keyword) olduğu için, JSX'te stil sınıflarını belirtirken 'className' kullanılır."
    },
    {
      id: 3,
      question: "JSX ile ilgili aşağıdakilerden hangisi doğrudur?",
      options: [
        "Birden fazla kök (root) eleman döndürebilir",
        "Sadece tek bir kök eleman veya Fragment (<></>) döndürmelidir",
        "Etiketleri kapatmak zorunlu değildir",
        "HTML ile tamamen aynıdır"
      ],
      correctIndex: 1,
      explanation: "Bir React bileşeninden dönen JSX ifadesi her zaman tek bir kapsayıcı (parent) elemana sahip olmalıdır."
    },
    {
      id: 4,
      question: "JSX'te içeriği olmayan bir etiket (örneğin img veya br) nasıl yazılmalıdır?",
      options: [
        "<img>",
        "<img />",
        "<img></img>",
        "Herhangi biri olur"
      ],
      correctIndex: 1,
      explanation: "JSX'te tüm etiketlerin kapanması zorunludur. İçeriği olmayan etiketler (self-closing tags) sonuna '/' eklenerek (<img />) kapatılır."
    },
    {
      id: 5,
      question: "JSX içinde HTML 'for' niteliği (örneğin label'da) nasıl yazılır?",
      options: [
        "for",
        "htmlFor",
        "labelFor",
        "target"
      ],
      correctIndex: 1,
      explanation: "'for' kelimesi JavaScript'te döngüler için kullanıldığından, JSX'te label etiketleri için 'htmlFor' kullanılır."
    }
  ],
  componentler: [
    {
      id: 1,
      question: "React'te bir bileşen (Component) temel olarak nedir?",
      options: [
        "Sadece bir CSS dosyasıdır",
        "Görsel bir arayüz parçası döndüren bir JavaScript fonksiyonu veya sınıfıdır",
        "Bir veritabanı tablosudur",
        "Node.js sunucusudur"
      ],
      correctIndex: 1,
      explanation: "Bileşenler, ekranda bir şey (JSX) gösteren (render eden) bağımsız ve yeniden kullanılabilir kod bloklarıdır."
    },
    {
      id: 2,
      question: "React bileşenleri isimlendirilirken hangi kurala dikkat edilmelidir?",
      options: [
        "Her zaman küçük harfle başlamalıdır",
        "camelCase ile yazılmalıdır",
        "Büyük harfle (PascalCase) başlamalıdır",
        "Boşluk içermelidir"
      ],
      correctIndex: 2,
      explanation: "React, büyük harfle başlayan elementleri bileşen (örn: <Button />), küçük harfle başlayanları HTML etiketi (örn: <button>) olarak algılar."
    },
    {
      id: 3,
      question: "Bileşenler arasında veri aktarmak için ne kullanılır?",
      options: [
        "State",
        "Props",
        "HTML id'leri",
        "LocalStorage"
      ],
      correctIndex: 1,
      explanation: "Props (Properties), üst bileşenden (parent) alt bileşene (child) veri aktarımı sağlamak için kullanılır."
    },
    {
      id: 4,
      question: "Bir bileşenin açılış ve kapanış etiketleri arasına konulan içerik, bileşene hangi prop olarak iletilir?",
      options: [
        "content",
        "inside",
        "children",
        "body"
      ],
      correctIndex: 2,
      explanation: "Örneğin <Kart>Merhaba</Kart> kullanımında 'Merhaba' metni, Kart bileşenine 'children' prop'u olarak aktarılır."
    },
    {
      id: 5,
      question: "React'te 'prop'ların akış yönü nasıldır?",
      options: [
        "Aşağıdan yukarıya",
        "Sadece ebeveynden çocuğa (Yukarıdan aşağıya)",
        "Her iki yöne de",
        "Sadece kardeş bileşenler arası"
      ],
      correctIndex: 1,
      explanation: "React'te veri akışı tek yönlüdür (Unidirectional). Props, her zaman üst bileşenden alt bileşene doğru akar."
    }
  ],
  state: [
    {
      id: 1,
      question: "useState hook'u ne döndürür?",
      options: [
        "Sadece güncel değeri",
        "Mevcut değeri tutan değişken ve onu güncelleyen bir fonksiyon dizisi",
        "Bir obje",
        "Bir HTML elementi"
      ],
      correctIndex: 1,
      explanation: "useState bir dizi döner: ilk eleman state'in kendisi, ikinci eleman ise state'i değiştirmeye yarayan fonksiyondur. Örn: [deger, setDeger]"
    },
    {
      id: 2,
      question: "React'te bir state değeri neden doğrudan (örn: sayac = 5) değiştirilmemelidir?",
      options: [
        "Çünkü JavaScript hata verir",
        "Çünkü React state'in değiştiğini algılayamaz ve sayfayı güncellemez (re-render yapmaz)",
        "Çünkü güvenlik açığı yaratır",
        "Değiştirilebilir, bir sakıncası yoktur"
      ],
      correctIndex: 1,
      explanation: "React'in bileşeni yeniden çizmesi (re-render) için state'in güncelleme fonksiyonunu (setter) kullanmanız gerekir."
    },
    {
      id: 3,
      question: "State güncellendiğinde React ne yapar?",
      options: [
        "Sayfayı tamamen yeniler",
        "Bileşeni ve onun alt bileşenlerini yeni state ile tekrar çalıştırır (re-render)",
        "Veritabanını günceller",
        "Uygulamayı kapatır"
      ],
      correctIndex: 1,
      explanation: "State veya prop değiştiğinde, React o bileşenin görünümünü güncellemek için fonksiyonu tekrar çalıştırır (re-render)."
    },
    {
      id: 4,
      question: "const [yas, setYas] = useState(25) kullanımında 25 sayısı neyi ifade eder?",
      options: [
        "En fazla girilebilecek yaşı",
        "State'in başlangıç (initial) değerini",
        "Dizinin eleman sayısını",
        "Yaşın sabit olduğunu ve değişmeyeceğini"
      ],
      correctIndex: 1,
      explanation: "useState içine yazılan parametre, state değişkeninin ilk render anında alacağı varsayılan başlangıç değeridir."
    },
    {
      id: 5,
      question: "Bir bileşen içinde birden fazla useState kullanılabilir mi?",
      options: [
        "Hayır, sadece bir tane kullanılabilir",
        "Evet, istenildiği kadar birbirinden bağımsız useState tanımlanabilir",
        "Evet ama en fazla 3 tane",
        "Sadece nesne (object) tutuyorsa evet"
      ],
      correctIndex: 1,
      explanation: "Bir React bileşeninde isim, yaş, renk gibi farklı verileri tutmak için istediğiniz kadar farklı useState tanımlayabilirsiniz."
    }
  ],
  effect: [
    {
      id: 1,
      question: "useEffect hook'unun ana kullanım amacı nedir?",
      options: [
        "CSS stillerini uygulamak",
        "Bileşende yan etkileri (veri çekme, abonelik, DOM manipülasyonu) yönetmek",
        "HTML etiketleri oluşturmak",
        "Form doğrulaması yapmak"
      ],
      correctIndex: 1,
      explanation: "useEffect, React dışındaki dünyayla (API'ler, tarayıcı API'leri, timer'lar) etkileşime girmek (side effects) için kullanılır."
    },
    {
      id: 2,
      question: "useEffect(()=>{...}, []) kullanımındaki boş dizi [] ne anlama gelir?",
      options: [
        "Effect'in her render'da çalışmasını sağlar",
        "Effect'in hiçbir zaman çalışmamasını sağlar",
        "Effect'in sadece bileşen ekrana ilk geldiğinde (mount) 1 kez çalışmasını sağlar",
        "Hata verir"
      ],
      correctIndex: 2,
      explanation: "Bağımlılık dizisinin boş olması, effect'in bağlı olduğu hiçbir şeyin değişmeyeceğini, dolayısıyla sadece ilk yüklemede bir kez çalışacağını belirtir."
    },
    {
      id: 3,
      question: "useEffect içinde 'return () => {...}' şeklinde dönen fonksiyona ne ad verilir?",
      options: [
        "Callback",
        "Cleanup (Temizlik) fonksiyonu",
        "Render fonksiyonu",
        "State güncelleyici"
      ],
      correctIndex: 1,
      explanation: "Bileşen ekrandan kalkarken (unmount) veya effect yeniden çalışmadan önce eski işlemleri (örneğin interval, event listener) iptal etmek için Cleanup fonksiyonu kullanılır."
    },
    {
      id: 4,
      question: "useEffect bağımlılık dizisini (dependency array) tamamen yazmazsanız ne olur?",
      options: [
        "Sadece ilk render'da çalışır",
        "Bileşenin her yeniden çiziminde (re-render) tekrar tekrar çalışır",
        "Hiç çalışmaz",
        "React hata fırlatır"
      ],
      correctIndex: 1,
      explanation: "Diziyi tamamen unutmak (örneğin useEffect(() => {...})), effect'in her render işleminde yeniden çalışmasına ve olası sonsuz döngülere neden olur."
    },
    {
      id: 5,
      question: "Sonsuz döngü (infinite loop) genellikle useEffect'te nasıl oluşur?",
      options: [
        "Çok fazla HTML yazıldığında",
        "Bağımlılık dizisi olmadan effect içinde state güncellendiğinde",
        "Boş dizi eklendiğinde",
        "Cleanup fonksiyonu yazıldığında"
      ],
      correctIndex: 1,
      explanation: "Eğer effect her render'da çalışıp içinde state güncelliyorsa, state güncellemesi yeni bir render'ı tetikler, o render effect'i tetikler ve bu sonsuza dek sürer."
    }
  ],
  events: [
    {
      id: 1,
      question: "React'te bir butona tıklama olayı eklemek için hangi özellik kullanılır?",
      options: [
        "onclick",
        "onClick",
        "click",
        "onMouseClick"
      ],
      correctIndex: 1,
      explanation: "React olayları (events) camelCase isimlendirme kuralını kullanır, bu yüzden 'onClick' yazılır."
    },
    {
      id: 2,
      question: "Olay dinleyicisi (event listener) fonksiyonuna React tarafından otomatik olarak iletilen nesne nedir?",
      options: [
        "this nesnesi",
        "Event (e) nesnesi",
        "State nesnesi",
        "DOM elementi"
      ],
      correctIndex: 1,
      explanation: "Olay tetiklendiğinde React fonksiyonunuza SyntheticEvent nesnesini gönderir. Bu genellikle 'e' veya 'event' parametresi olarak alınır."
    },
    {
      id: 3,
      question: "Bir form gönderildiğinde sayfanın yenilenmesini (varsayılan davranışı) engellemek için hangi metot kullanılır?",
      options: [
        "e.stopPropagation()",
        "e.preventDefault()",
        "e.cancelEvent()",
        "e.stopDefault()"
      ],
      correctIndex: 1,
      explanation: "e.preventDefault() metodu, bir bağlantıya tıklamak veya form göndermek gibi tarayıcının varsayılan hareketlerini durdurmak için kullanılır."
    },
    {
      id: 4,
      question: "Bir input alanına yazı yazıldığında bunu yakalamak için hangi olay kullanılır?",
      options: [
        "onInput",
        "onWrite",
        "onChange",
        "onKeyDown"
      ],
      correctIndex: 2,
      explanation: "Kullanıcının input'a yazdığı her harfi (değer değişikliğini) yakalamak için React'te en sık 'onChange' kullanılır."
    },
    {
      id: 5,
      question: "Bir onClick olayına parametreli fonksiyon gönderirken doğru sözdizimi nasıldır?",
      options: [
        "onClick={sil(id)}",
        "onClick={() => sil(id)}",
        "onClick={sil}",
        "onClick=\"sil(id)\""
      ],
      correctIndex: 1,
      explanation: "Fonksiyonu hemen çalıştırmamak için bir ok (arrow) fonksiyonu sarmalayıcısı kullanılır: () => sil(id)."
    }
  ],
  listeler: [
    {
      id: 1,
      question: "Bir dizi veriyi JSX elemanlarına dönüştürmek için hangi JavaScript dizi metodu kullanılır?",
      options: [
        ".filter()",
        ".reduce()",
        ".forEach()",
        ".map()"
      ],
      correctIndex: 3,
      explanation: "React'te listeleri render etmek için .map() metodu kullanılır çünkü bu metot orijinal diziyi değiştirip yeni bir JSX dizisi döndürür."
    },
    {
      id: 2,
      question: "React'te listeler oluşturulurken her liste elemanına neden bir 'key' prop'u verilmelidir?",
      options: [
        "CSS stillerini daha kolay uygulamak için",
        "React'in elemanları tanıması, hangilerinin eklendiğini veya silindiğini verimli bir şekilde anlaması için",
        "Veritabanına kaydetmek için",
        "Ekranda numaralandırma göstermek için"
      ],
      correctIndex: 1,
      explanation: "Key'ler, liste değiştiğinde React'in her elemanı kimliklendirmesini ve sadece değişen kısımları güncellemesini sağlar."
    },
    {
      id: 3,
      question: "Liste key'leri olarak indeks (index) kullanmak neden iyi bir fikir değildir?",
      options: [
        "Çünkü her zaman sayılardan oluşur",
        "Çünkü liste sıralaması değiştiğinde veya araya eleman eklendiğinde hatalara ve performans kayıplarına yol açabilir",
        "Çünkü kod okunabilirliğini düşürür",
        "Kullanmak gayet iyi bir fikirdir"
      ],
      correctIndex: 1,
      explanation: "Eğer liste dinamikse (ekleme/silme varsa), index'ler kayar ve React yanlış elemanı güncelleyerek hatalı durumlar oluşturabilir."
    },
    {
      id: 4,
      question: "JSX içinde koşullu (conditional) render yapmak için en yaygın operatörler nelerdir?",
      options: [
        "if ve else",
        "switch ve case",
        "Ternary (? :) ve Mantıksal VE (&&)",
        "for ve while"
      ],
      correctIndex: 2,
      explanation: "JSX içindeki süslü parantezlerde (expression) if-else kullanılamadığı için Ternary (şart ? doğruysa : yanlışsa) veya && operatörleri tercih edilir."
    },
    {
      id: 5,
      question: "{kullaniciVarMi && <Profil />} ifadesinde ne olur?",
      options: [
        "kullaniciVarMi false ise hata fırlatır",
        "Sadece kullaniciVarMi true ise Profil bileşenini ekrana çizer",
        "Her zaman Profil bileşenini çizer",
        "Hiçbir zaman çalışmaz"
      ],
      correctIndex: 1,
      explanation: "JavaScript'te && operatörü ilk değer true ise ikinci değeri döndürür. Bu, React'te koşullu eleman göstermenin kısa yoludur."
    }
  ],
  formlar: [
    {
      id: 1,
      question: "React'te form değerlerinin React state'i tarafından yönetildiği form elemanlarına ne ad verilir?",
      options: [
        "Uncontrolled Components",
        "Stateful Forms",
        "Controlled Components",
        "Bound Inputs"
      ],
      correctIndex: 2,
      explanation: "Değeri (value) React state'ine bağlı olan ve değişimi (onChange) state üzerinden güncellenen elemanlara Kontrollü Bileşen (Controlled Component) denir."
    },
    {
      id: 2,
      question: "Bir Controlled Input oluşturmak için hangi iki prop mutlaka kullanılmalıdır?",
      options: [
        "id ve name",
        "type ve placeholder",
        "value ve onChange",
        "ref ve defaultValue"
      ],
      correctIndex: 2,
      explanation: "Kontrollü bir input'un ne göstereceği 'value' prop'u ile, kullanıcı yazdığında state'in nasıl güncelleneceği 'onChange' prop'u ile belirlenir."
    },
    {
      id: 3,
      question: "Formun genelinin gönderilmesini (submit) yakalamak için hangi olayı dinleriz?",
      options: [
        "Form etiketine onSubmit",
        "Buton etiketine onClick",
        "Input etiketine onChange",
        "Form etiketine onAction"
      ],
      correctIndex: 0,
      explanation: "En doğru yöntem form elementine onSubmit eklemektir. Böylece hem butona tıklanınca hem de enter tuşuna basılınca tetiklenir."
    },
    {
      id: 4,
      question: "React'te <textarea> HTML'dekinden farklı olarak nasıl değer alır?",
      options: [
        "<textarea>İçerik</textarea> olarak",
        "Sadece children prop'u ile",
        "Tıpkı bir input gibi 'value' prop'u ile",
        "innerHtml ile"
      ],
      correctIndex: 2,
      explanation: "React'te textarea, standart HTML'in aksine (etiketler arası metin yerine) tıpkı bir text input gibi 'value' prop'u ile kontrol edilir."
    },
    {
      id: 5,
      question: "Form gönderildiğinde sayfanın yenilenmesini engelleyen fonksiyon aşağıdakilerden hangisidir?",
      options: [
        "event.stopPropagation()",
        "event.preventDefault()",
        "form.stop()",
        "return false"
      ],
      correctIndex: 1,
      explanation: "Tarayıcının form submit edildiğinde yaptığı standart sayfa yenileme davranışı e.preventDefault() ile engellenir."
    }
  ],
  hooks: [
    {
      id: 1,
      question: "useRef ile useState arasındaki en büyük fark nedir?",
      options: [
        "useRef sadece sayı saklar",
        "useRef değeri değiştiğinde bileşeni yeniden çizdirmez (re-render yapmaz)",
        "useState DOM elemanlarına erişmek içindir",
        "Farkları yoktur"
      ],
      correctIndex: 1,
      explanation: "useRef mutable (değiştirilebilir) bir obje döner ve .current özelliği güncellendiğinde bileşen baştan çizilmez (re-render olmaz)."
    },
    {
      id: 2,
      question: "Veriyi Props ile katman katman (prop drilling) taşımak yerine her bileşenden erişilebilir yapmak için hangi hook kullanılır?",
      options: [
        "useEffect",
        "useRef",
        "useContext",
        "useMemo"
      ],
      correctIndex: 2,
      explanation: "useContext, Context API tarafından sağlanan global verileri (tema, kullanıcı oturumu vb.) ara bileşenlere prop geçmeden okumayı sağlar."
    },
    {
      id: 3,
      question: "Ağır bir hesaplamanın (fonksiyonun) sonucunu hafızada tutarak her render'da tekrar hesaplanmasını önleyen hook hangisidir?",
      options: [
        "useCallback",
        "useMemo",
        "useState",
        "useHistory"
      ],
      correctIndex: 1,
      explanation: "useMemo, pahalı bir hesaplamanın sonucunu 'hatırlar' (memoize eder) ve sadece bağımlılıkları değiştiğinde yeniden hesaplar."
    },
    {
      id: 4,
      question: "Fonksiyonların bellekteki referanslarını sabitlemek için hangi hook kullanılır?",
      options: [
        "useMemo",
        "useRef",
        "useCallback",
        "useEffect"
      ],
      correctIndex: 2,
      explanation: "useCallback, özellikle alt bileşenlere prop olarak fonksiyon geçildiğinde, referansın değişip gereksiz re-render'lara sebep olmasını engellemek için fonksiyonu memoize eder."
    },
    {
      id: 5,
      question: "Aşağıdakilerden hangisi React Hook kurallarından biridir?",
      options: [
        "Class bileşenleri içinde kullanılmalıdırlar",
        "Koşullu ifadelerin (if) veya döngülerin içinde kullanılabilirler",
        "Sadece React fonksiyon bileşenlerinin en üst seviyesinde (top-level) çağrılmalıdırlar",
        "İsimleri 'use' ile başlamak zorunda değildir"
      ],
      correctIndex: 2,
      explanation: "Hook'lar her render'da aynı sırayla çağrılmalıdır. Bu yüzden if blokları veya döngüler içinde kullanılamazlar."
    }
  ],
  router: [
    {
      id: 1,
      question: "SPA (Single Page Application) nedir?",
      options: [
        "Sadece tek bir HTML dosyası içeren çok basit websiteleri",
        "Sayfanın tamamen yenilenmeden (reload olmadan) içeriğin JavaScript ile güncellendiği uygulamalar",
        "Sadece mobil telefonlar için tasarlanmış sayfalar",
        "Sadece yazı içeren blog siteleri"
      ],
      correctIndex: 1,
      explanation: "SPA, tarayıcıda tek bir HTML belgesi yükleyen ve kullanıcı sayfada gezindikçe içeriği dinamik olarak değiştiren mimaridir."
    },
    {
      id: 2,
      question: "Wouter (veya React Router) kullanırken sayfalar arası geçiş için <a> (anchor) etiketi yerine ne kullanılmalıdır?",
      options: [
        "Sayfa",
        "Button",
        "Link",
        "Nav"
      ],
      correctIndex: 2,
      explanation: "<Link> bileşeni, sayfanın baştan yüklenmesini engelleyerek SPA navigasyonunu sağlar. <a> etiketi sayfayı tamamen yeniler."
    },
    {
      id: 3,
      question: "Wouter'da mevcut rotayı (URL yolunu) okumak için hangi hook kullanılır?",
      options: [
        "useLocation",
        "useRouter",
        "usePath",
        "useHistory"
      ],
      correctIndex: 0,
      explanation: "Wouter kütüphanesinde mevcut URL'yi almak ve programatik olarak değiştirmek için useLocation hook'u kullanılır."
    },
    {
      id: 4,
      question: "Rotada değişken parametreleri (örn: /profil/:id) okumak için hangi hook kullanılır?",
      options: [
        "useLocation",
        "useParams",
        "useId",
        "useRoute"
      ],
      correctIndex: 1,
      explanation: "useParams hook'u, rotadaki dinamik parçaları (parametreleri) bir obje olarak döndürür."
    },
    {
      id: 5,
      question: "Bir kullanıcı giriş yaptıktan sonra onu otomatik olarak anasayfaya yönlendirmek için wouter'da nasıl bir kullanım yaparız?",
      options: [
        "window.location.href = '/'",
        "const [_, setLocation] = useLocation(); setLocation('/');",
        "navigate('/')",
        "router.push('/')"
      ],
      correctIndex: 1,
      explanation: "Wouter'da useLocation hook'u bir dizi döner. İkinci elemanı (setLocation) kullanarak programatik yönlendirme yapabiliriz."
    }
  ]
};