import React, { useContext } from "react";
import { appTheme } from "../../config";
import ScreenContext from "../../ScreenContext";
import Logout from "./Logout";
import Header from "../../component/Header";

function LogoutStack() {
  const { Stack } = useContext(ScreenContext);
  return (
    <Stack.Navigator screenOptions={{ presentation: "card", Header: "screen" }}>
      <Stack.Screen
        name="logout"
        component={Logout}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Logout"
              navigation={navigation}
              scene={scene}
              color="#000000"
              bgColor="#fff"
              titleColor={appTheme.COLORS.GREY}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default LogoutStack;
