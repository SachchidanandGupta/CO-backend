import { useEffect, useState } from 'react'
import axios from "axios";
function App() {
 const [notes, setNotes] = useState([]);
 const [popUp, setPopUp] = useState(false);
 const [noteId, setNoteId] = useState(null);
 console.log("hello integration");
const submitHandler = (e)=>{
    e.preventDefault();
    const {title, description} = e.target.elements; // e.target.elemets always find the target using name attribute
    axios.post("https://co-backend-jviv.onrender.com/api/notes",{
      title:title.value,
      description:description.value
    }).then((res)=>{
      console.log(res.data);
      fetchNotes();
    })
}

async function updatePrevent(e){
   e.preventDefault();
   const {updateDescription} = e.target.elements;
   console.log(updateDescription.value);
   console.log(noteId);
    await axios.patch("https://co-backend-jviv.onrender.com/api/notes/"+noteId,{
      description:updateDescription.value
     }).then((res)=>{
      console.log(res.data)
     })
     fetchNotes();
     setPopUp(false);
}
const updateHandler =(note_id)=>{
   setNoteId(note_id);
  console.log(note_id);
}
 function fetchNotes(){
  axios.get("https://co-backend-jviv.onrender.com/api/notes").then((res)=>{
    setNotes(res.data.notes);
   }) 
 }
 async function handleDeleteNote(note_id){
  await axios.delete("https://co-backend-jviv.onrender.com/api/notes/"+note_id).then((res)=>{
    console.log(res.data);
    fetchNotes();
  });
 }
 
 
 // we use useEffect when we have to call an api 
 useEffect(()=>{
  fetchNotes();
   //we use the useEffect hook so that the api won't get called a=gain and again the react forces the api to get called again and again as the app component get re-render every time when any change in state happens but when we pass use the use effect that call of api will happe only once and will take lesser resources
 },[]);
  return (
    <> 
    <form className='input-field-notes-create' onSubmit={submitHandler} >
      <input name='title' type="text" placeholder='enter the title' /> 
      <input name='description' type="text" placeholder='enter the description' />
      <button>Create Note</button>
    </form>
    { popUp &&
      <form className='input-field-notes-create' onSubmit={updatePrevent}  >
          <input type="text" placeholder='enter the updated description' name='updateDescription' />
          <button >update</button>
      </form>
    }
    <div className="notes">
      {notes.map((notes,idx)=>{    
      return <div className="note"  key={idx}>
        <h1>{notes.title}</h1>
        <p>{notes.description}</p>
        <button onClick={()=>{
          handleDeleteNote(notes._id);
        }}>Delete</button>
        <button onClick={()=>{
          setPopUp(true);
          updateHandler(notes._id)
        }}>update</button>
       
      </div>
      })}
    </div>
    </>
  )
}
// like the name = title in the input field
export default App
