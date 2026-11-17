import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Button } from '@/components/Button';
import { ErrorView } from '@/components/ErrorView';
import { LoadingView } from '@/components/LoadingView';
import { Screen } from '@/components/Screen';
import { TaskForm, type TaskFormValues } from '@/features/tasks/components/TaskForm';
import { TaskMeta } from '@/features/tasks/components/TaskMeta';
import { useTaskActions } from '@/features/tasks/hooks/useTaskActions';
import { useTaskStore } from '@/features/tasks/store/taskStore';
import { colors, spacing, typography } from '@/theme';

export default function EditTaskScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const hasHydrated = useTaskStore((state) => state.hasHydrated);
  const task = useTaskStore((state) => state.tasks.find((item) => item.id === id));
  const { updateTask, toggleComplete, deleteTask } = useTaskActions();

  const [values, setValues] = useState<TaskFormValues>({ title: '', description: '' });
  const [titleError, setTitleError] = useState('');
  const [initialized, setInitialized] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!task || initialized) {
      return;
    }

    setValues({ title: task.title, description: task.description });
    setInitialized(true);
  }, [task, initialized]);

  if (!hasHydrated) {
    return (
      <Screen style={styles.flex}>
        <LoadingView message="Loading task…" />
      </Screen>
    );
  }

  if (!task) {
    return (
      <Screen style={styles.flex}>
        <ErrorView
          title="Task not found"
          message="This task may have been deleted."
          actionLabel="Back to list"
          onAction={() => router.replace('/')}
        />
      </Screen>
    );
  }

  const onSave = () => {
    setSaving(true);
    const result = updateTask(task.id, values);

    if (!result.ok) {
      setTitleError(result.error);
      setSaving(false);
      return;
    }

    setTitleError('');
    router.back();
  };

  const onDelete = () => {
    Alert.alert('Delete task?', `"${task.title}" will be removed permanently.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const result = deleteTask(task.id);
          if (result.ok) {
            router.replace('/');
          } else {
            Alert.alert('Could not delete', result.error);
          }
        },
      },
    ]);
  };

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.heading}>Edit task</Text>
        <Text style={styles.subheading}>Update details, toggle completion, or delete.</Text>
      </View>

      <TaskMeta task={task} />

      <TaskForm
        values={values}
        titleError={titleError}
        onChange={(next) => {
          setValues(next);
          if (titleError) setTitleError('');
        }}
      />

      <Button
        label={task.completed ? 'Mark as Active' : 'Mark as Complete'}
        variant="secondary"
        onPress={() => toggleComplete(task.id)}
        disabled={saving}
      />
      <Button label="Save Changes" onPress={onSave} disabled={saving} />
      <Button label="Delete Task" variant="danger" onPress={onDelete} disabled={saving} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  header: {
    gap: spacing.xs,
    marginBottom: spacing.sm,
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
