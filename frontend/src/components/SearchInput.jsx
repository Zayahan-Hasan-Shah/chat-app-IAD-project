import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5"
import useConversation from '../zustand/useConversation.js'
import UseGetConversation from "../hooks/useGetConversations.js"
import toast from 'react-hot-toast'

const SearchInput = () => {
  const [search, setSearchInput] = useState("")
  const { setSelectedConversation } = useConversation()
  const { conversations } = UseGetConversation()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!search) return
    if (search.length < 3) {
      return toast.error("Search term must be atleast 4 characters long")
    }
    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()))

    if (conversation) {
      setSelectedConversation(conversation)
      setSearchInput("")
    }
    else { toast.error(`No such user found!`) }
  }



  return (
    <>
      <form className='flex items-center gap-2' onSubmit={handleSubmit}>
        <input type="text" placeholder='Search...' className='input input-bordered rounded-full' value={search} onChange={(e) => setSearchInput(e.target.value)} />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
          <IoSearchSharp className='w-6 h-6 outlinr-none' />
        </button>
      </form>
    </>
  )
}

export default SearchInput