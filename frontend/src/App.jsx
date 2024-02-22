import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './components/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-screen w-full font-normal antialiased shadow-md'>
        <Signup />
    </div>
    )
}

export default App
