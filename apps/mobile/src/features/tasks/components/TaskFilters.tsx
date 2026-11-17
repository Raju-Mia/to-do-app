import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { TaskFilter } from '@/features/tasks/types/task';
import { colors, spacing, typography } from '@/theme';

const FILTERS: { key: TaskFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

type TaskFiltersProps = {
  value: TaskFilter;
  onChange: (filter: TaskFilter) => void;
};

export function TaskFilters({ value, onChange }: TaskFiltersProps) {
  return (
    <View style={styles.row}>
      {FILTERS.map((item) => {
        const active = value === item.key;
        return (
          <Pressable
            key={item.key}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(item.key)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    backgroundColor: colors.chip,
  },
  chipActive: {
    backgroundColor: colors.chipActive,
  },
  chipText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.text,
  },
  chipTextActive: {
    color: colors.chipActiveText,
  },
});
