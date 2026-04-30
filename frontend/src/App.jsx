
import { useState } from "react";

import axios from 'axios';

function App(){


  const [title ,setTitle] = useState("");
  const [todos , setTodos] = useState([]);
  const [editTodo , setEditTodo] = useState(null);
  const [editText , setEditText] = useState('');

 

  const fetchTodos = async ()=>{
    try{
      const result = await axios.get('http://localhost:3000/todos');
      // console.log(result.data);
      setTodos(result.data);
    }catch(e){
      consoloe.log(e.message);
    }
  }

   fetchTodos();

  const addTask = async (e) =>{

    e.preventDefault();

    console.log(title);
    setTitle("");

    // setTodos([...todos,title]);


    try {
      const res = await axios.post('http://localhost:3000/todos', {
        title,
        completed : false,
      });       

      setTodos([...todos,res.data.title]);

    } catch (error) {
      console.log(error.message);
    }


  }

const MarkComplete = async (id)=>{
  try{
    const res = await axios.put(`http://localhost:3000/todos/${id}`);
    console.log(res.data);
  }catch(e){
    console.log(e.message);
  }

}
  return(

    <>
    
      <div className="min-h-screen flex items-center gap-4 flex-col justify-center content-center bg-gray-700  text-white ">
        
         <h1 className="text-3xl font-bold" >PERN TO DO APP</h1>  

          <div className="">
            <form onSubmit={addTask} action="" method="post">

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
                    <h2 className={`text-xl font-bold ${todo.completed ? 'line-through' : ''}`} >{todo.title}</h2>
                    <div className="flex gap-1">
                      <button onclick={MarkComplete(todo.id)} className="p-2 m-2 rounded-2xl cursor-pointer bg-blue-600 text-white-400" >edit</button>
                      <button onclick={MarkComplete(todo.id)} className="p-2 m-2 rounded-2xl cursor-pointer bg-red-600 text-white-400" >delete</button>
                      <button onclick={MarkComplete(todo.id)} className="p-2 m-2 rounded-2xl cursor-pointer bg-green-600 text-white-400" >Completed</button>
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