import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [taskButton, setTaskButton] = useState("Add Task");

  // 🔄 Fetch todos once
  const fetchTodos = async () => {
    try {
      const result = await axios.get("http://localhost:3000/todos");
      setTodos(result.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ➕ Add or ✏️ Update task
  const addTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      let res;

      // ✏️ UPDATE MODE
      if (editTodo) {
        res = await axios.put(
          `http://localhost:3000/todos/${editTodo.id}`,
          { title }
        );

        setTodos(
          todos.map((todo) =>
            todo.id === editTodo.id ? res.data : todo
          )
        );

        setEditTodo(null);
        setTaskButton("Add Task");

      } else {
        // ➕ ADD MODE
        res = await axios.post("http://localhost:3000/todos", {
          title,
          completed: false,
        });

        setTodos([...todos, res.data]);
      }

      setTitle("");

    } catch (error) {
      console.log(error.message);
    }
  };

  // ✅ Toggle complete
  const markComplete = async (id, status) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/todos/${id}`,
        { completed: !status }
      );

      setTodos(
        todos.map((todo) =>
          todo.id === id ? res.data : todo
        )
      );

    } catch (e) {
      console.log(e.message);
    }
  };

  // ✏️ Start editing
  const editTask = (todo) => {
    setEditTodo(todo);
    setTitle(todo.title);
    setTaskButton("Update Task");
  };

  // 🗑️ Delete
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);

      setTodos(todos.filter((todo) => todo.id !== id));

    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center flex-col gap-4 justify-center bg-gray-700 text-white">

      <h1 className="text-3xl font-bold">PERN TO DO APP</h1>

      {/* FORM */}
      <form onSubmit={addTask}>
        <input
          className="border border-gray p-2 m-2 rounded-lg text-black"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task..."
        />

        <button
          type="submit"
          className="bg-green-700 px-4 py-2 rounded-xl cursor-pointer"
        >
          {taskButton}
        </button>
      </form>

      {/* TODOS */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center bg-gray-800 p-3 rounded-xl"
          >
            <h2
              className={`text-lg font-semibold ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.title}
            </h2>

            <div className="flex gap-2">
              <button
                onClick={() => editTask(todo)}
                className="bg-blue-600 px-2 py-1 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-600 px-2 py-1 rounded-lg"
              >
                Delete
              </button>

              <button
                onClick={() => markComplete(todo.id, todo.completed)}
                className="bg-green-600 px-2 py-1 rounded-lg"
              >
                {todo.completed ? "Undo" : "Done"}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;