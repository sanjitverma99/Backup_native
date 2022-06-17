import { Block, Text } from "galio-framework";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import React from "react";
import { appTheme, Images } from "../config";
const bottom = Platform.OS === "ios" ? "5%" : "0%";
function BottomSheet(props) {
  return (
    <Block style={styles.container}>
      <TouchableOpacity
        style={{ width: "20%", alignItems: "center" }}
        onPress={props.MyTrayClick}
      >
        <Block style={styles.main}>
          <Image source={Images.Mytray} style={styles.trayImage}></Image>
          <Text style={styles.textTray}>My Tray</Text>
        </Block>
      </TouchableOpacity>
      <Block
        style={{
          backgroundColor: appTheme.COLORS.WHITE,
          marginHorizontal: "2%",
          width: "0.2%",
          marginRight: "3%",
          marginVertical: "2%",
        }}
      ></Block>
      <TouchableOpacity
        style={{ width: "23%", alignItems: "center" }}
        onPress={props.NotificationClick}
      >
        <Block style={styles.main}>
          <Image
            source={Images.Notification}
            style={styles.notifiImage}
          ></Image>
          <Text style={styles.textTray}>Notifications</Text>
        </Block>
      </TouchableOpacity>
      <Block
        style={{
          backgroundColor: appTheme.COLORS.WHITE,
          marginHorizontal: "2%",
          width: "0.2%",
          marginLeft: "3%",
          marginVertical: "2%",
        }}
      ></Block>
      <TouchableOpacity
        style={{ width: "20%", alignItems: "center" }}
        onPress={props.SearchClick}
      >
        <Block style={styles.main}>
          <Image source={Images.Search} style={styles.notifiImage}></Image>
          <Text style={styles.textTray}>Search</Text>
        </Block>
      </TouchableOpacity>
      <Block
        style={{
          backgroundColor: appTheme.COLORS.WHITE,
          marginHorizontal: "2%",
          width: "0.2%",

          marginVertical: "2%",
        }}
      ></Block>
      <TouchableOpacity
        style={{ width: "20%", alignItems: "center" }}
        onPress={props.UserClick}
      >
        <Block style={styles.main}>
          <Image source={Images.User} style={styles.notifiImage}></Image>
          <Text style={styles.textTray}>User</Text>
        </Block>
      </TouchableOpacity>
    </Block>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#47566c",
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: "1%",
    marginBottom: bottom,
  },
  main: {
    alignItems: "center",
  },
  trayImage: {
    resizeMode: "contain",
  },
  textTray: {
    color: appTheme.COLORS.WHITE,
    paddingBottom: "2%",
  },
  notifiImage: {
    resizeMode: "contain",
    width: 40,
  },
});
export default BottomSheet;
