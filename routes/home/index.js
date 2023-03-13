'use strict';
/*
|--------------------------------------------------------------------------
| Home Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register home routes for your application. These
| routes are first mounted to the Router 
| and then to the  App 

|
*/

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


    // Mount Router to the main app
    app.use(Router.routes())
       .use(Router.allowedMethods());
}



