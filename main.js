/* @tag: loader-js | role: bootstrap | loads: main/*.js | removed: follow.js (real IG link now) */
(function () {
  var MODULES = ["lang.js", "splash.js", "tabs.js", "stories.js", "viewer.js", "likes.js", "nav.js", "hours.js", "site-qr.js", "settings.js", "video.js", "boards.js"];
  MODULES.forEach(function (name) {
    var s = document.createElement("script");
    s.src = "main/" + name;
    s.async = false;
    document.head.appendChild(s);
  });
})();
