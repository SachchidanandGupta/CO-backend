import React, { useEffect, useState } from "react";
import axios from "axios";

const Card = () => {
  const [notes, setNotes] = useState([]);
  const getData = async () => {
    await axios.get("http://localhost:3000/api/notes").then((response) => {
      setNotes(response.data.notes);
    });
  };
  function deleteNote(note_id) {
    axios.delete("http://localhost:3000/api/notes/" + note_id).then((res) => {
      console.log(res.data);
      getData();
    });
  }
  function updateNote(note_id){
    console.log(note_id)
    // axios.patch("http://localhost:3000/api/notes/"+note_id)
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {notes.map((values, idx) => {
        return (
          <div
            key={idx}
            className="bg-gray-400 w-50 h-30 p-5 rounded-xl flex justify-center items-center flex-col "
          >
            <h2 className="text-white">{notes[idx].title}</h2>
            <p className="text-white">{notes[idx].description}</p>
            <div className="flex gap-1">
            <button
              onClick={() => {
                deleteNote(values._id);
              }}
              className="px-4 py-2 bg-white rounded-xl cursor-pointer active:scale-95 "
            >
              Delete
            </button>
            <button
            onClick={()=>{
              updateNote(values._id)
            }}
            className="px-4 py-2 bg-white rounded-xl cursor-pointer active:scale-95 ">
              Update
            </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
