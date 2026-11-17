import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Button } from '@/components/Button';
import { LoadingView } from '@/components/LoadingView';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { TaskFilters } from '@/features/tasks/components/TaskFilters';
import { TaskList } from '@/features/tasks/components/TaskList';
import { useTaskActions } from '@/features/tasks/hooks/useTaskActions';
import { useTasks } from '@/features/tasks/hooks/useTasks';
import { colors, spacing, typography } from '@/theme';

export default function TaskListScreen() {
  const router = useRouter();
  const { hasHydrated, filter, search, tasks, taskCount, setFilter, setSearch } = useTasks();
  const { toggleComplete } = useTaskActions();

  if (!hasHydrated) {
    return (
      <Screen style={styles.flex}>
        <LoadingView message="Loading tasks…" />
      </Screen>
    );
  }

  return (
    <Screen style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.heading}>Your tasks</Text>
        <Text style={styles.subheading}>
          {taskCount === 0
            ? 'Saved on this phone — no login needed.'
            : `${taskCount} task${taskCount === 1 ? '' : 's'} saved locally.`}
        </Text>
      </View>

      <TextField
        label="Search"
        value={search}
        onChangeText={setSearch}
        placeholder="Search title or description"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />

      <TaskFilters value={filter} onChange={setFilter} />

      <TaskList
        tasks={tasks}
        totalCount={taskCount}
        onPressTask={(task) => router.push(`/tasks/${task.id}`)}
        onToggleComplete={(task) => toggleComplete(task.id)}
        emptyAction={<Button label="Create First Task" onPress={() => router.push('/tasks/new')} />}
      />

      <Button label="New Task" onPress={() => router.push('/tasks/new')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  screen: {
    flex: 1,
    paddingBottom: spacing.lg,
  },
  header: {
    gap: spacing.xs,
  },
  heading: {
    ...typography.title,
    color: colors.text,
  },
  subheading: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
