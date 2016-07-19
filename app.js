var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
// Start express application
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, '')));


//'============ Load Routes ==============';
require('./server/routes')(app);
//'============ Load Routes ==============';



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
