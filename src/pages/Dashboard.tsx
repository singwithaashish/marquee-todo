import { useState } from "react";
import TodoElement from "../components/TodoElement";
import { useTodo } from "../contexts/TodoContext";
import { Todo } from "../typings";
import {IoIosAddCircleOutline} from 'react-icons/io'

export default function Dashboard() {
  const dummyTodos: Todo[] = [
    {
      _id: "1",
      text: "Hello",
      completed: false,
      date: new Date(),
      subtasks: [
        {
          _id: "1",
          text: "Hello",
          completed: false,
        },
        {
          _id: "2",
          text: "Hello",
          completed: false,
        },
      ],
    },
    {
      _id: "2",
      text: "Hello",
      completed: true,
      date: new Date(),
      subtasks: [],
    },
  ];

  const { todos, addTodo } = useTodo();
  const [text, setText] = useState("");

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text === "") return;
    addTodo({
      _id: Math.random().toString(),
      text,
      completed: false,
      date: new Date(),
      subtasks: [],
    });
    setText("");
  };
  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <h1 className="text-6xl my-20 font-bold">Todo App - Dashboard</h1>
      <h5 className="text-xl font-semibold mt-2">Welcome back, User</h5>

      <div className=" max-w-4xl mt-6 sm:w-full">
        {todos.map((todo) => (
          <TodoElement key={todo._id} todo={todo} />
        ))}
        <form
          className="p-2 border-t-[1px] border-gray-300 bg-gray-100  w-full"
          onSubmit={(e) => handleAddTodo(e)}
        >
            <div className="flex">
            <IoIosAddCircleOutline className="h-[1.4rem] w-[1.4rem] text-green-500" on />

          <input
            type="text"
            className="w-full pl-2 bg-gray-100 outline-none"
            placeholder="Add task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
            </div>
        </form>
      </div>
    </div>
  );
}
