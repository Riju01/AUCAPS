const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name:{
        type:String,
        required:true
    },

    description:{
        type:String,
        default:"Welcome to our company"
    },

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

    type:{
        type:String,
        default:"N/A"
    },

    password:{
        type:String,
        required:true
    },

    address:{
        type:String,
        default:"N/A"
    },

    country:String,

    accType:String,
    job:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job"
        }],
    isVerified: {
        type: Boolean,
        default: false
    }
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;