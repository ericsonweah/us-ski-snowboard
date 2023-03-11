const Koa = require('koa');
const KoaRouter = require('koa-router');
const AddressesController = require('../../app/controllers/http/AddressesController');
const {index} = new AddressesController


module.exports = (app = new Koa(), Router = new KoaRouter()) => {

    Router.get('/addresses', index);

    app.use(Router.routes())
        .use(Router.allowedMethods());
}
