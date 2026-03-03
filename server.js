const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
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
    let {name,username,password,confirmPassword,email,accType}=req.body;
    if(password===confirmPassword){
        if(accType=='1'){
            res.redirect(`/admin/${username}`);
        }
        else if(accType=='2'){
            res.redirect(`/student/${username}`);
        }
        else if(accType=='3'){
            res.redirect(`/company/${username}`);
        }
    }else{
        res.render("register", { error: "Password Mismatched. Try Again." });
    }
})

//Register Redirect
app.get("/admin/:username",(req,res)=>{
    let username =req.params.username;
    if(username){
        res.render("adminLogged.ejs", { username });
    }
    else{
        res.send("Not Found")
    }
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
app.get("/company/:username",(req,res)=>{
    let username =req.params.username;
    if(username){
        res.render("companyLogged.ejs", { username });
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