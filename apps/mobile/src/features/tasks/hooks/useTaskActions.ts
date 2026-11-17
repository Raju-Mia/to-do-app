import { useTaskStore } from '@/features/tasks/store/taskStore';

export function useTaskActions() {
  const createTask = useTaskStore((state) => state.createTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const toggleComplete = useTaskStore((state) => state.toggleComplete);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const getTaskById = useTaskStore((state) => state.getTaskById);

  return {
    createTask,
    updateTask,
    toggleComplete,
    deleteTask,
    getTaskById,
  };
}
