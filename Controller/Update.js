import UserSchema from "../Model/UserModel.js"

export const updateProfile=async(req,res)=>{
    try {
        const userId = req.userPayload
        const {currentPassword,newPassword}=req.body
        const user = await UserSchema.findById(userId)

        if(!(await user.comparePassword(currentPassword))){
            return res.status(401).json({error:'Invalid Password'})
        }
        user.password=newPassword
        await user.save()
        res.status(200).json({message:'Password updated successfully'})
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}