/* DZ Marketing Digital — landing page (clone estático)
 * Comportamentos replicados da versão base44:
 *  - header ganha fundo ao rolar
 *  - menu mobile (lg:hidden)
 *  - acordeão de serviços
 *  - formulário de diagnóstico -> WhatsApp
 *  - contadores animados no hero
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------ header scroll */
  var header = document.querySelector("header");
  if (header) {
    var solid = ["bg-[#0A0A0A]", "backdrop-blur-xl", "border-b", "border-gray-800"];
    var transparent = ["bg-transparent"];
    var onScroll = function () {
      var scrolled = window.scrollY > 24;
      solid.forEach(function (c) {
        header.classList.toggle(c, scrolled);
      });
      transparent.forEach(function (c) {
        header.classList.toggle(c, !scrolled);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------------------------------------------------------- menu mobile */
  var toggle = document.querySelector("[data-menu-toggle]");
  var panel = document.querySelector("[data-menu-panel]");
  if (toggle && panel) {
    var closeMenu = function () {
      panel.classList.add("hidden");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", function () {
      var open = !panel.classList.contains("hidden");
      if (open) {
        closeMenu();
      } else {
        panel.classList.remove("hidden");
        toggle.setAttribute("aria-expanded", "true");
      }
    });
    panel.querySelectorAll("[data-menu-link]").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ------------------------------------------------------------ acordeão serviços */
  var items = Array.prototype.slice.call(document.querySelectorAll("[data-service-item]"));
  var CLOSED_PANEL = ["max-h-0", "opacity-0"];
  var OPEN_PANEL = ["max-h-[2000px]", "opacity-100"];
  var CLOSED_ITEM = ["border-gray-800", "bg-[#141414]"];
  var OPEN_ITEM = ["border-[#D4AF37]/40", "bg-[#1A1700]/60"];

  var setItem = function (item, open) {
    var btn = item.querySelector("[data-service-toggle]");
    var body = item.querySelector("[data-service-panel]");
    var chevron = item.querySelector("svg");
    if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (body) {
      CLOSED_PANEL.forEach(function (c) {
        body.classList.toggle(c, !open);
      });
      OPEN_PANEL.forEach(function (c) {
        body.classList.toggle(c, open);
      });
    }
    CLOSED_ITEM.forEach(function (c) {
      item.classList.toggle(c, !open);
    });
    OPEN_ITEM.forEach(function (c) {
      item.classList.toggle(c, open);
    });
    if (chevron) chevron.classList.toggle("rotate-180", open);
  };

  items.forEach(function (item) {
    var btn = item.querySelector("[data-service-toggle]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var isOpen = btn.getAttribute("aria-expanded") === "true";
      items.forEach(function (other) {
        setItem(other, false);
      });
      if (!isOpen) setItem(item, true);
    });
  });

  /* ------------------------------------------------------ formulário diagnóstico */
  var form = document.querySelector("[data-diagnostic-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var get = function (k) {
        return (data.get(k) || "").toString().trim();
      };
      var lines = [
        "Olá! Acabei de enviar um diagnóstico pelo site da DZ Marketing Digital.",
        "",
        "Nome: " + get("nome"),
        "Empresa: " + (get("empresa") || "-"),
        "E-mail: " + get("email"),
        "WhatsApp: " + get("whatsapp"),
        "Serviço de interesse: " + get("servico"),
        "Investimento mensal: " + get("investimento"),
        "",
        "Maior desafio hoje:",
        get("desafio"),
      ];
      var url = "https://wa.me/5511937584664?text=" + encodeURIComponent(lines.join("\n"));
      var btn = form.querySelector("button[type=submit]");
      if (btn) {
        btn.disabled = true;
        btn.classList.add("disabled:opacity-50", "disabled:cursor-not-allowed");
      }
      window.open(url, "_blank", "noopener");
      setTimeout(function () {
        if (btn) {
          btn.disabled = false;
          btn.classList.remove("disabled:opacity-50", "disabled:cursor-not-allowed");
        }
      }, 1200);
    });
  }

  /* ------------------------------------------------------------ contadores hero */
  var counters = Array.prototype.slice.call(
    document.querySelectorAll("#inicio p.text-2xl.font-black")
  );
  var animate = function (el) {
    var raw = el.textContent.trim();
    var match = raw.match(/^(\+?)(\d+(?:[.,]\d+)?)(.*)$/);
    if (!match) return;
    var prefix = match[1] || "";
    var target = parseFloat(match[2].replace(",", "."));
    var suffix = match[3] || "";
    if (!isFinite(target) || target === 0) return;
    var decimals = (match[2].split(/[.,]/)[1] || "").length;
    var duration = 1400;
    var start = performance.now();
    var step = function (now) {
      var p = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      var value = target * eased;
      el.textContent =
        prefix + value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = raw;
    };
    requestAnimationFrame(step);
  };

  if (counters.length && !reduceMotion && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --------------------------------------------------------- ano no rodapé */
  var year = document.querySelector("[data-current-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
