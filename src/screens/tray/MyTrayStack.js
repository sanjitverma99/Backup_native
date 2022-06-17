import React, { useContext } from "react";
import { appTheme } from "../../config";
import ScreenContext from "../../ScreenContext";
import Header from "../../component/Header";
import MyTray from "./MyTray";

function MyTrayStack() {
  const { Stack } = useContext(ScreenContext);
  return (
    <Stack.Navigator screenOptions={{ presentation: "card", Header: "screen" }}>
      <Stack.Screen
        name="myTray"
        component={MyTray}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="My Tray"
              navigation={navigation}
              search
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

export default MyTrayStack;
