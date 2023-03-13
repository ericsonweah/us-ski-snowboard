"use strict";

/**
 * @author Ericson S. Weah  
 *    emaiil: ericson.weah@ericsonweah.dev
 *    github: https://github.com/ericsonweah
 *    phone: +1.385.204.5167
 *    Dev Profile: https://www.ericsonsweah.dev 
 *    Dev Website: https://www.ericsonweah.dev
 *    Other Website: https://www.ericsonsweah.com
 *
 * @module HomeController
 * @kind class
 *
 * @extends Controller
 * @requires Controller
 *
 * @classdesc HomeController class
 */

const Model = require('../../models/Model');
const RedisCache = require('../../../src/modules/redis-cache');
const pagination = require('../../../src/modules/pagination');
const {createClient} = require('redis')

const redisCacheMember = require('../../../src/modules/redisCacheMember');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.cwd() +  '/data/sqlitedb');
class HomeController extends require("./Controller") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
      if (Object.keys(option).length > 0) {
        Object.keys(option).forEach((key) => { if (!this[key]) this[key] = option[key]; })
      }
    });

    // auto bind methods
    this.autobind(HomeController);
    // auto invoke methods
    this.autoinvoker(HomeController);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }


  /**
 * @name index
 * @function
 *
 * @param {Object|Stream} ctx Koa contect Object
 * @param {Object|Function} next middleware
 * @param {Object|Function|Class|Transform} Member instance of Model Object
 *
 * @description renders index view with the corresonding data
 *
 * @return {Object|Array|List}  users collections/array/object
 *
 */

  async index(ctx, next, Member = new Model({ table: 'members' })) {
    // await redisCacheMember(ctx)
    // ctx.body = await Member.firstCountMembersDetails(100);
    // await Member.dropTable();
    await ctx.render('index', { members: await Member.firstCountMembersDetails(100), count: await Member.count() });
  }



  /**
   * @name store
   * @function
   *
   * @param {Object|Stream} ctx Koa contect Object
   * @param {Object|Function} next middleware
   * @param {Object|Function|Class|Transform} Member instance of Model Object
   * @description stores a member or multiple users to  dataController
   *
   * @return {Object|Array|List}  users collections/array/object
   *
   */
  async store(ctx, next) { }

  /**
   * @name show
   * @function
   *
   * @param {Object|Stream} ctx Koa contect Object
   * @param {Object|Function} next middleware
   * @param {Object|Function|Class|Transform} Member instance of Model Object
   * @description finds a member by id (':id') or username (':username') or email (':email') and returns it
   *
   * @return {Object}  user object
   *
   */
  async show(ctx, next, Member = new Model({ table: 'members' })) { 
    // ctx.body = await Member.findById(ctx.params.id)
    await ctx.render('member', { member: await Member.findById(ctx.params.id), count: await Member.count() });
  }

  /**
   * @name edit
   * @function
   *
   * @param {Object|Stream} ctx Koa contect Object
   * @param {Object|Function} next middleware
   * @param {Object|Function|Class|Transform} Member instance of Model Object
   * @description finds a member by id (':id') or username (':username') or email (':email') and returns it to a view (if any) for editing/updating
   *
   * @return {Object}  user object
   *
   */
  async edit(ctx, next) {
     
   }

  /**
   * @name update
   * @function
   *
  * @param {Object|Stream} ctx Koa contect Object
  * @param {Object|Function} next middleware
  * @param {Object|Function|Class|Transform} Member instance of Model Object
   * @description updates a member by id (':id') or username (':username') or email (':email')
   *
   * @return {Object}  user object
   *
   */
  async update(ctx, next) { }

  /**
   * @name destroy
   * @function
   *
   * @param {Object|Stream} ctx Koa contect Object
   * @param {Object|Function} next middleware
   * @param {Object|Function|Class|Transform} Member instance of Model Object
   * @description delete a member by id (':id') or username (':username') or email (':email')
   *
   * @return {Object}  user object
   *
   */
  async destroy(ctx, next) { }

}
module.exports = HomeController;
