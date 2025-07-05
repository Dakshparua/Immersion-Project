import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    applicant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status:{
        type: String,
        enum: ['applied', 'interviewed', 'offered', 'rejected'],
        default: 'pending',
    }
    
}, { timestamps: true });
export const Application = mongoose.model('Application', userSchema);