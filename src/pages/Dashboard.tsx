import TodoElement from "../components/TodoElement";
import { Todo } from "../typings";

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
  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <h1 className="text-6xl my-20 font-bold">Todo App - Dashboard</h1>
      <h5 className="text-xl font-semibold mt-2">Welcome back, User</h5>

      <div className=" max-w-4xl mt-6 sm:w-full">
        {dummyTodos.map((todo) => (
          <TodoElement key={todo._id} todo={todo} />
        ))}
        <div className="p-2 border-t-[1px] border-gray-300 bg-gray-100  w-full">
          <input
            type="text"
            className="w-full pl-7 bg-gray-100 outline-none"
            placeholder="Add task..."
          />
        </div>
      </div>
    </div>
  );
}
