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
 * @module MembersController
 * @kind class
 *
 * @extends Controller
 * @requires Controller
 *
 * @classdesc MembersController class
 */


const Model = require('../../models/Model');
class MembersController extends require("./Controller") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
      if (Object.keys(option).length > 0) {
        Object.keys(option).forEach((key) => { if (!this[key]) this[key] = option[key]; })
      }
    });

    // auto bind methods
    this.autobind(MembersController);
    // auto invoke methods
    this.autoinvoker(MembersController);
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
  * * @return does not return anything
  *
  */

  async index(ctx, next, Member = new Model({ table: 'members' })) {
    await ctx.render('members', { members: await Member.membersDetails() });

  }


  /**
   * @name store
   * @function
   *
   * @param {Object|Stream} ctx Koa contect Object
   * @param {Object|Function} next middleware
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
   * @description finds a member by id (':id') or username (':username') or email (':email') and returns it
   *
   * @return {Object}  user object
   *
   */
  async show(ctx, next) {}


  /**
   * @name edit
   * @function
   *
   * @param {Object|Stream} ctx Koa contect Object
   * @param {Object|Function} next middleware
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
  * @description delete a member by id (':id') or username (':username') or email (':email')
  *
  * @return {Object}  user object
  *
  */
 async destroy(ctx, next) { }

}
module.exports = MembersController;
