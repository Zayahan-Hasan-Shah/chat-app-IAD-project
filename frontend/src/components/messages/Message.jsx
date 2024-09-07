import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'
import { extractTime } from '../../utils/extractTime'

const Message = (props) => {
    const {message} = props
    const {authUser} = useAuthContext()
    const {selectedConversation} = useConversation()
    const fromMe = message.senderId === authUser._id
    const formatedTime = extractTime(message.createdAt)
    const chatClassName = fromMe ? "chat-end" : "chat-start"
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic
    const bubbleBgColor = fromMe ? "bg-blue-500" : ""
    const shakeClass = message.shouldShake ? "shake" : ""

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img src={`${profilePic}`} alt='user-avatar' />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2 `}>{message.message}</div>
            <div className={`chat-footer opacity text-xs flex gap-1 items-center`}>{formatedTime}</div>
        </div>
    )
}

export default Message