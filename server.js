import dotenv  from 'dotenv'
import express from 'express'
dotenv.config()
import bodyParser from 'body-parser'
import UserRoutes from './Routes/UserRoutes.js'

const app=express()

const port=process.env.PORT || 3000
app.use(bodyParser.json())

app.use('/user',UserRoutes)





app.listen(port,console.log('Server started'))


