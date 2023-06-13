import { useState } from "react";
import { Subtask, Todo } from "../typings";
import {
  AiOutlineBranches,
  AiOutlineCheckCircle,
  AiFillCheckCircle,
} from "react-icons/ai";

function TodoElement({ todo }: { todo: Todo }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-2 border-t-[1px] border-gray-300 bg-gray-100  w-full">
      <div className="flex items-center">
        {todo.completed ? (
          <AiFillCheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <AiOutlineCheckCircle className="h-5 w-5" />
        )}
        <span className="mx-2 text-lg text-gray-900">{todo.text}</span>
        {todo.subtasks.length > 0 && (
          <div
            className="ml-2 cursor-pointer flex text-sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{todo.subtasks.length}</span>
            <AiOutlineBranches
              className={
                "h-5 ml-1 w-5 duration-300 " +
                (isOpen ? "rotate-180 " : " rotate-90 ")
              }
            />
          </div>
        )}
      </div>
      {isOpen &&
        todo.subtasks.map((subtask) => (
          <SubTask key={subtask._id} subtask={subtask} />
        ))}
      {isOpen && (
        <div className=" bg-gray-100 flex ml-2 w-full">
          <div className="">
            <div className=" h-1/2 w-[2px] bg-gray-300"></div>
          <div className=" bg-gray-300  h-[2px] w-4"></div>
            <div className="h-1/2 w-[2px]"></div>
          </div>
          <input
            type="text"
            className="w-full bg-gray-100 outline-none"
            placeholder="Add subtask..."
          />
        </div>
      )}
    </div>
  );
}

function SubTask({ subtask }: { subtask: Subtask }) {
  return (
    <div className=" ml-2 pl-0 border-l-2 border-gray-300">
      <div className="flex items-center">
        <div className=" bg-gray-300 h-[2px] w-4"></div>
        {subtask.completed ? (
          <AiFillCheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <AiOutlineCheckCircle className="h-5 w-5" />
        )}
        <span className="mx-2 text-md text-gray-700">{subtask.text}</span>
      </div>
    </div>
  );
}

export default TodoElement;
