import React from 'react'
import Card from './components/Card'
import Form from './components/Form'

const App = () => {
  return (
    <div className='bg-gray-700 h-screen w-full p-4 flex flex-col gap-1'>
      <Form/>
      <Card/>
    </div>
  )
}

export default App