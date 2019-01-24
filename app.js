var app = require('./config/server');

var server = app.listen(3000, function () {
    console.log("Servidor Online");
});

var io = require('socket.io').listen(server);

app.set('ioSocket', io);

io.on('connection', function(socket){
    console.log("Conectou");
    socket.on('disconnect', function(){
        console.log("Desconectou");
    });

    socket.on('messageForServer', function(data){
        socket.emit(
            'messageForClient',
            { apelido: data.apelido, message: data.message }
        );

        socket.broadcast.emit(
            'messageForClient',
            { apelido: data.apelido, message: data.message }
        );

        if(parseInt(data.updateApelido) == 0){
            socket.emit(
                'participantsForClient',
                { apelido: data.apelido }
            );

            socket.broadcast.emit(
                'participantsForClient',
                { apelido: data.apelido }
            );
        }
        
    });
});