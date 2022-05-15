var app = require('express')();
var http = require('http').Server(app);
//new addition
var io = require('socket.io')(http);
//end

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//new addition
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on("join", function (name) {
        // usocket[name] = socket
        io.emit("join", name) //服务器通过广播将新用户发送给全体群聊成员
    })
    socket.on('message', function (msg) {
        console.log(msg);
        io.emit('message',msg);
    })
});
//end



http.listen(3000, function(){
    console.log('listening on *:3000');
});