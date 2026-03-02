const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//Home Page
app.get("/",(req,res)=>{
    res.render("home.ejs");
})


//Register Page
app.get("/register",(req,res)=>{
    res.render("register.ejs")
})
app.post("/register",(req,res)=>{
    let data=req.body;
    let username=data.username;
    res.redirect(`/student/${username}`);
})

app.get("/student/:username",(req,res)=>{
    let username =req.params.username;
    if(username){
        res.render("studentLogged.ejs", { username });
    }
    else{
        res.send("Not Found")
    }
})


//Login Page
app.get("/login",(req,res)=>{
    res.render("login.ejs")
})



app.listen(port,()=>{
    console.log(`App is listening to the port ${port}`);
});