# gozcu.com — Gözcü tanıtım sitesi

**Gözcü**, görme engelli kullanıcılar için canlı görüyü kısa Türkçe sesli yanıta çeviren
iOS + Android asistanının tanıtım sitesi.

## Tasarım ilkesi

Uygulama erişilebilirlik-önce; sitesi de öyle. Bu sayfa "duyulabilen bir web sitesi"
olarak tasarlandı:

- **Sesli demo:** Örnek sorular, tarayıcının Türkçe konuşma sentezi (`speechSynthesis`,
  `tr-TR`) ile seslendirilir — ve kendini dürüstçe "simülasyon" diye tanıtır (örnek
  yanıtlar önceden yazılmıştır; gerçek uygulamada yanıt canlı görüntüden üretilir).
- **Haptik dili:** Uygulamanın titreşim imza seti (dinliyor / bakıyor / yanıt / hata /
  GÜVENLİK) telefonda `navigator.vibrate` ile gerçekten hissedilir; titreşim motoru
  olmayan cihazlarda desen sesle tarif edilir.
- **Atkinson Hyperlegible** yazı tipi **kendi sunucumuzdan** servis edilir (Google
  Fonts'a üçüncü taraf istek yok — gizlilik + hız); koyu zemin üzerinde yüksek kontrast,
  ≥44px dokunma hedefleri, "içeriğe atla" bağlantısı, tam klavye gezinmesi.
- **`prefers-reduced-motion`** tercihinde tüm animasyonlar kapanır; hiçbir bilgi kaybolmaz.
- Renk hiçbir yerde tek başına bilgi taşımaz (renk + desen + metin + ses birlikte).
- JS kapalıyken sayfa eksiksiz okunur (ilerlemeli iyileştirme).

## İçerik tek-kaynak kuralı

Sitedeki ürün iddiaları, uygulama deposundaki tek-kaynak tanımlarla hizalıdır:

- **Jestler:** Dokun = Bak · Basılı tut = Konuş · Çift dokun = aktif modu bitir ·
  Ayarlar sağ üstte (+ iki parmak sustur, üç parmak kalan bakış, iki parmakla çift
  dokunuş son yanıtı yeniden okur) — `mobile/src/i18n/strings.ts`.
- **Paketler:** Basic 1.000 bakış (₺280/ay, diğer ülkelerde $5.99) · Pro 4.000 bakış
  (₺1.400/ay, diğer ülkelerde $29.99; Gemini doğal sesi + ayda 300 dk canlı rehberlik,
  deneysel) · 30 ücretsiz deneme bakışı — `mobile/src/config/packages.ts` +
  `backend/packages.py` (VIZYON-V7 kilidi). Hiçbir paket "en avantajlı" diye işaretlenmez.
- **Özellikler:** sahne betimleme · belge okuma · en yakın yer + sesli yol tarifi ·
  kayıtlı yerler (yalnız cihazda) · yürüyüş modu · canlı rehberlik (Pro, deneysel).
- **Gizlilik/koşullar:** uygulama içi KVKK ve gizlilik taslaklarıyla
  (`mobile/src/i18n/legal.ts`, V11) hizalı; ikisi de dürüstçe "taslak" şerhi taşır.

Uygulamada paket, jest ya da özellik değişirse bu sayfalar birlikte güncellenir.

## Çalıştırma

Tamamen statik — derleme adımı yok:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

Herhangi bir statik barındırmaya (Vercel, GitHub Pages, Netlify, Cloudflare Pages…)
olduğu gibi yüklenebilir. `vercel.json` güvenlik başlıklarını (CSP, HSTS, nosniff,
frame-deny) ve önbellek kurallarını tanımlar.

## Yapı

```
index.html          tek sayfa: hero · sesli demo · nasıl çalışır · neler yapar ·
                    haptik dili · ilkeler · bakış paketleri · erişilebilirlik · SSS · indir
gizlilik.html       KVKK gizlilik politikası (uygulama içi V11 taslağıyla hizalı)
kosullar.html       kullanım koşulları (hesap, deneysel özellik ve sorumluluk şerhleri)
404.html            "Gözcü baktı ama bu sayfayı göremedi"
assets/style.css    tema (fener amberi + gece lacivert) ve erişilebilirlik kuralları
assets/script.js    sesli demo + titreşim denemeleri (ilerlemeli iyileştirme)
assets/fonts/       Atkinson Hyperlegible woff2 (self-host, OFL lisansı)
assets/favicon.svg  sonar/fener logosu
assets/og.png       sosyal paylaşım görseli (1200×630)
vercel.json         güvenlik başlıkları + önbellek
robots.txt          + sitemap.xml
```

> Not: Mağaza bağlantıları uygulama yayınlandığında eklenecek; "yakında" rozetiyle
> yer tutuyorlar.
