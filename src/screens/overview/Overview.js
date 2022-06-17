import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  StyleSheet,
  Animated,
  LogBox,
  Platform,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Block, Text } from "galio-framework";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { appTheme } from "../../config";
import * as Actions from "../../store/actions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AmlCWFlow from "../../component/AmlCWFlow";
import _, { split } from "lodash";
import OverviewService from "../../service/OverviewService";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { FA5Style } from "@expo/vector-icons/build/FontAwesome5";

const COLORS = ["#D83232", "#EEC82C", "#1B8EBC"];
const VALUE = ["#59595c"];
const ALERTSCOLOR = [
  "#D83232",
  "#F44E1C",
  "#F4A82F",
  "#708E4A",
  "#46D3A7",
  "#2D409E",
];

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
const marginBottom = Platform.select({
  ios: "5%",
  android: "0%",
});
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
function Overview(props, { navigation }) {
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState([]);
  const [accountData, setAccountData] = useState([]);
  const [alertData, setAlertData] = useState([]);
  const [topAlerts, setTopAlerts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshData, setrefreshData] = useState([]);
  const user = useSelector(({ auth }) => auth.auth);
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const title1 = {
    title: "Pending Cases",
    caseType: "pendingCases",
    userRole: user.roleName,
  };
  const title2 = {
    title: "Closed cases",
    caseType: "closedCases",
    userRole: user.roleName,
  };
  const title3 = {
    title: "Approved cases",
    caseType: "approvedCases",
    userRole: user.roleName,
  };
  const title4 = {
    title: "Rejected cases",
    caseType: "rejectedCases",
    userRole: user.roleName,
  };

  const title5 = {
    title: "For Review",
    caseType: "forReview",
    userRole: user.roleName,
  };

  const title6 = {
    title: "For STR",
    caseType: "forSTR",
    userRole: user.roleName,
  };

  const pendingCases = {
    title: "pending Cases",
    moduleType: "N.A",
    userRole: user.roleName,
  };

  const closedCasesWithSTR = {
    title: "view Without STR Closed By AMLUser",
    moduleType: "viewWithSTRClosedByAMLUser",
    userRole: user.roleName,
  };

  const closedCasesWithoutSTR = {
    title: "view Without STR Closed By AMLUser",
    moduleType: "viewWithoutSTRClosedByAMLUser",
    userRole: user.roleName,
  };

  

  const desktopClosedByAMLuser = {
    title: "desktop Closed By AMLuser",
    moduleType: "viewDeskTopClosedByAMLUser",
    userRole: user.roleName,
  };

  const approvedCasesByAMLO = {
    title: "approved Cases By AMLO",
    moduleType: "viewApprovedCasesByAMLO",
    userRole: user.roleName,
  };

  const rejectedCasesByAMLO = {
    title: "rejected Cases By AMLO",
    moduleType: "viewRejectedasesByAMLO",
    userRole: user.roleName,
  };
  

  

  const closedCasesWithoutSTRByAMLUserToAMLO = {
    title: "closed Cases Without STR By AMLUser",
    moduleType: "viewWithoutSTRClosedByAMLUserToAMLO",
    userRole: user.roleName,
  };
  
  const desktopClosedByAMLuserToAMLO = {
    title: "desktop Closed By AMLuser To AMLO",
    moduleType: "viewDeskTopClosedByAMLUserToAMLO",
    userRole: user.roleName,
  };

  const viewCasesToBeReviewedByAMLO = {
    title : "Cases To Be Reviewed By AMLO",
    moduleType : "N.A",
    userRole : "user.roleName",
  };

  const viewCasesToBeReviewedByMLRO = {
    title : "Cases To Be Reviewed By MLRO",
    moduleType : "N.A",
    userRole : "user.roleName",
  };


 

  const deskTopClosedByMLRO = {
    title: "viewDeskTopClosedByMLRO",
    moduleType: "viewDeskTopClosedByMLRO",
    userRole: user.roleName,
  };
  
  const rejectedCasesByAMLOToMLRO= {
    title: "viewRejectedCasesByAMLOToMLRO",
    moduleType: "viewRejectedCasesByAMLOToMLRO",
    userRole: user.roleName,
  };

  const approvedCasesByMLRO = {
    title: "viewApprovedCasesByMLRO",
    moduleType: "viewApprovedCasesByMLRO",
    userRole: user.roleName,
  };

  const rejectedCasesByMLRO = {
    title: "viewRejectedCasesByMLRO",
    moduleType: "viewRejectedCasesByMLRO",
    userRole: user.roleName,
  };

  

  


  useEffect(() => {
    OverviewService.getOverviewData("AMLUSER")
      .then((response) => {
        setCustomerData(response["customerRiskDetails"]);
        setAccountData(response["accountRiskDetails"]);
        setAlertData(response["alertStatisticsDetails"]);
        setTopAlerts(response["nTopmostAlertsDetails"]);
      })
      .catch((error) => {});
  }, []);

  //LOGS
  {
    LogBox.ignoreLogs([
      "DatePickerIOS has been merged with DatePickerAndroid and will be removed in a future release.",
      "StatusBarIOS has been merged with StatusBar and will be removed in a future release.",
      "DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release.",
      "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`",
    ]);
  }

  LogBox.ignoreAllLogs([
    "componentWillReceiveProps",
    "DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release",
    "Constants.platform.ios.model has been deprecated in favor of expo-device's Device.modelName property. This API will be removed in SDK 45.",
    "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`",
  ]);
  const _console = _.clone(console);
  console.warn = (message) => {
    if (
      message.indexOf(
        "componentWillReceiveProps",
        "DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release",
        "Constants.platform.ios.model has been deprecated in favor of expo-device's Device.modelName property. This API will be removed in SDK 45"
      ) <= -1
    ) {
      _console.warn(message);
    }
  };

  //Button Clicks
  function PendingCases() {
    pendingCases["lastClickedDateTime"] = new Date().getMilliseconds();
    dispatch(Actions.storeCurrentTitle(pendingCases));
    props.navigation.navigate("Cases");
  }

  function ClosedCases() {
    title2["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(title2));
    props.navigation.navigate("Cases");
  }
  function ApprovedCases() {
    title3["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(title3));
    props.navigation.navigate("Cases");
  }
  function RejectedCases() {
    title4["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(title4));
    props.navigation.navigate("Cases");
  }
  function ForReview() {
    title5["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(title5));
    props.navigation.navigate("Cases");
  }
  function ForSTR() {
    title6["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(title6));
    props.navigation.navigate("Cases");
  }

  function withoutSTRClosedByAMLUserToAMLO() {
    closedCasesWithoutSTRByAMLUserToAMLO["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(closedCasesWithoutSTRByAMLUserToAMLO));
    props.navigation.navigate("Cases");
  }


  function DesktopClosedCasesByAMLUserToAMLO() {
    desktopClosedByAMLuserToAMLO["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(desktopClosedByAMLuserToAMLO));
    props.navigation.navigate("Cases");
  }

  function ViewCasesToBeReviewedByAMLO(){
    viewCasesToBeReviewedByAMLO["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(viewCasesToBeReviewedByAMLO));
    props.navigation.navigate("Cases");
  }

  function ViewCasesToBeReviewedByMLRO(){
    viewCasesToBeReviewedByMLRO["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(viewCasesToBeReviewedByMLRO));
    props.navigation.navigate("Cases");
  }

/* 
  function DesktopClosedCasesByAMLO() {
    title6["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(desktopClosedByAMLuserToAMLO));
    props.navigation.navigate("Cases");
  }
   */

  function RejectedCasesByAMLO() {
    rejectedCasesByAMLO["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(rejectedCasesByAMLO));
    props.navigation.navigate("Cases");
  }

  function ApprovedCasesByAMLO() {
    approvedCasesByAMLO["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(approvedCasesByAMLO));
    props.navigation.navigate("Cases");
  }

 

  function RejectedCasesByMLRO() {
    rejectedCasesByMLRO["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(rejectedCasesByMLRO));
    props.navigation.navigate("Cases");
  }

  function ApprovedCasesByMLRO() {
    approvedCasesByMLRO["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(approvedCasesByMLRO));
    props.navigation.navigate("Cases");
  }

  function RejectedCasesByAMLOtoMLRO() {
    rejectedCasesByAMLOToMLRO["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(rejectedCasesByAMLOToMLRO));
    props.navigation.navigate("Cases");
  }

  function DesktopClosedCasesByMLRO() {
    title6["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(deskTopClosedByMLRO));
    props.navigation.navigate("Cases");
  }

  function DesktopClosedCasesByMLRO() {
    deskTopClosedByMLRO["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(deskTopClosedByMLRO));
    props.navigation.navigate("Cases");
  }

  function ClosedCasesWithoutSTR() {
    closedCasesWithoutSTR["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(closedCasesWithoutSTR));
    props.navigation.navigate("Cases");
  }

  function ClosedCasesWithSTR() {
    closedCasesWithSTR["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(closedCasesWithSTR));
    props.navigation.navigate("Cases");
  }

   

  function DesktopClosedByAMLuser() {
    desktopClosedByAMLuser["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(desktopClosedByAMLuser));
    props.navigation.navigate("Cases");
  }


  
  //Customer Data

  function CustomerData() {
    return customerData != undefined && customerData !== null
      ? customerData.map((each, index) => {
          const animation = useRef(new Animated.Value(0));
          const [progress, setProgress] = useState(0);
          useInterval(() => {
            if (progress < 100) {
              setProgress(each.percentage);
              //setProgress("55");
            }
          }, 10);

          useEffect(() => {
            Animated.timing(animation.current, {
              toValue: progress,
              duration: 900,
              useNativeDriver: false,
            }).start();
          }, [progress]);

          const width = animation.current.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
            extrapolate: "clamp",
          });
          return (
            <Block key={index} style={styles.heading}>
              <Block style={styles.progress}>
                <Block style={styles.rating}>
                  <Text style={styles.risk}>{each.name}</Text>
                </Block>
                <Block style={{ marginLeft: "3%" }}>
                  <Text style={({ color: VALUE[index] }, [styles.value])}>
                    {each.value}
                  </Text>
                </Block>
              </Block>
              <Block style={styles.progressBar}>
                <Animated.View
                  style={
                    ([StyleSheet.absoluteFill],
                    {
                      backgroundColor:
                        COLORS[index] || appTheme.COLORS.TRAINING,
                      width,
                      borderRadius: 15,
                    })
                  }
                />
              </Block>
            </Block>
          );
        })
      : null;
  }

  //AccountData
  function AccountData() {
    return accountData != undefined && accountData !== null
      ? accountData.map((each, index) => {
          const animation = useRef(new Animated.Value(0));
          const [progress, setProgress] = useState(0);
          useInterval(() => {
            if (progress < 100) {
              setProgress(each.percentage);
            }
          }, 10);

          useEffect(() => {
            Animated.timing(animation.current, {
              toValue: progress,
              duration: 900,
              useNativeDriver: false,
            }).start();
          }, [progress]);

          const width = animation.current.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
            extrapolate: "clamp",
          });

          return (
            <Block key={index} style={styles.heading}>
              <Block style={styles.progress}>
                <Block style={styles.rating}>
                  <Text style={styles.risk}>{each.name}</Text>
                </Block>
                <Block style={{ marginLeft: "3%" }}>
                  <Text
                    style={
                      ([styles.value],
                      {
                        color: VALUE[index],
                      })
                    }
                  >
                    {each.value}
                  </Text>
                </Block>
              </Block>
              <Block style={styles.progressBar}>
                <Animated.View
                  style={
                    ([StyleSheet.absoluteFill],
                    {
                      backgroundColor:
                        COLORS[index] || appTheme.COLORS.TRAINING,
                      width,
                      borderRadius: 15,
                    })
                  }
                />
              </Block>
            </Block>
          );
        })
      : null;
  }

  //AlertData
  function AlertData() {
    return alertData != undefined && alertData !== null
      ? alertData.map((each, index) => {
          const animation = useRef(new Animated.Value(0));
          const [progress, setProgress] = useState(0);
          useInterval(() => {
            if (progress < 100) {
              setProgress(each.percentage);
              //setProgress("55");
            }
          }, 10);

          useEffect(() => {
            Animated.timing(animation.current, {
              toValue: progress,
              duration: 900,
              useNativeDriver: false,
            }).start();
          }, [progress]);

          const width = animation.current.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
            extrapolate: "clamp",
          });
          const currentColor = appTheme.COLORS.BACKGROUND;
          return (
            <Block key={index} style={styles.heading}>
              <Block style={styles.progress}>
                <Block style={styles.rating}>
                  <Text style={styles.risk}>{each.name}</Text>
                </Block>
                <Block style={{ marginLeft: "3%" }}>
                  <Text
                    style={
                      ([styles.value1],
                      {
                        color: VALUE[index],
                      })
                    }
                  >
                    {each.value}
                  </Text>
                </Block>
              </Block>
              <Block style={styles.progressBar}>
                <Animated.View
                  style={
                    ([StyleSheet.absoluteFill],
                    {
                      backgroundColor:
                        COLORS[index] || appTheme.COLORS.TRAINING,
                      width,
                      borderRadius: 15,
                    })
                  }
                />
              </Block>
            </Block>
          );
        })
      : null;
  }

  //TopAlertsData
  function TopAlertsData() {
    return topAlerts != undefined && topAlerts !== null
      ? topAlerts.map((each, index) => {
          const animation = useRef(new Animated.Value(0));
          const [progress, setProgress] = useState(0);
          useInterval(() => {
            if (progress < 10000) {
              setProgress(each.ALERTSCOUNT);
              //setProgress("55");
            }
          }, 10);

          useEffect(() => {
            Animated.timing(animation.current, {
              toValue: progress,
              duration: 900,
              useNativeDriver: false,
            }).start();
          }, [progress]);

          const width = animation.current.interpolate({
            inputRange: [0, 1000],
            outputRange: ["0%", "100%"],
            extrapolate: "clamp",
          });
          const currentColor = appTheme.COLORS.BACKGROUND;
          return (
            <Block key={index} style={styles.heading}>
              <Block style={styles.progress}>
                <Block style={styles.rating}>
                  <ScrollView horizontal>
                    <Text style={styles.alerts}>{each.ALERTCODE}</Text>
                  </ScrollView>
                </Block>
                <Block style={{ marginLeft: "3%" }}>
                  <Text
                    style={
                      ({
                        color: ALERTSCOLOR[index],
                      },
                      [styles.value])
                    }
                  >
                    {each.ALERTSCOUNT}
                  </Text>
                </Block>
              </Block>
              <Block style={styles.progressBar} key={each.ALERTSCOUNT}>
                <Animated.View
                  style={
                    ([StyleSheet.absoluteFill],
                    {
                      backgroundColor:
                        COLORS[index] || appTheme.COLORS.TRAINING,
                      width,
                      borderRadius: 15,
                    })
                  }
                />
              </Block>
            </Block>
          );
        })
      : null;
  }

  return (
    <Block style={styles.color}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Block style={styles.block2}>
          <Text style={styles.riskText}>Customer Risk Rating</Text>
          <CustomerData />
          <Divider width={15} color="white"></Divider>
          <Text style={styles.riskText}>Account Risk Rating</Text>
          <AccountData />
          <Divider width={15} color="white"></Divider>
          <Text style={styles.riskText}>Alert Statistics</Text>
          <AlertData />
          <Divider width={15} color="white"></Divider>
          <Text style={styles.riskText}>Top Most Generated Alerts</Text>
          <TopAlertsData />
        </Block>
      </ScrollView>
      <Divider width={15} color="white"></Divider>
      <Block>
        <AmlCWFlow
          ALL={true}
          AMLUSER={user.roleName === "AMLUSER" ? true : false}
          MLRO={user.roleName === "MLRO" ? true : false}
          AMLO={user.roleName === "AMLO" ? true : false}
          onPress={PendingCases}
          ClosedonPress={ClosedCases}
          ForReviewonPress={ForReview}
          ForSTRonPress={ForSTR}
          ApprovedonPress={ApprovedCases}
          RejectedonPress={RejectedCases}
          withoutSTRClosedByAMLUserToAMLO={withoutSTRClosedByAMLUserToAMLO}
          desktopClosedCasesByAMLUserToAMLO = {DesktopClosedCasesByAMLUserToAMLO}
          rejectedCasesByAMLO = {RejectedCasesByAMLO} 
          approvedCasesByAMLO = {ApprovedCasesByAMLO}
          rejectedCasesByMLRO = {RejectedCasesByMLRO}
          approvedCasesByMLRO = {ApprovedCasesByMLRO}
          rejectedCasesByAMLOtoMLRO = {RejectedCasesByAMLOtoMLRO}
          desktopClosedCasesByMLRO = {DesktopClosedCasesByMLRO}
          closedCasesWithoutSTR = {ClosedCasesWithoutSTR}
          closedCasesWithSTR = {ClosedCasesWithSTR}
          desktopClosedCasesByAMLUser = {DesktopClosedByAMLuser}
          viewCasesToBeReviewedByAMLO = {ViewCasesToBeReviewedByAMLO}
          viewCasesToBeReviewedByMLRO = {ViewCasesToBeReviewedByMLRO}
          pendingCases = {PendingCases}
          style={styles.amlCss}
        ></AmlCWFlow>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  color: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: marginBottom,
    backgroundColor: appTheme.COLORS.WHITE,
  },
  block1: {
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
  },
  overText: {
    color: "#052a4f",
    fontFamily: "Bold1",
    fontSize: RFValue(17),
    textAlign: "center",
    // backgroundColor: "blue",
    width: "69%",
  },

  block2: {
    // backgroundColor: appTheme.COLORS.CASE,
    margin: "3%",
  },
  riskText: {
    color: "#59595c",
    marginLeft: "1%",
    fontFamily: "Bold1",
    marginTop: "5%",
    fontSize: 15,
  },
  rating: {
    width: "70%",
    // backgroundColor: "red",
    marginTop: "2%",
    marginLeft: "1%",
  },
  risk: {
    fontFamily: "Regular1",
    textAlign: "left",
    color: "#59595c",
    fontSize: 13,
    textTransform: "capitalize",
  },
  progress: {
    width: "100%",
    flexDirection: "row",
    // alignItems: "flex-end",
    justifyContent: "space-between",
    // backgroundColor: "red",
    marginTop: "1%",
    marginBottom: "0.2%",
  },
  progressBar: {
    flexDirection: "row",
    height: 3,
    width: "100%",
    borderRadius: 15,
    backgroundColor: "#F2F2F2",
  },
  alerts: {
    fontFamily: "Regular1",
    fontSize: 13,
  },

  value: {
    fontFamily: "Regular1",
    fontSize: 13,
  },
  value1: {
    fontSize: 20,
    fontFamily: "Regular1",
  },
});

export default Overview;
