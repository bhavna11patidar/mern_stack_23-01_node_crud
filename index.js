const express=require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express();
var methodOverride = require('method-override');
app.use(methodOverride('_method'));


let passport=require('passport');
let session = require('express-session');
let flash=require('express-flash');

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.user=req.user|| null;
    next();
})

require('./config/passport')(passport);
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


const taskRoute=require('./routes/taskRoute');
const userRoute=require('./routes/userRoute');
app.use('/',taskRoute,userRoute);