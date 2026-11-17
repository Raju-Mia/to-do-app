import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useTaskStore } from '@/features/tasks/store/taskStore';
import { colors } from '@/theme';

export default function RootLayout() {
  useEffect(() => {
    const markHydrated = () => {
      useTaskStore.getState().setHasHydrated(true);
    };

    const unsubscribe = useTaskStore.persist.onFinishHydration(markHydrated);

    if (useTaskStore.persist.hasHydrated()) {
      markHydrated();
    }

    return unsubscribe;
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '600' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Tasks' }} />
        <Stack.Screen name="tasks/new" options={{ title: 'New Task' }} />
        <Stack.Screen name="tasks/[id]" options={{ title: 'Edit Task' }} />
      </Stack>
    </>
  );
}
