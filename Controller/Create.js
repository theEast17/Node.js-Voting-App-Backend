import { GenerateToken } from "../Middleware/JwtAuth.js"
import UserSchema from "../Model/UserModel.js"


export const createUser = async (req, res) => {
    const data = req.body

    try {
        const newUser = await UserSchema.create({
            name: data.name,
            aadharNumber: data.aadharNumber,
            password: data.password,
            age: data.age,
            mobile: data.mobile
        })
        const payload = {
            id: newUser.id
        }
        const token = GenerateToken(payload)
        res.status(201).json({ id: newUser._id, token })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


export const loginUser = async (req, res) => {
    const {aadharNumber,password} = req.body

    try {
        if (!aadharNumber || !password) {
            return res.status(401).json({ message: 'Please Enter aadharnumber or password' })
        }
        const user=await UserSchema.findOne({aadharNumber})
        if(!user){
            return res.status(402).json({ message: 'User not exist' })
        }
        if(!(await user.comparePassword(password))){
            return res.status(400).json({ message: 'Password is Incorrect' })
        }

        const userPayload = {
            id: user.id,
        }
        const token = GenerateToken(userPayload)
        res.status(201).json({ id: user._id, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

