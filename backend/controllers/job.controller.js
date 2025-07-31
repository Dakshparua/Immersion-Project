import { Job } from "../models/job.model.js";
export const postJob = async (req, res) => {
    try{
        const{title, description, requirements,salary, location, jobtype,experirnce, position,companyId } = req.body;
        const userId = req.id;
        if(!title || !description || !requirements || !salary || !location || !jobtype || !experirnce || !position || !companyId){
            return res.status(400).json({
                message: "Please fill all the fields",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(','),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experirnce,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "Job posted successfully",
            success: true,
            job
        });

    }catch (error) {
        console.log(error);
    }
} 
export const getJobs = async (req, res) => { 
    try{
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                
            ]
        };
        const jobs = await Job.find(query);
        if(!jobs){
            return res.status(404).json({
                message: "No jobs found",
                success: false,
            })
        };
        return res.status(200).json({
            message: "Jobs found",
            success: true,
            jobs
        });
    } catch (error) {
        console.log(error);
    }
}
export const getJobById = async (req, res) => {
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate('company', 'name');
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false,
            })
        }
        return res.status(200).json({
            message: "Job found",
            success: true,
            job
        });
    } catch (error) {
        console.log(error);
    }
}
export const getAdminJobs = async (req, res) => {
    try{
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate('company', 'name');
        if(!jobs){
            return res.status(404).json({
                message: "No jobs found",
                success: false,
            })
        }
        return res.status(200).json({
            message: "Jobs found",
            success: true,
            jobs
        });
    } catch (error) {
        console.log(error);
    }
}