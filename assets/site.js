(function(){
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  var sun = document.getElementById('iconSun');
  var moon = document.getElementById('iconMoon');

  // The initial theme is already set synchronously by the inline script
  // in <head> (avoids a flash of the wrong theme). Here we just sync the
  // toggle icon/label to whatever was decided, and wire up the click.
  function reflect(){
    var dark = root.getAttribute('data-theme') === 'dark';
    if(sun) sun.style.display = dark ? 'none' : 'block';
    if(moon) moon.style.display = dark ? 'block' : 'none';
    if(btn) btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  reflect();

  if(btn){
    btn.addEventListener('click', function(){
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      if(next === 'dark'){ root.setAttribute('data-theme','dark'); } else { root.removeAttribute('data-theme'); }
      try { localStorage.setItem('zh-theme', next); } catch(e) {}
      reflect();
    });
  }

  // Mark the current page's nav link as active, for sighted and
  // screen-reader users alike.
  var here = (location.pathname.split('/').pop() || 'index.html');
  if(here === '') here = 'index.html';
  document.querySelectorAll('.topnav nav a[href]').forEach(function(a){
    var href = a.getAttribute('href').split('#')[0];
    if(href && href === here){
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  // Page-to-page navigation: fixed prev/next arrows at the left and
  // right edges, cycling through the four main pages.
  var PAGES = [
    { href: 'index.html', label: 'Home' },
    { href: 'research.html', label: 'Research' },
    { href: 'publications.html', label: 'Publications' },
    { href: 'background.html', label: 'Background' }
  ];
  var pageIndex = PAGES.findIndex(function(p){ return p.href === here; });
  if(pageIndex > -1){
    var prevPage = PAGES[(pageIndex - 1 + PAGES.length) % PAGES.length];
    var nextPage = PAGES[(pageIndex + 1) % PAGES.length];

    var prevLink = document.createElement('a');
    prevLink.className = 'side-nav-btn prev';
    prevLink.href = prevPage.href;
    prevLink.setAttribute('aria-label', 'Previous page: ' + prevPage.label);
    prevLink.title = prevPage.label;
    prevLink.innerHTML = '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>';

    var nextLink = document.createElement('a');
    nextLink.className = 'side-nav-btn next';
    nextLink.href = nextPage.href;
    nextLink.setAttribute('aria-label', 'Next page: ' + nextPage.label);
    nextLink.title = nextPage.label;
    nextLink.innerHTML = '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>';

    document.body.appendChild(prevLink);
    document.body.appendChild(nextLink);
  }

  // Scroll-to-top button: appears once the page has scrolled down.
  var topBtn = document.createElement('button');
  topBtn.type = 'button';
  topBtn.className = 'scroll-top-btn';
  topBtn.setAttribute('aria-label', 'Scroll to top');
  topBtn.title = 'Scroll to top';
  topBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(topBtn);

  var toggleTopBtn = function(){
    if(window.scrollY > 420){ topBtn.classList.add('visible'); }
    else { topBtn.classList.remove('visible'); }
  };
  toggleTopBtn();
  window.addEventListener('scroll', toggleTopBtn, { passive: true });

  topBtn.addEventListener('click', function(){
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  // Copy-to-clipboard for citation blocks, if any are on the page.
  document.querySelectorAll('.cite-block .copy-btn').forEach(function(button){
    var pre = button.closest('.cite-block').querySelector('pre');
    if(!pre) return;
    var defaultLabel = button.textContent;
    button.addEventListener('click', function(){
      var text = pre.textContent;
      var done = function(){
        button.textContent = 'Copied';
        setTimeout(function(){ button.textContent = defaultLabel; }, 1600);
      };
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        var range = document.createRange();
        range.selectNodeContents(pre);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        try { document.execCommand('copy'); } catch(e) {}
        sel.removeAllRanges();
        done();
      }
    });
  });
})();
