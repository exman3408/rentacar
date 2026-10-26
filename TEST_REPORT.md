# RANTE CAR — Test raporu

Tarih: 26 Ekim 2026. Ortam: Linux, Node.js 24.19.0, npm 11.9.0; kurulu gerçek Chromium, Playwright; ANGLE/SwiftShader yazılımsal WebGL. Bu rapor gerçek dosya ve tarayıcı kontrollerine dayanır; görsel referansla eşdeğerlik onayı değildir.

## Kurulum / derleme

- `npm install`: başarılı.
- `npm ci --cache /tmp/rante-npm`: kilit dosyasından başarılı, 28 paket.
- `npm run dev`: Vite sunucusu başladı. Ana sayfa ve yerel MH-6 GLB isteği HTTP 200.
- `npm run build`: TypeScript ve Vite production derlemesi başarılı. Yaklaşık 612 kB minify edilmiş JS için 500 kB chunk uyarısı var; hata değil, bundle optimizasyonu henüz yapılmadı.
- Beş GLB'de glTF 2.0 magic/version/byteLength ve gerçek mesh varlığı doğrulandı. SUV: 5 mesh, sedan: 6, her tekne: 1, helikopter: 6.

## Gerçek tarayıcı senaryoları

`npm test`: **2 test geçti**, son tam tur yaklaşık 1,9 dakika. Tek bir uçtan uca test birçok adımı ardışık doğrular; aşağıdaki satırlar ayrı test sayısı değildir.

| Kontrol | Sonuç / kapsam |
|---|---|
| Başlangıç ve beş GLB'nin GLTFLoader ile yüklenmesi | Geçti; her seçili modelde mesh sayısı > 0. Görsel ekran görüntüleri alındı. |
| Araç girişi / çıkışı | Geçti; girişte x < 0, merkezde x ≈ 0, değişimde çıkışta x > 0; iki ayrı gerçek model. Durduktan sonra tekerlek açıları sabit. |
| Tekne girişi / değişimi | Geçti; eski tekne x > 0'a giderken yeni tekne x < 0'dan geliyor ve yerleşiyor. Bu bir **lüks yat testi değildir**. |
| MH-6 inişi | Geçti; havada y > 0, iniş sonunda y ≈ 0; iki rotorun açısı zamanla değişiyor. |
| MH-6 kalkışı / tekrar inişi | Geçti; tekrar oynatmada yükseklik artıyor, ardından tekrar yerleşiyor. İkinci helikopter modeli bulunmadığından **iki farklı helikopter arası değişim test edilmedi**. |
| Hızlı seçim | Geçti; araç → tekne → araç hızlı seçiminden sonra son seçilen SUV yerleşti. |
| Fare / klavye / zoom | Geçti; sürükleme ve + düğmesi kamera koordinatını değiştiriyor, sağ ok ürün değiştiriyor. Her tuşun tüm olası kombinasyonları sınanmadı. |
| Detay modalı | Geçti; ödeme/rezervasyon alınmadığı açık, açma/kapama çalışıyor. |
| Mobil yerleşim | Geçti; 390×844'te yatay sayfa taşması yok, CTA ve ürün kartı viewport içinde. |
| Dokunmatik orbit ve pinch | Geçti; Chromium CDP touch olayları kamera yönünü ve uzaklığını değiştiriyor. Fiziksel telefon testi yapılmadı. |
| Azaltılmış hareket / Escape | Geçti; reduced-motion emülasyonunda uygulama yükleniyor, Escape modalı kapatıyor. |
| Hata / yeniden deneme | Geçti; GLB isteği bilinçli engellendi, sonlu hata durumu ve yeniden dene gösterildi; engel kaldırılınca model yüklendi. |
| Normal akışta konsol / ağ | Yakalanmamış page error, console error veya HTTP ≥400 yok. Bilinçli engellenen yükleme bu kontrolün sonrasında ayrıca sınandı; bu senaryoda beklenen ağ hatası oluşur. |

İlk turlarda eksik favicon 404'ü giderildi; kayan noktalı iniş yüksekliği uygun toleransla kontrol edildi. Yazılımsal render nedeniyle sabit 250 ms beklemeler güvenilir değildi; rotor ve kamera testleri gerçek durum değişimini bekler. Beklenen davranış koşulları kaldırılmadı.

Mobil kadraj için portrait kamera açısı genişletildikten sonra `npm test -- accessibility.spec.ts` tekrar çalıştırıldı: **1 test geçti (9,4 saniye)**. Son `npm run build` de başarılı. Bu küçük kadraj ayarı sahne animasyon mantığını değiştirmez.

## Ekran görüntüleri

- [Araç](docs/screenshots/car.png)
- [Tekne](docs/screenshots/boat.png)
- [Helikopter](docs/screenshots/helicopter.png)
- [Mobil](docs/screenshots/mobile.png)

## Performans

Ölçüm komutu: `node scripts/measure.mjs` (sunucu çalışırken). Ham sonuç: [docs/performance.json](docs/performance.json). Ölçüm yazılımsal SwiftShader'dadır, gerçek GPU/telefon değildir; otomasyon yükü de dahildir. Son izole ölçüm: 23 örnek, ortalama **572,53 ms/frame**, yaklaşık **1,75 FPS**. Bu ortamda akıcılık hedefi karşılanmıyor. Düşük kare hızında çözünürlük ve shadow-map boyutu otomatik azaltılır. **60 FPS hedefinin karşılandığı doğrulanmadı.** Üretim donanımında süreklilik, bellek ve termal performans test edilmedi.

## Tamamlanmamış gereksinimler

- Gerçek lüks yat ve fotogerçekçi premium araç filosu yok. Stilize CC0 sürat tekneleri yat diye sunulmaz. Referans görselin fotogerçekçi seviyesi karşılanmadı.
- Tek bir gerçek helikopter var; ikinci model ve iki farklı helikopter arasında ürün değişimi doğrulanmadı.
- Fiziksel su yansıması, hacimsel atmosfer, gerçek HDRI, ileri rotor motion blur ve su köpüğü simülasyonu yok. Shader dalgaları, basit halka izi, temas gölgeleri ve PMREM ortamı var.
- Dokunmatik gerçek cihazda, Edge/Safari/Firefox'ta, WebGL bağlamı kaybı ve gerçek 15 saniyelik timeout yolunda test yapılmadı. Ağ kesintisi yolu test edildi.
- Rezervasyon backend'i, ödeme, canlı destek, stok/müsaitlik ve gerçek kiralama fiyatları yok; modal bir demo olduğunu açıklar.
- Yeni cloud task'ta snapshot restorasyonu veya yayınlama test edilmedi. Yapılandırma taslağına kurulum/başlatma talimatları kaydedildi; yayınlama yapılmadı.
