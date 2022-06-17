import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { Block, Text } from "galio-framework";
import { RFValue } from "react-native-responsive-fontsize";
import { appTheme, Images } from "../../config";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import * as Actions from "../../store/actions";
import caseWorkFlowService from "../../service/CaseWorkFlowService";
function MyTray(props) {
  const dispatch = useDispatch();
  const [trayCases, setTrayCases] = useState([]);
  const user = useSelector(({ auth }) => auth.auth);
  console.log("usrerer12333",user.roleName);

  useEffect(() => {
    caseWorkFlowService
      .getMyTrayData(user.roleName)
      .then((response) => {
        setTrayCases(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("mytray", trayCases);

  const arr = {
    title: "Pending Cases",
    caseType: "pendingCases",
    userRole: user.roleName,
  };
  const arr1 = {
    title: "Closed cases",
    caseType: "closedCases",
    userRole: user.roleName,
  };
  const arr2 = {
    title: "Approved cases",
    caseType: "approvedCases",
    userRole: user.roleName,
  };
  const arr3 = {
    title: "Rejected cases",
    caseType: "rejectedCases",
    userRole: user.roleName,
  };

  const arr4 = {
    title: "For Review",
    caseType: "forReview",
    userRole: user.roleName,
  };

  const arr5 = {
    title: "For STR",
    caseType: "forSTR",
    userRole: user.roleName,
  };

  const Rejected = user.roleName === "AMLUSER" ? false : true;
  const Approved = user.roleName === "AMLUSER" ? false : true;
  const ALL = true;
  const ForReview = user.roleName === "MLRO" ? false : true;
  const ForSTR = user.roleName === "AMLUSER" ? true : false;

  function ClosedCases() {
    arr1["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(arr1));
    props.navigation.navigate("Cases");
  }
  function ApprovedCases() {
    arr2["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(arr2));
    props.navigation.navigate("Cases");
  }
  function RejectedCases() {
    arr3["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(arr3));
    props.navigation.navigate("Cases");
  }

  function PendingCases() {
    arr["lastClickedDateTime"] = new Date().getMilliseconds();
    dispatch(Actions.storeCurrentTitle(arr));
    props.navigation.navigate("Cases");
  }

  function forReview() {
    arr4["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(arr4));
    props.navigation.navigate("Cases");
  }

  function forSTR() {
    arr5["lastClickedDateTime"] = new Date();
    dispatch(Actions.storeCurrentTitle(arr5));
    props.navigation.navigate("Cases");
  }
  console.log("mytray");

  return (
    <Block style={styles.container}>
      <Block>
        <Block style={styles.tray}>
          <Text style={styles.myTray}>My Tray</Text>
        </Block>
        <Block style={styles.total}>
          <Text style={styles.totaltext}>
            Total number of cases assigned ({trayCases.totalAssignCases})
          </Text>
        </Block>
        {ALL ? (
          <>
            <Block style={styles.total}>
              <TouchableOpacity onPress={PendingCases}>
                <Text style={styles.totaltext}>
                  Pending Cases ({trayCases.totalPendingCases})
                </Text>
              </TouchableOpacity>
            </Block>
            <Block style={styles.total}>
              <TouchableOpacity onPress={ClosedCases}>
                <Text style={styles.totaltext}>
                  Desktop Closure ({trayCases.totalClosedCases})
                </Text>
              </TouchableOpacity>
            </Block>
          </>
        ) : null}
        {Rejected ? (
          <Block style={styles.total}>
            <TouchableOpacity onPress={RejectedCases}>
              <Text style={styles.totaltext}>
                Rejected({trayCases.totalRejectStr})
              </Text>
            </TouchableOpacity>
          </Block>
        ) : null}
        {Approved ? (
          <Block style={styles.total}>
            <TouchableOpacity onPress={ApprovedCases}>
              <Text style={styles.totaltext}>
                Approved({trayCases.totalConfirmedStr})
              </Text>
            </TouchableOpacity>
          </Block>
        ) : null}
        {ForReview ? (
          <Block style={styles.total}>
            <TouchableOpacity onPress={forReview}>
              <Text style={styles.totaltext}>
                For Review ({trayCases.totalForReview})
              </Text>
            </TouchableOpacity>
          </Block>
        ) : null}
        {ForSTR ? (
          <Block style={styles.total}>
            <TouchableOpacity onPress={forSTR}>
              <Text style={styles.totaltext}>
                For STR ({trayCases.totalForSTR})
              </Text>
            </TouchableOpacity>
          </Block>
        ) : null}
      </Block>
      {/* <Block middle>
        <Image
          source={Images.QDE}
          style={styles.qdeLogo}
          resizeMode="contain"
        ></Image>
      </Block> */}
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.COLORS.WHITE,
    justifyContent: "space-between",
  },

  tray: {
    backgroundColor: "#052a4f",
    height: heightPercentageToDP("5%"),
    marginTop: "8%",
    marginBottom: "1%",
    width: "45%",
    justifyContent: "center",
    borderTopRightRadius: widthPercentageToDP("10%"),
    borderBottomRightRadius: widthPercentageToDP("10%"),
  },
  myTray: {
    color: appTheme.COLORS.WHITE,
    fontFamily: "Regular1",
    fontSize: RFValue(15),
    marginLeft: "5%",
    fontFamily: "Bold1",
  },
  total: {
    height: heightPercentageToDP("4%"),
    marginHorizontal: "3%",
    justifyContent: "center",
  },
  totaltext: {
    fontFamily: "Regular1",
    color: "#59595c",
    fontSize: RFValue(13),
    marginLeft: "2%",
  },
  qdeLogo: {
    width: "35%",
  },
});

export default MyTray;
