const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
  });

app.get('/', (req, res) => {
  res.json({test:"deneme"});
});

/*

app.get('/drag', (req, res) => {
  res.sendFile(__dirname + '/drag.html');
});
*/

const nsp = io.of('/room1');

nsp.on('connection', (socket) => {
  console.log('user connected in nsp');
  socket.on('isim yaz', (msg) => {
    nsp.emit('isim yaz', msg);
  });

});



io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('login', (positions) => {
    console.log(positions);
    //io.emit('drag', positions);
  });

  socket.on('drag', (positions) => {
    console.log(positions);
    io.emit('drag', positions);
  });

  socket.on('likeIt', (item) => {
    console.log("socket like it bağlandı");
    console.log(item);
    io.emit('likeIt', item);
  });
});

http.listen(4000, () => {
  console.log('listening on *:4000');
});




