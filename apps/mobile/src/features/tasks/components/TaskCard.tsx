import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Task } from '@/features/tasks/types/task';
import { formatTaskDate } from '@/features/tasks/utils/formatDate';
import { colors, spacing, typography } from '@/theme';

type TaskCardProps = {
  task: Task;
  onPress: () => void;
  onToggleComplete: () => void;
};

export function TaskCard({ task, onPress, onToggleComplete }: TaskCardProps) {
  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: task.completed }}
        accessibilityLabel={task.completed ? 'Mark task active' : 'Mark task complete'}
        onPress={onToggleComplete}
        hitSlop={8}
        style={styles.checkboxHit}
      >
        <View style={[styles.checkbox, task.completed && styles.checkboxDone]}>
          {task.completed ? <View style={styles.checkboxInner} /> : null}
        </View>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityHint="Opens task details"
        onPress={onPress}
        style={({ pressed }) => [styles.content, pressed && styles.pressed]}
      >
        <Text style={[styles.title, task.completed && styles.titleDone]} numberOfLines={1}>
          {task.title}
        </Text>
        {task.description ? (
          <Text style={styles.description} numberOfLines={2}>
            {task.description}
          </Text>
        ) : null}
        <Text style={styles.meta}>
          {task.completed ? `Done · ${formatTaskDate(task.completed_at)}` : formatTaskDate(task.created_at)}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  checkboxHit: {
    paddingTop: 2,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  checkboxDone: {
    borderColor: colors.success,
    backgroundColor: colors.success,
  },
  checkboxInner: {
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    gap: 4,
  },
  pressed: {
    opacity: 0.85,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  description: {
    ...typography.caption,
    color: colors.textMuted,
  },
  meta: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
});
