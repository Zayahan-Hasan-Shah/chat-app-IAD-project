import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const {setAuthUser} = useAuthContext()

  const login = async (userName, password) => {
    console.log(userName, password)
    const success = handleInputErrors(userName, password)
    if (!success) return;
    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({userName, password})
      })
      console.log(res)
      const data = await res.json()
      console.log(data)
      if (data.error){
        throw new Error(data.error)
      }

      localStorage.setItem("chat-user", JSON.stringify(data))
      setAuthUser(data)

    } catch (error) {
      toast.error(error.message)
      console.log(error.message)
    }
    finally{
      setLoading(false)
    }
  }

  return {loading, login}
}

export default useLogin


const handleInputErrors = (userName, password) => {
  if (!userName || !password) {
      toast.error("Invalid Login Credentials")
      return false
  }

  return true
}