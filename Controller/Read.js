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