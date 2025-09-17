import mongoose from "mongoose";
import type { Task } from "../types/task";

const { Schema, model } = mongoose;

const taskSchema = new Schema<Task>(
  {
    taskName: { type: String, required: true },
    description: { type: String, required: false },
    dueDate: { type: Date, required: true },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const TaskModel = model<Task>("Task", taskSchema);

export default TaskModel;
