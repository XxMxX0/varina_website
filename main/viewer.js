/* @tag: viewer-js | module: post-viewer | data: PRODUCTS | images: images/<key><1..3>.jpg | wa: 9647874448818 */
(function () {
  var WA_NUMBER = "9647874448818";
  var PRODUCTS = {
    kitchen:  { icon: "fa-kitchen-set", likes: "2.4k", slides: 3,
      ar: { t: "مطابخ فخمة", d: "أحدث المطابخ التركية والإيطالية، خامات مقاومة للماء والحرارة، تصنيع عالي الجودة." },
      en: { t: "Luxury Kitchens", d: "Latest Turkish and Italian kitchens, water and heat resistant materials, premium build." } },
    bedroom:  { icon: "fa-bed", likes: "1.8k", slides: 3,
      ar: { t: "غرف نوم", d: "غرف نوم فاخرة بتصاميم عصرية وكلاسيكية تناسب كل المساحات والأذواق." },
      en: { t: "Bedrooms", d: "Luxury bedrooms in modern and classic designs for every space and taste." } },
    sofa:     { icon: "fa-couch", likes: "3.1k", slides: 3,
      ar: { t: "كنب وصالات", d: "كنب وصالات استقبال بأجود الأقمشة والإسفنج عالي الكثافة." },
      en: { t: "Sofas & Living", d: "Sofas and living sets with premium fabrics and high-density foam." } },
    dining:   { icon: "fa-utensils", likes: "980", slides: 3,
      ar: { t: "طاولات سفرة", d: "طاولات سفرة بأحجام مختلفة مع كراسي مريحة وتشطيبات راقية." },
      en: { t: "Dining Sets", d: "Dining tables in various sizes with comfy chairs and fine finishes." } },
    chairs:   { icon: "fa-chair", likes: "1.5k", slides: 3,
      ar: { t: "كراسي فخمة", d: "كراسي مكتب ومعيشة بخامات قوية وتصاميم مريحة." },
      en: { t: "Luxury Chairs", d: "Office and lounge chairs, strong materials and comfy designs." } },
    bath:     { icon: "fa-bath", likes: "2.2k", slides: 3,
      ar: { t: "حمامات عصرية", d: "تجهيزات وتصاميم حمامات عصرية بإطلالة فندقية." },
      en: { t: "Modern Bathrooms", d: "Modern bathroom designs and fittings with a hotel-style look." } },
    lighting: { icon: "fa-lightbulb", likes: "760", slides: 3,
      ar: { t: "إضاءة ديكور", d: "إضاءات داخلية تضيف دفئاً وفخامة لكل غرفة." },
      en: { t: "Decor Lighting", d: "Indoor lighting that adds warmth and luxury to every room." } },
    doors:    { icon: "fa-door-closed", likes: "1.1k", slides: 3,
      ar: { t: "أبواب وخزائن", d: "أبواب داخلية وخزائن حائط بمقاسات حسب الطلب." },
      en: { t: "Doors & Closets", d: "Interior doors and wall closets in custom sizes." } },
    crown:    { icon: "fa-crown", likes: "4.6k", slides: 3,
      ar: { t: "الأكثر طلباً", d: "قطع اختارها عملاؤنا أكثر من غيرها هذا الموسم." },
      en: { t: "Most Wanted", d: "The pieces our clients picked the most this season." } },
    offers:   { icon: "fa-star", likes: "1.9k", slides: 3,
      ar: { t: "عروض حصرية", d: "خصومات وباقات خاصة لفترة محدودة، اسأل عنها الآن." },
      en: { t: "Exclusive Offers", d: "Limited-time discounts and bundles, ask us now." } },
    custom:   { icon: "fa-hammer", likes: "640", slides: 3,
      ar: { t: "صنع حسب الطلب", d: "نصمم وننفذ قطعتك بالمقاس والخامة واللون الذي تريده تماماً." },
      en: { t: "Custom Made", d: "We design and build your piece in your exact size, material and color." } },
    delivery: { icon: "fa-truck", likes: "890", slides: 3,
      ar: { t: "توصيل لكل العراق", d: "خدمة توصيل وتركيب لجميع المحافظات بأمان وسرعة." },
      en: { t: "Nationwide Delivery", d: "Delivery and installation to all provinces, safe and fast." } }
  };

  var viewer = document.getElementById("viewer");
  var titleEl = document.getElementById("viewerTitle");
  var descEl = document.getElementById("viewerDesc");
  var likesEl = document.getElementById("viewerLikes");
  var countEl = document.getElementById("viewerCount");
  var orderEl = document.getElementById("viewerOrder");
  var gallery = document.getElementById("viewerGallery");
  var dotsBox = document.getElementById("viewerDots");
  var current = null;

  function lang() { return document.documentElement.getAttribute("lang") === "en" ? "en" : "ar"; }

  function setDot(i) {
    Array.prototype.forEach.call(dotsBox.children, function (d, j) { d.classList.toggle("on", j === i); });
  }

  function buildGallery(p) {
    gallery.innerHTML = "";
    dotsBox.innerHTML = "";
    for (var i = 1; i <= p.slides; i++) {
      (function (n) {
        var slide = document.createElement("div");
        slide.className = "v-slide";
        var img = document.createElement("img");
        img.loading = "lazy";
        img.alt = "";
        img.src = "images/" + current + n + ".jpg";
        img.onerror = function () {
          slide.classList.add("no-img");
          slide.innerHTML = '<i class="fas ' + p.icon + '"></i>';
        };
        slide.appendChild(img);
        gallery.appendChild(slide);
      })(i);
      var dot = document.createElement("span");
      dot.className = "v-dot";
      dotsBox.appendChild(dot);
    }
    gallery.scrollLeft = 0;
    setDot(0);
  }

  function render() {
    if (!current) return;
    var p = PRODUCTS[current], l = lang();
    titleEl.textContent = p[l].t;
    descEl.textContent = p[l].d;
    likesEl.textContent = p.likes;
    countEl.textContent = p.slides;
    orderEl.href = "https://wa.me/" + WA_NUMBER + "?text=" +
      encodeURIComponent((l === "ar" ? "مرحباً فارينا، أرغب بالاستفسار عن: " : "Hello VARINA, I'd like to ask about: ") + p[l].t);
  }

  function open(key) {
    if (!PRODUCTS[key]) return;
    current = key;
    buildGallery(PRODUCTS[key]);
    render();
    viewer.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function close() {
    viewer.hidden = true;
    current = null;
    document.body.style.overflow = "";
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest("#viewerClose")) close();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !viewer.hidden) close();
  });

  gallery.addEventListener("scroll", function () {
    if (viewer.hidden || !current) return;
    var max = PRODUCTS[current].slides - 1;
    setDot(Math.max(0, Math.min(max, Math.round(Math.abs(gallery.scrollLeft) / gallery.clientWidth))));
  });

  document.addEventListener("langchange", render);

  window.VarinaViewer = { open: open, close: close };
})();
