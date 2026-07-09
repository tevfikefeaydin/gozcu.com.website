/* Gözcü — gozcu.com
   İlerlemeli iyileştirme: JS yoksa sayfa eksiksiz okunur.
   Sesli demo (speechSynthesis, tr-TR) + haptik deneme (navigator.vibrate). */

(function () {
  "use strict";

  var demoMetin = document.getElementById("demo-metin");
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

  function seslendir(metin) {
    if (!sesVar) return false;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(metin);
      u.lang = "tr-TR";
      var ses = turkceSes();
      if (ses) u.voice = ses;
      u.rate = 1.0;
      u.onend = function () {
        if (demoMetin) demoMetin.classList.remove("speaking");
      };
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
      var okundu = seslendir(cevap);
      if (!okundu && demoMetin) {
        demoMetin.classList.remove("speaking");
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
      if (!titredi) {
        /* Titreşim yoksa (masaüstü) desen sesle tarif edilir — bilgi kaybolmaz */
        if (!seslendir(anons + " Bu cihazda titreşim motoru yok; deseni sesle tarif ettim.")) {
          btn.setAttribute("title", "Bu cihaz titreşimi desteklemiyor — telefonda deneyin.");
        }
      }
    });
  });

  /* Bazı tarayıcılar ses listesini geç yükler */
  if (sesVar && window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = function () {};
  }
})();
