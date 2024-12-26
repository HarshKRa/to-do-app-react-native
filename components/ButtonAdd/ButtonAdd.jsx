import { Image, Text, TouchableOpacity } from "react-native";
import { s } from "./ButoonAdd.style";

export function ButtonAdd({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={s.btn}>
      <Text style={s.text}>+ New todo</Text>
    </TouchableOpacity>
  );
}
