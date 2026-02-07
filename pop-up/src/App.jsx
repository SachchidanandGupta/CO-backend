import React, { useState } from 'react'

const App = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("open pop-up");
  return (
    <div className='h-screen w-full bg-gray-800 ' >
       <button onClick={()=>{
        if(popupOpen == true){
          setPopupOpen(false);
          setButtonTitle("open pop-up");
        }else{
          setPopupOpen(true);
          setButtonTitle("close pop-up")
        }
       }} className='px-3 py-5 bg-gray-600 text-white border-white border-2 cursor-pointer m-2 active:scale-95'>{buttonTitle}</button>
       { popupOpen &&
        <form className='mr-2 flex' >
          <input type="text" placeholder='enter the updated description' className='pl-4 py-2 bg-white ml-2 w-sm' />
          <button className='px-3 py-5 bg-gray-600 text-white border-white border-2 cursor-pointer m-2 active:scale-95 '>Update</button>
        </form>
       }
    </div>
  )
}

export default App