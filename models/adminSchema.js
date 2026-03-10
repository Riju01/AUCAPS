const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name:{
        type:String,
        required:true
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
    password:{
        type:String,
        required:true
    },

    accType:String
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;