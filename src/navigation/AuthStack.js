import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/auth/SignIn";

function AuthStack() {
  // const { Stack } = useContext(ScreenContext);
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerMode: "none", presentation: "card" }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}

export default AuthStack;
