# gozcu.com — Gözcü tanıtım sitesi

**Gözcü**, görme engelli kullanıcılar için canlı görüyü kısa Türkçe sesli yanıta çeviren
iOS + Android asistanının tanıtım sitesi.

## Tasarım ilkesi

Uygulama erişilebilirlik-önce; sitesi de öyle. Bu sayfa "duyulabilen bir web sitesi"
olarak tasarlandı:

- **Sesli demo:** Örnek sorular, tarayıcının Türkçe konuşma sentezi (`speechSynthesis`,
  `tr-TR`) ile seslendirilir — ve uygulamadaki deneme modu gibi kendini dürüstçe
  "simülasyon" diye tanıtır.
- **Haptik dili:** Uygulamanın titreşim imza seti (dinliyor / bakıyor / yanıt / hata /
  GÜVENLİK) telefonda `navigator.vibrate` ile gerçekten hissedilir; titreşim motoru
  olmayan cihazlarda desen sesle tarif edilir.
- **Atkinson Hyperlegible** yazı tipi, koyu zemin üzerinde yüksek kontrast, ≥44px
  dokunma hedefleri, "içeriğe atla" bağlantısı, tam klavye gezinmesi.
- **`prefers-reduced-motion`** tercihinde tüm animasyonlar kapanır; hiçbir bilgi kaybolmaz.
- Renk hiçbir yerde tek başına bilgi taşımaz (renk + desen + metin + ses birlikte).
- JS kapalıyken sayfa eksiksiz okunur (ilerlemeli iyileştirme).

## Çalıştırma

Tamamen statik — derleme adımı yok:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

Herhangi bir statik barındırmaya (GitHub Pages, Netlify, Cloudflare Pages…)
olduğu gibi yüklenebilir.

## Yapı

```
index.html          tek sayfa: hero · sesli demo · nasıl çalışır · haptik dili ·
                    ilkeler · bakış paketleri · erişilebilirlik · SSS · indir
assets/style.css    tema (fener amberi + gece lacivert) ve erişilebilirlik kuralları
assets/script.js    sesli demo + titreşim denemeleri (ilerlemeli iyileştirme)
assets/favicon.svg  sonar/fener logosu
```

> Not: Mağaza bağlantıları uygulama yayınlandığında eklenecek; "yakında" rozetiyle
> yer tutuyorlar. Paket fiyatları uygulamadaki tek-kaynak tanımlarla
> (Basic 1.000 bakış — ₺280/ay, diğer ülkelerde $5.99 · Pro 4.000 bakış — ₺1.400/ay,
> diğer ülkelerde $29.99 · 30 ücretsiz deneme bakışı) birebir aynıdır ve hiçbir
> paket "en avantajlı" diye işaretlenmez.
