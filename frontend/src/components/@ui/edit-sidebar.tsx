import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

import { Input, TextArea, Select } from "./inputs";
import { Button } from "./button";
import type { TodoData } from "../../types/TodoData";

interface EditSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (todoData: TodoData) => Promise<void>;
  todo: TodoData;
}

const EditSidebar: React.FC<EditSidebarProps> = ({
  isOpen,
  onClose,
  onSave,
  todo,
}) => {
  const [formData, setFormData] = useState<TodoData>({
    taskName: todo.taskName,
    description: todo.description,
    priority: todo.priority,
    dueDate: todo.dueDate,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const sidebar = document.querySelector(".edit-sidebar");

      if (isOpen && sidebar && !sidebar.contains(target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Reset formData and errors when todo or isOpen changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        taskName: todo.taskName,
        description: todo.description,
        priority: todo.priority,
        dueDate: todo.dueDate,
      });
      setErrors({});
      setGeneralError("");
      setIsLoading(false);
    }
  }, [todo, isOpen]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate taskName
    if (!formData.taskName.trim()) {
      newErrors.taskName = "Task name is required";
    } else if (formData.taskName.length > 100) {
      newErrors.taskName = "Task name cannot exceed 100 characters";
    }

    // Validate date
    if (!formData.dueDate) {
      newErrors.date = "Due date is required";
    } else {
      const today = new Date();
      if (formData.dueDate < today) {
        newErrors.date = "Due date cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");
    setIsLoading(true);

    // Validate form
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      await onSave({ ...formData, _id: todo._id });
      onClose();
    } catch (error) {
      setGeneralError("Failed to save todo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleReset = () => {
    setFormData({
      taskName: todo.taskName,
      description: todo.description,
      priority: todo.priority,
      dueDate: todo.dueDate,
    });
    setErrors({});
    setGeneralError("");
    setIsLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-6 edit-sidebar"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Edit Todo</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
              disabled={isLoading}
            >
              <IoClose size={24} />
            </button>
          </div>

          {generalError && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
              {generalError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Task Name</label>
              <Input
                type="text"
                name="taskName"
                value={formData.taskName}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.taskName ? "border-red-500" : ""
                }`}
                required
                disabled={isLoading}
              />
              {errors.taskName && (
                <p className="text-red-500 text-sm mt-1">{errors.taskName}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">Description</label>
              <TextArea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded h-32"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block mb-1">Priority</label>
              <Select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                disabled={isLoading}
                options={[
                  { label: "Low", value: "low" },
                  { label: "Medium", value: "medium" },
                  { label: "High", value: "high" },
                ]}
              />
            </div>

            <div>
              <label className="block mb-1">Due Date</label>
              <input
                type="datetime-local"
                name="dueDate"
                value={
                  formData.dueDate instanceof Date
                    ? formData.dueDate.toISOString().slice(0, 16) // "YYYY-MM-DDTHH:mm"
                    : formData.dueDate || ""
                }
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.date ? "border-red-500" : ""
                }`}
                required
                disabled={isLoading}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>

            <div className="flex space-x-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-gray-800"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
              <Button
                type="reset"
                variant="secondary"
                size="md"
                onClick={handleReset}
                disabled={isLoading}
              >
                Reset
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditSidebar;
