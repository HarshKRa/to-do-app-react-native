import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Header } from "./components/header/Header";
import { CardToDo } from "./components/cardToDo/CardToDo";
import { useState } from "react";

// const tododata = [
//   { id: 1, title: "Walk the dog", isCompleted: true },
//   { id: 2, title: "Go to the dentist", isCompleted: false },
//   { id: 3, title: "Learn React Native", isCompleted: true },
// ];

export default function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Walk the dog", isCompleted: true },
    { id: 2, title: "Go to the dentist", isCompleted: false },
    { id: 3, title: "Learn React Native", isCompleted: true },
    { id: 6, title: "Walk the dog", isCompleted: true },
    { id: 7, title: "Go to the dentist", isCompleted: false },
    { id: 8, title: "Learn React Native", isCompleted: true },
    { id: 9, title: "Walk the dog", isCompleted: true },
    { id: 10, title: "Go to the dentist", isCompleted: false },
    { id: 11, title: "Learn React Native", isCompleted: true },
  ]);

  function renderTodoList() {
    return todoList.map((todo) => (
      <View key={todo.id} style={s.cardItem}>
        <CardToDo todo={todo} />
      </View>
    ));
  }
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            {/* <Text>Body</Text> */}
            <ScrollView>{renderTodoList()}</ScrollView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.fotter}>
        <Text>Fotter</Text>
      </View>
    </>
  );
}
