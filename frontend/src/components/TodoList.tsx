import React, { useEffect, useState } from 'react'
import InputBox from '../ui/InputBox'
import Heading from '../ui/Heading'
import Button from '../ui/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import TodoItem from './TodoItem'

export default function TodoList({todos}) {




  return (
    <div className='px-20 mt-10 grid grid-cols-1 gap-5 max-h-[65vh] overflow-y-auto'>
            {todos?.map((todo)=>{
                return (
                    <TodoItem key={todo.id} title={todo.title} description={todo.description}/>
                )
            })}      
                
               
    </div>
  )
}
