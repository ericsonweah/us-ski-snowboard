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
const {firstHundred,index,show,loadMore} = new HomeController


const HomeAPIController = require('../../app/controllers/http/HomeAPIController');
const homeAPIController = new HomeAPIController


module.exports = (app = new Koa(), Router = new KoaRouter()) => {

    Router.get('/', firstHundred);
    Router.get('/all', index);
    Router.get('/members/:id',show);
    Router.post('/load',loadMore)

    Router.get('/api/members', homeAPIController.index);
    Router.get('/api/members/:id',homeAPIController.show);
    Router.post('/api/load',homeAPIController.loadMore)


    // Mount Router to the main app
    app.use(Router.routes())
       .use(Router.allowedMethods());
}



