// import { Application } from "../models/application.model.js";
// import { Job } from "../models/job.model.js";

// //Apply Job
// export const applyJob = async (req, res) => {
//     try {
//         const userId = req.id;
//         const jobId = req.params.id;
//         if (!jobId) {
//             return res.status(400).json({
//                 message: "Job id is required.",
//                 success: false
//             })
//         };
//         // check if the user has already applied for the job
//         const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

//         if (existingApplication) {
//             return res.status(400).json({
//                 message: "You have already applied for this jobs",
//                 success: false
//             });
//         }

//         // check if the jobs exists
//         const job = await Job.findById(jobId);
//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found",
//                 success: false
//             })
//         }
//         // create a new application
//         const newApplication = await Application.create({
//             job:jobId,
//             applicant:userId,
//         });

//         job.applications.push(newApplication._id);
//         await job.save();
//         return res.status(201).json({
//             message:"Job applied successfully.",
//             success:true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// };
// //Get Applied Jobs 
// export const getAppliedJobs = async (req,res) => {
//     try {
//         const userId = req.id;
//         const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
//             path:'job',
//             options:{sort:{createdAt:-1}},
//             populate:{
//                 path:'company',
//                 options:{sort:{createdAt:-1}},
//             }
//         });
//         if(!application){
//             return res.status(404).json({
//                 message:"No Applications",
//                 success:false
//             })
//         };
//         return res.status(200).json({
//             application,
//             success:true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// // admin dekhega kitna user ne apply kiya hai
// export const getApplicants = async (req,res) => {
//     try {
//         const jobId = req.params.id;
//         const job = await Job.findById(jobId).populate({
//             path:'applications',
//             options:{sort:{createdAt:-1}},
//             populate:{
//                 path:'applicant'
//             }
//         });
//         if(!job){
//             return res.status(404).json({
//                 message:'Job not found.',
//                 success:false
//             })
//         };
//         return res.status(200).json({
//             job, 
//             succees:true
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }
// //update status
// export const updateStatus = async (req,res) => {
//     try {
//         const {status} = req.body;
//         const applicationId = req.params.id;
//         if(!status){
//             return res.status(400).json({
//                 message:'status is required',
//                 success:false
//             })
//         };

//         // find the application by applicantion id
//         const application = await Application.findOne({_id:applicationId});
//         if(!application){
//             return res.status(404).json({
//                 message:"Application not found.",
//                 success:false
//             })
//         };

//         // update the status
//         application.status = status.toLowerCase();
//         await application.save();

//         return res.status(200).json({
//             message:"Status updated successfully.",
//             success:true
//         });

//     } catch (error) {
//         console.log(error);
//     }
// }

import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import sendApplicationEmail from "../utils/emailService.js";
import { User } from "../models/user.model.js"; // Ensure correct path


// Apply Job
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required.",
                success: false
            });
        }

        // Fetch the user email from the database
        const user = await User.findById(userId);
        if (!user || !user.email) {
            return res.status(400).json({
                message: "User email not found.",
                success: false
            });
        }

        const userEmail = user.email; // Extract email

        // Check if the user has already applied
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job.",
                success: false
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        job.applications.push(newApplication._id);
        await job.save();

        // Send confirmation email
        const subject = `Application Confirmation - ${job.title}`;
        const text = `Dear ${user.name},\n\nYou have successfully applied for "${job.title}".\n\nThank you!\nJob Portal Team`;

        await sendApplicationEmail(userEmail, subject, text);

        return res.status(201).json({
            message: "Job applied successfully. Confirmation email sent.",
            success: true
        });

    } catch (error) {
        console.error("Error in applyJob:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

// Get Applied Jobs
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                populate: {
                    path: 'company',
                }
            });

        if (!applications.length) {
            return res.status(404).json({
                message: "No applications found.",
                success: false
            });
        }

        return res.status(200).json({
            applications,
            success: true
        });

    } catch (error) {
        console.error("Error in getAppliedJobs:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

// Get Applicants for a Job (For Admin)
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            populate: {
                path: 'applicant'
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });

    } catch (error) {
        console.error("Error in getApplicants:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

// Update Application Status
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required.",
                success: false
            });
        }

        // Find the application by ID
        const application = await Application.findById(applicationId).populate('applicant job');

        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            });
        }

        // Update the status
        application.status = status.toLowerCase();
        await application.save();

        // Send status update email
        const userEmail = application.applicant.email; // Get applicant email
        const subject = `Application Status Update - ${application.job.title}`;
        const text = `Dear Applicant,\n\nYour application status for "${application.job.title}" has been updated to: ${status}.\n\nThank you,\nJob Portal Team`;
        await sendApplicationEmail(userEmail, subject, text);

        return res.status(200).json({
            message: "Status updated successfully. Email notification sent.",
            success: true
        });

    } catch (error) {
        console.error("Error in updateStatus:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};