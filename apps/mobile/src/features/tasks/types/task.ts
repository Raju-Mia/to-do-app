export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
};

export type TaskFilter = 'all' | 'active' | 'completed';
