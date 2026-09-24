/* @tag: i18n | module: language | mode: ar-en | persist: localStorage */
(function () {
  var root = document.documentElement;
  var lang = localStorage.getItem("varina-lang") || "ar";

  function apply() {
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.querySelectorAll("[data-ar]").forEach(function (el) {
      el.textContent = lang === "ar" ? el.getAttribute("data-ar") : (el.getAttribute("data-en") || el.getAttribute("data-ar"));
    });
    var t = document.getElementById("langToggle");
    if (t) t.textContent = lang === "ar" ? "EN" : "عربي";
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest("#langToggle")) {
      lang = lang === "ar" ? "en" : "ar";
      localStorage.setItem("varina-lang", lang);
      apply();
    }
  });

  apply();
})();
