import { useState } from 'react'
import axios from "axios";
function App() {
 const [notes, setNotes] = useState([])
axios.get("http://localhost:3000/api/notes").then((res)=>{
  setNotes(res.data.notes);
})
  return (
    <>
    <div className="notes">
      {notes.map((notes,idx)=>{    
      return <div className="note"  key={idx}>
        <h1>{notes.title}</h1>
        <p>{notes.description}</p>
      </div>
      })}
    </div>
    </>
  )
}

export default App
