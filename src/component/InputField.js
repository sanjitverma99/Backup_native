import React from "react";
import {
  StyleSheet,
  TextInput,
  Image,
  Button,
  Touchable,
  TouchableWithoutFeedbackBase,
} from "react-native";
import { Block } from "galio-framework";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { RFValue } from "react-native-responsive-fontsize";
import { appTheme } from "../config";
import { TouchableOpacity } from "react-native-gesture-handler";

function InputField(props) {
  return (
    <Block style={styles.root}>
      <TextInput
        style={styles.field}
        editable={props.editable}
        onFocus={props.onFocus}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        {...props}
        secureTextEntry={props.secureTextEntry}
      />

      <Icon
        name={props.iconType}
        family={props.familyType}
        color={props.colorType}
        size={props.logosize}
        style={styles.logo}
        onPress={props.onPress}
      />
      {/* <Image
        source={props.source}
        resizeMode={props.resizeMode}
        style={styles.imageLogo}
      ></Image> */}
    </Block>
  );
}

const styles = StyleSheet.create({
  field: {
    width: "100%",
    borderColor: appTheme.COLORS.BLACK,
    borderBottomWidth: 0.5,
    fontSize: RFValue(14),
    fontFamily: "Regular1",
    paddingTop: "1%",
    paddingBottom: "1%",
    // paddingRight: "10%",
    // backgroundColor: "red",
  },
  // eslint-disable-next-line react-native/no-unused-styles
  container: {
    alignItems: "flex-end",
  },
  root: {
    flexDirection: "row",
  },
  logo: {
    right: 24,
  },
  imageLogo: {
    // backgroundColor: "red",
    width: "8%",
    height: "65%",
  },
  imageLogo1: {
    // backgroundColor: "red",
    width: "10%",
    height: "65%",
    marginLeft: "-10%",
  },
});

export default InputField;
