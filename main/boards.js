/* @tag: boards-js | module: wood-decors | data: wood.json | render: solid-colors | style: catalog | wa: 9647874448818 */
(function () {
  var WA = "9647874448818";
  var data = [], current = -1;
  var grid = document.getElementById("boardsGrid");
  var hint = document.getElementById("boardsHint");
  var modal = document.getElementById("boardModal");
  var big = document.getElementById("boardBig");
  var nameEl = document.getElementById("boardName");
  var codesEl = document.getElementById("boardCodes");
  var orderEl = document.getElementById("boardOrder");

  function lang() { return document.documentElement.getAttribute("lang") === "en" ? "en" : "ar"; }
  function base(b) { return (b.colors && b.colors[0]) || "#8a705a"; }
  function label(b) { return lang() === "ar" ? b.name_ar : b.name_en; }

  function render() {
    if (!grid) return;
    grid.innerHTML = "";
    data.forEach(function (b, i) {
      var card = document.createElement("button");
      card.className = "board-card";
      card.style.background = base(b);
      card.innerHTML = '<span class="board-tag">' + label(b) + "</span>";
      card.addEventListener("click", function () { open(i); });
      grid.appendChild(card);
    });
    if (hint) hint.hidden = data.length > 0;
  }

  function open(i) {
    current = i;
    var b = data[i];
    big.innerHTML = "";
    big.style.background = "transparent";
    (b.colors || []).forEach(function (c) {
      var sw = document.createElement("div");
      sw.className = "board-sw";
      sw.style.background = c;
      sw.innerHTML = "<b>" + c + "</b>";
      big.appendChild(sw);
    });
    nameEl.textContent = label(b);
    codesEl.innerHTML = "";
    (b.colors || []).forEach(function (c) {
      var s = document.createElement("span");
      s.textContent = c;
      codesEl.appendChild(s);
    });
    var msg = (lang() === "ar" ? "مرحباً فارينا، أرغب بطلب لوح: " : "Hello VARINA, I want to order board: ") + label(b) + " [" + (b.colors || []).join(" / ") + "]";
    orderEl.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg);
    modal.hidden = false;
  }

  function close() { modal.hidden = true; current = -1; }

  document.addEventListener("click", function (e) {
    if (e.target.closest("#boardClose")) close();
    else if (e.target === modal) close();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && !modal.hidden) close();
  });

  document.addEventListener("langchange", function () {
    render();
    if (modal && !modal.hidden && current > -1) open(current);
  });

  if (grid) {
    fetch("wood.json")
      .then(function (r) { return r.json(); })
      .then(function (j) { data = (j && j.boards) ? j.boards : []; render(); })
      .catch(function () { data = []; render(); });
  }
})();
