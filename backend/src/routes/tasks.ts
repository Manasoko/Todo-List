import { Router } from "express";
import type { Task } from "../types/task";

const tasks: Array<Task> = [];

const router = Router();

router.get("/tasks", (req, res) => {
  if (tasks.length > 0) {
    return res.json(tasks);
  }
  return res.status(200).json({ message: "No tasks found" });
});

router.post("/task", (req, res) => {
  const taskName = req.body.name;
  const dueDate = req.body.date;
  tasks.push({
    id: tasks.length + 1,
    name: taskName,
    dueDate: dueDate,
    completed: false,
  });
  res.status(201).json({ message: "Task added successfully" });
});

router.put("/task/:id", (req, res) => {
  const reqId: number = Number(req.params.id);
  const newTaskName = req.body.name;
  const newDueDate = req.body.date;
  const task = tasks.find((task) => task.id === reqId);
  if (task) {
    task.name = newTaskName;
    task.dueDate = newDueDate;
    console.log(tasks);
    return res.status(201).json({ message: "Task updated successfully", tasks });
  } else {
    return res.status(404).json({ message: "Task not found" });
  }
});

router.delete("/task/:id", (req, res) => {
  const reqId: number = Number(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === reqId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    return res.status(200).json({ message: "Task deleted successfully", tasks });
  } else {
    return res.status(404).json({ message: "Task not found" });
  }
});

export default router;
