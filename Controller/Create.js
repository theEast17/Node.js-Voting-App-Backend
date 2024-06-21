import { checkAdmin } from "../CheckAdmin.js"
import { GenerateToken } from "../Middleware/JwtAuth.js"
import CandidateSchema from "../Model/CandidateModel.js"
import UserSchema from "../Model/UserModel.js"



export const createUser = async (req, res) => {
    const data = req.body
    try {
        const adminUser = await UserSchema.findOne({ role: 'admin' });
        if (data.role === 'admin' && adminUser) {
            return res.status(400).json({ error: 'Admin user already exists' });
        }
        const newUser = await UserSchema(data)
        const response = await newUser.save()
        const payload = {
            id: newUser.id
        }
        const token = GenerateToken(payload)
        res.status(201).json({ token, response })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const createCandidate = async (req, res) => {
    const data = req.body
    const id = req.userPayload.id

    try {
        if (!await checkAdmin(id)) {
            return res.status(404).json({ message: 'user is not an admin' })
        }
        const newCandidate = new CandidateSchema(data)
        const response = await newCandidate.save()
        res.status(201).json({ response })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const loginUser = async (req, res) => {
    const { aadharNumber, password } = req.body

    try {
        if (!aadharNumber || !password) {
            return res.status(401).json({ message: 'Please Enter aadharnumber or password' })
        }
        const user = await UserSchema.findOne({ aadharNumber })
        if (!user) {
            return res.status(402).json({ message: 'User not exist' })
        }
        if (!(await user.comparePassword(password))) {
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

export const voteToCandidate = async (req, res) => {
    const userId = req.userPayload.id
    const candidateId = req.params.candidateId
    try {
        // const user=await UserSchema.findById(userId)
        if (await checkAdmin(userId)) {
            return res.status(401).json({ message: 'Admin can not vote' })
        }

        const candidate = await CandidateSchema.findById(candidateId)
        if (!candidate) {
            return res.status(404).json({ message: 'No candidate Present by this Id' })
        }

        const user = await UserSchema.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'No user Present by this Id' })
        }
        if (user.isVoted) {
            return res.status(400).json({ message: 'You have already voted!' })
        }

        candidate.votes.push({ user: userId })
        candidate.voteCount++
        await candidate.save()

        user.isVoted = true
        await user.save()

        res.status(200).json({ message: 'vote recorded successfully!' })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

