import React from "react";
import { StyleSheet } from "react-native";
import { Block, theme, Text } from "galio-framework";
import { appTheme } from "../config";

function LoadingScreen() {
  return (
    <Block flex>
      <Text>
        {/* <Icon /> */}
        <Text style={styles.home}>Loading...</Text>
      </Text>
    </Block>
  );
}

const styles = StyleSheet.create({
  home: {
    fontFamily: "Regular",
    fontSize: theme.SIZES.BASE,
  },
});

export default LoadingScreen;
