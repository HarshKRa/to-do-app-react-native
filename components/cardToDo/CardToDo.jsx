import { Image, Text, TouchableOpacity } from "react-native";
import { s } from "./CardToDo.style";
import checkImg from "../../assets/check.png";

export function CardToDo({ todo }) {
  return (
    <TouchableOpacity style={s.card}>
      <Text
        style={[
          s.title,
          todo.isCompleted && { textDecorationLine: "line-through" },
        ]}
      >
        {todo.title}
      </Text>
      {todo.isCompleted && <Image style={s.img} source={checkImg} />}
    </TouchableOpacity>
  );
}
