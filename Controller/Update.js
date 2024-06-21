import { checkAdmin } from "../CheckAdmin.js"
import CandidateSchema from "../Model/CandidateModel.js"
import UserSchema from "../Model/UserModel.js"

export const updateProfile=async(req,res)=>{
    try {
        const userId = req.userPayload.id
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

export const updateCandidate=async (req,res)=>{
    const id = req.userPayload.id
    const candidateId=req.params.candidateId
   
    try {
        if (!await checkAdmin(id)) {
            return res.status(404).json({ message: 'user is not an admin' })
        }
        const updatedData=req.body
        const response= await CandidateSchema.findByIdAndUpdate(candidateId,updatedData,{
            new:true,
            runValidators:true   //mongoose validation
        })
        if(!response){
            res.status(404).json({ error: 'candidate not found' })
        }
        res.json({response})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}