/* @tag: video-js | module: showreel | source: media/varina-showreel.mp4 | autoplay: muted-loop | triggers: navVideoBtn,profileAvatarBtn | lang: ar,en */
(function () {
  var modal = document.getElementById("videoModal");
  var video = document.getElementById("varinaVideo");
  var fallback = document.getElementById("videoFallback");
  var tapIcon = document.getElementById("videoTapIcon");
  var soundBtn = document.getElementById("videoSound");
  if (!modal || !video) return;

  function play() {
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
  }
  function open() {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    if (!video.error && fallback.hidden) play();
  }
  function close() {
    modal.hidden = true;
    document.body.style.overflow = "";
    video.pause();
  }
  function showFallback() {
    if (fallback) fallback.hidden = false;
    video.style.display = "none";
    if (soundBtn) soundBtn.style.display = "none";
  }

  video.addEventListener("error", showFallback);
  video.addEventListener("pause", function () { if (tapIcon) tapIcon.parentElement.classList.add("show"); });
  video.addEventListener("play", function () { if (tapIcon) tapIcon.parentElement.classList.remove("show"); });

  document.addEventListener("click", function (e) {
    if (e.target.closest("#navVideoBtn") || e.target.closest("#profileAvatarBtn")) { open(); return; }
    if (e.target.closest("#videoClose")) { close(); return; }
    if (e.target.closest("#videoSound")) {
      video.muted = !video.muted;
      soundBtn.innerHTML = '<i class="fas ' + (video.muted ? "fa-volume-xmark" : "fa-volume-high") + '"></i>';
      return;
    }
    if (e.target.closest("#videoStage") && !video.error && fallback.hidden) {
      if (video.paused) play(); else video.pause();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) close();
  });
})();
