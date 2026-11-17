import { ReactNode } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { EmptyState } from '@/components/EmptyState';
import { TaskCard } from '@/features/tasks/components/TaskCard';
import type { Task } from '@/features/tasks/types/task';
import { spacing } from '@/theme';

type TaskListProps = {
  tasks: Task[];
  totalCount: number;
  onPressTask: (task: Task) => void;
  onToggleComplete: (task: Task) => void;
  emptyAction?: ReactNode;
};

export function TaskList({
  tasks,
  totalCount,
  onPressTask,
  onToggleComplete,
  emptyAction,
}: TaskListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <EmptyState
          title={totalCount === 0 ? 'No tasks yet' : 'No matching tasks'}
          message={
            totalCount === 0
              ? 'Create your first task to get started.'
              : 'Try a different filter or search.'
          }
          action={totalCount === 0 ? emptyAction : undefined}
        />
      }
      renderItem={({ item }) => (
        <TaskCard
          task={item}
          onPress={() => onPressTask(item)}
          onToggleComplete={() => onToggleComplete(item)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    paddingBottom: spacing.md,
  },
  separator: {
    height: spacing.sm,
  },
});
