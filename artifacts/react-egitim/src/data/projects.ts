export type Project = {
  id: number;
  ad: string;
  zorluk: string;
  zorlukRenk: string;
  aciklama: string;
  etiketler: string[];
  ogrenmeHedefleri: string[];
  ozet: string;
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    ad: "Todo Listesi",
    zorluk: "Kolay",
    zorlukRenk: "bg-green-500",
    aciklama: "Basit bir yapılacaklar listesi uygulaması.",
    etiketler: ["useState", "Events", "Listeler"],
    ogrenmeHedefleri: ["State yönetimi", "Liste render etme", "Form etkileşimi"],
    ozet: "Görev ekleme, tamamlama ve silme akışını çalışırken öğrenmek için ideal başlangıç projesi.",
  },
  {
    id: 2,
    ad: "Hava Durumu",
    zorluk: "Orta",
    zorlukRenk: "bg-yellow-500",
    aciklama: "Bir API'den anlık hava durumu çeken uygulama.",
    etiketler: ["useEffect", "fetch", "State"],
    ogrenmeHedefleri: ["API çağrısı yapma", "Loading/Error state", "Veri dönüştürme"],
    ozet: "Harici veriyle çalışmayı ve async akışları pekiştirmek için iyi bir örnek.",
  },
  {
    id: 3,
    ad: "Film Arama",
    zorluk: "Orta",
    zorlukRenk: "bg-yellow-500",
    aciklama: "Filmleri arayıp detaylarını gösteren uygulama.",
    etiketler: ["Forms", "API", "Components"],
    ogrenmeHedefleri: ["Arama formu kontrolü", "Kart bileşenleri", "Sonuç filtreleme"],
    ozet: "Kullanıcı girişine göre değişen içerik gösterimi için güzel bir uygulama omurgası sunar.",
  },
  {
    id: 4,
    ad: "Alışveriş Sepeti",
    zorluk: "Orta",
    zorlukRenk: "bg-yellow-500",
    aciklama: "Ürün ekleyip çıkarabileceğiniz sepet.",
    etiketler: ["Complex State", "Props", "Context"],
    ogrenmeHedefleri: ["Paylaşılan state", "Context kullanımı", "Sepet hesaplama"],
    ozet: "Birden fazla bileşen arasında veri paylaşımını çözmek için iyi bir uygulama.",
  },
  {
    id: 5,
    ad: "Kelime Oyunu",
    zorluk: "Zor",
    zorlukRenk: "bg-red-500",
    aciklama: "Harf tahmin etme oyunu.",
    etiketler: ["Logic", "Hooks", "Refs"],
    ogrenmeHedefleri: ["Oyun döngüsü kurma", "Ref ile odak kontrolü", "Koşullu render"],
    ozet: "Etkileşimli mantık ve durum yönetimini bir arada denemek için daha zorlu bir örnek.",
  },
  {
    id: 6,
    ad: "Blog Uygulaması",
    zorluk: "Zor",
    zorlukRenk: "bg-red-500",
    aciklama: "Makale okuma ve yazma uygulaması.",
    etiketler: ["Router", "CRUD", "State"],
    ogrenmeHedefleri: ["Sayfa bazlı gezinme", "CRUD akışları", "Form ve liste senaryoları"],
    ozet: "Router, form yönetimi ve veri akışını tek projede birleştirmek için tam kapsamlı bir örnek.",
  },
];

export function getProjectById(projectId: number) {
  return PROJECTS.find((project) => project.id === projectId);
}