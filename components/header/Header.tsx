import { Image, StyleSheet, Text, View } from "react-native";
import { s } from "./Header.style";
import logoImg from "../../assets/logo.png";

export function Header() {
  return (
    <>
      <Image style={s.image} source={logoImg} resizeMode="contain" />
      <Text style={s.subtitle}>You probably have something to do</Text>
    </>
  );
}
