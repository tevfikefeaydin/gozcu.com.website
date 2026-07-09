# gozcu.com — Gözcü tanıtım sitesi

**Gözcü** mobil asistanının tanıtım sayfası. Tamamen statik; derleme adımı yok.

## Çalıştırma

```bash
python3 -m http.server 8000
# http://localhost:8000
```

Herhangi bir statik barındırmaya (GitHub Pages, Netlify, Cloudflare Pages…)
olduğu gibi yüklenebilir.

## Yapı

```
index.html          tek sayfa
assets/style.css    tema ve erişilebilirlik kuralları
assets/script.js    sesli demo + titreşim denemeleri (ilerlemeli iyileştirme)
assets/favicon.svg  logo
```
