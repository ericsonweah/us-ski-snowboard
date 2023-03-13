'use strict';
/*
|--------------------------------------------------------------------------
| Members Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register member routes for your application. These
| routes are first mounted to the Router 
| and then to the  App 

|
*/
const Koa = require('koa');
const KoaRouter = require('koa-router');

const MembersController = require('../../app/controllers/http/MembersController');
const { index } = new MembersController


module.exports = (app = new Koa(), Router = new KoaRouter()) => {


    Router.get('/members', index);


    // Mount Router to the main app
    app.use(Router.routes())
        .use(Router.allowedMethods());
}
