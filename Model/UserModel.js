import mongoose, { Schema } from "mongoose";

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    aadharNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter',
    },
    isVoted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


const UserSchema = mongoose.model('User', User)
export default UserSchema