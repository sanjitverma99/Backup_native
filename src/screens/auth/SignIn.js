import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
} from "react-native";
import { Block, Text } from "galio-framework";
import { useDispatch } from "react-redux";
import { Images, appTheme } from "../../config";
import authService from "../../service/AuthService";
import * as Actions from "../../store/actions";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/SimpleLineIcons";

const height = Platform.select({
  ios: Dimensions.get("window").height,
  android: Dimensions.get("window").height,
});
const width = Platform.select({
  ios: Dimensions.get("window").width,
  android: Dimensions.get("window").width,
});

function SignIn(props) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: null,
    password: null,
  });
  const [hide, setHide] = useState(false);

  const [passwordToggle, setPasswordToggle] = useState(true);

  const passwordshow = () => {
    setPasswordToggle(!passwordToggle);
  };

  function handleSubmit() {
    dispatch(Actions.showBackdrop("Signing in..."));
    authService
      .signInWithUsernamePassword(formData)
      .then(async (data) => {
        await dispatch(Actions.storeToken(data.token));
        await dispatch(Actions.showBackdrop("Loading Profile..."));
        loadProfile();
      })
      .catch((err) => {
        setHide(true);
        setTimeout(() => setHide((hide) => !hide), 2000);
        console.log("data", err);
      });
  }

  function loadProfile() {
    authService
      .signInWithToken()
      .then((data) => {
        dispatch(Actions.storeProfile(data));
        dispatch(Actions.hideBackdrop());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleChange(field, e) {
    setFormData({ ...formData, [field]: e });
  }

  return (
    <Block style={styles.container}>
      {/* <StatusBar hideTransitionAnimation="slide" /> */}
      {/* <StatusBar></StatusBar> */}
      <ImageBackground
        source={Images.BackgroundImage}
        resizeMode="cover"
        style={styles.bgi}
      >
        {/* <KeyboardAwareScrollView> */}
        <Block style={styles.logoBlock}>
          <Image
            source={Images.CompassLogo}
            style={styles.logo}
            resizeMode="contain"
          ></Image>
        </Block>
        <Block style={styles.signIn}>
          <Block>
            <Text style={styles.signInText}>Sign In</Text>
            {hide ? (
              <>
                <Text
                  style={{
                    textAlign: "center",
                    color: "red",
                    fontFamily: "Regular",
                  }}
                >
                  Enter Valid Details
                </Text>
              </>
            ) : null}
            <Block>
              <Text style={styles.userHead}>User Name</Text>
              <Block row>
                <TextInput
                  style={styles.field}
                  resizeMode="contain"
                  onChangeText={(e) => handleChange("username", e)}
                ></TextInput>
                <Icon
                  name="user"
                  iconType="user"
                  size={20}
                  color="#052a4f"
                  style={styles.icon}
                ></Icon>
              </Block>
            </Block>
            <Text style={styles.userHead}>Password</Text>
            <Block row>
              <TextInput
                style={styles.field}
                secureTextEntry={passwordToggle}
                onChangeText={(e) => handleChange("password", e)}
              ></TextInput>
              <Icon
                name={passwordToggle ? "lock" : "lock-open"}
                size={20}
                onPress={passwordshow}
                style={styles.icon}
                color="#052a4f"
              />
            </Block>
          </Block>
        </Block>
        <Block style={styles.buttonheader}>
          <TouchableOpacity
            style={styles.login}
            disabled={formData.username === ""}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.logintext}>Log In</Text>
          </TouchableOpacity>
        </Block>
        <Block style={styles.qdeBlock}>
          <Image
            source={Images.QDE}
            resizeMode="contain"
            style={styles.qdeLogo}
          ></Image>
        </Block>

        {/* </KeyboardAwareScrollView> */}
      </ImageBackground>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.COLORS.WHITE,
  },
  bgi: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width, //for full screen
    height: height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  field: {
    width: "100%",
    borderColor: appTheme.COLORS.BLACK,
    borderBottomWidth: 0.5,
    fontSize: RFValue(14),

    fontFamily: "Regular1",
    paddingTop: "1%",
    paddingBottom: "1%",
  },
  inputBlock: {
    flexDirection: "row",
    width: widthPercentageToDP("80%"),
    // backgroundColor: "red",
    // flex: 1,
  },

  logoBlock: {
    // alignItems: "center",
    // backgroundColor: "red",
    justifyContent: "flex-end",
    // marginTop: "%",
  },
  logo: {
    height: heightPercentageToDP("5%"),
  },
  icon: {
    right: 24,
  },
  signIn: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "blue",
    height: heightPercentageToDP("35%"),
    width: widthPercentageToDP("70%"),
    marginVertical: "10%",
  },

  signInText: {
    fontFamily: "Bold1",
    fontSize: 24,
    height: "28%",
    color: "#052a4f",
  },

  userHead: {
    marginTop: "6%",
    color: "#052a4f",
  },
  buttonheader: {
    // backgroundColor: "red",
    width: widthPercentageToDP("44%"),
    height: heightPercentageToDP("6.5%"),
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    backgroundColor: "#052a4f",
    height: "100%",
    borderRadius: wp(10),
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "2.5%",
    paddingBottom: "2.5%",
  },
  logintext: {
    fontFamily: "Regular1",
    fontSize: RFPercentage(2.1),
    color: appTheme.COLORS.WHITE,
  },
  qdeBlock: {
    // backgroundColor: "red",
    height: "15%",

    justifyContent: "flex-end",
  },
  qdeLogo: {
    height: heightPercentageToDP("5.5%"),
    top: "30%",
  },
});
export default SignIn;
