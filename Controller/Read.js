import CandidateSchema from "../Model/CandidateModel.js"
import UserSchema from "../Model/UserModel.js"

export const getProfile = async (req, res) => {
    try {
        const userData = req.userPayload
        const userId = await userData.id
        const user = await UserSchema.findById(userId)
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const voteCount = async (req, res) => {
    try {
        const allCandidate = await CandidateSchema.find().sort({ voteCount: 'desc' })
        const voteRecord = allCandidate.map((candidate) => (
            {
                name: candidate.name,
                party: candidate.party,
                count: candidate.voteCount
            }
        ))
        res.status(200).json(voteRecord)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getCandidateDetails = async (req, res) => {
    try {
        const candidates = await CandidateSchema.find()
        if (!candidates) {
            return res.status(500).json({ error: error.message })
        }
        res.status(200).json(candidates)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

