import React, { useState } from 'react'
import InputBox from '../ui/InputBox'
import Heading from '../ui/Heading'
import Button from '../ui/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Signup() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    // const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()
    const handleSubmit = async () =>{
        await axios({
            method: 'post',
            url: "http://localhost:3000/api/v1/user/signup",
            headers: {}, 
            data: {
              email,
              password,
              firstName,
              lastName
            }
          }).then((response)=>{
            if(response.data.token){
                localStorage.setItem("token",response.data.token.toString())
                console.log("hello")
                navigate("/")
             }
        }).catch((error)=>{
            console.log(error)
            // setErrorMessage(error)
        })
        

    }


  return (
    <div className='flex justify-center '>
            <div className='w-1/4 mt-5 bg-gray-700 pt-6 min-h-[80vh] rounded-md '>
            <div className='mb-10 flex text-center'>
                    <Heading text="Sign up" />
                </div>
                <InputBox type="text" value={email} onChange={(e:any)=>setEmail(e.target.value)} label="E-MAIL" placeholder="Your email here" />
                <InputBox type="text" value={firstName} onChange={(e:any)=>setFirstName(e.target.value)} label="FIRST NAME" placeholder="Enter your first name here." />
                <InputBox type="text" value={lastName} onChange={(e:any)=>setLastName(e.target.value)} label="LAST NAME" placeholder="Enter your last name here." />
                <InputBox type="password" value={password} onChange={(e:any)=>setPassword(e.target.value)} label="PASSWORD" placeholder="Your password here" />
                <Button buttonText="Signup" onClick = {handleSubmit} />
                <div className='text-white text-center text-sm mt-3'>
                    Already a user? <span className='cursor-pointer underline hover:text-teal-400' onClick={()=>navigate('/signin')}>Sign in.</span> 
                </div>
            </div>
    </div>
  )
}

