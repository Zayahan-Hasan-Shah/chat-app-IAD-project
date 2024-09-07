import User from "../models/userModels.js"


export const getUserForSidebar = async (req,res) => {
    try {
        const loggedInUser = req.user._id
        const filteredlUser = await User.find({ _id : { $ne : loggedInUser}}).select("-password")
        
        res.status(200).json(filteredlUser)

    } catch (error) {
        console.log("Error in get User For Siderbar controller : ", error.message)
        res.status(500).json({error : "Internal server error in get User For Siderbar controller"})
    }
}