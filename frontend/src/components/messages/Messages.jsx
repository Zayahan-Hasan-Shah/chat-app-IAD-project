import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from "../../hooks/UseGetMessages.js"
import MessageSkeletons from '../MessageSkeletons.jsx'
import useListenMessage from '../../hooks/useListenMessage.js'

const Messages = () => {
  const { messages, loading } = useGetMessages()
  useListenMessage()
  const lastMessageRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behaviour: "smooth" })
    }, 100)
  }, [messages])
  console.log("messages : ", messages)
  return (
    <div className='px-4 flex-1 overflow-auto'>

      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={lastMessageRef} > <Message message={message} /> </div>
      ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeletons key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}

      {/* <Message />
        <Message />
        <Message />
        <Message /> */}
    </div>
  )
}

export default Messages