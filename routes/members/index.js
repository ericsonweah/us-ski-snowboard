const Koa = require('koa');
const KoaRouter = require('koa-router');

const MembersController = require('../../app/controllers/http/MembersController');
const { index } = new MembersController

module.exports = (app = new Koa(), Router = new KoaRouter()) => {

    Router.get('/members', index);

    app.use(Router.routes())
        .use(Router.allowedMethods());
}
