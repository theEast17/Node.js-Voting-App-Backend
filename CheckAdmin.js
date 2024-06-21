import UserSchema from "./Model/UserModel.js"

export const checkAdmin = async (userId) => {
    try {
        const user = await UserSchema.findById(userId)
        if (user.role === 'admin') {
            return true
        }
    } catch (error) {
        return false
    }
}