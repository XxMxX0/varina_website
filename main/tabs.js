/* @tag: tabs-js | module: navigation | sections: grid,list,boards,qr */
(function () {
  var map = { grid: "section-grid", list: "section-list", boards: "section-boards", qr: "section-qr" };
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".tab");
    if (!btn) return;
    document.querySelectorAll(".tab").forEach(function (t) { t.classList.remove("active"); });
    btn.classList.add("active");
    var target = map[btn.getAttribute("data-tab")];
    document.querySelectorAll("[data-section]").forEach(function (sec) {
      sec.hidden = sec.getAttribute("data-section") !== target;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
