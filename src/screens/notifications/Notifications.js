import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Block, Text } from "galio-framework";
import { RFValue } from "react-native-responsive-fontsize";
import { appTheme, Images } from "../../config";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import InputField from "../../component/InputField";
import BottomSheet from "../../component/BottomSheet";
// import SearchBottom from "../../component/SearchBottom";

function Notifications(props) {
  const [modalVisible1, setModalVisible1] = useState(false);

  function MyTray() {
    props.navigation.navigate("MyTray");
  }
  function User() {
    props.navigation.navigate("User");
  }

  function Notification() {
    props.navigation.navigate("Notifications");
  }

  return (
    <Block style={styles.container}>
      <Block>
        <Block style={styles.header}>
          <Text style={styles.text}>Push Notifications</Text>
        </Block>
        <Block middle>
          <InputField
            style={styles.user}
            placeholder="comment"
            placeholderTextColor={appTheme.COLORS.BLACK}
          ></InputField>
        </Block>
      </Block>
      <Block>
        <BottomSheet
          MyTrayClick={MyTray}
          NotificationClick={Notification}
          UserClick={User}
          SearchClick={() => setModalVisible1(!modalVisible1)}
        ></BottomSheet>
        {/* <SearchBottom
          onPress={() => {
            setModalVisible1(!modalVisible1);
          }}
          visible={modalVisible1}
          onRequestClose={() => {
            setModalVisible1(!modalVisible1);
          }}
          style={styles.amlCss}
          onPress={() => setModalVisible1(!modalVisible1)}
        ></SearchBottom> */}
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.COLORS.BACKGROUND,
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: appTheme.COLORS.WHITE,
    justifyContent: "center",
    height: hp(4),
    marginTop: "3%",
    marginHorizontal: "3%",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Regular1",
    color: appTheme.COLORS.BLACK,
    fontSize: RFValue(15),
    marginLeft: "2%",
  },
  user: {
    backgroundColor: "white",
    height: hp(7),
    paddingLeft: 20,
    width: "94%",
    marginVertical: 10,
  },
  divider1: {
    marginHorizontal: "5%",
    marginVertical: "2%",
  },
  bottom: {
    height: hp(8.3),
    backgroundColor: "#47566c",
  },
  notificationbutton: {
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    marginHorizontal: "5%",
    marginVertical: "2%",
  },
  trayLogo: {
    resizeMode: "contain",
    height: 40,
  },
  notificationlogo: {
    resizeMode: "contain",
    width: "50%",
    height: "50%",
  },
  searchlogo: {
    resizeMode: "contain",
    width: "90%",
    height: "50%",
  },
  userlogo: {
    resizeMode: "contain",
    height: "50%",
  },
  bottomcases: {
    fontFamily: "Regular1",
  },
  options: {
    color: appTheme.COLORS.WHITE,
    paddingBottom: 10,
  },
  traytext: {
    paddingBottom: 10,
    color: appTheme.COLORS.WHITE,
    fontFamily: "Regular1",
  },
  bar: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Notifications;
