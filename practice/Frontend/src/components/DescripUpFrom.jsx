import axios from 'axios';
import React, { useState } from 'react'

const DescripUpFrom = (props) => {
    const updateHandler = async(e)=>{
        e.preventDefault();
        const {updateDescription} = e.target.elements;
        console.log(updateDescription.value);
       await axios.patch("http://localhost:3000/api/notes/"+props.noteId,{
            description : updateDescription.value
        }).then((res)=>{
            console.log(res.data)
        })

       props.getData();
    }
        
  return (
    <div>
        
            <form
            onSubmit={updateHandler}>
        <input
          type="text"
          placeholder="update description "
          name="updateDescription"
          className="bg-white px-3 py-2 rounded-xl"
        />
        <button className="px-4 py-2 bg-white rounded-xl cursor-pointer active:scale-95 ">
         update
        </button>
      </form>
        
      
    </div>
  )
}

export default DescripUpFrom