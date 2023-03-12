if (require.main === module) {
	throw new Error('Do not run directly. Use server.js to start.');
}

const {join} = require('path')
const Koa = require('koa');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');


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

module.exports = app;
