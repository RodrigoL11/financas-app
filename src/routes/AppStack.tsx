import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Wallets from "../screens/Wallets";

const { Navigator, Screen } = createNativeStackNavigator();

export function App() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Wallets" component={Wallets} />
    </Navigator>
  );
}
