module.exports = function(app){
    var AdminHandelr = require('../handlers/admin');
    var adminHandelr = new AdminHandelr();
     //Pass for current user
     var jwt = require('jwt-simple');
     var secret = 'xxxx';
     globalPass = {};

    //db
    var Engine = require('tingodb')();

    // routes
    app.get('/', function(req, res){
      res.render('index', { title: 'Express' });
    });

    app.get('/users', function(req, res){
      res.send([{name: process.pid}]);

    });

   app.get('/user', function(req,res){
        var db = new Engine.Db('server/db', {});
        var collection = db.collection("myDB");

        collection.find({}).toArray(function(error, data){
            res.send(data);
        });       
    });
    
    app.put('/user',  function(req,res){
        var start = new Date();
        var startTime = start.getTime();
        var funct = req.body.funct;
        var finish;
        var finishTime;

        try {
           // var stringFunction = eval(funct);
            var stringFunction = new Function(funct);
            var result = stringFunction();
            result = (result == undefined) ? 'Function without "Return"' : result;
        } catch (e) {
            throw new Error("The transmitted data is incorrect");
            return res.status(500).send("something bad happened"); 
        }
        
        finish = new Date();
        finishTime = finish.getTime();

        process.send({ cmd: 'insert',
                  "start": start, 
                  "process": process.pid, 
                  "current": ((finishTime - startTime) / 1000) + " sec.",
                  "funct": funct,
                  "result": String(result)    
        });

       res.send("msg"); 
    });


//==================================================================

//==================================================================
// route to test if the user is logged in or not
  app.post('/loggedin', adminHandelr.auth, function(req, res) {
    res.send("1");
  });

  // route to log in
  app.post('/login', adminHandelr.isAdmin, function(req, res) {
    globalPass.name = jwt.encode({name: req.body.name}, secret);
    res.send(globalPass.name);
  });

  // route to log out
  app.post('/logout', function(req, res){
    res.send(200);
  });
//==================================================================

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

};