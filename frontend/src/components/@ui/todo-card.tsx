import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from './utils'

'use client'


interface TodoCardProps {
    title: string
    description: string
    dueDate: string
    priority: 'low' | 'medium' | 'high'
    onDelete?: () => void
    onToggleComplete?: () => void
    onClick?: () => void
    isCompleted?: boolean
}

export const TodoCard = ({
    title,
    description,
    dueDate,
    priority,
    onDelete,
    onClick,
    onToggleComplete,
    isCompleted = false
}: TodoCardProps) => {
    const [isHovered, setIsHovered] = useState(false)

    const priorityColor = {
        low: 'bg-green-100 text-green-800',
        medium: 'bg-yellow-100 text-yellow-800',
        high: 'bg-red-100 text-red-800 font-semibold'
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className={cn(
                'relative p-4 rounded-lg border border-gray-200 shadow-sm',
                'bg-white transition-all duration-200',
                isCompleted && 'bg-gray-50'
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-start gap-3" onClick={onClick}>
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={onToggleComplete}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    readOnly
                />
                <div>
                    <div className="flex-1">
                        <h3 
                            className={cn(
                                "font-bold text-lg mb-1",
                                isCompleted && "line-through text-gray-500"
                            )}
                        >
                            {title}
                        </h3>
                        <p 
                            className={cn(
                                "text-gray-600 mb-2",
                                isCompleted && "line-through text-gray-400"
                            )}
                        >
                            {description}
                        </p>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="text-gray-500">Due: {dueDate}</span>
                            <span 
                                className={cn(
                                    'px-2 py-1 rounded-full text-xs',
                                    priorityColor[priority]
                                )}
                            >
                                {priority}
                            </span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onDelete}
                    className={cn(
                        'p-1 rounded-full transition-opacity duration-200',
                        'hover:bg-red-100 hover:text-red-600',
                        isHovered ? 'opacity-100' : 'opacity-0'
                    )}
                >
                    <X size={16} />
                </button>
            </div>
        </motion.div>
    )
};