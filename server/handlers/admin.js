var Admin = function(){
      //==================================================================
    // Define a middleware function to be used for check user
    this.isAdmin = function(req, res, next) {
	    if(req.body.username === "admin" && req.body.password === "admin"){
	      next();
	    } else {
	      res.send(401).send("false");
	    }
    }

    //==================================================================
    // Define a middleware function to be used for every secured routes
   this.auth = function(req, res, next){
        if (req.body.name === globalPass.name){ 
           next();
        } else {
          res.send(401);
        };
     };   
};
module.exports = Admin;