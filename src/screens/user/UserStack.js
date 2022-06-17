import React, { useContext } from "react";
import { appTheme } from "../../config";
import ScreenContext from "../../ScreenContext";
import Header from "../../component/Header";
import User from "./User";

function UserStack() {
  const { Stack } = useContext(ScreenContext);
  return (
    <Stack.Navigator screenOptions={{ presentation: "card", Header: "screen" }}>
      <Stack.Screen
        name="user"
        component={User}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              navigation={navigation}
              title="User"
              // persieve
              scene={scene}
              bgColor="#fff"
              titleColor={appTheme.COLORS.GREY}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default UserStack;
