let mongoose=require('mongoose');
let Schema=mongoose.Schema;
let newSchema=Schema({
    googleId:{
        type:String,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
}   
);

module.exports=User=mongoose.model('users',newSchema);