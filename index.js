const express=require('express');
var exphbs  = require('express-handlebars');

const app = express();
const port=5000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


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

app.get("/",(req,res)=>{
    res.render('home');
})

app.get("/about",(req,res)=>{
    res.render('about');
})