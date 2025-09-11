import { Router } from "express";
import type { Task, TaskPriority } from "../types/task.js";
import TaskModel from "../models/task.js";

const router = Router();

router.get("/tasks", async (req, res) => {
  const tasks: Task[] = await TaskModel.find();
  if (tasks.length > 0) {
    return res.json(tasks);
  }
  return res.status(200).json({ message: "No tasks found" });
});

router.post("/task", async (req, res) => {
  const taskName: string = req.body.name;
  const dueDate: Date = req.body.date;
  const priority: TaskPriority = req.body.priority || "medium";
  await TaskModel.create({
    title: taskName,
    dueDate: dueDate,
    priority: priority,
  });
  res.status(201).json({ message: "Task added successfully" });
});

router.put("/task/:id", async (req, res) => {
  const reqId: string = req.params.id;

  const task = await TaskModel.findById(reqId);
  const newTaskName: string = req.body.name || task?.title;
  const newDueDate: string = req.body.date || task?.dueDate;
  const newPriority: TaskPriority = req.body.priority || task?.priority;

  if (task) {
    task.title = newTaskName;
    task.dueDate = newDueDate;
    task.priority = newPriority;
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

export default router;
