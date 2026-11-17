import { StyleSheet, Text, View } from 'react-native';

import type { Task } from '@/features/tasks/types/task';
import { formatTaskDate } from '@/features/tasks/utils/formatDate';
import { colors, spacing, typography } from '@/theme';

type TaskMetaProps = {
  task: Task;
};

export function TaskMeta({ task }: TaskMetaProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.row}>
        Status: <Text style={styles.value}>{task.completed ? 'Completed' : 'Active'}</Text>
      </Text>
      <Text style={styles.row}>
        Created: <Text style={styles.value}>{formatTaskDate(task.created_at)}</Text>
      </Text>
      <Text style={styles.row}>
        Updated: <Text style={styles.value}>{formatTaskDate(task.updated_at)}</Text>
      </Text>
      {task.completed ? (
        <Text style={styles.row}>
          Completed: <Text style={styles.value}>{formatTaskDate(task.completed_at)}</Text>
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    ...typography.caption,
    color: colors.textMuted,
  },
  value: {
    color: colors.text,
    fontWeight: '600',
  },
});
