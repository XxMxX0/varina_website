/* @tag: hours-js | module: working-hours | open-hour: 10 | close-hour: 23 | refresh: 60s | lang: ar,en */
(function () {
  var OPEN = 10, CLOSE = 23;
  function isNow() {
    var h = new Date().getHours();
    return h >= OPEN && h < CLOSE;
  }
  function render() {
    var el = document.getElementById("hoursStatus");
    if (!el) return;
    var l = document.documentElement.getAttribute("lang") === "en" ? "en" : "ar";
    var open = isNow();
    el.className = "hours-status " + (open ? "open" : "closed");
    el.innerHTML = '<i class="fas ' + (open ? "fa-circle-check" : "fa-circle-xmark") + '"></i> ' +
      (open ? (l === "ar" ? "مفتوح الآن" : "Open now") : (l === "ar" ? "مغلق الآن" : "Closed now"));
  }
  document.addEventListener("langchange", render);
  render();
  setInterval(render, 60000);
})();
