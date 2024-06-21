import express from 'express'
import { createCandidate, voteToCandidate } from '../Controller/Create.js'
import { updateCandidate } from '../Controller/Update.js'
import { deleteCandidate } from '../Controller/Delete.js'
import { JwtAuthMiddleware } from '../Middleware/JwtAuth.js'
import { getCandidateDetails, voteCount } from '../Controller/Read.js'


const CandidateRoutes = express.Router()


CandidateRoutes.post('/', JwtAuthMiddleware, createCandidate)
CandidateRoutes.put('/:candidateId', JwtAuthMiddleware, updateCandidate)
CandidateRoutes.delete('/:candidateId', JwtAuthMiddleware, deleteCandidate)
CandidateRoutes.post('/vote/:candidateId', JwtAuthMiddleware, voteToCandidate)
CandidateRoutes.get('/vote/count',voteCount)
CandidateRoutes.get('/',getCandidateDetails)

export default CandidateRoutes