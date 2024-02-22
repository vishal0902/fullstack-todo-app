import React, { useState } from 'react'
import InputBox from '../ui/InputBox'
import Heading from '../ui/Heading'
import Button from '../ui/Button'
import axios from 'axios'

export default function Signup() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = async () =>{
        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
            email,
            firstName,
            lastName, 
            password
        })
        console.log(response.data)

    }


  return (
    <div className='flex justify-center '>
            <div className='w-1/4 mt-5 bg-gray-700 pt-6 min-h-[80vh] rounded-md '>
                <Heading text="Sign up" />
                <InputBox type="text" value={email} onChange={(e:any)=>setEmail(e.target.value)} label="E-MAIL" placeholder="Your email here" />
                <InputBox type="text" value={firstName} onChange={(e:any)=>setFirstName(e.target.value)} label="FIRST NAME" placeholder="Enter your first name here." />
                <InputBox type="text" value={lastName} onChange={(e:any)=>setLastName(e.target.value)} label="LAST NAME" placeholder="Enter your last name here." />
                <InputBox type="password" value={password} onChange={(e:any)=>setPassword(e.target.value)} label="PASSWORD" placeholder="Your password here" />
                <Button buttonText="Signup" onClick = {handleSubmit} />
                <div className='text-white text-center text-sm mt-3'>
                    Already a user? <span>Sign in.</span> 
                </div>
            </div>
    </div>
  )
}

