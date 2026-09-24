/* @tag: settings-js | module: settings+music | audio: streaming-3-sources-failover | persist: varina-music | duck: video-modal-open | lang: ar,en */
(function () {
  var KEY = "varina-music";
  var SOURCES = [
    "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    "https://www.kozco.com/tech/piano2.mp3"
  ];
  var audio = null, started = false, srcIndex = 0, shouldPlay = false;
  var modal = document.getElementById("settingsModal");
  var switchBtn = document.getElementById("musicSwitch");
  if (!modal || !switchBtn) return;

  function enabled() { try { return localStorage.getItem(KEY) !== "off"; } catch (e) { return true; } }
  function setEnabled(v) { try { localStorage.setItem(KEY, v ? "on" : "off"); } catch (e) {} }

  function ensureAudio() {
    if (audio) return;
    audio = new Audio();
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";
    audio.addEventListener("error", function () {
      if (srcIndex < SOURCES.length - 1) {
        srcIndex++;
        audio.src = SOURCES[srcIndex];
        if (shouldPlay) {
          var p = audio.play();
          if (p && p.catch) p.catch(function () {});
        }
      }
    });
    audio.src = SOURCES[srcIndex];
  }
  function play() {
    if (!enabled()) return;
    shouldPlay = true;
    ensureAudio();
    var p = audio.play();
    if (p && p.catch) p.catch(function () {});
  }
  function pause() { shouldPlay = false; if (audio) audio.pause(); }

  function render() {
    var on = enabled();
    switchBtn.classList.toggle("on", on);
    switchBtn.setAttribute("aria-checked", on ? "true" : "false");
  }

  document.addEventListener("pointerdown", function () {
    if (started) return;
    started = true;
    if (enabled()) play();
  });

  document.addEventListener("click", function (e) {
    if (e.target.closest("#settingsBtn")) { modal.hidden = false; render(); return; }
    if (e.target.closest("#settingsClose")) { modal.hidden = true; return; }
    if (e.target === modal) { modal.hidden = true; return; }
    if (e.target.closest("#musicSwitch")) {
      var on = !enabled();
      setEnabled(on);
      render();
      if (on) { started = true; play(); } else { pause(); }
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) modal.hidden = true;
  });

  var videoModal = document.getElementById("videoModal");
  if (videoModal && "MutationObserver" in window) {
    new MutationObserver(function () {
      if (videoModal.hidden) { if (started && enabled()) play(); }
      else { pause(); }
    }).observe(videoModal, { attributes: true, attributeFilter: ["hidden"] });
  }

  render();
})();
