const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },

    name: String,
    cgpa: Number,
    resume: String,
    coverLetter: String,

    status: {
        type: String,
        enum: ["applied", "shortlisted", "rejected"],
        default: "applied"
    }
}, { timestamps: true });


const Application = mongoose.model("Application", applicationSchema, "applications");
module.exports = Application;