importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD0K8wCcO3F3AoJgT9pfZhsblABcELuDHQ",
  authDomain: "smartshop-app-b9424.firebaseapp.com",
  projectId: "smartshop-app-b9424",
  storageBucket: "smartshop-app-b9424.firebasestorage.app",
  messagingSenderId: "647911700661",
  appId: "1:647911700661:web:5908aa04cf60966e30a6fc",
  measurementId: "G-ZG265FTTHP"
});

const messaging = firebase.messaging();

// Handle notifikasi saat app di background/closed
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification || {};
  const link = payload.data?.link || '/';

  self.registration.showNotification(title || 'SmartShop', {
    body: body || 'Harga incaran Anda turun!',
    icon: icon || '/icon-192.png',
    badge: '/icon-192.png',
    data: { link }
  });
});

// Handle klik notifikasi → buka app di halaman yang tepat
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const link = event.notification.data?.link || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(link);
          return client.focus();
        }
      }
      return clients.openWindow(link);
    })
  );
});