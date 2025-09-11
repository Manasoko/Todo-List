export interface Task {
    id: string | number,
    title: string,
    description: string,
    dueDate: string,
    priority: TaskPriority,
    completed: boolean
}
export type TaskPriority = "low" | "medium" | "high";
