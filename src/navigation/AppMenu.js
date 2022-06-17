import React from "react";
import { ScrollView, StyleSheet, Image } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { RFValue } from "react-native-responsive-fontsize";
import MenuItem from "../component/MenuItem";
import { Images, appTheme } from "../config";

function AppMenu(props) {
  const { navigation, state } = props;
  const { back } = props;
  const close = () => {
    return back ? navigation.goBack() : navigation.closeDrawer();
  };

  const menu = [
    {
      name: "Overview",
      icon: "user",
      color: "{rgb(100,120,40)}",
    },
    {
      name: "MyTray",
    },
    {
      name: "User",
    },
    {
      name: "Logout",
      icon: "logout",
    },
  ];

  const isActive = (name) => name === state.routeNames[state.index];

  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {menu.map((item, index) => {
            return (
              <MenuItem
                key={index}
                navigation={navigation}
                {...item}
                focused={isActive(item.name)}
              />
            );
          })}
        </ScrollView>
      </Block>
      <Block middle style={styles.credit}>
        <Text color="#052a4f">Version: 2.2.4</Text>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: appTheme.COLORS.WHITE },
  logo: {
    flex: 1,
    resizeMode: "cover",
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE * 2,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
    marginTop: "20%",
  },
  credit: { marginVertical: "10%" },
  menuitems: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: "15%",
  },
  text: {
    color: appTheme.COLORS.WHITE,
    fontFamily: "Bold",
    fontSize: RFValue(18),
    marginTop: "1%",
  },
  icon: {
    color: appTheme.COLORS.GREY,
    marginRight: "30%",
    marginTop: "2%",
  },
  cross: {
    color: appTheme.COLORS.GREY,
    marginLeft: "30%",
    marginTop: "1%",
  },
  qdelogo: {
    resizeMode: "contain",
    height: "25%",
  },
});

export default AppMenu;
