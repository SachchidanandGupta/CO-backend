import React from 'react'
import axios from 'axios'

const Form = () => {
    const submitHandler=(e)=>{
       e.preventDefault();
       console.log(e.target.elements)
       const {title,description} = e.target.elements;
       axios.post("http://localhost:3000/api/notes",{
        title:title.value,
        description:description.value
      }).then((res)=>{
        console.log(res.data);
        
      });
    
    }
  return (
    <div>
        <form onSubmit={submitHandler} className='flex gap-1'>
            <input name='title' type="text" placeholder='title daal bhai' className='bg-white px-3 py-2 rounded-xl' />
            <input name='description' type="text" placeholder='description' className='bg-white px-3 py-2 rounded-xl ' />
            <button className='px-4 py-2 bg-white rounded-xl cursor-pointer active:scale-95 '>submit notes</button>
        </form>
    </div>
  )
}

export default Form