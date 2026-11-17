import { useTaskStore } from '@/features/tasks/store/taskStore';

export function useTasks() {
  const hasHydrated = useTaskStore((state) => state.hasHydrated);
  const filter = useTaskStore((state) => state.filter);
  const search = useTaskStore((state) => state.search);
  const tasks = useTaskStore((state) => state.tasks);
  const setFilter = useTaskStore((state) => state.setFilter);
  const setSearch = useTaskStore((state) => state.setSearch);
  const getVisibleTasks = useTaskStore((state) => state.getVisibleTasks);

  return {
    hasHydrated,
    filter,
    search,
    taskCount: tasks.length,
    tasks: getVisibleTasks(),
    setFilter,
    setSearch,
  };
}
