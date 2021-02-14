
const begeniSocket = (io) => {
    const nsp = io.of('/paylasim');

    nsp.on('connection', (socket) => {
        console.log('user connected in nsp');
        console.log('Bağalanan:');
        console.log(socket.id);
        socket.on('paylasimBegen', (paylasim) => {
            console.log('server paylasim begenildi');
            console.log(paylasim);
            socket.broadcast.emit('paylasimBegen', paylasim)
        });

        socket.on('disconnect',()=>{
            console.log('ayrılan');
            console.log(socket.id);
        })

       

    });

   
}

module.exports =  {
    begeniSocket
}