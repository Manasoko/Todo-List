import React, { useState } from "react";

import { Input, TextArea, Select, DatePicker } from "../components/@ui/inputs";
import { Button } from "../components/@ui/button";
import { TodoCard } from "../components/@ui/todo-card";
import EditSidebar from "../components/@ui/editSidebar";

interface TodoData {
    id?: string;
    taskName: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    date: string;
}

const HomePage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const todos: TodoData[] = [
    {
      id: "1",
      taskName: "Sample Task 1",
      description: "This is a sample task description.",
      priority: "high",
      date: "2024-12-31"
    },
    {
      taskName: "Sample Task 2",
      description: "This is another sample task description.",
      priority: "medium",
      date: "2024-11-30"
    }
  ];

  const handleTodoClick = (index: number) => {
    console.log("Todo clicked:", todos[index]);
    setIsSidebarOpen(true);
  };

  const handleSave = async (todoData: TodoData) => {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
        console.log("Saved todo data:", todoData);
        setIsSidebarOpen(false);
    };

  return (
    <>
      <div className="text-center my-12 text-amber-200">
        <h1 className="text-4xl font-bold">Welcome to My Todo App</h1>
        <p className="mt-4">Manage your tasks efficiently</p>
        <form className="mt-8 flex justify-center items-center space-x-6 w-full mx-auto">
          <Input placeholder="Add a new task..." />
          <TextArea placeholder="Task details..." />
          <Select
            label="Priority"
            name="priority"
            onChange={() => {}}
            options={[
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
            ]}
          />
          <DatePicker />
        </form>
        <Button type="submit" variant="primary" size="md">
          Add Task
        </Button>
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl text-center font-semibold mb-4 text-amber-200">Your Tasks</h2>
        <div className="space-y-4">
          {todos.map((todo, index) => (
            <TodoCard
              key={index}
              title={todo.taskName}
              description={todo.description}
              priority={todo.priority}
              dueDate={todo.date}
              onClick={() => handleTodoClick(index)}
            />
          ))}
        </div>
      </div>
      <EditSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onSave={handleSave}
                todo={todos[0]} // Pass the selected todo data here
            />
    </>
  );
};

export default HomePage;
