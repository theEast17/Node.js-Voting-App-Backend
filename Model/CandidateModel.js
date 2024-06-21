import mongoose from "mongoose";

const Candidate = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    party: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    votes: [
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'User'
            },
            votedAt:{
                type:Date,
                default:Date.now()
            }
        },
    ],
    voteCount:{
        type:Number,
        default:0
    }
    
}, {
    timestamps: true
})


const CandidateSchema = mongoose.model('candidate', Candidate)
export default CandidateSchema