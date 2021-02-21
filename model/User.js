let mongoose=require('mongoose');
let Schema=mongoose.Schema;
let newSchema=Schema({
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
    }, 
    gender:{
        type:String,
        required:true,
    }
}   
);

module.exports=User=mongoose.model('users',newSchema);