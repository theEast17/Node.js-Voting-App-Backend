import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const JwtAuthMiddleware = async (req, res, next) => {
    const token = await req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'unauthorized' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userPayload = decoded
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Invalid Token' })
    }
}

export const GenerateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 3000 })
}