importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-messaging.js')


// mas informacion en https://firebase.google.com/docs/web/setup?hl=es-419


firebase.initializeApp({
  projectId: 'fistpips',
  'messagingSenderId': '823849314972'
});

const messaging = firebase.messaging();

// Función que se ejecuta en background para recibir las notificaciones
messaging.setBackgroundMessageHandler(payload => {
  const tituloNotificacion = 'Nueva señal disponible'
  const opcionesNotificacion = {
    body: payload.data.titulo,
    icon: 'src/assets/Nuevo.png',
    click_action: 'https://fistpips.firebaseio.com'
  }

  return self.registration.showNotification(
    tituloNotificacion,
    opcionesNotificacion
  )
})
