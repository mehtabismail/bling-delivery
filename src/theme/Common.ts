/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from "react-native";
import buttonStyles from "./components/Buttons";

export default function <any>({ Colors, ...args }: any) {
  return {
    button: { backgroundColor: Colors.transparent },
  };
}
