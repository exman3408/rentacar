# RANTE CAR

Vite + TypeScript + Three.js ile gerçek, yerel GLB modellerini gösteren etkileşimli kiralama vitrini. Tek WebGL renderer, OrbitControls ve iptal edilebilir giriş/çıkış durum makinesi kullanır. Brief: [RANTE_CAR_CODEX_MASTER_BRIEF.md](RANTE_CAR_CODEX_MASTER_BRIEF.md).

## Çalıştırma (Windows PowerShell / macOS / Linux)
Node.js 22.12+ (bu ortamda 24.19) gerekir.

```powershell
npm install
npm run dev
```

Vite'ın terminalde bildirdiği adresi tarayıcıda açın. HTML dosyasını doğrudan açmayın.

```powershell
npm run build
npx vite preview
```

Tekrarlanabilir kurulum: `npm ci`. Model yükleme için harici API, anahtar veya hesap gerekmez.

## Test

Geliştirme sunucusu çalışırken:

```powershell
npx playwright install chromium
npm test
```

Bu bulut ortamında testler `/usr/bin/chromium` kullanır. Diğer sistemlerde `CHROMIUM_PATH` ortam değişkenini Chrome/Chromium çalıştırılabilir dosyasının yoluna ayarlayın. Alternatif olarak `playwright.config.ts` içindeki `executablePath` ayarını kaldırarak Playwright tarafından indirilen tarayıcıyı kullanın.

- Kategori / ürün kartları, ok düğmeleri veya klavye okları: model seçimi.
- Sürükleme: 360° inceleme; fare tekerleği, iki parmak veya +/−: zoom.
- ◎: otomatik orbit; kullanıcı sürükleyince durur. ↻: çıkış ve giriş senaryosunu tekrarlar.
- Kontroller giriş ve çıkış sırasında kilitlidir. Azaltılmış hareket tercihi süreleri kısaltır.
- Detaylar bir demo modalıdır. Gerçek rezervasyon, ödeme, hesap veya backend yoktur.

## Kapsam ve dürüst sınırlamalar

İki Kenney araç modeli, iki Kenney sürat teknesi ve bir AnirudhRao MH-6 modeli yereldir. Bunlar Mercedes, BMW veya lüks yat diye etiketlenmez. MH-6 askerî kökenli bir görsel varlıktır, sivil kiralama teklifi değildir. Bir helikopter olduğundan değişim senaryosu tekrar oynatma ile sınanır; ikinci bir helikopter ürününün doğrulaması yoktur.

Stilize araç/tekne varlıkları ve prosedürel çevre referanstaki fotogerçekçi kaliteyi karşılamaz. Deniz dalga shader'ı ve basit su izi vardır; fiziksel su yansıması/sıçrama simülasyonu ve HDRI dosyası yoktur. Yansıma aydınlatması PMREM RoomEnvironment ile üretilir. Gerçek lüks yat ve fotogerçekçi ticari filo varlıkları için lisanslı yeni varlıklar gerekir.

[Kaynaklar ve lisanslar](ASSET_SOURCES.md) · [Test raporu](TEST_REPORT.md)
