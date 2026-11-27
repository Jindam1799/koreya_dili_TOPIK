/* 덩어리숲 · çevrimdışı önbellek. Yeni sürüm yayınlarken VERSION'ı değiştirin. */
const VERSION='deongeori-az-v45';
const FILES=['./','index.html','app.js','char.js','config.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','og-image.png',
 'data/a12.js','data/b11.js','data/b12.js','data/b21.js','data/b22.js','data/hanja.js','data/topik2.js','data/topik1.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('deongeori-az-')&&k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// Önce ağ, olmazsa önbellek: güncellemeler hemen görünür, internet yokken de çalışır.
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin||e.request.url.includes('/audio/'))return;
 // HTTP önbelleğini atla (GitHub Pages 10 dk önbellekliyor): her açılışta en yeni sürüm
 e.respondWith(fetch(e.request.url,{cache:'no-cache',credentials:'same-origin'}).then(r=>{const c=r.clone();caches.open(VERSION).then(x=>{if(r.ok)x.put(e.request,c)});return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})));
});
