/* @tag: stories-js | module: viewer | duration: 5000ms | lang: ar,en */
(function () {
  var STORIES = [
    { icon: "fa-kitchen-set", ar: ["مطابخ فارينا 👨‍🍳", "أحدث الموديلات التركية والإيطالية بخامات مقاومة للماء والحرارة"], en: ["VARINA Kitchens", "Latest Turkish and Italian models, water and heat resistant"] },
    { icon: "fa-bed", ar: ["غرف نوم فاخرة 🛏️", "تصاميم عصرية وكلاسيكية تناسب كل المساحات"], en: ["Luxury Bedrooms", "Modern and classic designs for every space"] },
    { icon: "fa-credit-card", ar: ["بيع بالأقساط 💳", "ادفع بالأقساط عبر بطاقة Qi Card بسهولة"], en: ["Installments", "Pay in installments via Qi Card"] },
    { icon: "fa-couch", ar: ["ديكورات داخلية 🛋️", "تنفيذ متكامل للصالات والمنازل بلمسات فخامة"], en: ["Interior Decor", "Full execution for living rooms with luxury touches"] },
    { icon: "fa-star", ar: ["آراء العملاء ⭐", "آلاف العملاء السعداء في جميع المحافظات"], en: ["Reviews", "Thousands of happy clients across all provinces"] }
  ];
  var modal = document.getElementById("storyModal");
  var barsBox = document.getElementById("storyBars");
  var iconEl = document.getElementById("storyIcon");
  var textEl = document.getElementById("storyText");
  var timeEl = document.getElementById("storyTime");
  var DUR = 5000, STEP = 50, idx = 0, t = 0, timer = null;

  function lang() { return document.documentElement.getAttribute("lang") === "en" ? "en" : "ar"; }

  function buildBars() {
    barsBox.innerHTML = "";
    STORIES.forEach(function (_, i) {
      var bar = document.createElement("span");
      bar.className = "bar";
      bar.innerHTML = "<i></i>";
      if (i < idx) bar.firstChild.style.width = "100%";
      barsBox.appendChild(bar);
    });
  }

  function render() {
    var s = STORIES[idx], l = lang();
    iconEl.innerHTML = '<i class="fas ' + s.icon + '"></i>';
    textEl.textContent = l === "ar" ? (s.ar[0] + "\n" + s.ar[1]) : (s.en[0] + "\n" + s.en[1]);
    timeEl.textContent = l === "ar" ? "الآن" : "now";
  }

  function tick() {
    t += STEP;
    var bar = barsBox.children[idx];
    if (bar) bar.firstChild.style.width = Math.min(100, (t / DUR) * 100) + "%";
    if (t >= DUR) next();
  }

  function start() { stop(); t = 0; timer = setInterval(tick, STEP); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }

  function open(i) { idx = i; buildBars(); render(); modal.hidden = false; document.body.style.overflow = "hidden"; start(); }
  function close() { stop(); modal.hidden = true; document.body.style.overflow = ""; }
  function next() {
    if (idx < STORIES.length - 1) { idx++; buildBars(); render(); start(); }
    else { close(); }
  }
  function prev() { if (idx > 0) { idx--; buildBars(); render(); start(); } }

  document.addEventListener("click", function (e) {
    var hl = e.target.closest(".hl");
    if (hl) { open(parseInt(hl.getAttribute("data-story"), 10) || 0); return; }
    if (e.target.closest("#storyClose")) close();
    if (e.target.closest("#storyNext")) next();
    if (e.target.closest("#storyPrev")) prev();
  });

  document.addEventListener("langchange", function () { if (!modal.hidden) render(); });
})();
