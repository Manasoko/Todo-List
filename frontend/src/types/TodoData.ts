export interface TodoData {
    _id?: string;
    taskName: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: Date | string;
    completed?: boolean;
}