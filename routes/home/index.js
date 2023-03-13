const Koa = require('koa');
const KoaRouter = require('koa-router');
const HomeController = require('home-controller');
const {index} = new HomeController

module.exports = (app = new Koa(), Router = new KoaRouter()) => {

    Router.get('/', index);

    app.use(Router.routes())
       .use(Router.allowedMethods());
}



