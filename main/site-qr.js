/* @tag: site-qr | module: qr-generator | lib: qrcodejs-cdnjs | target: origin+path | auto: domain-aware,path-aware,strip-index */
(function () {
  var box = document.getElementById("qrBox");
  if (!box) return;
  function make() {
    box.innerHTML = "";
    var path = location.pathname.replace(/index\.html$/, "");
    var url = location.origin + path;
    if (window.QRCode) {
      try {
        new QRCode(box, { text: url, width: 150, height: 150, colorDark: "#1a1a1a", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.M });
        var u = document.getElementById("qrUrl");
        if (u) u.textContent = url;
        return;
      } catch (e) {}
    }
    box.innerHTML = '<span class="qr-fallback">QR</span>';
  }
  make();
})();
