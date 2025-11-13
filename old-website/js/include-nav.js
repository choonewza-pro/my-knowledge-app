// Load the navbar partial into any page with a #site-nav container
document.addEventListener('DOMContentLoaded', function () {
    var container = document.getElementById('site-nav');
    if (!container) return;

    // Detect if we're in a subdirectory
    var pathSegments = window.location.pathname.split('/').filter(function(s) { return s; });
    var navPath = 'partials/nav.html';
    
    // If we're in a subdirectory (more than just the HTML file), add ../
    if (pathSegments.length > 1) {
        navPath = '../partials/nav.html';
    }

    fetch(navPath)
        .then(function (res) {
            if (!res.ok) {
                // Try alternative path if first fails
                return fetch(navPath === 'partials/nav.html' ? '../partials/nav.html' : 'partials/nav.html');
            }
            return res;
        })
        .then(function (res) {
            if (!res.ok) throw new Error('Failed to load nav');
            return res.text();
        })
        .then(function (html) {
            container.innerHTML = html;
            setActiveNav();
            try { setupPinnedNavbar(); } catch(e) { /* ignore */ }
        })
        .catch(function () {
            // Fallback: simple text link if fetch fails
            container.innerHTML = '<nav><div class="container"><a href="/index.html">Home</a></div></nav>';
        });

    function setActiveNav() {
        try {
            var current = location.pathname.split('/').pop();
            if (!current) current = 'index.html';
            var links = container.querySelectorAll('a.nav-link');
            links.forEach(function (a) {
                var href = a.getAttribute('href') || '';
                var linkFile = href.split('/').pop();
                if (linkFile === current) {
                    a.classList.add('active');
                    a.setAttribute('aria-current', 'page');
                } else {
                    a.classList.remove('active');
                    a.removeAttribute('aria-current');
                }
            });
        } catch (e) {
            // ignore
        }
    }
    
    function setupPinnedNavbar() {
        var nav = container.querySelector('nav') || document.getElementById('main-navbar');
        if (!nav) return;

        // Add class to make it fixed and prepare styling
        nav.classList.add('navbar-fixed');

        // Expose navbar height as CSS variable and add body padding
        var updateHeight = function () {
            var h = nav.offsetHeight || 0;
            document.documentElement.style.setProperty('--navbar-height', h + 'px');
        };
        updateHeight();
        window.addEventListener('resize', updateHeight);
        document.body.classList.add('has-fixed-navbar');

        // Hide on scroll down, show on scroll up
        var lastScroll = window.pageYOffset || document.documentElement.scrollTop || 0;
        var ticking = false;
        var threshold = 10;

        window.addEventListener('scroll', function () {
            var current = window.pageYOffset || document.documentElement.scrollTop || 0;
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    var delta = current - lastScroll;
                    if (Math.abs(delta) > threshold) {
                        if (current > lastScroll && current > 50) {
                            // scrolling down -> hide
                            nav.classList.add('navbar-hidden');
                        } else {
                            // scrolling up -> show
                            nav.classList.remove('navbar-hidden');
                        }
                        lastScroll = current;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // Ensure visible at top
        window.addEventListener('scroll', function () {
            if ((window.pageYOffset || 0) <= 5) nav.classList.remove('navbar-hidden');
        }, { passive: true });
    }
});
