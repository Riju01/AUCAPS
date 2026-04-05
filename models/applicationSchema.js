const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const applicationSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    },
    status: {
        type: String,
        enum: ["applied", "shortlisted", "rejected"],
        default: "applied"
    }
},{ timestamps: true });

const Application = mongoose.model("Apllication",applicationSchema);
module.exports = Application;