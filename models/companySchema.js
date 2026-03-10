const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
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

    type:String,

    cgpa:{
        type:Number,
        min:0,
        max:10
    },


    password:{
        type:String,
        required:true
    },

    address:String,

    country:String,

    accType:String
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;