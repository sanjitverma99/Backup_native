import React, { useContext } from "react";
import { appTheme } from "../../config";
import ScreenContext from "../../ScreenContext";
import Header from "../../component/Header";
import Cases from "./Cases";

function CasesStack() {
  const { Stack } = useContext(ScreenContext);
  return (
    <Stack.Navigator screenOptions={{ presentation: "card", Header: "screen" }}>
      <Stack.Screen
        name="amlcaseworkflow"
        component={Cases}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="AML CaseWorkFlow"
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

export default CasesStack;
