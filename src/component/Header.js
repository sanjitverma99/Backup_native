/* eslint-disable react-native/no-color-literals */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from "react";
import { withNavigation } from "react-navigation";
// eslint-disable-next-line no-unused-vars
import { StyleSheet, Image, TouchableOpacity, Platform } from "react-native";
import { Block, NavBar } from "galio-framework";
import { appTheme, Images, utils } from "../config";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import * as Actions from "../store/actions";
import SearchBottom from "./SearchBottom";
import { RFValue } from "react-native-responsive-fontsize";
import { useSelector, useDispatch } from "react-redux";
import { Tile } from "react-native-elements";
const show = Platform.select({
  ios: true,
  android: false,
});
function Header(props) {
  const [modalVisible1, setModalVisible1] = useState(false);

  const headerStyles = [{ backgroundColor: appTheme.COLORS.BLACK }];
  const {
    title,
    transparent,
    bgColor,
    titleColor,
    back,
    navigation,
    persieve,
    search,
    options,
  } = props;
  const navbarStyles = [
    styles.navbar,
    bgColor && { backgroundColor: "#EAEAEA" },
  ];

  const dispatch = useDispatch();

  const handleLeftPress = () => {
    return back ? navigation.goBack() : navigation.openDrawer();
  };

  const handleCloseModal = () => {
    setModalVisible1(!modalVisible1);
  };

  useEffect(() => {}, [modalVisible1]);

  return (
    <Block style={headerStyles}>
      {/* <StatusBar hidden="false"></StatusBar> */}

      <NavBar
        back={false}
        style={styles.navbarStyles1}
        transparent={transparent}
        title=""
        titleStyle={styles.bar}
      />

      <NavBar
        back={false}
        style={navbarStyles}
        transparent={transparent}
        title={title}
        titleStyle={[
          styles.title,
          { color: appTheme.COLORS.BGCOLOR },
          titleColor && { color: titleColor },
        ]}
        left={
          <Block style={styles.row}>
            <TouchableOpacity onPress={handleLeftPress}>
              <Image
                source={Images.menuBack}
                style={styles.menuback}
                resizeMode="contain"
              ></Image>
            </TouchableOpacity>
          </Block>
        }
        // leftStyle={styles.leftStyle}
        right={
          <Block style={styles.rightStyle}>
            {persieve && (
              <Image style={styles.compasslogo} source={Images.CompassLogo} />
            )}
            <SearchBottom
              visible={modalVisible1}
              onRequestClose={handleCloseModal}
              style={styles.amlCss}
              onPress={handleCloseModal}
              closeModal={handleCloseModal}
              navigation={props.navigation}
            ></SearchBottom>
            {search && (
              <Block flex>
                <TouchableOpacity
                  onPress={() => setModalVisible1(!modalVisible1)}
                >
                  <Image
                    resizeMode="contain"
                    style={styles.searchlogo}
                    source={Images.TopSearch}
                  ></Image>
                </TouchableOpacity>
              </Block>
            )}
            {options && <Block></Block>}
          </Block>
        }
      />
    </Block>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: RFValue(16),
    fontFamily: "Bold1",
    color: "yellow",
  },
  navbar: {
    height: heightPercentageToDP("7%"),
    justifyContent: "space-between",
    alignItems: "center",
    // paddingBottom: theme.SIZES.BASE * 1.5,
    // paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE * 0.6,
  },
  navbarStyles1: {
    height: "1%",
    // paddingBottom: theme.SIZES.BASE * 1.5,
    // paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE * 0.6,
    zIndex: 5,
    backgroundColor: appTheme.COLORS.WHITE,
  },
  leftStyle: {},
  rightStyle: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  // eslint-disable-next-line react-native/no-unused-styles
  rightIconStyles: {
    paddingRight: 5,
    paddingLeft: 10,
  },
  searchlogo: {
    width: wp(10),
    height: hp(3.4),
    // backgroundColor: "red",
  },
  compasslogo: {
    resizeMode: "contain",
    width: widthPercentageToDP("40%"),
    height: heightPercentageToDP("5%"),
    backgroundColor: "red",
  },
  row: {
    // backgroundColor: "blue",
  },
  menuback: {
    // backgroundColor: "red",
    height: heightPercentageToDP("5%"),
    width: widthPercentageToDP("10%"),
    right: "5%",
  },
  bar: {
    backgroundColor: "blue",
    color: "red",
  },
});

export default withNavigation(Header);
