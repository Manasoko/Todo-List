import { Router } from "express";
import type { Task, TaskPriority } from "../types/task.js";
import TaskModel from "../models/task.js";

const router = Router();

router.get("/tasks", async (req, res) => {
  const tasks: Task[] = await TaskModel.aggregate([
  {
    $addFields: {
      priorityValue: {
        $switch: {
          branches: [
            { case: { $eq: ["$priority", "high"] }, then: 3 },
            { case: { $eq: ["$priority", "medium"] }, then: 2 },
            { case: { $eq: ["$priority", "low"] }, then: 1 }
          ],
          default: 0
        }
      }
    }
  },
  {
    $sort: {
      completed: 1, 
      priorityValue: -1, 
      createdAt: -1  
    }
  }
]);

  if (tasks.length > 0) {
    return res.json(tasks);
  }
  return res.status(200).json({ message: "No tasks found" });
});

router.post("/task", async (req, res) => {
  const taskName: string = req.body.taskName;
  const description: string = req.body.description || "";
  const dueDate: Date = req.body.dueDate;
  const priority: TaskPriority = req.body.priority || "medium";
  await TaskModel.create({
    taskName: taskName,
    description: description,
    dueDate: dueDate,
    priority: priority,
  });
  res.status(201).json({ message: "Task added successfully" });
});

router.put("/task/:id", async (req, res) => {
  const reqId: string = req.params.id;

  const task = await TaskModel.findById(reqId);
  if (!req.body) {
    return res.status(400).json({ message: "No data provided" });
  }

  const newTaskName: string = req.body.name || task?.taskName;
  const newDueDate: Date = req.body.date || task?.dueDate;
  const newPriority: TaskPriority = req.body.priority || task?.priority;
  const newDescription: string = req.body.description || task?.description;

  if (task) {
    task.taskName = newTaskName;
    task.dueDate = newDueDate;
    task.priority = newPriority;
    task.description = newDescription;
    await task.save();
    return res.status(201).json({ message: "Task updated successfully" });
  } else {
    return res.status(404).json({ message: "Task not found" });
  }
});

router.delete("/task/:id", async (req, res) => {
  const reqId: string = req.params.id;
  const task = await TaskModel.findById(reqId);
  if (task) {
    await TaskModel.deleteOne({ _id: reqId });
    return res.status(200).json({ message: "Task deleted successfully" });
  } else {
    return res.status(404).json({ message: "Task not found" });
  }
});

router.patch("/task/:id/toggle", async (req, res) => {
  const reqId: string = req.params.id;
  const task = await TaskModel.findById(reqId);
  if (task) {
    task.completed = !task.completed;
    await task.save();
    return res.status(200).json({ message: "Task completion toggled" });
  } else {
    return res.status(404).json({ message: "Task not found" });
  }
});

export default router;
