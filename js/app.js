// This file makes the site work. Your menu and settings live in js/menu.js (edit that file instead).
(function () {
  "use strict";
  // Built-in fallback so the ordering still works even if js/menu.js hasn't loaded
  var DEFAULTS = {
    businessName: "Fresh Sandwiches", whatsapp: "27713875231", whatsappDisplay: "071 387 5231", formKey: "",
    tagline: "", pills: [], footerQuestion: "Questions or allergies? Message me any time.", footerSmall: "",
    breads: ["Sourdough", "Ciabatta", "Seed loaf", "White", "Brown"],
    times: ["14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
    buildYourOwn: { show: false }, allergyTitle: "Allergy & ordering info", allergyInfo: []
  };
  var SETTINGS = (typeof window.SETTINGS !== "undefined" && window.SETTINGS) || DEFAULTS;
  var MENU = (typeof window.MENU !== "undefined" && window.MENU) || [];
  if (typeof window.SETTINGS === "undefined" && window.console) console.warn("js/menu.js did not load. Open check.html to find out why.");
  var WHATSAPP = SETTINGS.whatsapp, FORM_KEY = SETTINGS.formKey, BREADS = SETTINGS.breads, TIMES = SETTINGS.times;

var KEY = "freshSandwichesCart", memCart = [];
function loadCart() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return memCart; }
}
function saveCart(c) {
  memCart = c;
  try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
}
function $(id) { return document.getElementById(id); }
function el(tag, attrs, kids) {
  var e = document.createElement(tag);
  Object.keys(attrs || {}).forEach(function (k) { if (k === "text") e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); });
  (kids || []).forEach(function (c) { e.appendChild(c); });
  return e;
}
function updateBar() {
  var bar = $("bar"); if (!bar) return;
  var n = loadCart().reduce(function (a, l) { return a + l.qty; }, 0);
  $("count").textContent = n;
  bar.classList.toggle("show", n > 0);
}

var page = document.body.getAttribute("data-page");

// ---------- Home page: menu blocks ----------
if (page === "menu") {
  var menuEl = $("menu"), n = 0;
  $("tagline").textContent = SETTINGS.tagline;
  SETTINGS.pills.forEach(function (p) { $("pills").appendChild(el("span", { text: p })); });
  MENU.forEach(function (s) {
    if (s.available === false) return;
    n++;
    var a = el("a", { "class": "block c" + (((n - 1) % 3) + 1), href: "sandwich.html?id=" + encodeURIComponent(s.id) });
    a.appendChild(el("div", {}, [el("h3", { text: s.name }), el("p", { text: s.description })]));
    a.appendChild(el("span", { "class": "arrow", "aria-hidden": "true", text: "→" }));
    menuEl.appendChild(a);
  });
  if (SETTINGS.buildYourOwn.show) {
    var b = SETTINGS.buildYourOwn, d2 = el("a", { "class": "block diy", href: "build-your-own.html" });
    d2.appendChild(el("div", {}, [el("span", { "class": "tag", text: b.tag }), el("h3", { text: b.name }), el("p", { text: b.description })]));
    d2.appendChild(el("span", { "class": "arrow", "aria-hidden": "true", text: "→" }));
    menuEl.appendChild(d2);
  }
}

// ---------- Sandwich page (one template for every sandwich) ----------
if (page === "item") {
  var legacy = !$("sandwich");   // old-style static sandwich page
  var idMatch = location.search.match(/[?&]id=([^&]*)/), wanted = idMatch ? decodeURIComponent(idMatch[1]) : "";
  var s = legacy ? { name: document.body.getAttribute("data-name") || "Sandwich" }
                 : MENU.filter(function (x) { return x.id === wanted && x.available !== false; })[0];
  if (!s) {
    $("sandwich").hidden = true; $("missing").hidden = false;
  } else {
    if (!legacy) {
      document.title = s.name + " – " + SETTINGS.businessName;
      $("s-name").textContent = s.name;
      $("s-desc").textContent = s.description || "";
      (s.ingredients || []).concat(["Your choice of bread"]).forEach(function (t) { $("s-ingredients").appendChild(el("li", { text: t })); });
      if (s.contains && s.contains.length) $("s-contains").textContent = s.contains.join(", "); else $("s-contains-row").hidden = true;
      $("note").setAttribute("placeholder", s.placeholder || "");
    }
    var breadSel = $("bread");
    BREADS.forEach(function (b) { breadSel.appendChild(el("option", { text: b })); });
    var amount = 1;
    $("minus").onclick = function () { if (amount > 1) { amount--; $("qty").textContent = amount; } };
    $("plus").onclick = function () { if (amount < 20) { amount++; $("qty").textContent = amount; } };
    $("add").onclick = function () {
      var cart = loadCart();
      cart.push({ name: s.name, bread: breadSel.value, qty: amount, note: $("note").value.trim() });
      saveCart(cart);
      $("added").classList.add("show");
      $("add").hidden = true;
      updateBar();
      $("added").scrollIntoView({ behavior: "smooth", block: "center" });
    };
  }
}

// ---------- Build your own page ----------
if (page === "build") {
  if (!SETTINGS.buildYourOwn.show) { location.replace("index.html"); }
  var bbread = $("bread");
  BREADS.forEach(function (b) { bbread.appendChild(el("option", { text: b })); });
  var bq = 1;
  $("minus").onclick = function () { if (bq > 1) { bq--; $("qty").textContent = bq; } };
  $("plus").onclick = function () { if (bq < 20) { bq++; $("qty").textContent = bq; } };
  [].slice.call(document.querySelectorAll(".chips input")).forEach(function (c) {
    var sub = document.querySelector('select.sub[data-for="' + c.value + '"]');
    if (sub) c.addEventListener("change", function () { sub.classList.toggle("show", c.checked); });
  });
  var picked = function (name) {
    return [].slice.call(document.querySelectorAll('input[name="' + name + '"]:checked')).map(function (x) {
      var sub = document.querySelector('select.sub[data-for="' + x.value + '"]');
      return sub ? x.value + " (" + sub.value + ")" : x.value;
    });
  };
  $("add").onclick = function () {
    var groups = [["Fillings", "fillings"], ["Cheese", "cheese"], ["Salad / extras", "salad"], ["Sauces", "sauces"]], lines = [];
    groups.forEach(function (g) { var p = picked(g[1]); if (p.length) lines.push(g[0] + ": " + p.join(", ")); });
    if (!lines.length) { $("builderr").style.display = "block"; return; }
    $("builderr").style.display = "none";
    var cart = loadCart();
    cart.push({ name: "Build your own", bread: bbread.value, qty: bq, note: $("note").value.trim(), details: lines.join("\n") });
    saveCart(cart);
    $("added").classList.add("show");
    $("add").hidden = true;
    updateBar();
    $("added").scrollIntoView({ behavior: "smooth", block: "center" });
  };
}

// ---------- Order page ----------
if (page === "order") {
  var d = $("date"), t = new Date(); t.setDate(t.getDate() + 1);
  var iso = t.getFullYear() + "-" + ("0" + (t.getMonth() + 1)).slice(-2) + "-" + ("0" + t.getDate()).slice(-2);
  d.min = iso; d.value = iso;
  TIMES.forEach(function (x) { $("time").appendChild(el("option", { text: x })); });
  var v = function (id) { return $(id).value.trim(); };

  var render = function () {
    var cart = loadCart(), lines = $("lines"); lines.textContent = "";
    cart.forEach(function (l, i) {
      var left = el("div", {}, [el("b", { text: l.qty + " × " + l.name }), el("small", { text: l.bread })]);
      if (l.details) l.details.split("\n").forEach(function (d) { left.appendChild(el("small", { text: d })); });
      if (l.note) left.appendChild(el("small", { text: "Note: " + l.note }));
      var minus = el("button", { type: "button", "aria-label": "Fewer", text: "−" });
      var plus = el("button", { type: "button", "aria-label": "More", text: "+" });
      minus.onclick = function () { if (l.qty > 1) { l.qty--; saveCart(cart); render(); } };
      plus.onclick = function () { if (l.qty < 20) { l.qty++; saveCart(cart); render(); } };
      var rm = el("button", { type: "button", "class": "rm", "aria-label": "Remove this sandwich", text: "✕" });
      rm.onclick = function () { cart.splice(i, 1); saveCart(cart); render(); };
      lines.appendChild(el("div", { "class": "line" }, [left, el("div", { "class": "ctl" }, [el("div", { "class": "qty" }, [minus, el("output", { text: String(l.qty) }), plus]), rm])]));
    });
    $("empty").hidden = cart.length > 0;
    $("details").hidden = cart.length === 0;
  };

  $("send").onclick = function () {
    var cart = loadCart(), err = $("err");
    var fail = function (m) { err.textContent = m; err.style.display = "block"; };
    if (!cart.length) return fail("Please add a sandwich first.");
    if (!v("name") || !v("phone") || !v("date")) return fail("Please fill in your name, phone number and date.");
    if (v("how").indexOf("Delivery") === 0 && !v("address")) return fail("Please add your house number for delivery.");
    if (v("date") < iso) return fail("Sorry, orders need to be placed at least a day in advance.");
    err.style.display = "none";
    var msg = "Hi! I’d like to order:\n\n";
    cart.forEach(function (l) {
      msg += "🥪 " + l.qty + " × " + l.name + "\n   " + l.bread + "\n" + (l.details ? "   " + l.details.split("\n").join("\n   ") + "\n" : "") + (l.note ? "   Note: " + l.note + "\n" : "") + "\n";
    });
    msg += "Name: " + v("name") + "\nPhone: " + v("phone") + "\n" + v("how") + (v("address") ? " – " + v("address") : "") + "\nDate: " + v("date") + " at " + v("time");
    if (v("gnotes")) msg += "\nExtra notes: " + v("gnotes");
    if (FORM_KEY) {
      try {
        fetch("https://api.web3forms.com/submit", {
          method: "POST", keepalive: true,
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({ access_key: FORM_KEY, subject: "New sandwich order from " + v("name"), from_name: "Fresh Sandwiches website", name: v("name"), phone: v("phone"), message: msg })
        }).catch(function () {});
      } catch (e) {}
    }
    window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg), "_blank");
  };
  render();
}

// ---------- Allergy tab and footer (text comes from menu.js) ----------
function renderChrome() {
  var info = $("info");
  if (info) {
    var d = el("details", { "class": "info" }, [el("summary", { text: SETTINGS.allergyTitle })]);
    SETTINGS.allergyInfo.forEach(function (p) {
      var e = el("p", p.warn ? { "class": "warn" } : {});
      if (p.lead) e.appendChild(el("strong", { text: p.lead + " " }));
      e.appendChild(document.createTextNode(p.text));
      d.appendChild(e);
    });
    info.appendChild(d);
  }
  var foot = $("foot");
  if (foot) {
    foot.appendChild(el("p", { text: SETTINGS.footerQuestion }));
    foot.appendChild(el("a", { href: "https://wa.me/" + SETTINGS.whatsapp, text: "WhatsApp " + SETTINGS.whatsappDisplay }));
    foot.appendChild(el("small", { text: SETTINGS.footerSmall }));
  }
}
renderChrome();

updateBar();
})();
