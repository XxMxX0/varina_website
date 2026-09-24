/* @tag: nav-js | module: navigation | bar: bottom-nav */
(function () {
  document.addEventListener("click", function (e) {
    var link = e.target.closest(".nav-link");
    if (!link) return;
    if (link.getAttribute("href") === "#") e.preventDefault();
    document.querySelectorAll(".nav-link").forEach(function (l) { l.classList.remove("active"); });
    link.classList.add("active");
    if (link.getAttribute("data-nav") === "home") window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
