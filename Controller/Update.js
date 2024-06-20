import UserSchema from "../Model/UserModel.js"

export const updateProfile=async(req,res)=>{
    try {
        const userData = req.userPayload
        const {currentPassword,newPassword}=req.body
        const userId = await userData.id
        const user = await UserSchema.findByIdAndUpdate(userId)
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}