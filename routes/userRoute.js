const express=require('express');
const router=express.Router();
const User=require('./../model/User');
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
    if(errors.length>0){
        res.render('register',{name:req.body.name,email:req.body.email,password:req.body.password,errors:errors});
    }else{
        User.findOne({email:req.body.email})
        .then(user=>{
            if(user){
                console.log("Email Id already Exist")
               req.flash('error_msg',"Email ID already Exist!");
                res.redirect('/register');
            }else{
                var newUser=new User({
                  name:req.body.name, 
                  email:req.body.email,
                  password:req.body.password,
                });
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        newUser.password=hash;
                        newUser.save()
                        .then(()=>{
                            console.log("registered successfully!");
                            req.flash('success_msg',"User registered Successfully!");
                            res.redirect('/register');
                        })
                        .catch(err=>{
                            console.log(err);
                        });

                    });
                });
               
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }   
})

router.get('/login',(req,res,next)=>{
    res.render('login');
    next();
})


router.post('/login',(req,res,next)=>{
   
})


module.exports=router;