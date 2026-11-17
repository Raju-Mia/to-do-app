import { StyleSheet, View } from 'react-native';

import { TextField } from '@/components/TextField';
import { spacing } from '@/theme';

export type TaskFormValues = {
  title: string;
  description: string;
};

type TaskFormProps = {
  values: TaskFormValues;
  titleError?: string;
  onChange: (values: TaskFormValues) => void;
};

export function TaskForm({ values, titleError, onChange }: TaskFormProps) {
  return (
    <View style={styles.wrap}>
      <TextField
        label="Title"
        value={values.title}
        onChangeText={(title) => onChange({ ...values, title })}
        placeholder="What do you need to do?"
        error={titleError}
        returnKeyType="next"
      />

      <TextField
        label="Description"
        value={values.description}
        onChangeText={(description) => onChange({ ...values, description })}
        placeholder="Optional details"
        multiline
        style={styles.description}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.md,
  },
  description: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
});
