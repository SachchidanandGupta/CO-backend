import React from 'react'

const updateForm = () => {
  return (
    <div>
        <form style={display={none}} >
            <input type="text" name='updatedTitle' placeholder='enter description to update' className='bg-white px-3 py-2 rounded-xl' />
            <button className='px-4 py-2 bg-white rounded-xl cursor-pointer active:scale-95 '>Submit</button>
        </form>
    </div>
  )
}

export default updateForm