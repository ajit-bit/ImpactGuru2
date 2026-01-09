import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState } from "react";

type Props = {
  onAdd: (title: string) => void;
};

export default function AddTask({ onAdd }: Props) {
  const [text, setText] = useState("");

  const submit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  };

  return (
    <View style={styles.row}>
      <TextInput
        placeholder="Add a task…"
        placeholderTextColor="#94A3B8"
        value={text}
        onChangeText={setText}
        style={styles.input}
        returnKeyType="done"
        onSubmitEditing={submit}
      />
      <TouchableOpacity style={styles.addButton} activeOpacity={0.85} onPress={submit}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    fontSize: 15,
    color: "#0F172A",
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "#2563EB",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});
