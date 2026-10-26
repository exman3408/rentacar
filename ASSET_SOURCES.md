# 3D varlık kaynakları ve lisanslar

Tüm modeller gerçek glTF 2.0 binary dosyalarıdır; bu projenin araçları primitif kutulardan üretilmez. Çevre (yol, pist, dağ siluetleri) prosedüreldir. GLB başlıkları ve geometri varlığı dosya düzeyinde kontrol edildi; gerçek GLTFLoader yüklemeleri tarayıcı testindedir.

| Yerel dosya | Asıl varlık / yazar | Kaynak | Lisans ve değişiklikler |
|---|---|---|---|
| `public/models/suv-luxury.glb` | SUV luxury — Kenney | [Car Kit](https://kenney.nl/assets/car-kit), [dağıtım aynası](https://github.com/Arslan12216775/kenney_car-kit/tree/153591d606970058a4d0e44aeadf435c2d3f89ed/Models/GLB%20format) | CC0; paket içindeki `License.txt` doğrulandı, `public/licenses/car-CC0.txt` olarak korundu. Dosya değiştirilmedi. |
| `public/models/sedan-sports.glb` | Sedan sports — Kenney | Aynı Car Kit ve sabit commit | CC0; dosya değiştirilmedi. |
| `public/models/boat-speed-a.glb` | Boat speed A — Kenney | [Watercraft Kit](https://kenney.nl/assets/watercraft-kit), [dağıtım aynası](https://github.com/shorepine/kenney/tree/3694c6879e487c108f55677be7dd2ca75b07cc3b/3d/watercraft) | CC0; aynanın README'si tüm Kenney sanat varlıklarını CC0 olarak açıkça tanımlar. `public/licenses/watercraft-provenance.md` korundu. Dosya değiştirilmedi. |
| `public/models/boat-speed-b.glb` | Boat speed B — Kenney | Aynı Watercraft Kit ve sabit commit | CC0; dosya değiştirilmedi. |
| `public/models/Textures/colormap.png` | Watercraft renk atlası — Kenney | Aynı Watercraft Kit | CC0; GLB dış doku bağımlılığı, yerel kopya. |
| `public/models/mh6.glb` | MH-6 Little Bird — **AnirudhRao** | [Asıl Sketchfab modeli](https://sketchfab.com/3d-models/mh-6-little-bird-d6ec6eeb84b240789f54923bdedafc86), [Warbird uyarlaması ve lisans beyanı](https://github.com/jdubba1/warbird/tree/251d6d85cbe5eedbebf7625a8df7fd2430f8d1a1/dist/assets) | **CC BY 4.0**. Warbird geometriyi sadeleştirmiş, CAD parçalarını temizlemiş, dönüşümleri uygulamış, rotorları ayırmış, doku ve materyalleri düz renklerle değiştirmiştir. RANTE CAR bu veriyi `scripts/convert-helicopter.py` ile GLB'ye dönüştürdü ve PBR materyaller ekledi. Attribution `public/licenses/aircraft-license.txt` içinde korunmuştur. |

CC0: https://creativecommons.org/publicdomain/zero/1.0/ · CC BY 4.0: https://creativecommons.org/licenses/by/4.0/

Kenney için atıf zorunlu değildir; gönüllü olarak verilmiştir. AnirudhRao atfı ve değişiklik açıklamaları yeniden dağıtımda korunmalıdır. Bu lisanslar marka sahipliği, yolcu taşıma yetkisi veya gerçek kiralanabilir filo beyanı değildir.

## Araştırmanın sınırları

Asıl Kenney sitesi ortam ağ politikasında 403 verdi; varlıklar lisans açıklaması bulunan GitHub aynalarından edinildi. Helikopter için izin beyanı olmayan alternatifler projeye dahil edilmedi. Araç ve deniz modelleri stilizedir. Sürat tekneleri lüks yat değildir; bu eksik ürün listesinde ve README'de açıkça belirtilir. Fotoğraf tabanlı veya sahte marka etiketli model kullanılmaz. Ürün küçük resimleri yüklenmiş gerçek 3D sahnenin render'ından oluşturulur; ilk yüklemede numara gösterilir.

HDRI/fotoğraf/font indirilmedi. PMREM ortamı, shader suyu, pist ve yol proje koduyla oluşturulur. Three.js: MIT (npm paket lisansı). Vite ve TypeScript: kendi npm lisansları.
