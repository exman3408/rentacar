# RANTE CAR — Güncel test raporu

26 Ekim 2026. Linux, Node.js 24.19, gerçek Chromium ve Playwright. WebGL: ANGLE / SwiftShader; donanımlı masaüstü GPU'su veya fiziksel telefon kullanılmadı.

## Gerçekçi araç sahnesi güncellemesi

Aktif araç modeli Car Concept (Eric Chadwick / Darmstadt Graphics Group GmbH, CC BY 4.0). Aynı modelin Graphite ve Pearl boya seçenekleri gösterilir. Bu iki farklı araç geometrisi değildir. Yaklaşık 213.347 üçgen ve yükleyici sonrasında 108 mesh vardır. PBR boya, AO ve lastik dokuları; yerel Venice Sunset HDRI + PMREM yansımaları, prosedürel dokulu beton mimari ve yönlü temas gölgeleri kullanılır. Eski Kenney araçları aktif filo listesinden çıkarıldı. İki stilize sürat teknesi ve bir MH-6 önceki kapsamıyla korunur.

`public/models/car-concept.glb`, kaynak GLB'den `scripts/prepare-concept.py` ile türetilir. Grafit materyal varyantı varsayılan yapılır, plaka logosu ve direksiyon amblemi görünümden kaldırılır. Kaynak, lisans ve değişiklik kayıtları [ASSET_SOURCES.md](ASSET_SOURCES.md) içindedir.

## Kurulum ve derleme

- İlk kurulumda `npm install` ve kilit dosyasından `npm ci`: başarılı.
- Güncel `npm run build`: TypeScript + Vite production derlemesi başarılı.
- Yaklaşık 623 kB minify JS için 500 kB chunk uyarısı sürer; bundle parçalama henüz yapılmadı.
- Dev sunucusu ve yerel model/HDR dosyaları HTTP üzerinden servis edilir. Runtime'da model CDN'i veya kimlik bilgisi gerekmez.

## Gerçek Chromium kontrolleri

Son değişikliklerden sonra `npm run build && npm test`: **2 test geçti (2,8 dakika)**. Mobil test 31,3 saniye; kapsamlı deneyim testi yaklaşık 2,3 dakika. Aşağıdaki satırlar bu iki testin içindeki senaryolardır; ayrı test sayıları değildir.

| Senaryo | Doğrulanan davranış |
|---|---|
| Yeni detaylı model ve iki boya seçeneği | Gerçek GLTFLoader yüklemesi; mesh sayısı > 0; model ve başlık birlikte değişiyor. |
| Araç girişi/çıkışı | Solda x < 0'dan giriş, merkezde x ≈ 0; seçimde eski aracın x > 0'a çıkışı. |
| Tekerlekler | Hareket sırasında kendi yerel X aksında dönüş; duruşta sabit açı. İlk görsel kontrolde tespit edilen yanlış aks dönüşü düzeltildi. |
| Tekne değişimi | Eski tekne sağdan çıkar; yeni tekne soldan gelir. Lüks yat testi değildir. |
| Helikopter | Havadan yaklaşma ve y ≈ 0'a iniş, iki rotorun dönmesi, replay ile kalkış/yeniden iniş. İki farklı helikopter arası değişim denenmedi. |
| Hızlı seçim | Araç → tekne → araç seçiminden sonra son seçimin yerleşmesi. |
| Fare / zoom / klavye | Sürükleme ve + kamera koordinatını değiştirir; sağ ok ürün değiştirir. |
| Mobil | 390×844'te yatay sayfa taşması yok; CTA ve ürün kartı erişilebilir. |
| Gerçek tarayıcı touch emülasyonu | CDP touch sürükleme ve iki parmak pinch kamera yönü/uzaklığını değiştirir. |
| Azaltılmış hareket | Reduced-motion emülasyonunda model yüklenir ve kontroller çalışır. |
| Modal | Demo rezervasyon açıklaması; açma/kapama ve Escape. |
| Yükleme hatası / yeniden deneme | Tekne GLB isteği bilinçli engellenir; açık hata ve yeniden dene gösterilir; engel kaldırılınca yüklenir. |
| Konsol / ağ | Normal test akışında uncaught page error, console error ve HTTP ≥400 olmadığı kontrol edilir. Bilinçli engellenen GLB'nin beklenen ağ hatası ayrı senaryodur. |

Geliştirme sırasında bir tur, Vite dosya değişikliğiyle sayfa yenilendiği için zoom beklemesinde timeout oldu. Zoom ayrıca izole tarayıcıda doğrulandı: kamera [10, 3.5, 11] → [8.5, 3.155, 9.35]. Son test turunda uygulama dosyaları değiştirilmedi. Bu ara tur başarılı sayılmadı.

## Ekran görüntüleri

[Araç — güncel beton mimari sahnesi](docs/screenshots/car.png) · [Tekne](docs/screenshots/boat.png) · [Helikopter](docs/screenshots/helicopter.png) · [Mobil](docs/screenshots/mobile.png)

Görüntüler gerçek tarayıcı render'ıdır; üretilmiş tanıtım görseli veya döndürülen araç fotoğrafı değildir. SwiftShader otomatik olarak düşük çözünürlük ve şeffaf cam kullanır. Donanımlı WebGL'de camın fiziksel transmission materyali ve yüksek çözünürlük korunur; donanımlı sonuç ayrıca test edilmedi.

## Performans ve kalan sınırlar

`node scripts/measure.mjs` çıktısı [docs/performance.json](docs/performance.json) içindedir. Son kısa örneklem: 16 frame, ortalama 1046,32 ms/frame, yaklaşık 0,96 FPS. Başlangıç/derleme ve otomasyon maliyetleri bu örnekleme dahildir. Bu ortamda akıcılık hedefi karşılanmamıştır. Bu son araç sahnesinin yazılımsal render ölçümüdür; 60 FPS, üretim GPU performansı, bellek kararlılığı ve fiziksel mobil akıcılık onayı değildir. Gölge haritası statik duruşta tekrar çizilmez; hareket ve model değişiminde yenilenir. Düşük kare hızında çözünürlük ve gölge kalitesi azaltılır.

- Araç daha detaylı gerçekçi PBR varlığıyla güncellendi. Referansın birebir kopyası, fotoğraf eşdeğerliği veya offline path tracing kalitesi iddia edilmez.
- Lüks yat ve ikinci helikopter modeli hâlâ yok; sürat tekneleri stilize.
- Beton dokusu özgün prosedürel materyaldir; taranmış fotoğraf dokusu değildir. Su yansıması/köpük fiziği, hacimsel atmosfer ve rotor motion blur yok.
- Canlı rezervasyon, ödeme, destek veya gerçek kiralama stoku yok. Demo modalı bunu açıklar.
- Edge/Safari/Firefox, fiziksel telefon, WebGL context-loss ve gerçek 15 saniyelik timeout yolu ayrıca test edilmedi.
