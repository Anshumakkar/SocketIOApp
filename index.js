var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var clients =[];

server.listen(3000,function(){
	console.log('starting on port 3000');
});


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});




io.on('connection', function(socket){
  socket.on('message', function(msg){
    console.log('message: ' + msg + " id: "+socket.id);
	  var socketId=socket.id;
	if(io.sockets.connected[socketId]!=null) {
		console.log('sending message to particular user');
        io.sockets.connected[socketId].emit('particular User', {data: msg});
    }
	 // socket.send('sending '+msg);
  });
  socket.on('disconnect',function(){
	console.log('a user disconnected');
	var index = clients.indexOf(socket.id);
    if (index != -1) {
      clients.splice(index, 1);
      console.info('Client gone (id=' + socket.id + ').');
    } 
	  
	  
  });
  socket.on('storeClientInfo',function(clientInfo){
	  console.log('id is: '+clientInfo.customId);
  });
//  socket.send('Please wait while connecting to a stranger');
	console.log('A user has been connected');
	
	 console.info('New client connected (id=' + socket.id + ').');
    clients.push(socket.id);
//	console.log(io.sockets);
});
