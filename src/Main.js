/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
/* eslint-disable global-require */
import React, { useState } from "react";
import "react-native-gesture-handler";
import { Image, View, Text } from "react-native";
import { Block, GalioProvider } from "galio-framework";
import { enableScreens } from "react-native-screens";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Provider } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Screens from "./navigation/Screens";
import { appTheme, Images } from "./config";
import store from "./store";
import ScreenContext from "./ScreenContext";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

enableScreens();

function Main() {
  const [isLoadingCompleted, setLoadingCompleted] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const assetImages = [Images.CompassLogo];

  function cacheImages(images) {
    return images.map((image) => {
      if (typeof image === "string") {
        return Image.prefetch(image);
      }
      return Asset.fromModule(image).downloadAsync();
    });
  }

  const loadFonts = async () => {
    await Font.loadAsync({
      Regular: require("../assets/font/ProductSans-Regular.ttf"),
      Light: require("../assets/font/ProductSans-Light.ttf"),
      Bold: require("../assets/font/ProductSans-Bold.ttf"),
      IcoMoon: require("../assets/font/icon/icomoon.ttf"),
      Regular1: require("../assets/font/GoogleSans-Regular.ttf"),
      Bold1: require("../assets/font/GoogleSans-Bold.ttf"),
      Entypo: require("../assets/font/entypo.ttf"),
      Ionicons: require("../assets/font/Ionicons.ttf"),
      "simple-line-icons": require("../assets/font/Simple-Line-Icons.ttf"),
      SimpleLineIcons: require("../assets/font/Simple-Line-Icons.ttf"),
      "Material Design Icons": require("../assets/font/MaterialDesignIcons.ttf"),
    });
    setFontLoaded(true);
  };

  const loadResourcesAsync = async () => {
    await loadFonts();
    return Promise.all([...cacheImages(assetImages)]);
  };

  const handleLoadingError = (error) => {
    console.warn(error);
  };

  const handleFinishLoading = () => {
    if (fontLoaded) {
      setLoadingCompleted(true);
    }
  };

  return (
    <>
      {isLoadingCompleted ? (
        <NavigationContainer>
          <ScreenContext.Provider value={{ Stack, Drawer, Tab }}>
            <Provider store={store}>
              <GalioProvider theme={appTheme}>
                <Block flex>
                  <Screens />
                </Block>
              </GalioProvider>
            </Provider>
          </ScreenContext.Provider>
        </NavigationContainer>
      ) : (
        <AppLoading
          startAsync={loadResourcesAsync}
          onError={handleLoadingError}
          onFinish={handleFinishLoading}
        />
        // <View>
        //   <Text>hi</Text>
        // </View>
      )}
    </>
  );
}

export default Main;
