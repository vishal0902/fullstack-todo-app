import React from 'react'

function Button({buttonText, onClick}) {
  return (
    <div className='flex justify-center'>
        <button onClick={onClick} className=' bg-teal-500 text-white w-1/2 h-12 rounded-3xl hover:bg-teal-300' type='button'>{buttonText}</button>
    </div>
  )
}

export default Button