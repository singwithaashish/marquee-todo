import { useEffect, useRef, useState } from "react";
import TodoElement from "../components/TodoElement";
import { useTodo } from "../contexts/TodoContext";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { todos, addTodo } = useTodo();
  const [text, setText] = useState("");
  const { logout } = useAuth();
  const scrollRef = useRef<HTMLDivElement | null>(null);


  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text.trim() === "") return;

    addTodo({
      _id: Math.random().toString(),
      text,
      completed: false,
      date: new Date(),
      subtasks: [],
    });
    // scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    setText("");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full flex-1  text-center">
      {/* <h5 className="text-xl font-semibold mt-2">Welcome back</h5>  */}
      <header className="bg-gray-500 shadow p-4 flex justify-between items-center text-white w-full">
        <h1 className="text-xl font-bold">Todo App - Dashboard</h1>
        <button
          className="bg-red-500 text-white p-2 rounded-md  self-center"
          onClick={() => logout()}
        >
          Logout
        </button>
      </header>

      <div className=" max-w-4xl mt-6 sm:w-full ">
        <p className=" text-left font-medium mb-2">Your todos :</p>
        <div className="overflow-y-scroll max-h-[70vh]">
          {todos.map((todo) => (
            <TodoElement key={todo._id} todo={todo} />
          ))}
          <div ref={scrollRef} />
        </div>
        <form
          className="p-2 border-t-[1px] border-gray-300 bg-gray-100  w-full"
          onSubmit={(e) => handleAddTodo(e)}
        >
          <div className="flex">
            <IoIosAddCircleOutline
              className="h-[1.4rem] w-[1.4rem] text-green-500"
              on
            />

            <input
              type="text"
              className="w-full pl-2 bg-gray-100 outline-none"
              placeholder="Add task..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button className={`ml-auto text-sm ${text.trim().length > 0 ? "bg-green-500" : "bg-gray-300"} text-white p-1 rounded`} 
            type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
