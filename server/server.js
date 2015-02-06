import koa from 'koa';
import router from 'koa-router';
import http from 'http';
import socket from 'socket.io'

let app, server, io;

app = koa();

app.use(router(app));

server = http.Server(app.callback());
io = socket(server);

app.get('/', function *(next) {
  this.body = 'kòuk';
});

io.on('connection', function(socket) {
  socket.on('subscribe', function(res){
    app.get('/' + res, function *(next){
      console.log('envoi l event');
      socket.emit('data', 'c bon bb');
      this.body = 'ok';
    })
  })
});

server.listen(1337);
console.log('running');
