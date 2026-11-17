import type { Task, TaskFilter } from '../types/task';

export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  if (filter === 'active') {
    return tasks.filter((task) => !task.completed);
  }

  if (filter === 'completed') {
    return tasks.filter((task) => task.completed);
  }

  return tasks;
}

export function sortTasksNewestFirst(tasks: Task[]): Task[] {
  return [...tasks].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}
