const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/sqlitedb');

// GET all records
router.get('/api/records', async (ctx, next) => {
    const records = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM members', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    ctx.body = records;
  });
  
  // GET a record by ID
  router.get('/api/records/:id', async (ctx, next) => {
    const id = ctx.params.id;
    const record = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM mytable WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    if (record) {
      ctx.body = record;
    } else {
      ctx.status = 404;
    }
  });
  
  // POST a new record
  router.post('/api/records', async (ctx, next) => {
    const name = ctx.request.body.name;
    if (name) {
      await new Promise((resolve, reject) => {
        db.run('INSERT INTO mytable (name) VALUES (?)', [name], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      ctx.status = 201;
    } else {
      ctx.status = 400;
    }
  });
  
  // PUT an existing record
  router.put('/api/records/:id', async (ctx, next) => {
    const id = ctx.params.id;
    const name = ctx.request.body.name;
    if (name) {
      await new Promise((resolve, reject) => {
        db.run('UPDATE mytable SET name = ? WHERE id = ?', [name, id], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      ctx.status = 204;
    } else {
      ctx.status = 400;
    }
  });
  
  // DELETE an existing record
  router.delete('/api/records/:id', async (ctx, next) => {
    const id = ctx.params.id;
    await new Promise((resolve, reject) => {
      db.run('DELETE FROM mytable WHERE id = ?', [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    ctx.status = 204;
  });


app.use(koaStatic('./public'));
module.exports = app;
