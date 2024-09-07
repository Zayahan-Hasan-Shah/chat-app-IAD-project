import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:'15d'})
    res.cookie("jwt",token, {
        maxAge : 15 * 24 * 60 *60 * 100, // 15:days, 24:hours, 60:minutes, 60:seconds, 1000:miliseconds
        httpOnly : true, // prevent cross-site attacks
        sameSite : "Strict", // cross-site request frogery attacks
        Secure : process.env.NODE_ENV !== "developemnt",
    })
}

export default generateTokenAndSetCookie