/* tesla-rabatkode.dk — small progressive enhancements */
(function () {
  "use strict";

  /* ---- Copy referral code to clipboard ---- */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var value = btn.getAttribute("data-copy");
      var done = function () {
        var original = btn.querySelector(".copy-label");
        var copied = btn.getAttribute("data-copied") || "Copied!";
        if (original) {
          var prev = original.textContent;
          original.textContent = copied;
          btn.classList.add("copied");
          setTimeout(function () {
            original.textContent = prev;
            btn.classList.remove("copied");
          }, 1800);
        }
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done).catch(fallback);
      } else {
        fallback();
      }
      function fallback() {
        var ta = document.createElement("textarea");
        ta.value = value;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.setAttribute("aria-expanded", "false");
    q.addEventListener("click", function () {
      var isOpen = item.classList.toggle("open");
      q.setAttribute("aria-expanded", isOpen ? "true" : "false");
      a.style.maxHeight = isOpen ? a.scrollHeight + "px" : null;
    });
  });

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---- Analytics (GA4) behind an opt-in consent gate ----
     Nothing from Google loads until the visitor clicks Allow. The choice is
     remembered in localStorage; it can be changed from the privacy page. */
  (function () {
    var GA_ID = "G-MFN55NDSL7";
    var KEY = "trk-consent";
    var EN = document.documentElement.lang === "en";

    var T = EN ? {
      msg: "I'd like to measure anonymous visitor statistics with Google Analytics to improve the guides. May I switch it on?",
      allow: "Allow", deny: "No thanks", more: "Privacy policy",
      moreHref: "/en/privacy/", label: "Cookie consent"
    } : {
      msg: "Jeg vil gerne måle anonym besøgsstatistik med Google Analytics for at forbedre mine guides. Må jeg slå det til?",
      allow: "Tillad", deny: "Nej tak", more: "Privatlivspolitik",
      moreHref: "/privatliv/", label: "Cookie-samtykke"
    };

    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) {}

    if (stored === "granted") {
      loadGA();
    } else if (stored !== "denied") {
      showBanner();
    }

    function loadGA() {
      if (window.__gaLoaded) return;
      window.__gaLoaded = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
      document.head.appendChild(s);
      window.gtag("js", new Date());
      window.gtag("config", GA_ID);
    }

    function setConsent(value) {
      try { localStorage.setItem(KEY, value); } catch (e) {}
      hideBanner();
      if (value === "granted") loadGA();
    }

    function hideBanner() {
      var b = document.getElementById("cookie-banner");
      if (b && b.parentNode) b.parentNode.removeChild(b);
    }

    function showBanner() {
      if (document.getElementById("cookie-banner")) return;
      var wrap = document.createElement("div");
      wrap.id = "cookie-banner";
      wrap.className = "cookie-banner";
      wrap.setAttribute("role", "dialog");
      wrap.setAttribute("aria-label", T.label);
      wrap.setAttribute("aria-live", "polite");

      var p = document.createElement("p");
      p.className = "cookie-text";
      p.appendChild(document.createTextNode(T.msg + " "));
      var a = document.createElement("a");
      a.href = T.moreHref;
      a.textContent = T.more;
      p.appendChild(a);

      var actions = document.createElement("div");
      actions.className = "cookie-actions";
      var deny = document.createElement("button");
      deny.type = "button";
      deny.className = "btn btn-ghost";
      deny.textContent = T.deny;
      deny.addEventListener("click", function () { setConsent("denied"); });
      var allow = document.createElement("button");
      allow.type = "button";
      allow.className = "btn btn-primary";
      allow.textContent = T.allow;
      allow.addEventListener("click", function () { setConsent("granted"); });
      actions.appendChild(deny);
      actions.appendChild(allow);

      wrap.appendChild(p);
      wrap.appendChild(actions);
      document.body.appendChild(wrap);
    }

    /* Let the privacy page re-open the choice ("withdraw consent"). */
    window.resetCookieConsent = function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      showBanner();
    };
  })();
})();
