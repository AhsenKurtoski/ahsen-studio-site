(function () {
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var meta = document.querySelector('meta[name="theme-color"]');

  function currentTheme() {
    return root.dataset.theme === 'light' ? 'light' : 'dark';
  }

  function syncUi() {
    var isLight = currentTheme() === 'light';
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(isLight));
      toggle.setAttribute('aria-label', isLight ? 'Passa al tema scuro' : 'Passa al tema chiaro');
    }
    if (meta) {
      meta.setAttribute('content', isLight ? '#ffffff' : '#09090b');
    }
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      try {
        localStorage.setItem('sa-theme', next);
      } catch (e) {}
      syncUi();
    });
  }

  syncUi();

  var mobile = document.querySelector('.mobile-nav');
  if (mobile) {
    mobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobile.removeAttribute('open');
      });
    });
  }

  document.addEventListener('click', function (event) {
    if (mobile && mobile.hasAttribute('open') && !mobile.contains(event.target)) {
      mobile.removeAttribute('open');
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && mobile) {
      mobile.removeAttribute('open');
    }
  });
})();
