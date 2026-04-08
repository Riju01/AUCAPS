const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:String,

    profile:{
        filename:{
            type:String,
            default:"profile"
        },
        url:{
            type:String,
            default:"/images/demoProfile.png"
        }
    },

    email:{
        type:String,
        unique:true
    },

    department:String,

    registration:{
        type:Number,
        // unique:true
    },

    cgpa:{
        type:Number,
        min:0,
        max:10
    },

    fatherName:String,
    motherName:String,

    password:{
        type:String,
        required:true
    },

    skill:[{
        tyep:String,
    }],

    appliedJob:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    }],
    address:String,
    country:String,
    accType:String
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;