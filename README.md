# Egitim Rehberi

React + TypeScript odakli egitim icerikleri ve uygulama ornekleri iceren monorepo proje.

## Kurulum

### 1. Bağımlılıkları Yükle
```bash
# Workspace kökünden
pnpm install
```

### 2. Projeyi Çalıştır

#### Ana React Uygulaması (react-egitim)
```bash
cd artifacts/react-egitim
pnpm dev
```
Uygulama http://localhost:5173 adresinde açılır.

#### API Sunucusu (opsiyonel)
```bash
cd artifacts/api-server
pnpm dev
```

### 3. Build
```bash
# Workspace kökünden tüm projeleri build et
pnpm build

# Veya sadece react-egitim
cd artifacts/react-egitim
pnpm build
```

### 4. Type Checking
```bash
# Workspace kökünden
pnpm typecheck
```

