# 🧾 User Management Uygulaması

🎬 [Uygulama Tanıtım Videosu]
https://github.com/user-attachments/assets/a41f3dd3-3d4e-4ad8-be9d-169bf48cc97e


Vite + React + Reactstrap tabanlı bir kullanıcı yönetim uygulamasıdır. Uygulama, sahte bir API'den (DummyJSON) kullanıcı verilerini alır, `localStorage`'a kaydeder ve sonraki işlemleri tamamen local veriler üzerinden yürütür.

---

## 🚀 Kurulum

### NPM ile:

```bash
git clone https://github.com/kullanici/delta-service-frontend-case.git
cd delta-service-frontend-case
npm install
npm run dev
```

### PNPM ile:

```bash
git clone https://github.com/kullanici/delta-service-frontend-case.git
cd delta-service-frontend-case
pnpm install
pnpm dev
```

---

## 🧩 Özellikler

### ✅ Kullanıcı Listeleme
- İlk açılışta API'den veri çekilir.
- Çekilen veriler `localStorage`'a kaydedilir.
- Listeleme işlemleri local veriler üzerinden yapılır.
- Sayfalama desteklenir.

### 🔍 Arama & Filtreleme
- Ad, soyad, e-posta veya telefon numarasına göre arama yapılabilir.

### ➕ Kullanıcı Ekleme
- Yeni kullanıcı formdan eklenir, `localStorage`'a kaydedilir ve listeye yansıtılır.

### 📝 Kullanıcı Güncelleme
- Kullanıcılar düzenlenebilir.
- Güncelleme işlemi `localStorage`'taki ID'ye göre yapılır.

### ❌ Kullanıcı Silme
- Silinen kullanıcılar anında localStorage ve arayüzden kaldırılır.

### 🔄 Yenileme
- `Refresh` butonu, `localStorage`'daki veriyi yeniden okur ve listeyi tazeler.

---

## 🛠 Kullanılan Teknolojiler

- [Vite](https://vitejs.dev/) (React için hızlı geliştirme ortamı)
- React
- Reactstrap (Bootstrap 5 bileşenleri)
- DummyJSON API (https://dummyjson.com/users)
- localStorage (veri saklama)

---

## 📂 Proje Yapısı

```
/src
  /components
    UserList.jsx
    UserModal.jsx
    FilterComponent.jsx
    Pagination.jsx
  /services
    api.js
    localStorage.js
  App.jsx
  main.jsx
```

---