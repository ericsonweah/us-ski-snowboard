const cluster = require('cluster');
const os = require('os');

const PORT = 3000;
const HOST = 'localhost';


process.on('uncaughtException', function(err) {
	console.log('UNHANDLED ERROR: ', err);
	process.exit(1);
});

process.on('unhandledRejection', function(err) {
	console.log('UNHANDLED PROMISE REJECTION: ', err);
	process.exit(1);
});




if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
} else {
  // const { app } = require('./app');
  const app = require('./app');
  // const { initDb } = require('./db');
  // const usersRouter = require('./users');

  // initDb();

  // app.use(usersRouter.routes());
  // app.use(usersRouter.allowedMethods());

  // app.listen(3000);

  // console.log(`Worker ${cluster.worker.id} running`);
  module.exports = app.listen(PORT, HOST, function(err) {
    if (err) {
      throw err;
    }
    // console.log(`Server listening on port: ${HOST}:${PORT}`);
    console.log(`Worker ${cluster.worker.id} running`);
  });
  
}