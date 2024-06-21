import dotenv from 'dotenv'
import express from 'express'
dotenv.config()
import bodyParser from 'body-parser'
import UserRoutes from './Routes/UserRoutes.js'
import connectDb from './db.js'
import CandidateRoutes from './Routes/CandidateRoutes.js'


const app = express()
connectDb()

const port = process.env.PORT || 3000
app.use(bodyParser.json())

app.use('/user', UserRoutes)
app.use('/candidate', CandidateRoutes)





app.listen(port, console.log('Server started'))


