import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import ScreenContext from "../../ScreenContext";
import Header from "../../component/Header";
import { appTheme } from "../../config";
import Overview from "./Overview";

function OverviewStack(props) {
  const user = useSelector(({ auth }) => auth.auth);
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ presentation: "card", headerMode: "screen" }}
    >
      <Stack.Screen
        name="overview"
        component={Overview}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Overview"
              search
              navigation={navigation}
              scene={scene}
              bgColor="white"
              titleColor={appTheme.COLORS.GREY}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
    </Stack.Navigator>
  );
}

export default OverviewStack;
