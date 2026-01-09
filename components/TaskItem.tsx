import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <View style={[styles.item, task.completed && styles.itemDone]}>
      <TouchableOpacity style={styles.left} activeOpacity={0.8} onPress={() => onToggle(task.id)}>
        <View style={[styles.checkbox, task.completed && styles.checkboxDone]} />
        <View style={styles.textBlock}>
          <Text numberOfLines={2} style={[styles.title, task.completed && styles.titleDone]}>
            {task.title}
          </Text>
          <View style={[styles.statusPill, task.completed ? styles.statusCompleted : styles.statusPending]}>
            <Text style={styles.statusText}>{task.completed ? "Completed" : "Pending"}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} activeOpacity={0.8} onPress={() => onDelete(task.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EEF2F7",
  },
  itemDone: {
    backgroundColor: "#F6FAF7",
    borderColor: "#DDF1E3",
  },
  left: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    marginRight: 10,
    backgroundColor: "#FFFFFF",
  },
  checkboxDone: {
    borderColor: "#16A34A",
    backgroundColor: "#16A34A",
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },
  titleDone: {
    textDecorationLine: "line-through",
    color: "#64748B",
  },
  statusPill: {
    alignSelf: "flex-start",
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusPending: {
    backgroundColor: "#F1F5F9",
  },
  statusCompleted: {
    backgroundColor: "#DCFCE7",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#334155",
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  deleteText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#DC2626",
  },
});
