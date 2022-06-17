import React, { useContext } from "react";
import { appTheme } from "../../config";
import ScreenContext from "../../ScreenContext";
import Header from "../../component/Header";
import Notifications from "./Notifications";

function NotificationsStack() {
  const { Stack } = useContext(ScreenContext);
  return (
    <Stack.Navigator screenOptions={{ presentation: "card", Header: "screen" }}>
      <Stack.Screen
        name="Notification"
        component={Notifications}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              navigation={navigation}
              persieve
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

export default NotificationsStack;
