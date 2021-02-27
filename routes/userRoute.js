const express=require('express');
const router=express.Router();
const User=require('./../model/User');
const  bcrypt=require('bcryptjs');
const passport=require('passport');
router.get('/register',(req,res)=>{
    res.render('register');
})

router.post('/register',(req,res)=>{
    var errors=[];
    if(!req.body.name){
        errors.push({msg:"Name is required"});
    }
    if(!req.body.email){
        errors.push({msg:"Email is required"});
    }
    if(!req.body.password){
        errors.push({msg:"Password is required"});
    }
    if(!req.body.gender){
        errors.push({msg:"Gender is required"});
    }
    if(errors.length>0){
        res.render('register',{name:req.body.name,email:req.body.email,password:req.body.password,gender:req.body.gender,errors:errors});
    }else{
        User.findOne({email:req.body.email})
        .then(user=>{
            if(user){
                console.log("Email Id already Exist")
                res.redirect('/register');
            }else{
               // console.log("Inside else"); 
              /* let newUser=new User({
                   name:req.body.name,
                   email:req.body.email,
                   password:req.body.password,
                   gender:req.body.gender,
               })
               newUser.save()
               .then(response=>{
                   console.log("User Inserted Successfully!!!!");
                   res.redirect('/register');
               })
               .catch(err=>{
                   console.log(err);
               })
               */
              let newUser=new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                gender:req.body.gender,
            })
              bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    console.log(hash);
                    newUser.password=hash;
                    newUser.save()
                    .then(response=>{
                        console.log("User Inserted Successfully!!!!");
                        res.redirect('/register');
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                    // Store hash in your password DB.
                });
            });


            }
        })
        .catch(err=>{
            console.log(err);
        })
    }   
})

router.get('/login',(req,res)=>{
    res.render('login');
})


router.post('/login',(req,res,next)=>{
    //console.log("Login post");
    passport.authenticate('local',
    {
        failureRedirect:"/login",
        successRedirect:'/view-task',
    },
    )(req,res,next);
})

router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg',"You r logeout successfully");
    res.redirect('/login');
})

module.exports=router;