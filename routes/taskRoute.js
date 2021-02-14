const express=require('express');
const router=express.Router();
const Tasks=require('./../model/TaskModel');
router.get("/add-task",(req,res)=>{
    res.render('add_task');
})

router.post("/insert-task", (req,res)=>{
    //console.log("Insert");
    //console.log(req.body);
    //var title=req.body.title;
    //var description=req.body.description;
    let errors=[];
    if(req.body.title==""){
      errors.push({msg:"Title can't be blank!!"});  
    }
    if(req.body.description==""){
        errors.push({msg:"Description can't be blank!!"});  
    }

    if(errors.length!=0){
        res.render('add_task',{
            title:req.body.title,
            description:req.body.description,
            errors:errors,
        })
    }
    else{
    let newtask=new Tasks({
        title:req.body.title,
        description:req.body.description,
        date:Date.now(),
    })
    newtask.save()
    .then(data=>{
        console.log("Data Instered Successfully!!!!");
        res.render('add_task');
    }).catch(err=>{
        console.log(err);
    })
}
})

router.get('/view-task', (req,res)=>{
    Tasks.find({}).sort({date:'DESC'}).lean()
    .then((data)=>{
        //console.log(data);
        res.render('view_task', {tasks:data});
    })
    .catch(err=>{
        console.log(err);
    })
    
})

router.get('/delete-task/:id',(req,res)=>{
    //console.log("delete");
    console.log(req.params.id);
    console.log(req.params.name);
    Tasks.deleteOne({_id:req.params.id})
    .then(data=>{
        console.log("Data Deleted Successfully!!!!");
        res.redirect('/view-task');
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports=router;