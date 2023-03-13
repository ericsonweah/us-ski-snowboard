
'use strict';
/*
|--------------------------------------------------------------------------
| Addresses Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register address routes for your application. These
| routes are first mounted to the Router 
| and then to the  App 

|
*/
const Koa = require('koa');
const KoaRouter = require('koa-router');

const AddressesController = require('../../app/controllers/http/AddressesController');
const {index} = new AddressesController


module.exports = (app = new Koa(), Router = new KoaRouter()) => {

    Router.get('/addresses', index);


    // Mount router to the main app
    app.use(Router.routes())
        .use(Router.allowedMethods());
}
