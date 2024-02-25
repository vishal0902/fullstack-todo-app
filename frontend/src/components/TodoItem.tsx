import React from 'react'

export default function TodoItem({title, description}) {
  return (
    <div>
         <div className='grid grid-cols-1 bg-gray-700 rounded-md p-5 text-teal-400'> 
                <div className='text-3xl text-teal-300'>{title}</div>
                <div>{description}</div>
                    
            </div>
    </div>
  )
}
