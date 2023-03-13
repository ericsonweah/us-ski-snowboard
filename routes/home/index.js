const Koa = require('koa');
const KoaRouter = require('koa-router');

const HomeController = require('../../app/controllers/http/HomeController');
const {firstHundred,index,show, load200, loadMore} = new HomeController


module.exports = (app = new Koa(), Router = new KoaRouter()) => {

    Router.get('/', firstHundred);
    Router.get('/all', index);
    Router.get('/200', load200);
    Router.get('/members/:id',show);
    Router.post('/load',loadMore)


    app.use(Router.routes())
       .use(Router.allowedMethods());
}



