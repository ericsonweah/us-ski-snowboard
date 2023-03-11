if (require.main === module) {
	throw new Error('Do not run directly. Use server.js to start.');
}

const Koa = require('koa');
const koaStatic = require('koa-static');

var views = require('koa-views');

const render = views(__dirname + '/views', {
  map: {
    html: 'underscore'
  }
})

const app = new Koa();


// Register Routes
require('./routes')(app);

  


// Serve static files from public directory
app.use(koaStatic('./public'));

// const sqlite3 = require('sqlite3').verbose();


// // open the database
// let db = new sqlite3.Database('./data/sqlitedb', sqlite3.OPEN_READWRITE, (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Connected to the chinook database.');
// });

// db.serialize(() => {
//   db.each(`SELECT * FROM members`, (err, row) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log(row.id + "\t" + row.firstName);
//   });
// });

// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

module.exports = app;
