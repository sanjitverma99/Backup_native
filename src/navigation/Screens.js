import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import LoadingScreen from "../component/LoadingScreen";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import authService from "../service/AuthService";
import NotificationsStack from "../screens/notifications/NotificationsStack";
import CasesStack from "../screens/pendingcases/CasesStack";

function Screens() {
  // const { Stack } = useContext(ScreenContext);
  const [authCheckCompleted, setAuthCheckComplated] = useState(false);
  const user = useSelector(({ auth }) => auth.auth);
  const Stack = createStackNavigator();
  // const Stack = createNativeStackNavigator();
  useEffect(() => {
    authService.handleAuthentication().then(() => {
      setAuthCheckComplated(true);
    });
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{ headerMode: "none", presentation: "card" }}
    >
      {!authCheckCompleted ? (
        <Stack.Screen name="Loading" component={LoadingScreen} />
      ) : !user.username || user.username === null ? (
        <Stack.Screen name="Auth" component={AuthStack} />
      ) : (
        <>
          <Stack.Screen name="App" component={AppStack} />
        </>
      )}
    </Stack.Navigator>
  );
}
export default Screens;
