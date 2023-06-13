import { useState } from "react";
import { Subtask, Todo } from "../typings";
import {
  AiOutlineBranches,
  AiOutlineCheckCircle,
  AiFillCheckCircle,
  AiOutlineDelete,
} from "react-icons/ai";
import { useTodo } from "../contexts/TodoContext";




function TodoElement({ todo }: { todo: Todo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [subtaskText, setSubtaskText] = useState("");
  const {removeTodo, addSubtask, markTodoCompleted} = useTodo();

  const handleAddSubtask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addSubtask(todo._id, {
      _id: Math.random().toString(),
      text: subtaskText,
      completed: false,
    });
    setSubtaskText("");
  }

  return (
    <div className="p-2 border-t-[1px] border-gray-300 bg-gray-100  w-full">
      <div className="flex items-center group">
        {todo.completed ? (
          <AiFillCheckCircle className="h-5 w-5 text-green-500" onClick={() => markTodoCompleted(todo._id)} />
        ) : (
          <AiOutlineCheckCircle className="h-5 w-5" onClick={() => markTodoCompleted(todo._id)} />
        )}
        <span className="mx-2 text-lg text-gray-900">{todo.text}</span>
        {(
          <div
            className="ml-2 cursor-pointer flex text-sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {todo.subtasks.length > 0 && <span>{todo.subtasks.length}</span>}
            <AiOutlineBranches
              className={
                "h-5 ml-1 w-5 duration-300 " +
                (isOpen ? "rotate-180 " : " rotate-90 ")
              }
            />
          </div>
        )}

        <button className="ml-auto  text-sm group-hover:block group-hover:opacity-100 opacity-0 duration-200 bg-red-500 text-white p-1 rounded" onClick={() => removeTodo(todo._id)}>
          <AiOutlineDelete />
        </button>
      </div>
      {isOpen &&
        todo.subtasks.map((subtask) => (
          <SubTask key={subtask._id} subtask={subtask} todoId={todo._id} />
        ))}
      {isOpen && (
        <div className=" bg-gray-100 flex ml-2 w-full">
          <div className="">
            <div className=" h-1/2 w-[2px] bg-gray-300"></div>
          <div className=" bg-gray-300  h-[2px] w-4"></div>
            <div className="h-1/2 w-[2px]"></div>
          </div>
          <form className="flex-1" onSubmit={e => handleAddSubtask(e)}>

          <input
            type="text"
            className="w-full bg-gray-100 outline-none"
            placeholder="Add subtask..."
            value={subtaskText}
            onChange={(e) => setSubtaskText(e.target.value)}
          />
          </form>
        </div>
      )}
    </div>
  );
}

function SubTask({ subtask, todoId }: { subtask: Subtask, todoId: string }) {
  const { removeSubtask, markSubtaskCompleted } = useTodo();
  return (
    <div className={" ml-2 pl-0 border-l-2" + (subtask.completed ? " border-green-400" : " border-gray-300")}>
      <div className="flex items-center group">
        <div className={` ${subtask.completed ? "bg-green-400" : "bg-gray-300"} h-[2px] w-4`}></div>
        {subtask.completed ? (
          <AiFillCheckCircle className="h-5 w-5 text-green-500" onClick={() => markSubtaskCompleted(todoId, subtask._id)} />
        ) : (
          <AiOutlineCheckCircle className="h-5 w-5" onClick={() => markSubtaskCompleted(todoId, subtask._id)} />
        )}
        <span className="mx-2 text-md text-gray-700">{subtask.text}</span>
        <button className="ml-2  text-sm group-hover:block group-hover:opacity-100 opacity-0 duration-200 bg-red-500 text-white p-1 rounded" onClick={() => removeSubtask(todoId, subtask._id)}>
          <AiOutlineDelete />
        </button>
      </div>
    </div>
  );
}

export default TodoElement;
