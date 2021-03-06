const LocalStrategy=require('passport-local').Strategy;
const User=require('./../model/User');
const bcrypt=require('bcryptjs');
module.exports=function(passport){
    passport.use(new LocalStrategy({usernameField:"email"}, (email, password, done)=>{
     User.findOne({'email':email})
     .then(user=>{
        if(user){
            console.log("Email id exist");
            bcrypt.compare(password, user.password, (err, res)=> {
                // res === true
                if(res){
                    console.log("Password Matched");
                    return done(null,user)
                }else{
                    console.log("Incorrect password!");
                    return done(null,false, {error_msg:"incorrect Password"});
                }
            });
        }else{
            return done(null,false, {error_msg:"Email Id does not exist!!"});
            console.log("Email Id does not exist!!!");
        }
     })
     .catch(err=>{
         console.log(err);
     })
    }
  ));
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
   
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}

/*var GoogleStrategy = require('passport-google-oauth20').Strategy;
module.exports=function(passport){
  passport.use(new GoogleStrategy({
    clientID: require('./keys').googleClientID,
    clientSecret: require('./keys').googleClientSecret,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
}
*/
         