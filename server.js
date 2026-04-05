const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const methodOverride=require("method-override");
const mongoose=require("mongoose");
const mongo_url="mongodb://127.0.0.1:27017/AUCAPS";
const session = require("express-session");
const Student=require("./models/studentSchema.js");
const Company=require("./models/companySchema.js");
const Admin=require("./models/adminSchema.js");
const Job=require("./models/jobSchema.js");

main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main(params) {
    await mongoose.connect(mongo_url);
}


// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false
}));


// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//Home Page
app.get("/",(req,res)=>{
    res.render("home.ejs");
})


//Register Page
app.get("/register",(req,res)=>{
    res.render("landPage/register.ejs")
})

app.post("/register", async (req,res)=>{

    let newUser = req.body;

    let student = await Student.findOne({ email:newUser.email });
    let company = await Company.findOne({ email:newUser.email });
    let admin = await Admin.findOne({ email:newUser.email });

    if(student||company||admin){
        return res.send("Email already registered");
    }

    let userType=newUser.accType;
    let dbUser;

    if(userType=="student"){
        dbUser = new Student(newUser);
    }
    else if(userType=="company"){
        dbUser = new Company(newUser);
    }
    else if(userType=="admin"){
        dbUser = new Admin(newUser);
    }
    await dbUser.save();

    res.redirect(`/${userType}/${dbUser._id}`);
});

//Login Page
app.get("/login",(req,res)=>{
    res.render("landPage/login.ejs")
})
app.post("/login", async (req,res)=>{
    let logUser = req.body;
    let dbUser;

    if(logUser.accType=="student"){
        dbUser = await Student.findOne({ email: logUser.email });
    }
    else if(logUser.accType=="admin"){
        dbUser = await Admin.findOne({ email: logUser.email });
    }
    else if(logUser.accType=="company"){
        dbUser = await Company.findOne({ email: logUser.email });
    }


    if(!dbUser){
        return res.send("User not found");
    }
    if(dbUser.password === logUser.password && dbUser.accType === logUser.accType){
        let accType = dbUser.accType;
        let id = dbUser._id;
        if(accType == "admin"){
            res.redirect(`/admin/${id}`);
        }
        else if(accType == "student"){
            res.redirect(`/student/${id}`);
        }
        else if(accType == "company"){
            res.redirect(`/company/${id}`);
        }
    }
    else{
        res.send("Invalid login credentials");
    }
});

//Redirecting to Dashboard
app.get("/:accType/:id", async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.render("error/pageNotFound.ejs");
    }
    let info = req.params;
    let dbUser;
    if(info.accType === "student"){
        dbUser = await Student.findById(info.id);
        if(!dbUser){
            return res.render("error/pageNotFound.ejs");
        }
        res.render("dashboard/studentDash.ejs",{dbUser});
    }
    else if(info.accType === "admin"){
        dbUser = await Admin.findById(info.id);
        if(!dbUser){
            return res.send("error/pageNotFound.ejs");
        }
        res.render("dashboard/adminDash.ejs",{dbUser});
    }
    else if(info.accType === "company"){
        dbUser = await Company.findById(info.id);
        if(!dbUser){
            return res.send("error/pageNotFound.ejs");
        }
        res.render("dashboard/companyDash.ejs",{dbUser});
    }
    else{
        res.send("error/pageNotFound.ejs");
    }
});

//Redirecting to Services 
app.get("/services",(req,res)=>{
    res.render("landPage/services.ejs");
})
//Redirecting to Details
app.get("/details",(req,res)=>{
    res.render("landPage/details.ejs");
})

//Edit Student Profile
app.get("/student/:id/edit",async(req,res)=>{
    const student = await Student.findById(req.params.id);
    res.render("dashEdit/editStudent.ejs",{dbUser:student});
})
app.post("/student/:id/edit", async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,              
            { new: true }   
        );
        res.redirect(`/student/${req.params.id}`);
    } catch (err) {
        console.log(err);
        res.send("Error updating student");
    }
});



//Edit Company Profile
app.get("/company/:id/edit",async(req,res)=>{
    const company = await Company.findById(req.params.id);
    res.render("dashEdit/editCompany.ejs",{dbUser:company});
})
app.post("/company/:id/edit", async (req, res) => {
    try {
        const updatedCompany = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,              
            { new: true }   
        );
        res.redirect(`/company/${req.params.id}`);
    } catch (err) {
        console.log(err);
        res.send("Error updating company");
    }
});


//Job Creation
app.get("/company/:id/data/:type",async(req,res)=>{
    const type=req.params.type;
    const company = await Company.findById(req.params.id);
    if(type === "jobs"){
        return res.render("companyNav/createJob.ejs",{dbUser:company});
    }
    if(type === "applications"){
        return res.render("companyNav/application.ejs",{dbUser:company})
    }
    if(type === "postedJobs"){
        return res.render("companyNav/postedJob.ejs",{dbUser:company})
    }
    if(type === "notifications"){
        return res.render("companyNav/notification.ejs",{dbUser:company})
    }
    if(type === "notices"){
        return res.render("companyNav/notice.ejs",{dbUser:company})
    }
})



app.listen(port,()=>{
    console.log(`App is listening to the port ${port}`);
});