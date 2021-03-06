const express=require('express');
const router=express.Router();
const Tasks=require('./../model/TaskModel');
const isAuthenticateduser=require('./../helpers/authHelper').isAuthenticateduser;
router.get("/add-task",isAuthenticateduser,(req,res)=>{
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

router.get('/view-task', isAuthenticateduser, (req,res)=>{
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


router.get('/edit-task/:id', (req,res)=>{
    Tasks.findOne({_id:req.params.id})
    .then(data=>{
        //console.log(data);
        res.render('edit_task',data);
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post('/update-task', (req,res)=>{
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
        Tasks.findOne({_id:req.body._id})
        .then(data=>{
            data.title=req.body.title;
            data.description=req.body.description;
            data.save()
            .then(response=>{
                console.log("Data Updated Successfully!!!");
                res.redirect('/view-task');
            })
        })
     }
})


router.put("/update-task/:id",(req,res)=>{
   // console.log("Update with Put");
   console.log(req.params.id);
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
       Tasks.findOne({_id:req.params.id})
       .then(data=>{
           data.title=req.body.title;
           data.description=req.body.description;
           data.save()
           .then(response=>{
               console.log("Data Updated Successfully!!!");
               res.redirect('/view-task');
           })
       })
    }
})
module.exports=router;