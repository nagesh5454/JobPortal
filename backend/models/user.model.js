// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     fullname: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     phoneNumber: {
//         type: Number,
//         required: true
//     },
//     password:{
//         type:String,
//         required:true,
//     },
//     role:{
//         type:String,
//         enum:['student','recruiter'],
//         required:true
//     },
//     profile:{
//         bio:{type:String},
//         skills:[{type:String}],
//         resume:{type:String}, // URL to resume file
//         resumeOriginalName:{type:String},
//         company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}, 
//         profilePhoto:{
//             type:String,
//             default:""
//         }
//     },
// },{timestamps:true});
// export const User = mongoose.model('User', userSchema);

import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "recruiter"], required: true },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String }, // URL to resume file
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
        profilePhoto: { type: String, default: "" }
    },
    resetToken: { type: String },         // 🔹 Token for password reset
    resetTokenExpiry: { type: Date }      // 🔹 Expiry time for token
}, { timestamps: true });

// 🔹 Generate Reset Token Method
userSchema.methods.generateResetToken = function () {
    this.resetToken = crypto.randomBytes(32).toString("hex");
    this.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
};

export const User = mongoose.model("User", userSchema);
