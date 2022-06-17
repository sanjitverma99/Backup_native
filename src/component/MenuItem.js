import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Block, Text, theme } from "galio-framework";
// import { Icon } from "react-native-elements";
import { appTheme } from "../config";

function MenuItem(props) {
  const { navigation, name, icon, focused, color } = props;

  const containerStyles = [
    styles.defaultStyle,
    focused ? [styles.activeStyle, styles.shadow] : null,
  ];

  return (
    <TouchableOpacity
      style={styles.root}
      onPress={() => navigation.navigate(name)}
    >
      <Block flex row style={containerStyles}>
        <Block middle flex={0.1} style={styles.icons}>
          {/* <Icon /> */}
        </Block>
        <Block row center flex={0.9} style={styles.whole}>
          <Text
            style={styles.text}
            size={15}
            bold={focused}
            color={focused ? "white" : "#052a4f"}
          >
            {name}
          </Text>
        </Block>
      </Block>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    // height: "30%",
    width: "80%",
  },
  defaultStyle: {
    // paddingVertical: 16,
    // marginBottom: 2,
    paddingVertical: "4%",
  },
  activeStyle: {
    backgroundColor: "#052a4f",
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    // width: "70%",
  },

  whole: {
    left: "1%",
    // width: "70%",
  },
  icons: {
    marginLeft: "1%",
  },
  text: {
    fontFamily: "Regular1",
  },
});

export default MenuItem;
