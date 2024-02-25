import React, { useState } from 'react'
import InputBox from '../ui/InputBox'
import Heading from '../ui/Heading'
import Button from '../ui/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import TextArea from '../ui/TextArea'

export default function AddTodo({title, description, setTitle, setDescription, addTodo}) {

    // const [title, setTitle] = useState('')
    // const [description, setDescription] = useState('')

    // const navigate = useNavigate()

    // const addTodo = async () =>{
    //     await axios.post("http://localhost:3000/api/v1/todo/add",{
    //         title,
    //         description
    //     },{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    //     // console.log(response.data)

    // }


  return (
    <div className='px-20 mt-10'>
            <div className='mt-5 bg-gray-700 pt-6 min-h-[65vh] rounded-md '>
                <div className='mb-10 flex text-center'>
                    <Heading text="Add Your Todo" />
                </div>
                <InputBox type="text" value={title} onChange={(e:any)=>setTitle(e.target.value)} label="Title" placeholder="Title here" />
                <TextArea value={description} onChange={(e:any)=>setDescription(e.target.value)} label="Description" placeholder="Desciption here" />
                {/* <InputBox type="text" value={description} onChange={(e:any)=>setDescription(e.target.value)} label="Description" placeholder="Desciption here" /> */}
                <Button  buttonText="Add Todo" onClick = {addTodo} />
               
            </div>
    </div>
  )
}

