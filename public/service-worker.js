// The VuePress site registered a caching service worker. This replacement
// clears its caches and unregisters itself so returning visitors get the
// current site instead of a stale cached copy.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        for (const key of await caches.keys()) {
            await caches.delete(key);
        }

        await self.registration.unregister();

        for (const client of await self.clients.matchAll({ type: 'window' })) {
            client.navigate(client.url);
        }
    })());
});
