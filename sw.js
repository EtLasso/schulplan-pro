const CACHE='sp-v19';
self.addEventListener('install', e=>{
e.waitUntil(caches.open(CACHE).then(c=>c.addAll([
'./', './index.html','./css/styles.css','./js/app.js','./js/components/router.js','./js/components/ui.js',
'./js/api/mock.js','./js/pages/dashboard.js','./js/pages/timetable.js','./js/pages/assignments.js',
'./js/pages/absences.js','./js/pages/resources.js','./js/pages/admin.js','./assets/icons/app.svg'
])));
});
self.addEventListener('fetch', e=>{
e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request)));
});
