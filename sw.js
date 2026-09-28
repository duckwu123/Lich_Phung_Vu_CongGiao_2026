const C="lpv-2026-v2",A=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
  if(/fonts\.(googleapis|gstatic)\.com/.test(e.request.url)){const c2=res.clone();caches.open(C).then(c=>c.put(e.request,c2))}
  return res}).catch(()=>caches.match("index.html"))))});
