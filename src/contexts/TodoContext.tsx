import React, { createContext, useContext, useState } from "react";
import { Todo, Subtask } from "../typings";

interface ITodoContext {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (_id: string) => void;
  addSubtask: (todoId: string, subtask: Subtask) => void;
  removeSubtask: (todoId: string, subtaskId: string) => void;
  markTodoCompleted: (_id: string) => void;
  markSubtaskCompleted: (todoId: string, subtaskId: string) => void;
}

const TodoContext = createContext<ITodoContext | undefined>(undefined);

interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  const removeTodo = (_id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== _id));
  };

  const addSubtask = (todoId: string, subtask: Subtask) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === todoId
          ? { ...todo, subtasks: [...todo.subtasks, subtask] }
          : todo
      )
    );
    // if todo is marked as completed, mark it as uncompleted
    if (todos.find((todo) => todo._id === todoId)?.completed) {
      markTodoCompleted(todoId);
    }
  };

  const removeSubtask = (todoId: string, subtaskId: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.filter(
                (subtask) => subtask._id !== subtaskId
              ),
            }
          : todo
      )
    );
  };

  const markTodoCompleted = (_id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === _id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    // if todo is marked as completed, mark all subtasks as completed
    if (todos.find((todo) => todo._id === _id)?.completed) return;
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === _id
          ? {
              ...todo,
              subtasks: todo.subtasks.map((subtask) => ({
                ...subtask,
                completed: true,
              })),
            }
          : todo
      )
    );
  };

  const markSubtaskCompleted = (todoId: string, subtaskId: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.map((subtask) =>
                subtask._id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              ),
            }
          : todo
      )
    );
    // when all subtasks are completed, mark todo as completed
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === todoId
          ? {
              ...todo,
              completed: todo.subtasks.every((subtask) => subtask.completed),
            }
          : todo
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        removeTodo,
        addSubtask,
        removeSubtask,
        markTodoCompleted,
        markSubtaskCompleted,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
