import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Button } from '@/components/Button';
import { Screen } from '@/components/Screen';
import { TaskForm, type TaskFormValues } from '@/features/tasks/components/TaskForm';
import { useTaskActions } from '@/features/tasks/hooks/useTaskActions';
import { colors, spacing, typography } from '@/theme';

export default function NewTaskScreen() {
  const router = useRouter();
  const { createTask } = useTaskActions();
  const [values, setValues] = useState<TaskFormValues>({ title: '', description: '' });
  const [titleError, setTitleError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onCreate = () => {
    setSubmitting(true);
    const result = createTask(values);

    if (!result.ok) {
      setTitleError(result.error);
      setSubmitting(false);
      return;
    }

    setTitleError('');
    router.back();
  };

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.heading}>Create task</Text>
        <Text style={styles.subheading}>Title is required. Description is optional.</Text>
      </View>

      <TaskForm
        values={values}
        titleError={titleError}
        onChange={(next) => {
          setValues(next);
          if (titleError) setTitleError('');
        }}
      />

      <Button label="Create Task" onPress={onCreate} disabled={submitting} />
      <Button label="Cancel" variant="secondary" onPress={() => router.back()} disabled={submitting} />
    </Screen>
  );
}

const styles = StyleSheet.create({
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
