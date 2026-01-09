import { View, Text, FlatList, StyleSheet, StatusBar, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";
import AddTask from "../../components/AddTask";
import TaskItem, { type Task } from "../../components/TaskItem";

const STORAGE_KEY = "TASK_MANAGER_TASKS_V1";

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const hydrate = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (cancelled) return;

        if (!raw) {
          setIsHydrated(true);
          return;
        }

        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          const cleaned: Task[] = parsed
            .filter((t) => t && typeof t === "object")
            .map((t: any) => ({
              id: String(t.id),
              title: typeof t.title === "string" ? t.title : "",
              completed: Boolean(t.completed),
            }))
            .filter((t) => t.title.length > 0);

          setTasks(cleaned);
        }

        setIsHydrated(true);
      } catch {
        setIsHydrated(true);
      }
    };

    hydrate();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const persist = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch {
        // ignore write errors
      }
    };

    persist();
  }, [isHydrated, tasks]);

  const counts = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    return { total, completed, pending: total - completed };
  }, [tasks]);

  const addTask = (title: string) => {
    setTasks((prev) => [...prev, { id: Date.now().toString(), title, completed: false }]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Task Manager</Text>
        <Text style={styles.subheading}>
          {counts.total === 0
            ? "Add your first task"
            : `${counts.pending} pending • ${counts.completed} completed`}
        </Text>
      </View>

      <AddTask onAdd={addTask} />

      <FlatList<Task>
        data={tasks}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet. Add one above.</Text>}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={toggleTask} onDelete={deleteTask} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 12 : 18,
  },
  header: {
    marginBottom: 12,
    paddingTop: 6,
    paddingBottom: 6,
  },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },
  subheading: {
    marginTop: 6,
    fontSize: 14,
    color: "#64748B",
    fontWeight: "600",
  },
  listContent: {
    paddingBottom: 20,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    opacity: 0.65,
    color: "#475569",
    fontWeight: "600",
  },
});
