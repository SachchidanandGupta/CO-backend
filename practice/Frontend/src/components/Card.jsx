import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Card = () => {
    const [notes, setNotes] = useState([]);
async function getData(){
    await axios.get("http://localhost:3000/api/notes").then((response)=>{
       setNotes(response.data.notes);
    })
}
useEffect(()=>{
    getData();
},[])
  return (
    <>
    {notes.map((values,idx)=>{
  return <div  key={idx} className='bg-gray-400 w-50 h-20 p-5 rounded-xl flex justify-center items-center flex-col '>
        <h2 className='text-white'>{notes[idx].title}</h2>
        <p className='text-white'>{notes[idx].description}</p>
      </div>
    })}
    </>
    
  )
}

export default Card