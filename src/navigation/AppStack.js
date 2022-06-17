import React, { useContext } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ScreenContext from "../ScreenContext";
import { appTheme } from "../config";
import AppMenu from "./AppMenu";
import OverviewStack from "../screens/overview/OverviewStack";
import MyTrayStack from "../screens/tray/MyTrayStack";
import NotificationsStack from "../screens/notifications/NotificationsStack";
import UserStack from "../screens/user/UserStack";
import STRStack from "../screens/str/STRStack";
import CasesStack from "../screens/pendingcases/CasesStack";
import Logout from "../screens/logout/Logout";
const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  drawer: {
    backgroundColor: appTheme.COLORS.WHITE,
    width: width * 0.8,
  },
});

function AppStack(props) {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      style={styles.navigator}
      drawerContent={(props) => <AppMenu {...props} />}
      drawerStyle={styles.drawer}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Overview"
    >
      <Drawer.Screen name="Overview" component={OverviewStack} />
      <Drawer.Screen name="Logout" component={Logout} />
      <Drawer.Screen name="MyTray" component={MyTrayStack} />
      <Drawer.Screen name="User" component={UserStack} />
      <Drawer.Screen name="Cases" component={CasesStack} />
      <Drawer.Screen name="STR" component={STRStack} />
    </Drawer.Navigator>
  );
}

export default AppStack;
