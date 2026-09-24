/* @tag: follow-js | module: engagement | button: followBtn | lang: ar,en */
(function () {
  var btn = document.getElementById("followBtn");
  var state = "off";
  function render() {
    var l = document.documentElement.getAttribute("lang") || "ar";
    var on = state === "on";
    btn.classList.toggle("is-following", on);
    btn.textContent = on ? (l === "ar" ? "تتبع ✓" : "Following ✓") : (l === "ar" ? "متابعة" : "Follow");
  }
  btn.addEventListener("click", function () { state = state === "on" ? "off" : "on"; render(); });
  document.addEventListener("langchange", render);
  render();
})();
