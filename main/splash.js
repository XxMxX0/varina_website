/* @tag: splash-js | module: intro | timing: 1000ms-light,2500ms-fade | once-per: session | key: varina-splash-seen */
(function () {
  var splash = document.getElementById("splash");
  if (!splash || splash.hidden) return;
  if (getComputedStyle(splash).display === "none") return;

  try { sessionStorage.setItem("varina-splash-seen", "1"); } catch (e) {}
  document.body.style.overflow = "hidden";

  var logo = document.getElementById("splashLogo");
  setTimeout(function () { logo.classList.add("lamp-active"); }, 1000);

  setTimeout(function () {
    splash.classList.add("splash-out");
    document.body.style.overflow = "";
    setTimeout(function () { splash.hidden = true; }, 1100);
  }, 2500);
})();
