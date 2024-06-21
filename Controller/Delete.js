import { checkAdmin } from "../CheckAdmin.js"
import CandidateSchema from "../Model/CandidateModel.js"

export const deleteCandidate = async (req, res) => {
    const id = req.userPayload.id
    const candidateId = req.params.candidateId

    try {
        if (!await checkAdmin(id)) {
            return res.status(404).json({ message: 'user is not an admin' })
        }
        const deleteCandidate = await CandidateSchema.findByIdAndDelete(candidateId)
        if (!deleteCandidate) {
            return res.status(404).json({ message: 'Candidate not found' })
        }
        res.status(200).json({ message: 'deleted succesfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}