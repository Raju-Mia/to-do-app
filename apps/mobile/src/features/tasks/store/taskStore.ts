import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Task, TaskFilter } from '@/features/tasks/types/task';
import { nowIso } from '@/features/tasks/utils/dates';
import { filterTasks, sortTasksNewestFirst } from '@/features/tasks/utils/filterTasks';
import { createTaskId } from '@/features/tasks/utils/id';
import { storageKeys } from '@/lib/storage/keys';

const TITLE_MAX_LENGTH = 120;

export type CreateTaskInput = {
  title: string;
  description?: string;
};

export type UpdateTaskInput = {
  title: string;
  description?: string;
};

type TaskStoreState = {
  tasks: Task[];
  filter: TaskFilter;
  search: string;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  setFilter: (filter: TaskFilter) => void;
  setSearch: (search: string) => void;
  getVisibleTasks: () => Task[];
  getTaskById: (id: string) => Task | undefined;
  createTask: (input: CreateTaskInput) => { ok: true; task: Task } | { ok: false; error: string };
  updateTask: (
    id: string,
    input: UpdateTaskInput,
  ) => { ok: true; task: Task } | { ok: false; error: string };
  toggleComplete: (id: string) => { ok: true; task: Task } | { ok: false; error: string };
  deleteTask: (id: string) => { ok: true } | { ok: false; error: string };
};

function normalizeTitle(title: string): string {
  return title.trim();
}

function validateTitle(title: string): string | null {
  const normalized = normalizeTitle(title);

  if (!normalized) {
    return 'Title is required';
  }

  if (normalized.length > TITLE_MAX_LENGTH) {
    return `Title must be ${TITLE_MAX_LENGTH} characters or less`;
  }

  return null;
}

export const useTaskStore = create<TaskStoreState>()(
  persist(
    (set, get) => ({
      tasks: [],
      filter: 'all',
      search: '',
      hasHydrated: false,

      setHasHydrated: (value) => set({ hasHydrated: value }),

      setFilter: (filter) => set({ filter }),

      setSearch: (search) => set({ search }),

      getVisibleTasks: () => {
        const { tasks, filter, search } = get();
        const filtered = filterTasks(tasks, filter);
        const query = search.trim().toLowerCase();

        const searched = query
          ? filtered.filter(
              (task) =>
                task.title.toLowerCase().includes(query) ||
                task.description.toLowerCase().includes(query),
            )
          : filtered;

        return sortTasksNewestFirst(searched);
      },

      getTaskById: (id) => get().tasks.find((task) => task.id === id),

      createTask: (input) => {
        const titleError = validateTitle(input.title);
        if (titleError) {
          return { ok: false, error: titleError };
        }

        const timestamp = nowIso();
        const task: Task = {
          id: createTaskId(),
          title: normalizeTitle(input.title),
          description: (input.description ?? '').trim(),
          completed: false,
          created_at: timestamp,
          updated_at: timestamp,
          completed_at: null,
        };

        set((state) => ({ tasks: [task, ...state.tasks] }));
        return { ok: true, task };
      },

      updateTask: (id, input) => {
        const titleError = validateTitle(input.title);
        if (titleError) {
          return { ok: false, error: titleError };
        }

        const existing = get().getTaskById(id);
        if (!existing) {
          return { ok: false, error: 'Task not found' };
        }

        const updated: Task = {
          ...existing,
          title: normalizeTitle(input.title),
          description: (input.description ?? '').trim(),
          updated_at: nowIso(),
        };

        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? updated : task)),
        }));

        return { ok: true, task: updated };
      },

      toggleComplete: (id) => {
        const existing = get().getTaskById(id);
        if (!existing) {
          return { ok: false, error: 'Task not found' };
        }

        const completed = !existing.completed;
        const timestamp = nowIso();
        const updated: Task = {
          ...existing,
          completed,
          completed_at: completed ? timestamp : null,
          updated_at: timestamp,
        };

        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? updated : task)),
        }));

        return { ok: true, task: updated };
      },

      deleteTask: (id) => {
        const existing = get().getTaskById(id);
        if (!existing) {
          return { ok: false, error: 'Task not found' };
        }

        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));

        return { ok: true };
      },
    }),
    {
      name: storageKeys.tasks,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ tasks: state.tasks }),
      onRehydrateStorage: () => (_state, error) => {
        if (error) {
          console.warn('Failed to rehydrate tasks from storage', error);
        }

        // Runs after create() finishes, so the store reference is safe.
        useTaskStore.getState().setHasHydrated(true);
      },
    },
  ),
);
