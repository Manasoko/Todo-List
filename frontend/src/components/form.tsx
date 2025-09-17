import React, { useState } from "react";
import { Input, TextArea, Select, DatePicker } from "./@ui/inputs";
import { Button } from "./@ui/button";
import type { TodoData } from "../types/TodoData";

type TodoFormProps = {
  onSubmit: (data: TodoData) => void;
  initialData?: TodoData;
};

export const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<TodoData>(
    initialData || {
      taskName: "",
      description: "",
      priority: "medium",
      dueDate: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.dueDate) {
            alert('Due date is required');
        } else {
            const today = new Date();
            if (formData.dueDate < today) {
                alert('Due date cannot be in the past');
            }
        }

    onSubmit(formData);
  };

  return (
    <form
      className="flex flex-col items-center space-y-6 p-4"
      onSubmit={handleSubmit}
    >
      {/* Input Row */}
      <div className="grid grid-cols-4 gap-4 w-full max-w-4xl items-end">
        {/* Task Name */}
        <div className="flex flex-col items-center flex-1 min-w-[200px]">
          <label
            htmlFor="taskName"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Add a new task...
          </label>
          <Input
            id="taskName"
            name="taskName"
            value={formData.taskName}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-300 focus:border-b-4 focus:border-amber-400 bg-transparent text-gray-700 py-2 px-0"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col flex-1">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Task details...
          </label>
          <TextArea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="h-10 w-full max-w-md border-b-2 border-gray-300 focus:border-b-4 focus:border-amber-400 bg-transparent text-gray-700 py-2 px-0"
          />
        </div>

        {/* Priority */}
        <div className="flex flex-col items-center">
          <Select
            name="priority"
            label="Priority"
            value={formData.priority}
            onChange={handleChange}
            options={[
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
            ]}
          />
        </div>

        {/* Due Date */}
        <div className="flex flex-col">
          <DatePicker
            id="dueDate"
            name="dueDate"
            value={
              formData.dueDate instanceof Date
                ? formData.dueDate.toISOString().slice(0, 16) // "YYYY-MM-DDTHH:mm"
                : formData.dueDate || ""
            }
            onChange={handleChange}
            className="rounded-lg border border-gray-200 bg-white text-amber-300 shadow-sm hover:shadow-md transition-shadow"
          />
        </div>
      </div>

      {/* Add Task Button */}
      <Button type="submit" variant="primary">
        Add Task
      </Button>
    </form>
  );
};
