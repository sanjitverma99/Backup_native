import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { Block, Text } from "galio-framework";
import { RFValue } from "react-native-responsive-fontsize";
import { appTheme, Images } from "../../config";
import { Divider } from "react-native-elements";

function User(props) {
  const user = useSelector(({ auth }) => auth.auth);
  return (
    <Block style={styles.container}>
      <Block>
        <Block style={styles.image}>
          <Image
            source={Images.UserBig}
            style={styles.user}
            resizeMode="contain"
          ></Image>
        </Block>
        <Block middle>
          <Text style={styles.details}>User Details</Text>
        </Block>
        <Block style={styles.username}>
          <Text style={styles.firstName}>{user.firstName}</Text>
        </Block>
        <Divider width={0.5} style={styles.divider} color="#052a4f"></Divider>
        <Block style={styles.login}>
          <Text style={styles.loginText}>
            Login Time : {user.lastSucessfullLogin}
          </Text>
        </Block>
        <Divider width={0.5} style={styles.divider} color="#052a4f"></Divider>
        <Block style={styles.login}>
          <Text style={styles.loginText}>
            Logout Time : {user.lastSucessfullLogout}
          </Text>
        </Block>
        <Divider width={0.5} style={styles.divider} color="#052a4f"></Divider>
      </Block>
      
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  saveText: {
    fontFamily: "Regular1",
    color: appTheme.COLORS.WHITE,
    fontSize: RFValue(13),
  },
  image: {
    marginTop: "20%",
    alignItems: "center",
    // backgroundColor: "red",
  },
  user: {
    height: heightPercentageToDP("9%"),
  },
  username: {
    alignItems: "flex-start",
    marginHorizontal: "7%",
    marginTop: "10%",
  },
  details: {
    color: "#3a3a3a",
    fontFamily: "Regular1",
    fontSize: RFValue(15),
    marginTop: "4%",
  },
  firstName: {
    color: "#052a4f",
    fontFamily: "Bold1",
    fontSize: RFValue(15),
    marginTop: "4%",
  },
  divider: {
    marginHorizontal: "2%",
    marginVertical: "4%",
  },
  login: {
    marginHorizontal: "7%",
  },
  loginText: {
    alignItems: "flex-start",
    color: "#052a4f",
    fontFamily: "Regular1",
  },
});

export default User;
