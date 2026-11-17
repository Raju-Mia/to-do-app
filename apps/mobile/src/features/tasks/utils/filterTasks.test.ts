import type { Task } from '../types/task';
import { filterTasks, sortTasksNewestFirst } from './filterTasks';

const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Older',
    description: '',
    completed: false,
    created_at: '2026-01-01T10:00:00.000Z',
    updated_at: '2026-01-01T10:00:00.000Z',
    completed_at: null,
  },
  {
    id: '2',
    title: 'Newer done',
    description: '',
    completed: true,
    created_at: '2026-01-02T10:00:00.000Z',
    updated_at: '2026-01-02T11:00:00.000Z',
    completed_at: '2026-01-02T11:00:00.000Z',
  },
];

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(filterTasks(sampleTasks, 'all').length === 2, 'all filter failed');
assert(filterTasks(sampleTasks, 'active').length === 1, 'active filter failed');
assert(filterTasks(sampleTasks, 'completed').length === 1, 'completed filter failed');
assert(sortTasksNewestFirst(sampleTasks)[0]?.id === '2', 'newest-first sort failed');

console.log('filterTasks tests passed');
