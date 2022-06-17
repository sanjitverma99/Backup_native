import React, { useContext } from "react";
import { appTheme } from "../../config";
import ScreenContext from "../../ScreenContext";
import Header from "../../component/Header";
import STR from "./STR";

function STRStack() {
  const { Stack } = useContext(ScreenContext);
  return (
    <Stack.Navigator screenOptions={{ presentation: "card", Header: "screen" }}>
      <Stack.Screen
        name="StrStack"
        component={STR}
        options={{
          header: ({ navigation, scene, props }) => (
            <Header
              navigation={navigation}
              title="AML Case Work Flow"
              scene={scene}
              bgColor="#fff"
              titleColor={appTheme.COLORS.GREY}
              props={props}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default STRStack;
