import React from "react";
import { useFonts } from "expo-font";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import Main from "./components/Main";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/font/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/font/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/font/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
