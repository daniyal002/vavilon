export const socket = new WebSocket('wss://kinovavilon.ru/api-ws');
socket.addEventListener('open', function (event) {
  console.log('WebSocket is connected');
});