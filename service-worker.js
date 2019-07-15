let cacheName = 'daregiaopwa-son-v.1.0.0';
let filesToCache = [
    './',
    'index.html',
    'css/bootstrap.css',
    'css/flexslider.css',
    'css/font-awesome.min.css',
    'css/menu.css',
    'css/popuo-box.css',
    'css/style.css',
    'js/bootstrap.min.js',
    'js/easing.js',
    'js/easyResponsiveTabs.js',
    'js/jquery.flexisel.js',
    'js/jquery.flexslider.js',
    'js/jquery.leanModal.min.js',
    'js/jquery.magnific-popup.js',
    'js/jquery.min.js',
    'js/megamenu.js',
    'js/move-top.js',
    'js/responsiveslides.min.js',
    'js/responsive-tabs.js',
    'js/scripts.js'
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Installer');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});
