import React, { useState, useEffect } from "react";
import axios from "axios";

import { TodoForm } from "../components/form";
import { TodoCard } from "../components/@ui/todo-card";
import EditSidebar from "../components/@ui/edit-sidebar";
import type { TodoData } from "../types/TodoData";
import { formatSmartDate } from "../components/utils/utils";

const HomePage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [todos, setTodos] = useState<TodoData[]>([]);

  const [selectedTodoIndex, setSelectedTodoIndex] = useState<number | null>(
    null
  );

  const handleTodoClick = (index: number) => {
    setSelectedTodoIndex(index);
    setIsSidebarOpen(true);
  };

  const addTask = async (newTask: TodoData) => {
    try {
      await axios.post("/api/task", newTask);
      // Refresh the task list after adding a new task
      const response = await axios.get<TodoData[]>("/api/tasks");
      setTodos(response.data);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  const handleToggleComplete = async (index: number) => {
    try {
      await axios.patch(`/api/task/${todos[index]._id}/toggle`);
      setTodos((prevTodos) =>
        prevTodos.map((todo, i) =>
          i === index ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling completion status:", error);
    }
  };

  const deleteTask = async (index: number) => {
    try {
      await axios.delete(`/api/task/${todos[index]._id}`);
      setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleSave = async (todoData: TodoData) => {
    await axios.put(`/api/task/${todoData._id}`, todoData);
    const updatedTodos = [...todos];
    if (selectedTodoIndex !== null) {
      updatedTodos[selectedTodoIndex] = { ...todoData };
      setTodos(updatedTodos);
    }
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get<TodoData[]>("/api/tasks");
        console.log("Fetched todos:", response.data);
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
    console.log(formatSmartDate("2025-09-17T21:11:00.000+00:00"));
  }, []);

  return (
    <>
      <div className="text-center my-12 text-amber-200">
        <h1 className="text-4xl font-bold">Welcome to My Todo App</h1>
        <p className="mt-4">Manage your tasks efficiently</p>
      </div>
      <TodoForm onSubmit={addTask}/>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl text-center font-semibold mb-4 text-amber-200">
          Your Tasks
        </h2>
        <div className="space-y-4">
          {todos.length > 0 ? todos.map((todo, index) => (
            <TodoCard
              key={todo._id || index}
              title={todo.taskName}
              description={todo.description}
              priority={todo.priority}
              dueDate={formatSmartDate(todo.dueDate)}
              isCompleted={!!todo.completed}
              onToggleComplete={() => handleToggleComplete(index)}
              onClick={() => handleTodoClick(index)}
              onDelete={() => deleteTask(index)}
            />
          )) : <div className="text-center text-gray-500">No tasks found. Add a new task above!</div>}
        </div>
      </div>
      {selectedTodoIndex !== null && (
        <EditSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onSave={handleSave}
          todo={todos[selectedTodoIndex]}
        />
      )}
    </>
  );
};

export default HomePage;
