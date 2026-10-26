# RANTE CAR — CODEX MASTER BUILD BRIEF

> **Rolün:** Kıdemli creative developer, Three.js/WebGL mühendisi, 3D technical artist, UI/UX tasarımcısı ve QA mühendisi gibi çalış. Bu projeyi **sıfırdan**, çalışan ve test edilmiş bir web deneyimi olarak oluştur. Sadece taslak, ekran görüntüsü, sözde kod veya çalışmayan demo teslim etme.

## 1. Ürün vizyonu

**RANTE CAR**, tek web sitesinde üç premium kiralama kategorisi sunacak:
1. Lüks **araba kiralama**
2. Lüks **yat kiralama**
3. **Helikopter kiralama**

Ana sayfa, sinematik ve fotogerçekçiliğe yakın, gerçek 3D varlıklarla hazırlanmış **etkileşimli bir ürün vitrini** olacak. Kullanıcı soldaki kategori menüsünden kiralama türünü, sağdaki ürün listesinden modeli seçecek. Ortadaki büyük 3D sahnede seçilen ürün **gerçekten hareket ederek** görünecek, merkezde duracak ve fare/dokunmatik hareketlerle 360° incelenebilecek.

**Önemli:** Eski demoların eksikleri tekrar edilmemeli: 2D fotoğrafı rotateY ile döndürmek, primitive kutularla arabayı taklit etmek, tüm ürünlere aynı Ferrari modelini vermek, `three` modülünü çözememek, sonsuz yükleme yazısı, hareket etmeyen ürünler ve hayali model bağlantıları kabul edilemez.

## 2. Tasarım ve sayfa düzeni

- Koyu antrasit/lacivert zemin, altın/şampanya vurgular, yüksek kaliteli minimal premium estetik.
- **Sol sabit sidebar:** RANTE CAR logosu, Araç Kiralama, Yat Kiralama, Helikopter Kiralama; altta ikincil menüler.
- **Sol üst içerik:** Aktif kategori etiketi, seçilen modelin adı, kısa premium açıklama, “Detayları Gör / Rezervasyon” CTA.
- **Sağ panel:** Gerçek ürün thumbnail'ları, model isimleri, seçili durum, kolay ürün değiştirme.
- **Merkez:** Sayfanın odağı olan büyük WebGL/Three.js sahnesi; gerçek 3D araç/yat/helikopter, mekân, ışık, gölge ve atmosfer.
- **Alt kontroller:** 360° döndürme, zoom, önceki/sonraki model, sürükleme ipucu, gerekirse animasyonu yeniden oynat.
- Mobil ve tablet için yeniden düzenlenen arayüz; mobilde yatay ürün carousel'i ve dokunmatik orbit kontrolleri.
- Arka plan ile ürün aynı dünyanın parçası gibi görünmeli; ürünün altında doğru temas gölgesi/deniz yansıması/pist konumu olmalı.

## 3. Üç kategori için ZORUNLU animasyon senaryoları

### A. Araba — yol sahnesi

1. Kategori açılınca sinematik bir asfalt yol / sahil yolu / premium showroom-road sahnesi görünsün.
2. Seçilen **gerçek 3D araba**, ekranın **solundan** sahneye doğru **sürerek** girsin.
3. Giriş sırasında tekerlekler dönsün; araba ilerlerken hafif süspansiyon hareketi, doğru perspektif, gölge ve hareket hissi olsun.
4. Araba ortadaki sergileme noktasına gelince doğal şekilde **yavaşlayıp dursun**; tekerlek dönüşü dursun.
5. Kullanıcı başka araba seçerse eski araba **sağa sürerek çıksın**, yeni araba **soldan sürerek girsin**. Seçim hızlı tekrarlanırsa animasyonlar çakışmasın.
6. Durduktan sonra fare ile 360° döndürme ve zoom çalışsın. Kullanıcı sürüklerken otomatik kamera hareketi kontrolü ele geçirmesin.

### B. Yat — deniz sahnesi

1. Kategori açılınca gerçekçi su shader'ı, gökyüzü, ufuk çizgisi ve uygun ışıklarla deniz sahnesi görünsün.
2. Seçilen **gerçek 3D yat**, ekranın **solundan deniz üzerinde ilerleyerek** gelsin.
3. Yatın gövdesinde hafif dalga kaynaklı salınım, kıçta su izi/köpük ve suyla tutarlı temas olsun.
4. Merkezde doğal biçimde yavaşlayıp dursun; hafif yüzme/bobbing hareketi devam edebilir.
5. Yeni yat seçilince **eski yat sağa doğru yüzerek çıksın**, **yeni yat soldan yüzerek girsin**.
6. Fareyle 360° inceleme ve zoom çalışsın; su düzlemi ile yat konumu bozulmasın.

### C. Helikopter — helipad sahnesi

1. Kategori açılınca premium helikopter pisti (helipad), çevre mimarisi/şehir veya sahil manzarası olsun.
2. Seçilen **gerçek 3D helikopter**, **havadan yaklaşarak** sahneye girsin.
3. Ana rotor ve kuyruk rotoru dönüşü hareketli olsun; gölge yere yaklaştıkça değişsin.
4. Helikopter pistin üzerinde kısa süre hover yapıp **yavaşça alçalarak iniş yapsın**; kızak/tekerlekler pistle doğru temas etsin.
5. Model değişiminde mevcut helikopter rotorları dönerek **havalanıp sahneden ayrılsın**; yeni helikopter uçup gelsin ve insin.
6. İnişten sonra fareyle 360° inceleme/zoom çalışsın. Rotorların animasyonu mümkünse devam etsin; modelin gerçek node hiyerarşisine göre rotor pivotlarını tespit et/ayarla.

## 4. GERÇEK 3D model şartı — araştırma ve lisans

- **Gerçek ve ayrı** GLB/GLTF/FBX modeller kullan. Araç, yat ve helikopter kategorilerinin her birinde başlangıç için **en az bir gerçek model** gerçekten yüklensin. Mümkünse kategori başına 2–3 ayrı model sağla.
- İnternette araştır: Sketchfab (indirilebilir/lisanslı modeller), Poly Haven, Khronos glTF Sample Assets, Three.js örnek varlıkları, CGTrader/Sketchfab/diğer izinli kaynaklar. Kaynağı ve lisansı **tek tek doğrula**.
- **Lisans belirsizse indirme/dağıtma veya ticari kullanım varsayma.** Ticari kullanıma uygun varlıkları tercih et; attribution gerekiyorsa ekle. Gerçek marka ve model adını yalnızca kullanılan 3D varlık o ürünü gerçekten temsil ediyorsa göster. Sahte “Mercedes G63” etiketiyle Ferrari veya basit kutu gösterme.
- **Uydurma GLB URL'leri yazma.** HTTP 200 dönmesi tek başına yeterli değil: dosyanın gerçek glTF/GLB olduğundan, loader ile açıldığından ve geometri içerdiğinden emin ol.
- Model dosyalarını mümkünse `public/models/` altında yerel olarak sakla. `ASSET_SOURCES.md` içinde model adı, kaynak bağlantısı, yazar, lisans, kullanım notu, dosya yolu, gerekiyorsa attribution yaz.
- Yüksek kaliteli PBR materyaller, doğru renk yönetimi, HDR environment map, contact shadow, antialiasing ve tonemapping kullan. Gerektiğinde modelleri Draco/Meshopt ve KTX2 ile optimize et.
- Gerçek modeller bulunamayan ürünleri **ürün listesine sahte biçimde ekleme**. Kullanılabilir modellerle dürüst bir demo yap; eksik varlıkları açıkça raporla.

## 5. Önerilen teknik mimari

- **Vite + TypeScript + Three.js** ile çalışan, modüler ve bakım yapılabilir proje kur. React kullanmak zorunlu değil; arayüz karmaşıklığı gerektiriyorsa React + React Three Fiber + Drei + GSAP seçebilirsin. Teknoloji seçimini kısa gerekçelendir.
- `three` modül hatasını kalıcı çöz: tüm bağımlılıkları npm ile yükle, Vite bundling kullan; doğrudan `file://` açılmasına güvenme.
- Örnek yapı:
  ```text
  rante-car/
  ├── package.json
  ├── index.html
  ├── src/
  │   ├── main.ts
  │   ├── styles.css
  │   ├── data/fleet.ts
  │   ├── scenes/CarScene.ts
  │   ├── scenes/YachtScene.ts
  │   ├── scenes/HelicopterScene.ts
  │   ├── core/ModelLoader.ts
  │   ├── core/TransitionManager.ts
  │   └── ui/...
  ├── public/models/
  ├── public/textures/
  ├── public/images/
  ├── ASSET_SOURCES.md
  └── README.md
  ```
- Tek WebGL renderer kullan; sahne değişimlerinde kaynakları kontrollü dispose et.
- `GLTFLoader` + gerekli decoder'ları yapılandır. Modeller için yükleme ilerlemesi, hata/timeout ve retry sun.
- Kamera ve model konumlarını model bounding box'ına göre ayarla; bütün modellerin aynı büyüklükte görünmesini sağlayacak **görsel ölçek** normalizasyonu yap, gerçekçi dünya ölçeğini tamamen kaybetme.
- Animasyonlar için GSAP timeline veya deterministik state machine kullan: `idle → exiting → loading → entering → settled`. Hızlı seçimlerde önceki timeline'ı iptal et; eski asenkron yüklemeler yeni seçimi ezmesin.
- OrbitControls yalnızca ürün settled durumundayken etkin olsun; giriş/çıkış animasyonlarında kamera/model çakışması olmasın.
- `prefers-reduced-motion`, resize, dokunmatik hareket, klavye kontrolü, WebGL desteği ve düşük performanslı cihazları düşün.
- Ürün verisi merkezi olsun: `id`, `category`, `displayName`, `modelPath`, `thumbnail`, `scale`, `orientation`, `cameraPreset`, `animationPreset`, `licenseInfo`.

## 6. Görsel kalite hedefi

- **Fotogerçekçi hissiyat:** doğru perspektif, ışık yönü, materyal pürüzlülüğü, metal/cam yansımaları, temas gölgeleri, renk uyumu.
- Araba sahnesi: yol dokusu, yol çizgileri, ufuk, çevresel ışık, tekerlek ve gövde gölgesi.
- Yat sahnesi: dalga, yansıma, su hareketi, su izi, güneş ışığı.
- Helikopter sahnesi: pist işaretleri, çevre, iniş gölgesi, rotor motion blur hissi.
- Masaüstünde hedef 60 FPS; ağır modellerde adaptif pixel ratio ve kalite ayarlarıyla en azından akıcı deneyim. Gerçek performansı ölç ve raporla; ölçmeden FPS iddia etme.
- Kamera hareketi sinematik ama kullanıcının kontrolünü engellemeyen biçimde olsun.

## 7. Fonksiyonel davranış

- Kategori butonları ve ürün kartları çalışsın.
- Model değişince başlık, açıklama, thumbnail ve gerçek 3D varlık birlikte güncellensin.
- Detay CTA'sı henüz gerçek sayfaya bağlanmadıysa demo modalı açsın; sahte rezervasyon işlemi yapmasın.
- Sayfa ilk açıldığında kullanıcı boş ekran veya sonsuz spinner görmesin.
- Model yüklenemezse: anlaşılır hata + yeniden dene. **Fallback gösteriliyorsa bunun gerçek ürün modeli olmadığı belirtilsin.**
- Konsolda `Failed to resolve module specifier "three"`, `404`, yakalanmamış Promise, CORS veya shader derleme hatası kalmasın.

## 8. Test ve kabul kriterleri (ZORUNLU)

1. `npm install` → başarılı.
2. `npm run dev` → tarayıcıda sayfa açılıyor.
3. `npm run build` → hatasız production build.
4. Chrome/Edge üzerinde **gerçek tarayıcı testi**: ekran görüntüsü al ve console/network hatalarını kontrol et.
5. Her kategoride en az bir gerçek GLB model gerçekten yükleniyor ve görünüyor.
6. Araba soldan girip merkezde duruyor; ürün değişince eski araba sağa çıkıyor, yenisi soldan geliyor.
7. Yat soldan geliyor; yat değişiminde eski yat sağa gidiyor, yeni yat soldan geliyor.
8. Helikopter havadan yaklaşıp piste iniyor; model değişince kalkış ve yeniden iniş gerçekleşiyor; rotorlar dönüyor.
9. Fareyle 360° orbit, zoom, dokunmatik kontrol ve ok düğmeleri çalışıyor.
10. Hızlı ardışık ürün seçimi ve kategori değişimi animasyonu bozmuyor.
11. Mobil ekranlarda ürün listesi, menü ve 3D sahne kullanılabiliyor.
12. Yüklenmeyen varlık durumunda sonsuz spinner yok; kullanıcıya açık durum bildirimi var.
13. Lisans ve attribution bilgileri `ASSET_SOURCES.md` içinde doğru.

## 9. Teslimat

- Kaynak kodun tamamı ve çalışır proje.
- Gerçekten indirilebilen, kullanma izni doğrulanmış modellerin yerel kopyaları (lisans buna izin veriyorsa).
- `README.md`: Windows PowerShell dahil kurulum/çalıştırma komutları:
  ```powershell
  npm install
  npm run dev
  npm run build
  ```
- `ASSET_SOURCES.md`: varlık kaynakları ve lisanslar.
- `TEST_REPORT.md`: test edilen senaryolar, ekran görüntüleri, konsol sonuçları, performans ve kalan sınırlamalar.
- Sadece “çalışıyor” deme; gerçek tarayıcı testi yap, test yapamadıysan açıkça belirt.

## 10. Çalışma biçimi

1. Önce proje yapısını kur ve bağımlılıkları yükle.
2. Üç kategori için **doğrulanmış gerçek modelleri araştır ve edin**. Bulamadıklarını dürüstçe belirt.
3. Bir modelle çalışan temel sahneyi kur; tarayıcıda doğrula.
4. Ardından üç sahneyi ve ürün listelerini tamamla.
5. Giriş/çıkış/iniş animasyonlarını ekle.
6. Gerçekçi ışık, materyal, gölge, su ve çevre detaylarını geliştir.
7. Mobil, performans, hata yönetimi ve erişilebilirliği tamamla.
8. Test raporu ve README ile teslim et.

**Kritik:** Kullanıcı, önceki prototiplerde basit geometriler ve sahte 3D deneyimden memnun kalmadı. Bu işin başarısı; **gerçek model + sinematik giriş/çıkış hareketi + 360° etkileşim + sorunsuz çalışan uygulama** dörtlüsünün aynı anda gerçekleşmesine bağlıdır. Kullanıcının asıl tarif ettiği hareketleri atlayıp yalnızca güzel bir statik arayüz üretme.
