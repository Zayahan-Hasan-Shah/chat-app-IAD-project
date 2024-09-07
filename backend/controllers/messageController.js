import Converstaion from "../models/conversationModel.js"
import Message from "../models/messageModels.js"
import { getReceiverId, io } from "../socket/socket.js"

export const sendMessage = async (req,res) => {
    try {
        const {message} = req.body
        const {id : recieverId} = req.params
        console.log("reciever id :",recieverId)
        const senderId = req.user._id
        console.log("sender id : ", senderId)
        let conversation = await Converstaion.findOne({
            participants : { $all : [senderId, recieverId]}
        })

        if (!conversation){
            conversation = await Converstaion.create({
                participants : [senderId, recieverId]
            })
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        // Sokcet.io functionality

        // await conversation.save()
        // await newMessage.save()

        // This will run parallel or you can say simultaneouslty
        Promise.all([conversation.save(), newMessage.save()])

        const recieverSocketId = getReceiverId(recieverId)

        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)
        
    } catch (error){
        console.log("Error in Send Message Controller : ", error.message)
        res.status(500).json({
            error : "Internal server error in send Message Controller"
        })
    }
}

export const getMessage = async (req,res) => {
    try {
        const {id : userToChatId} = req.params
        const senderId = req.user._id
        const conversation = await Converstaion.findOne({
            participants : { $all : [senderId, userToChatId]}
        }).populate("messages")

        if(!conversation) return res.status(200).json([])

        const messages = conversation.messages
        res.status(200).json(messages)


    } catch (error) {
        console.log("Error in get Message Controller : ", error.message)
        res.status(500).json({
            error : "Internal server error in get Message Controller"
        })
    }
}