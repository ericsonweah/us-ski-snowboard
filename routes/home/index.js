const Koa = require('koa');
const KoaRouter = require('koa-router');

const HomeController = require('../../app/controllers/http/HomeController');
const {index,show} = new HomeController


module.exports = (app = new Koa(), Router = new KoaRouter()) => {

    Router.get('/', index);
    Router.get('/members/:id',show);

    app.use(Router.routes())
       .use(Router.allowedMethods());
}



