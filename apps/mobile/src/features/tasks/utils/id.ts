export function createTaskId(): string {
  const random = Math.random().toString(36).slice(2, 10);
  return `task_${Date.now().toString(36)}_${random}`;
}
