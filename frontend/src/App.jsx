
import { useState } from "react";

import axios from 'axios';

function App(){


  const [title ,setTitle] = useState("");
  const [todos , setTodos] = useState([]);
  const [editTodo , setEditTodo] = useState(null);
  const [editText , setEditText] = useState('');


  const addTask = async (e) =>{

    e.preventDefault();

    console.log(title);
    setTitle("");

    setTodos([...todos,title]);


    // try {
    //   const res = await axios.post('http:localhost:3000/todos', {
    //     title,
    //     completed : false,
    //   });       
    // } catch (error) {
    //   console.log(error.message);
    // }


  }

  return(

    <>
    
      <div className="min-h-screen flex items-center gap-4 flex-col justify-center content-center bg-gray-700  text-white ">
        
         <h1 className="text-3xl font-bold" >PERN TO DO APP</h1>  

          <div className="">
            <form onSubmit={addTask} action="">

              <input
                 className="border border-gray p-1.5 m-1.5 rounded-lg "
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}  
                  />
              <button
                className="text-white text-bold bg-green-800 p-2.5 rounded-3xl cursor-pointer" 
                onClick={addTask}
                >Add Task</button>
            </form>

            </div>  


            <div className="flex flex-col gap-4">

              <div>
                {todos.map((todo,index)=>(
                  <div className="flex justify-between items-center gap-4" key={index}> 
                    <h2 className="text-xl font-bold" >{todo}</h2>
                    <div className="flex gap-1">
                      <p className="p-2 m-2 rounded-2xl cursor-pointer bg-blue-600 text-gray-400" >edit</p>
                      <p className="p-2 m-2 rounded-2xl cursor-pointer bg-red-600 text-gray-400" >delete</p>
                    </div>
                  </div>

                ))}

              </div>

              </div>
      </div>
    </>

  );


}

export default App ;