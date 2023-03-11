const KoaRouter = require('koa-router');


const indexRouter = new KoaRouter();

indexRouter.get('/', async function(ctx) {
	ctx.body = 'Hello World';
});


module.exports = indexRouter;
