var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var Engine = require('tingodb')();
var db = new Engine.Db('server/db', {});

// Fetch a collection to insert document into
var collection = db.collection("myDB");

if (cluster.isMaster) {

  for (var i = 0; i < numCPUs; i++) {
    var worker = cluster.fork();
   

    worker.on('message', function(message) {
     
         if (message.cmd == 'insert') {
              collection.insert({
                  "start": message.start, 
                  "process": message.process, 
                  "current": message.current,
                  "funct": message.funct,
                  "result": message.result
                }, {w:1}, function(err, result) {});
         } 

    });

}
  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('disconnect', function(worker) {
    console.error('disconnect!');
    cluster.fork();
  });


  cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');

    cluster.fork();
    worker.on('message', function(message) {
      console.log(message);
    });
  });

} else {
    require("./app.js");
}