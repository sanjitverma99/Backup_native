import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "galio-framework";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { appTheme } from "../../config";
import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { Block } from "galio-framework";
import * as Actions from "../../store/actions";
import authService from "../../service/AuthService";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

function Logout(props) {
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   setModalVisible(!modalVisible);
  // }, []);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   setTimeout(() => {
  //     Alert.alert("I am appearing...", "After 5 seconds!");
  //     //  setModalVisible(!modalVisible);
  //   }, 1000);
  // }, [props]);
  const signOut = () => {
    dispatch(Actions.showBackdrop("Signing out..."));
    authService
      .signOut()
      .then(() => {
        dispatch(Actions.hideBackdrop());
        dispatch(Actions.signOut());
      })
      .catch(() => {
        dispatch(Actions.hideBackdrop());
      });
  };

  function Overview() {
    // setModalVisible(modalVisible);
    props.navigation.navigate("Overview");
  }

  return (
    <View style={styles.centeredView}>
      <View style={styles.centeredView}>
        <Block style={styles.mainbox}>
          <Block style={styles.modalView}>
            <Text style={styles.textStyle}>Sure you want exit?</Text>
          </Block>
          <Divider color="white"></Divider>
          <Block style={styles.buttons}>
            <TouchableOpacity style={styles.cancel} onPress={Overview}>
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
            <Divider color="white" orientation="vertical"></Divider>
            <TouchableOpacity style={styles.logout} onPress={signOut}>
              <Text style={styles.text1}>Logout</Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#59595c",
  },
  modalView: {
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: "24%",
    marginVertical: "8%",
  },
  mainbox: {
    backgroundColor: "white",
    borderRadius: widthPercentageToDP("7%"),
  },
  button: {
    marginHorizontal: "10%",
    marginVertical: "10%",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "#052a4f",
    fontFamily: "Regular1",
    fontSize: RFValue(16),
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Regular1",
    fontSize: RFValue(17),
    color: "#052a4f",
  },
  divider: {
    height: 1,
    width: 200,
    backgroundColor: appTheme.COLORS.WHITE,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: "2%",
    alignItems: "center",
  },
  cancel: {
    marginVertical: "7%",
    borderRadius: widthPercentageToDP("6%"),
    // backgroundColor: "#",
    height: heightPercentageToDP("5%"),
    width: widthPercentageToDP("22%"),
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "10%",
    borderColor: "#052a4f",
    borderWidth: 1,
  },
  logout: {
    marginVertical: "7%",
    borderRadius: widthPercentageToDP("5%"),
    backgroundColor: "#052a4f",
    height: heightPercentageToDP("5%"),
    width: widthPercentageToDP("22%"),
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10%",
  },
  text: {
    color: "#59595c",
    fontFamily: "Regular1",
    fontSize: RFValue(15),
  },
  text1: {
    color: "white",
    fontFamily: "Regular1",
    fontSize: RFValue(15),
  },
});

export default Logout;
