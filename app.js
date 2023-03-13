if (require.main === module) {
	throw new Error('Do not run directly. Use server.js to start.');
}


const {join} = require('path')
const Koa = require('koa');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const redis = require('redis');
const {Server} = require('http');




const koaStatic = require('koa-static');


const app = new Koa();
app.use(bodyParser());
app.use(json());

render(app, {
  root: join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
     debug: false
});
 
// Register Routes
require('./routes')(app);

  
// Serve static files from public directory
app.use(koaStatic('./public'));

const http = Server(app.callback());
const io = require('socket.io')(http);

// const server = app.listen(3000);

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

module.exports = app



