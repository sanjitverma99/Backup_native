import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  View,
  BackHandler,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
  TextInput,
  RefreshControl,
  Alert,
} from "react-native";
import { Block, Text } from "galio-framework";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { appTheme, Images } from "../../config";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Divider } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Bottom from "../../component/Bottom";
import * as Actions from "../../store/actions";
import caseWorkFlowService from "../../service/CaseWorkFlowService";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "react-native-snackbar-component";
import SkeletonContent from "react-native-skeleton-content";

const top = Platform.OS === "ios" ? "30%" : "21%";
const marginBottom = Platform.select({
  ios: "5%",
  android: "0%",
});

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

var width = Dimensions.get("screen").width;
function Cases(props, { navigation }) {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState(0);
  const [pendingCases, setPendingCases] = useState([]);
  const [currentCases, setCurrentCases] = useState([]);
  const [dummyCases, setDummyCases] = useState([]);
  const [snackIsVisible, setSnackIsVisible] = useState(false);
  const [distance, setDistance] = useState(0);
  const [customerId, setCustomerId] = useState("");
  const [accountNoSearch, setAccountNoSearch] = useState("");
  const [caseNo, setcaseNo] = useState("");
  const arrData = [];
  const [hide, setHide] = useState(true);
  const [AMLUser, setAMLUser] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const user = useSelector(({ auth }) => auth.auth);
   console.log("userRRRR", user);
  const [loading, setLoading] = useState(true);
  wait(2000).then(() => setLoading(false));
  // console.log("loading", loading);
  const onRefresh = React.useCallback(() => {
    // wait(1000).then(() => setRefreshing(true));
    refreshing
      ? // ? setTimeout(() => setRefreshing(true), 5000)
        wait(2000).then(() => setRefreshing(true))
      : setRefreshing(false);
    setCurrentCases(dummyCases);
  }, [dummyCases]);
  console.log("loading", loading);
  // const interval = setTimeout(() => {
  //   setLoading(true);
  //   clearTimeout();
  // }, 1000);
  // useEffect(() => {
  //   // setLoading(true);
  // }, [interval]);

  // console.log("timer", interval);
  // console.log("timer");

  function handleMasking(stringval) {
   return stringval.substring(0, stringval.length - 4).replace(/[0-9]/g, "X").concat(stringval.slice(stringval.length - 4));
   }

  function handleAccountNoSearch(accountNo) {
    setAccountNoSearch(accountNo);
  }

  function handleCustomerId(customerId) {
    setCustomerId(customerId);
  }

  function handleCaseNo(caseNo) {
    setcaseNo(caseNo);
  }

  //Back Handler

  
  function backpress() {
    console.log("hit");
    props.navigation.navigate("Overview");
    // setLoading(true);
  }
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => backpress(),
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const title = "Search";

  // console.log(caseNo);
  function checkcases() {
    const filteredArray = pendingCases[5].filter((cases) => {
      return cases.accountNo === accountNoSearch;
    });

    if (1 === 1) {
      searchHandler2();
    } else {
      setAMLUser(true);
      setTimeout(() => setHide((hide) => !hide), 2000);
    }
  }

  // console.log(
  //   "compare",
  //   pendingCases[5].map((cases) => cases.caseNo)
  // );
  // console.log("casesNo", caseNo.slice(-4));

  function searchHandler2() {
    console.log("hit");
    if (
      customerId != "" &&
      customerId != undefined &&
      accountNoSearch != "" &&
      accountNoSearch != undefined
    ) {
      console.log("jjaaaaaa");
      return pendingCases
        .filter(
          (eachCase) =>
            eachCase.accountNo.substring(
              eachCase.accountNo.length - 4,
              eachCase.accountNo.length
            ) === accountNoSearch,
          console.log(accountNoSearch)
        )
        .map((data1) => {
          arrData[1] = data1;
          setCurrentCases(arrData);
          setAccountNoSearch("");
        });
    } else if (accountNoSearch != "" && accountNoSearch != undefined) {
      console.log("accNosearch");
      console.log("acccno", accountNoSearch);
      return pendingCases
        .filter(
          (eachCase) =>
            eachCase.accountNo.substring(
              eachCase.accountNo.length - 4,
              eachCase.accountNo.length
            ) === accountNoSearch,
          console.log(accountNoSearch)
        )
        .map((data1) => {
          arrData[1] = data1;
          setCurrentCases(arrData);
          setAccountNoSearch("");
          setModalVisible(false);
        });
    } else if (caseNo != "" && caseNo != undefined) {
      return pendingCases
        .filter((eachCase) => eachCase.caseNo === caseNo)
        .map((data1) => {
          // console.log("caseNo", data1);
          arrData[1] = data1;
          setCurrentCases(arrData);
          setcaseNo("");
          setModalVisible(false);
        });
    } else {
      return pendingCases
        .filter(
          (eachCase) =>
            eachCase.customerId.substring(
              eachCase.customerId.length - 4,
              eachCase.customerId.length
            ) === customerId,
          console.log(customerId)
        )
        .map((data1) => {
          arrData[1] = data1;
          setCurrentCases(arrData);
          setCustomerId("");
          setAccountNoSearch("");
          setModalVisible(false);
        });
    }
  }

  function searchHandler33() {
    if (
      customerId != "" &&
      customerId != undefined &&
      caseNo != "" &&
      caseNo != undefined &&
      accountNoSearch != "" &&
      accountNoSearch != undefined
    ) {
      return pendingCases[5]
        .filter(
          (eachCase) => eachCase.caseNo === caseNo,

          (eachCase) => eachCase.customerId === customerId,
          (eachCase) => eachCase.accountNo === accountNoSearch
        )
        .map((data1) => {
          // console.log("jjj", data1);
          arrData[1] = data1;
          setCurrentCases(arrData);
          setCustomerId("");
          setcaseNo("");
          // console.log("arrData", arrData);
        });
    } else if (accountNoSearch != "" && accountNoSearch != undefined) {
      return pendingCases[5]
        .filter((eachCase) => eachCase.accountNo === accountNoSearch)
        .map((data1) => {
          // console.log("accNo", data1);
          arrData[1] = data1;
          setCurrentCases(arrData);
          setAccountNoSearch("");
          setModalVisible(false);
        });
    } else if (caseNo != "" && caseNo != undefined) {
      return pendingCases[5]
        .filter((eachCase) => eachCase.caseNo === caseNo)
        .map((data1) => {
          // console.log("caseNo", data1);
          arrData[1] = data1;
          setCurrentCases(arrData);
          setcaseNo("");
          setModalVisible(false);
        });
    } else {
      return pendingCases[5]
        .filter((eachCase) => eachCase.customerId === customerId)
        .map((data1) => {
          arrData[1] = data1;
          setCurrentCases(arrData);
          setCustomerId("");
          setAccountNoSearch("");
          setModalVisible(false);
        });
    }
  }

  const utils = useSelector(
    ({ caseworkflow }) => caseworkflow.caseworkflow.data
  );
  console.log(utils.moduleType+"  UTILS UTILS")
  console.log(utils.caseValue, "CASE RATING")
  console.log(utils.fromDate)
  console.log(utils.toDate)

  const fromDate = utils.fromDate;
  const toDate = utils.toDate;
  const alertCode = "";
  const branchCode = "";
  const accountNo =  utils.accountNo;
  const customerIdd = utils.customerId;
  const hasAnyOldCases = utils.hasAnyOldCases;
  const selectedCaseStatus = utils.selectedCaseStatus;
  const  selectedSubCaseStatus = utils.selectedSubCaseStatus;
  const caserating = utils.caseValue;
  const fromCaseNo = utils.fromCaseNo;
  const toCaseNo = utils.toCaseNo;
  const userCode = user.roleName;
  const groupCode = "ROLE_"+user.roleName;
  const ipAddress = "";
  const moduleType = utils.moduleType;
  useEffect(
    () => {
      console.log("case rating useffect", caserating)
      if(utils.moduleType==='N.A'){
      caseWorkFlowService
        .getPendingCasesData(
          fromDate,
          toDate,
          alertCode,
          branchCode,
          accountNo,
          customerIdd,
          hasAnyOldCases,
          caserating,
          fromCaseNo,
          toCaseNo,
          userCode,
          groupCode,
          ipAddress
        )

        .then((response) => {
          console.log("response", response);
          setPendingCases(response.casesList);

          setCurrentCases(response.casesList);
          setRefreshing(false);
          setDummyCases(response.casesList);
          setChecked(0);
        })
        .catch((error) => {});
      }
      else if(utils.moduleType!='N.A'){
        console.log("caseRating in else", caserating)
        caseWorkFlowService
        .getPendingCasesBySelf(
          fromDate,
          toDate,
          alertCode,
          branchCode,
          accountNo,
          customerIdd,
          hasAnyOldCases,
          caserating,
          selectedCaseStatus,
          selectedSubCaseStatus,
          fromCaseNo,
          toCaseNo,
          userCode,
          groupCode,
          ipAddress,
          moduleType
        )

        .then((response) => {
          console.log("response", response);
          setPendingCases(response.casesList);

          setCurrentCases(response.casesList);
          setRefreshing(false);
          setDummyCases(response.casesList);
          setChecked(0);
        })
        .catch((error) => {});

      }
    },
    
    [utils.lastClickedDateTime],
    [accountNoSearch],[utils.moduleType],
    [customerId],[caseNo],[utils], [caserating]

  
  );


  function backPress() {
    props.navigation.navigate("Overview");
  }

  
  const BonafideOkArr = {
    title: utils.title,
    STR: "Bonafide OK",
    caseNo: checked,
  };
  
  const ForReviewArr = {
    title: utils.title,
    STR: "For Review",
    caseNo: checked,
  };
  const ApproveArr = {
    title: utils.title,
    STR: "Approve",
    caseNo: checked,
  };

  const reviewToBeOKArr = {
    title: utils.title,
    STR: "reviewToBeOKArr",
    caseNo: checked,
  };


  const reviewToBeOKArrByMLRO = {
    title: utils.title,
    STR: "reviewToBeOKArrByMLRO",
    caseNo: checked,
  };  
  const reopenCaseArrByMLRO = {
    title: utils.title,
    STR: "reopenCaseArrByMLRO",
    caseNo: checked,
  };

  const reopenCaseArr = {
    title: utils.title,
    STR: "reopenCaseArr",
    caseNo: checked,
  };

  
  const RejectArr = {
    title: utils.title,
    STR: "Reject",
    caseNo: checked,
  };

  const ForStrArr = {
    title: utils.title,
    STR: "For STR",
    caseNo: checked,
  };

  const viewCommentArr = {
    title: utils.title,
    STR: "ViewComment",
    caseNo: checked,
  };
  if(user.roleName==='AMLUSER'){
    BonafideOkArr['caseStatus']=11
    ForReviewArr['caseStatus']=4
    ForReviewArr['reassignToUserCode']= 'AMLO'
    ForStrArr['caseStatus']=6
    ForStrArr['reassignToUserCode']= 'AMLO'
  }
  else if(user.roleName==='AMLO'){
    BonafideOkArr['caseStatus']=61
    ForReviewArr['caseStatus']=22
    ForReviewArr['reassignToUserCode'] = 'MLRO'
    ApproveArr['caseStatus']=8
    ApproveArr['reassignToUserCode']= 'MLRO'
    RejectArr['caseStatus']=7
    RejectArr['reassignToUserCode']='AMLUSER'
    reviewToBeOKArr['caseStatus']=2000
    reopenCaseArr['caseStatus'] = 2001
  }
  else if(user.roleName==='MLRO'){
    BonafideOkArr['caseStatus']=62
    ApproveArr['caseStatus']=10
    RejectArr['caseStatus']=9
    reviewToBeOKArrByMLRO['caseStatus']=0
    reopenCaseArrByMLRO['caseStatus'] = 0
  }

  function BonafideOk() {
    if (checked === 0) {
      setSnackIsVisible(true);
      setTimeout(() => {
        setSnackIsVisible(false);
      }, 2000);
    } else {
      // dispatch(Actions.storeCurrentTitle(caseNo));
      dispatch(Actions.storeCurrentTitle(BonafideOkArr));
      props.navigation.navigate("STR");
    }
  }

  function forSTR() {
    if (checked === 0) {
      setSnackIsVisible(true);
      setTimeout(() => {
        setSnackIsVisible(false);
      }, 2000);
    } else {
      // dispatch(Actions.storeCurrentTitle(caseNo));
      dispatch(Actions.storeCurrentTitle(ForStrArr));
      props.navigation.navigate("STR");
    }
  }

  function ForReview() {
    if (checked === 0) {
      setSnackIsVisible(true);
      setTimeout(() => {
        setSnackIsVisible(false);
      }, 2000);
    } else {
      dispatch(Actions.storeCurrentTitle(ForReviewArr));
      props.navigation.navigate("STR");
    }
  }
  function Approve() {
    if (checked === 0) {
      setSnackIsVisible(true);
      setTimeout(() => {
        setSnackIsVisible(false);
      }, 2000);
    } else {
      dispatch(Actions.storeCurrentTitle(ApproveArr));
      props.navigation.navigate("STR");
    }
  }
  function Reject() {
    if (checked === 0) {
      setSnackIsVisible(true);
      setTimeout(() => {
        setSnackIsVisible(false);
      }, 2000);
    } else {
      dispatch(Actions.storeCurrentTitle(RejectArr));
      props.navigation.navigate("STR");
    }
  }

  function ReviewToBeOK() {
    if (checked === 0) {
      setSnackIsVisible(true);
      setTimeout(() => {
        setSnackIsVisible(false);
      }, 2000);
    } else {
      dispatch(Actions.storeCurrentTitle(reviewToBeOKArr));
      props.navigation.navigate("STR");
    }
  }

  function ReviewToBeOKByMLRO() {
    if (checked === 0) {
      setSnackIsVisible(true);
      setTimeout(() => {
        setSnackIsVisible(false);
      }, 2000);
    } else {
      dispatch(Actions.storeCurrentTitle(reviewToBeOKArrByMLRO));
      props.navigation.navigate("STR");
    }
  }

  function ReopenCase() {
    if (checked === 0) {
      setSnackIsVisible(true);
      setTimeout(() => {
        setSnackIsVisible(false);
      }, 2000);
    } else {
      dispatch(Actions.storeCurrentTitle(reopenCaseArrByMLRO));
      props.navigation.navigate("STR");
    }
  }

  function ReopenCaseByMLRO() {
    if (checked === 0) {
      setSnackIsVisible(true);
      setTimeout(() => {
        setSnackIsVisible(false);
      }, 2000);
    } else {
      dispatch(Actions.storeCurrentTitle(reopenCaseArr));
      props.navigation.navigate("STR");
    }
  }

  function ViewComment() {
    dispatch(Actions.storeCurrentTitle(viewCommentArr));
    props.navigation.navigate("STR");
  }

  const colorCodes = {
    HIGH: "#D83232",
    MEDIUM: "#EEC82C",
    LOW: "#1B8EBC",
    3: "#D83232",
    2: "#EEC82C",
    1: "#1B8EBC",
  };
  const firstLayout = [
    {
      width: wp(90),
      height: hp(10),
      margin: "1%",
    },
    {
      width: wp(90),
      height: hp(10),
      margin: "1%",
    },
    {
      width: wp(90),
      height: hp(10),
      margin: "1%",
    },
    {
      width: wp(90),
      height: hp(10),
      margin: "1%",
    },
    {
      width: wp(90),
      height: hp(10),
      margin: "1%",
    },
    {
      width: wp(90),
      height: hp(10),
      margin: "1%",
    },
    {
      width: wp(90),
      height: hp(10),
      margin: "1%",
    },
  ];

  function Data() {
    return currentCases != undefined && currentCases !== null
      ? Object.entries(currentCases).map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setChecked(item[1].caseNo)}
            >
              <Block style={styles.component}>
                <Block
                  style={[
                    checked == item[1].caseNo ? styles.activeList : styles.list,
                    {
                      borderLeftColor: colorCodes[item[1].caseRating],
                      borderLeftWidth: widthPercentageToDP("1.5%"),
                    },
                  ]}
                >
                  <Block style={styles.details}>
                    <Text style={styles.casedetails}>
                      Case No:{item[1].caseNo}
                    </Text>
                    <Text style={styles.casedetails}>
                      Customer Id:
                      {"\n"}
                      {handleMasking(item[1].customerId)}
                    </Text>
                  </Block>
                  <Divider
                    orientation="vertical"
                    width={1}
                    style={styles.divider1}
                    color="#d8d8d8"
                  ></Divider>
                  <Block style={styles.names}>
                    <Text style={styles.casedetails1}>
                      {item[1].customerName}
                    </Text>
                    <Text style={styles.casedetails1}>
                      Account No {"\n"}
                      {handleMasking(item[1].accountNo)}
                    </Text>
                  </Block>
                </Block>

                <Divider width={12} color="white"></Divider>
              </Block>
            </TouchableOpacity>
          );
        })
      : null;
  }
  return (
    <Block style={styles.container}>
      <TouchableWithoutFeedback>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <Block style={styles.modalView}>
                {hide ? (
                  <>
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "Bold1",
                        color: "red",
                      }}
                    >
                      Enter valid details
                    </Text>
                  </>
                ) : null}
                <Block style={styles.account}>
                  <Text style={styles.text}>Case No</Text>
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      paddingLeft: "2%",
                      borderRadius: widthPercentageToDP("5%"),
                      height: heightPercentageToDP("5%"),
                      width: widthPercentageToDP("52%"),
                    }}
                    onChangeText={(e) => handleCaseNo(e)}
                    placeholderTextColor={appTheme.COLORS.LIGHTGREY}
                  ></TextInput>
                </Block>
                <Block style={styles.account}>
                  <Text style={styles.text}>Account Number</Text>
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      paddingLeft: "2%",
                      borderRadius: widthPercentageToDP("5%"),
                      height: heightPercentageToDP("5%"),
                      width: widthPercentageToDP("52%"),
                    }}
                    onChangeText={(e) => handleAccountNoSearch(e)}
                    placeholderTextColor={appTheme.COLORS.LIGHTGREY}
                  ></TextInput>
                </Block>
                <Block style={styles.account1}>
                  <Text style={styles.text}>Customer ID</Text>
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      paddingLeft: "2%",
                      width: widthPercentageToDP("52%"),
                      borderRadius: widthPercentageToDP("5%"),
                      height: heightPercentageToDP("5%"),
                    }}
                    onChangeText={(e) => handleCustomerId(e)}
                    placeholderTextColor={appTheme.COLORS.LIGHTGREY}
                  ></TextInput>
                </Block>
                <Block style={styles.searchlogo1}>
                  {/* <Ionicons
                    name="search"
                    color="white"
                    size={30}
                    style={styles.icon}
                    onPress={searchHandler2}
                  ></Ionicons> */}
                  <TouchableOpacity
                    onPress={checkcases}
                    style={styles.searchButton}
                  >
                    <Text style={styles.searchText}>Search</Text>
                  </TouchableOpacity>
                </Block>
              </Block>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </TouchableWithoutFeedback>
      <SkeletonContent
        containerStyle={styles.top}
        layout={firstLayout}
        isLoading={loading}
      >
        <Block style={{ flex: 1 }}>
          <Block style={styles.heading}>
            <TouchableOpacity onPress={backPress}>
              <Image
                source={Images.Back}
                resizeMode="contain"
                style={styles.backIcon}
              ></Image>
            </TouchableOpacity>
            <Text style={styles.header}>
              {utils.title} -
              {/* {utils.title === "Pending Cases"
              ? totalCount.totalPendingCases
              : utils.title === "Rejected cases"
              ? totalCount.totalRejectStr
              : utils.title === "Approved cases"
              ? totalCount.totalFileStr
              : utils.title === "Closed cases"
              ? totalCount.totalConfirmedStr
              : ""} */}
              {/* {currentCases.length} */}
            </Text>
            <Ionicons
              name="search"
              color="#052a4f"
              size={25}
              style={styles.icon}
              onPress={() => setModalVisible(!modalVisible)}
            ></Ionicons>
          </Block>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Data />

            {/* <searchHandler2/> */}
          </ScrollView>
        </Block>
      </SkeletonContent>

      <Block style={styles.bottom}>
        <Bottom
          // RejectonPress={ForReview}
          BonafideOk={BonafideOk}
          AMLUser={
            user.roleName === "AMLUSER" && utils.title === "pending Cases"
              ? true
              : false
          }
          AMLO={
            user.roleName === "AMLO" && utils.title === "pending Cases"
              ? true
              : false
          }
          AMLOReview={
            user.roleName === "AMLO" && utils.title === "Cases To Be Reviewed By AMLO"
          }
          MLRO={
            user.roleName === "MLRO" && utils.title === "pending Cases"
              ? true
              : false
          }
          MLROReview={
            user.roleName === "MLRO" && utils.title === "Cases To Be Reviewed By MLRO"
              ? true
              : false
          }
          
          ForReview={ForReview}
          Approve={Approve}
          ForSTR={forSTR}
          Reject = {Reject}
          ReviewToBeOK = {ReviewToBeOK}
          ReopenCase = {ReopenCase}
          ReviewToBeOKByMLRO = {ReviewToBeOKByMLRO}
          ReopenCaseByMLRO = {ReopenCaseByMLRO}
          ViewComment = {ViewComment}
        ></Bottom>
        <Snackbar
          visible={snackIsVisible}
          //SnackBar visibility control
          textMessage="Select a Case"
          //Text on SnackBar
          actionHandler={() => {
            //function called while clicking on action Text
            alert("let's go");

            //After handling click making nackBar invisible
            setSnackIsVisible(false);
          }}
          //action Text to print on SnackBar
          distanceCallback={(distance) => {
            //Number indicating distance taken up by snackbar
            setDistance(distance);
          }}
        />
        {/* <BottomSheet
          MyTrayClick={MyTray}
          NotificationClick={Notifications}
          UserClick={User}
          SearchClick={() => setModalVisible1(!modalVisible1)}
        ></BottomSheet> */}
        {/* <SearchBottom
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
    backgroundColor: appTheme.COLORS.WHITE,
    marginBottom: marginBottom,
  },
  heading: {
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    margin: "4%",
  },
  header: {
    fontFamily: "Bold1",
    fontSize: RFValue(15),
    color: "#59595c",
  },
  details: {
    width: widthPercentageToDP("32%"),
    alignItems: "center",
    justifyContent: "center",

    marginTop: "3%",
    marginBottom: "3%",
  },
  casedetails: {
    fontFamily: "Regular1",
    fontSize: RFValue(11),
    alignSelf: "stretch",
    marginLeft: "12%",
    color: appTheme.COLORS.BLACK,
  },
  casedetails1: {
    fontFamily: "Regular1",
    fontSize: RFValue(11),
    textAlign: "left",
    marginLeft: "8%",
    color: appTheme.COLORS.BLACK,
  },
  caseRatings: {
    fontFamily: "Regular1",
    fontSize: RFValue(15),
    textAlign: "left",
    color: appTheme.COLORS.YELLOW,
  },
  names: {
    width: "60%",
    justifyContent: "center",
    // marginTop: "3%",
    // marginBottom: "3%",\

    // alignItems: "flex-start",
    // backgroundColor: "blue",
  },

  textField3: {
    backgroundColor: appTheme.COLORS.WHITE,
  },

  divider1: {
    marginHorizontal: "1%",
    marginVertical: "5%",
  },
  radio: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  searchlogo1: {
    alignItems: "flex-end",
    marginRight: "4%",
    marginTop: "6%",
  },
  gap: { width: "3%" },
  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: top,
  },
  modalView: {
    backgroundColor: "#EFEFEF",
    padding: "1%",
    shadowColor: "#000",
    width: "90%",
    paddingTop: heightPercentageToDP("5%"),
    paddingBottom: heightPercentageToDP("5%"),
    borderRadius: widthPercentageToDP("5%"),
    // shadowOffset: {
    //   width: 100,
    //   height: 100,
    // },
    // shadowOpacity: 5,
    // shadowRadius: 4,
    // elevation: 5,
  },
  searchButton: {
    backgroundColor: "#052a4f",
    alignItems: "center",
    justifyContent: "center",
    height: heightPercentageToDP(6),
    width: widthPercentageToDP(28),
    borderRadius: widthPercentageToDP("12%"),
  },
  searchText: {
    color: appTheme.COLORS.WHITE,
    fontSize: RFValue(14),
    fontFamily: "Regular1",
  },
  fromD: {
    backgroundColor: "white",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    width: "44%",
  },
  textDate: {
    fontFamily: "Regular1",
    margin: 5,
  },
  dates: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  account: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  account1: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    marginTop: "3%",
  },
  text: {
    width: widthPercentageToDP("32%"),
    color: "#59595c",
    marginLeft: "1%",
    fontFamily: "Regular1",
  },
  accountNo: {
    color: appTheme.COLORS.WHITE,
    fontFamily: "Regular1",
  },
  // component: { margin: "1%" },
  scrollview: {},
  list: {
    backgroundColor: "#F3F3F3",
    flexDirection: "row",
    height: heightPercentageToDP("9%"),
  },
  activeList: {
    backgroundColor: "#A9A9A9",
    flexDirection: "row",
    height: heightPercentageToDP("9%"),
    borderLeftColor: appTheme.COLORS.BLACK,
    borderLeftWidth: 5,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: "Regular1",
    color: appTheme.COLORS.BLACK,
    shadowColor: "#47566c",
    textShadowColor: "#47566c",
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: "30%",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: "#47566c",
    color: "#47566c",
    margin: 5,
  },
  menu: {
    width: "66%",
    marginRight: "1%",

    marginTop: "2%",
    marginBottom: "2%",
  },
  backIcon: {
    width: wp(5),
    height: hp(3),
  },
});

export default Cases;
