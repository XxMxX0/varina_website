/* @tag: likes-js | module: engagement | single-tap: open-viewer | double-tap: heart-burst */
(function () {
  var TAP = 400, OPEN_DELAY = 260, openTimer = null;
  document.querySelectorAll("[data-post]").forEach(function (post) {
    var last = 0;
    post.addEventListener("click", function () {
      var now = Date.now();
      if (now - last < TAP) {
        if (openTimer) { clearTimeout(openTimer); openTimer = null; }
        var heart = post.querySelector(".p-heart");
        post.classList.add("liked");
        heart.classList.remove("burst");
        void heart.offsetWidth;
        heart.classList.add("burst");
      } else {
        var key = post.getAttribute("data-product");
        if (openTimer) clearTimeout(openTimer);
        openTimer = setTimeout(function () {
          openTimer = null;
          if (window.VarinaViewer) window.VarinaViewer.open(key);
        }, OPEN_DELAY);
      }
      last = now;
    });
  });
})();
