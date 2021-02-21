const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { begeniSocket} = require('./socket/begeni')

app.get('/', (req, res) => {
  res.json({test:"deneme"});
});


http.listen(4000, () => {
  console.log('listening on *:4000');
});

begeniSocket(io)



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





