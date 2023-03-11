
const homeRouter = require('./home')
const memberRouter = require('./members')
const addressRouter = require('./addresses')


// const indexRouter = new KoaRouter();

// indexRouter.get('/', async function(ctx) {
// 	ctx.body = 'Hello World';
// });
// indexRouter.get('/me', async function(ctx, next) {
// 	// console.log(process.cwd())
// 	ctx.type = 'html';
//     ctx.body = createReadStream(process.cwd() + '/public/index.html');
// 	// const rows = await new Promise((resolve, reject) => {
// 	// 	db.all('SELECT * FROM addresses', (err, rows) => {
// 	// 	  if (err) reject(err);
// 	// 	  resolve(rows);
// 	// 	});
// 	//   });
	
// 	//   // Set the data as a property on the Koa context object
// 	//   ctx.dbData = rows;
	
// 	//   // Call the next middleware function
// 	//   await next();
// });



// module.exports = app => {
// 	app.use(homeRouter(app).routes())
//        .use(homeRouter(app).allowedMethods());

// 	// app.use(memberRouter(app).routes())
//     //    .use(memberRouter(app).allowedMethods());

// 	// app.use(addressRouter(app).routes())
//     //    .use(addressRouter(app).allowedMethods());
// }

module.exports = app => {
	homeRouter(app);
	memberRouter(app);
	addressRouter(app);
}