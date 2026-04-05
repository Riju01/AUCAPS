const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const jobSchema = new Schema({
    title:String,
    description:String,
    reqCgpa:Number,
    deadline:Date,
    salary:Number,
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },
    applicants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application"
    }]
},{ timestamps: true });

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;