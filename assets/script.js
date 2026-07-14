/* Gözcü — gozcu.com
   İlerlemeli iyileştirme: JS yoksa sayfa eksiksiz okunur.
   Sesli demo (speechSynthesis, tr-TR) + haptik deneme (navigator.vibrate)
   + kaydırma animasyonları (hareket-azaltma tercihine saygılı). */

(function () {
  "use strict";

  /* .js sınıfı: açığa-çıkma stilleri yalnızca JS varken uygulanır,
     böylece JS kapalıyken hiçbir içerik gizli kalmaz. */
  document.documentElement.classList.add("js");

  var azHareket = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

  var demoMetin = document.getElementById("demo-metin");
  var demoEkran = document.getElementById("demo-ekran");
  var sesVar = "speechSynthesis" in window;

  function turkceSes() {
    var sesler = window.speechSynthesis.getVoices();
    for (var i = 0; i < sesler.length; i++) {
      if (sesler[i].lang && sesler[i].lang.toLowerCase().indexOf("tr") === 0) {
        return sesler[i];
      }
    }
    return null;
  }

  function konusmaBitti() {
    if (demoMetin) demoMetin.classList.remove("speaking");
    if (demoEkran) demoEkran.classList.remove("speaking");
  }

  function seslendir(metin) {
    if (!sesVar) return false;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(metin);
      u.lang = "tr-TR";
      var ses = turkceSes();
      if (ses) u.voice = ses;
      u.rate = 1.0;
      u.onend = konusmaBitti;
      u.onerror = konusmaBitti;
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) {
      return false;
    }
  }

  /* ── Sesli demo ── */
  var sorular = document.querySelectorAll(".demo-q");
  sorular.forEach(function (btn) {
    btn.setAttribute("aria-pressed", "false");
    btn.addEventListener("click", function () {
      sorular.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");

      var cevap = btn.getAttribute("data-cevap");
      if (demoMetin) {
        /* aria-live="polite" alanı: metni değiştirmek ekran okuyucuya duyurur */
        demoMetin.textContent = cevap;
        demoMetin.classList.add("speaking");
      }
      if (demoEkran) demoEkran.classList.add("speaking");
      var okundu = seslendir(cevap);
      if (!okundu) {
        konusmaBitti();
        var rozet = document.getElementById("demo-rozet");
        if (rozet && !rozet.dataset.sesNotu) {
          rozet.dataset.sesNotu = "1";
          rozet.insertAdjacentHTML(
            "beforeend",
            " Tarayıcın sesli okumayı desteklemiyor; yanıtlar yalnızca metin olarak gösteriliyor."
          );
        }
      }
    });
  });

  /* ── Haptik deneme ── */
  var titresimVar = "vibrate" in navigator;
  document.querySelectorAll("[data-vib]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var desen = btn.getAttribute("data-vib").split(",").map(Number);
      var anons = btn.getAttribute("data-say") || "";
      var titredi = titresimVar && navigator.vibrate(desen);

      /* navigator.vibrate() donanım yokken bile (ör. çoğu masaüstü tarayıcı) "true"
         dönebilir: bu yüzden tıklamanın sonucu SADECE titredi'ye bağlı bırakılmaz.
         Donanımdan bağımsız her tıklamada görsel bir nabız da tetiklenir — sessiz
         bozulma yok ilkesi burada da geçerli. */
      var satir = btn.closest(".haptic");
      var gosterge = satir ? satir.querySelector(".swatch") : null;
      if (gosterge) {
        gosterge.classList.remove("swatch-pulse");
        void gosterge.offsetWidth; /* reflow: aynı desene art arda basılırsa animasyon yeniden tetiklensin */
        gosterge.classList.add("swatch-pulse");
      }

      if (!titredi) {
        /* Titreşim yoksa (masaüstü) desen sesle tarif edilir — bilgi kaybolmaz */
        if (!seslendir(anons + " Bu cihazda titreşim motoru yok; deseni sesle tarif ettim.")) {
          btn.setAttribute("title", "Bu cihaz titreşimi desteklemiyor — telefonda deneyin.");
        }
      }
    });
  });

  /* ── Üst çubuk gölgesi ── */
  var header = document.querySelector(".site-header");
  if (header) {
    var golgeGuncelle = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", golgeGuncelle, { passive: true });
    golgeGuncelle();
  }

  /* ── Kaydırma açığa çıkma ──
     Hareket azaltma açıksa hiç devreye girmez (CSS de öğeleri görünür tutar). */
  var revealler = document.querySelectorAll(".reveal");
  if (!azHareket.matches && "IntersectionObserver" in window && revealler.length) {
    var izleyici = new IntersectionObserver(function (girisler) {
      girisler.forEach(function (g) {
        if (g.isIntersecting) {
          g.target.classList.add("in");
          izleyici.unobserve(g.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    revealler.forEach(function (el) { izleyici.observe(el); });
  } else {
    revealler.forEach(function (el) { el.classList.add("in"); });
  }

  /* Bazı tarayıcılar ses listesini geç yükler */
  if (sesVar && window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = function () {};
  }
})();
