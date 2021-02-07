const express=require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express();
const port=5000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.listen(port,()=>{
    console.log(`App is running on ${port}`);
})


/*app.get("/", (req, res)=>{
    res.send("Home");
})

app.get("/about", (req, res)=>{
    res.send("About");
})
*/
const mongoDbUri=require('./config/keys').mongoDbUri;
mongoose.connect(mongoDbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
    console.log("connected!");
}).catch(err=>{
    console.log(err);
})




app.get("/",(req,res)=>{
    res.render('home');
})

app.get("/about",(req,res)=>{
    res.render('about');
})

app.get("/contact",(req,res)=>{
    res.render('contact');
})
app.get("/add-task",(req,res)=>{
    res.render('add_task');
})

app.post("/insert-task", (req,res)=>{
    //console.log("Insert");
    //console.log(req.body);
    var title=req.body.title;
    var description=req.body.description;
})