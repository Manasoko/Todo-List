export interface Task {
    _id: string | number,
    taskName: string,
    description: string,
    dueDate: Date,
    priority: TaskPriority,
    completed: boolean
}
export type TaskPriority = "low" | "medium" | "high";
