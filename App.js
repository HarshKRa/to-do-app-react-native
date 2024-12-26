import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Header } from "./components/header/Header";
import { CardToDo } from "./components/cardToDo/CardToDo";
import { useEffect, useRef, useState } from "react";
import { TabButtonMenu } from "./components/TabButtonMenu/TabButtonMenu";
import { ButtonAdd } from "./components/ButtonAdd/ButtonAdd";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const tododata = [
//   { id: 1, title: "Walk the dog", isCompleted: true },
//   { id: 2, title: "Go to the dentist", isCompleted: false },
//   { id: 3, title: "Learn React Native", isCompleted: true },
// ];

let isFirstRender = true;
let isLoadUpdate = false;

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [selectedTabName, setSeectedTabName] = useState("all");
  const [isAddDialogDisplayed, setIsAddDialogDisplayed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const scrollViewRef = useRef();

  useEffect(() => {
    loadTodoList();
  }, []);

  useEffect(() => {
    if (!isLoadUpdate) {
      if (!isFirstRender) saveTodoList();
      else isFirstRender = false;
    } else {
      isLoadUpdate = false;
    }
  }, [todoList]);

  async function loadTodoList() {
    try {
      const todoListString = await AsyncStorage.getItem("@todoList");
      const data = JSON.parse(todoListString);
      setTodoList(data || []);
      isLoadUpdate = true;
    } catch (error) {
      alert("error");
    }
  }

  async function saveTodoList() {
    try {
      await AsyncStorage.setItem("@todoList", JSON.stringify(todoList));
    } catch (error) {
      alert("error");
    }
  }

  function getFillteredList() {
    switch (selectedTabName) {
      case "all":
        return todoList;
      case "inProgress":
        return todoList.filter((todo) => !todo.isCompleted);
      case "done":
        return todoList.filter((todo) => todo.isCompleted);
    }
  }

  function renderTodoList() {
    return getFillteredList().map((todo) => (
      <View key={todo.id} style={s.cardItem}>
        <CardToDo onLongPress={deleteTodo} onPress={updateTodo} todo={todo} />
      </View>
    ));

    function updateTodo(todo) {
      const updateTodo = { ...todo, isCompleted: !todo.isCompleted };
      const updatedTodoList = [...todoList];
      const indexToUpdate = updatedTodoList.findIndex(
        (t) => t.id === updateTodo.id
      );

      updatedTodoList[indexToUpdate] = updateTodo;
      setTodoList(updatedTodoList);
    }
  }
  function deleteTodo(todoToDelete) {
    Alert.alert("Delete Todo", "Are you sure to delet this todo ?", [
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setTodoList(todoList.filter((t) => t.id !== todoToDelete.id));
        },
      },
      { text: "Cancel", style: "cancel", onPress: () => {} },
    ]);
  }

  function addTodo() {
    // if (inputValue.toString.length == 0) Alert.alert("Empty title can't add");
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
    };

    setTodoList([...todoList, newTodo]);
    setIsAddDialogDisplayed(false);
    setInputValue("");

    setTimeout(() => {
      scrollViewRef.current.scrollToEnd();
    }, 800);
  }

  function renderAddDialog() {
    return (
      <Dialog.Container
        visible={isAddDialogDisplayed}
        onBackdropPress={() => setIsAddDialogDisplayed(false)}
      >
        <Dialog.Title>Add Todo</Dialog.Title>
        <Dialog.Description>Choose a name for your todo.</Dialog.Description>
        <Dialog.Input
          onChangeText={(text) => setInputValue(text)}
          placeholder="Ex: Go to the dentist"
        />
        <Dialog.Button
          label="Cancel"
          color="gray"
          onPress={() => setIsAddDialogDisplayed(false)}
        />
        <Dialog.Button
          disabled={inputValue.length === 0}
          label="Save"
          onPress={addTodo}
        />
      </Dialog.Container>
    );
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
            <ScrollView ref={scrollViewRef}>{renderTodoList()}</ScrollView>
          </View>
          <ButtonAdd onPress={() => setIsAddDialogDisplayed(true)} />
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.fotter}>
        <TabButtonMenu
          todoList={todoList}
          onPress={setSeectedTabName}
          selectedTabName={selectedTabName}
        />
      </View>
      {renderAddDialog()}
    </>
  );
}
