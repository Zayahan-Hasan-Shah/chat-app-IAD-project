import User from "../models/userModels.js"
import bcrypt from "bcrypt"
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const Signup = async (req, res) => {

    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password don't match!" })
        }

        const user = await User.findOne({ userName })

        if (user) {
            return res.status(400).json({
                error: "This user name is already exist"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        const newUser = new User({
            fullName,
            userName,
            password: hashPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
            })
        }
        else {
            res.status(400).json({ error: "Invalid User Data/Credentials" })
        }


    } catch (error) {
        console.log("Error in SignUp Controller", error.message)
        res.status(500).json({
            error: "Internal Server Error or Invalid Credentials In SignUp"
        })
    }
}

export const Login = async (req, res) => {
    try {
        const { userName, password } = req.body
        const LoginUser = await User.findOne({ userName })
        const isPasswordCorrect = await bcrypt.compare(password, LoginUser?.password || "")

        if (!LoginUser || !isPasswordCorrect) {
            return res.status(400).json({
                error: "Invalid Credentials for the login"
            })
        }

        generateTokenAndSetCookie(LoginUser._id, res)

        res.status(200).json({
            _id: LoginUser._id,
            fullName: LoginUser.fullName,
            userName: LoginUser.userName,
            profilePic: LoginUser.profilePic
        })

    } catch (error) {
        console.log(`Error in Login Controller ${error.message}`)
        res.status(500).json({
            error: "Internal Server Error or Invalid Credentials In Login"
        })
    }
}

export const Logout =  (req, res) => {
    try {
        res.cookie("jwt","", {maxAge : 0})
        res.status(200).json({
            message: "Logged Out Successfully!"
        })
    } catch (error) {
        console.log(`Error in LogOut Controller ${error.message}`)
        res.status(500).json({
            error: "Internal Server Error or Invalid Credentials In LogOut"
        })

    }
}
