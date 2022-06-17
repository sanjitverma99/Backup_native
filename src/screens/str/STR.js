import { Block, Text } from "galio-framework";

import React, { useState, useRef } from "react";

import {
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  View,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
// import InputField from "../../component/InputField";
import { appTheme, Images } from "../../config";
import { Divider } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { useEffect } from "react";
import caseWorkFlowService from "../../service/CaseWorkFlowService";
import BottomSheet from "../../component/BottomSheet";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../../store/actions";
import { isNull } from "lodash";
import { IconButton } from "react-native-paper";

function STR(props) {
  const user = useSelector(({ auth }) => auth.auth);

  const dispatch = useDispatch();
  const [modalVisible1, setModalVisible1] = useState(false);
  const [disable, setDisable] = useState(true);
  const { checked } = props;
  const [comments, setComments] = useState([]);
  const [amlUserComments, setAmlUserComments] = useState("");
  const [amloComments, setAmloComments] = useState("");
  const [mlroComments, setMlroComments] = useState("");
  const field = useRef("");
  let commentsSave = "";
  let closedCaseStatus = -1;

  const utils = useSelector(
    ({ caseworkflow }) => caseworkflow.caseworkflow.data
  );
  console.log('utilss CASESTATUS',utils.caseStatus);

  console.log("title", utils.title);

  var Check = false;
  if (utils.title === "pending Cases" || utils.title === "Cases To Be Reviewed By AMLO" ||utils.title === "Cases To Be Reviewed By MLRO") {
    Check = true;
  }

  let pendingCasesCheck = false;
  if(utils.title === "pending Cases"  || utils.title === "Cases To Be Reviewed By AMLO" |utils.title === "Cases To Be Reviewed By MLRO"){
    pendingCasesCheck = true;
  }

  let mlroCheck = false;
  if (user.roleName === "MLRO" || user.roleName === "ADMIN") {
    mlroCheck = true;
  }

  let amloCheck = false;
  if (user.roleName === "AMLO") {
    amloCheck = true;
    console.log(amloCheck);
  }

  let amlUserCheck = false;
  if (user.roleName === "AMLUSER") {
    amlUserCheck = true;
  }
  console.log("userRole", user.roleName);

  // const (utils.title === "View Comment") {
  //   setDisable(false);
  // }

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
    title: "viewComment",
    caseType: "rejectedCases",
    userRole: user.roleName,
  };
  // const arrSearch = {
  //   title: "Search",
  //   userRole: user.roleName,
  // };

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

  
  console.log("str", utils.STR);
  function saveHandler2() {
    if (user.roleName == "ADMIN") {
      commentsSave = mlroComments;
    } else if (user.roleName == "AMLO") {
      commentsSave = amloComments;
    } else if (user.roleName == "AMLUSER") {
      commentsSave = amlUserComments;
    }
    caseWorkFlowService
      .saveUserComments(
        utils.caseStatus,
        user.roleName,
        utils.STR,
        utils.caseNo,
        commentsSave,
        null
      )
      .then((response) => {
        props.navigation.navigate("Overview");
        if (user.roleName == "ADMIN" || user.roleName == "MLRO") {
          setMlroComments("");
        } else if (user.roleName == "AMLO") {
          setAmloComments("");
        } else if (user.roleName == "AMLUSER") {
          setAmlUserComments("");
        }
      });
  }
 const userCode = "";

 const flagType = "";
 const caseNo = utils.caseNo;
 const fraudIndicator= "";
 const removalReason="";
 const outcomeIndicator = "";
 const highRiskReasonCode = "";
 const addedToFalsePositive = "";
 const lastReviewDate = "";
 const userActionType = "saveAndCloseCase";
 const amlUserAddToMarkAll = "";
 const reassignToUserCode = "";
 const alertNos = "";
 const assignedBranchCode = "";
 const fromDate = "";
 const toDate = "";
 const alertCode = "";
 const branchCode = "";
 const accountNo = "";
 const customerId = "";
 const hasAnyOldCases = "";
 const caseRating = "";
 const fromCaseNo = "";
 const toCaseNo = "";
 const ipAddress = "";

 function saveHandler(){
 /* if (user.roleName == "ADMIN" || user.roleName == "MLRO") {
  commentsSave = "pppp";
} else if (user.roleName == "AMLO") {
  commentsSave = "lkkkk";
} else if (user.roleName == "AMLUSER") {
  commentsSave = "lll";
} */
let userRole = "ROLE_"+user.roleName;

if (user.roleName == "MLRO") {
  commentsSave = mlroComments;
} else if (user.roleName == "AMLO") {
  commentsSave = amloComments;
} else if (user.roleName == "AMLUSER") {
  commentsSave = amlUserComments;
}


caseWorkFlowService.saveAndCloseComments(
  user.roleName, 
   userRole, 
    ipAddress,
    utils.caseNo,
    utils.caseStatus,
    flagType,
    commentsSave,
    fraudIndicator,
    removalReason,
    outcomeIndicator,
    highRiskReasonCode,
    addedToFalsePositive,
    lastReviewDate,
    userActionType,
    amlUserAddToMarkAll,
    utils.reassignToUserCode,
    alertNos,
    assignedBranchCode,
    fromDate, 
    toDate, 
    alertCode, 
    branchCode, 
    accountNo,
    customerId,
    hasAnyOldCases, 
    caseRating,
    fromCaseNo,
    toCaseNo).then((response)=>{
      props.navigation.navigate("Overview");
      if (user.roleName == "ADMIN") {
        setMlroComments("");
      } else if (user.roleName == "AMLO") {
        setAmloComments("");
      } else if (user.roleName == "AMLUSER") {
        setAmlUserComments("");
      }
    });
  }
  
  
  console.log("CHECKING"+comments.CUSTOMERID);
  const userRole = "ROLE_"+user.roleName;
  
  useEffect(() => {
    caseWorkFlowService
      .getViewCommentsDetails(
        utils.caseNo,
        utils.caseStatus,
        user.roleName,
        userRole,
        ipAddress)
      .then((response) => {
        setComments(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [utils]);

  function handleChange(textdata) {
    setCommentss(textdata);
  }

  function backpress() {
    if (utils.title === "pending Cases") {
      pendingCases["lastClickedDateTime"] = new Date();
      dispatch(Actions.storeCurrentTitle(pendingCases));
      props.navigation.navigate("Cases");
    } else if (utils.title === "view Without STR Closed By AMLUser") {
      closedCasesWithSTR["lastClickedDateTime"] = new Date();
      dispatch(Actions.storeCurrentTitle(closedCasesWithSTR));
      props.navigation.navigate("Cases");
    } else if (utils.title === "view Without STR Closed By AMLUser") {
      closedCasesWithoutSTR["lastClickedDateTime"] = new Date();
      dispatch(Actions.storeCurrentTitle(closedCasesWithoutSTR));
      props.navigation.navigate("Cases");
    } else if (utils.title === "desktop Closed By AMLuser") {
      arr2["lastClickedDateTime"] = new Date();
      dispatch(Actions.storeCurrentTitle(desktopClosedByAMLuser));
      props.navigation.navigate("Cases");
    }
    else if (utils.title === "approved Cases By AMLO") {
      approvedCasesByAMLO["lastClickedDateTime"] = new Date();
      dispatch(Actions.storeCurrentTitle(approvedCasesByAMLO));
      props.navigation.navigate("Cases");
     }
     else if (utils.title === "rejected Cases By AMLO") {
      rejectedCasesByAMLO["lastClickedDateTime"] = new Date();
      dispatch(Actions.storeCurrentTitle(rejectedCasesByAMLO));
      props.navigation.navigate("Cases");
     }
     else if (utils.title === "closed Cases Without STR By AMLUser") {
      closedCasesWithoutSTRByAMLUserToAMLO["lastClickedDateTime"] = new Date();
      dispatch(Actions.storeCurrentTitle(closedCasesWithoutSTRByAMLUserToAMLO));
      props.navigation.navigate("Cases");
     }
     else if (utils.title === "desktop Closed By AMLuser To AMLO") {
      desktopClosedByAMLuserToAMLO["lastClickedDateTime"] = new Date();
      dispatch(Actions.storeCurrentTitle(desktopClosedByAMLuserToAMLO));
      props.navigation.navigate("Cases");
     }
     else if (utils.title === "Cases To Be Reviewed By AMLO") {
      viewCasesToBeReviewedByAMLO["lastClickedDateTime"] = new Date();
      dispatch(Actions.storeCurrentTitle(viewCasesToBeReviewedByAMLO));
      props.navigation.navigate("Cases");
     }
     else if (utils.title === "Cases To Be Reviewed By MLRO") {
      viewCasesToBeReviewedByMLRO["lastClickedDateTime"] = new Date();
      dispatch(Actions.storeCurrentTitle(viewCasesToBeReviewedByMLRO));
      props.navigation.navigate("Cases");
     }
     else if (utils.title === "viewDeskTopClosedByMLRO") {
      deskTopClosedByMLRO["lastClickedDateTime"] = new Date();
      dispatch(Actions.storeCurrentTitle(deskTopClosedByMLRO));
      props.navigation.navigate("Cases");
     }
     else if (utils.title === "viewRejectedCasesByAMLOToMLRO") {
      rejectedCasesByAMLOToMLRO["lastClickedDateTime"] = new Date();
      dispatch(Actions.storeCurrentTitle(rejectedCasesByAMLOToMLRO));
      props.navigation.navigate("Cases");
     }
     else if (utils.title === "viewApprovedCasesByMLRO") {
      approvedCasesByMLRO["lastClickedDateTime"] = new Date();
      dispatch(Actions.storeCurrentTitle(approvedCasesByMLRO));
      props.navigation.navigate("Cases");
     }
     else if (utils.title === "viewRejectedCasesByMLRO") {
      rejectedCasesByMLRO["lastClickedDateTime"] = new Date();
      dispatch(Actions.storeCurrentTitle(rejectedCasesByMLRO));
      props.navigation.navigate("Cases");
     }
  }
  const hide = utils.title === "pending Cases" || utils.title === "Cases To Be Reviewed By AMLO"? true : false;
  return (
    <Block style={styles.container}>
      <Block>
        <Block style={styles.heading}>
          <IconButton
            icon={Images.Back}
            size={20}
            style={styles.back}
            onPress={backpress}
          ></IconButton>
          <Text style={styles.text}>
            {utils.STR} :-{utils.caseNo}
          </Text>
        </Block>
        <View style={styles.system}>
          <Text style={styles.source}>Source System - </Text>
          <View style={styles.comment}>
            <TextInput
              style={styles.null}
              placeholderTextColor="#052a4f"
              editable={Check}
            ></TextInput>
            <Text style={styles.dateText}>12-3-19</Text>
          </View>
        </View>
        <View style={styles.system}>
          <Text style={styles.source}>AML User - </Text>
          <View style={styles.comment}>
            <TextInput
              value={
                user.roleName === "AMLUSER"
                  ? amlUserComments
                  : comments.AMLUSERCOMMENTS
              }
              style={styles.null}
              placeholderTextColor="#052a4f"
              onChangeText={(e) => setAmlUserComments(e)}
              editable={amlUserCheck && pendingCasesCheck}
            ></TextInput>
            <Text style={styles.dateText}>{comments.AMLUSERTIMESTAMP}</Text>
          </View>
        </View>
        <View style={styles.system}>
          <Text style={styles.source}>AMLO - </Text>
          <View style={styles.comment}>
            <TextInput
              value={
                user.roleName === "AMLO"
                  ? amloComments
                  : comments.AMLOCOMMENTS
              }
              onChangeText={(e) => setAmloComments(e)}
              style={styles.null}
              placeholderTextColor="#052a4f"
              multiline={true}
              editable={amloCheck && pendingCasesCheck}
            ></TextInput>
            <Text style={styles.dateText}>{comments.AMLOTIMESTAMP}</Text>
          </View>
        </View>
        <View style={styles.system}>
          <Text style={styles.source}>MLRO - </Text>
          <View style={styles.comment}>
            <TextInput
              value={
                user.roleName === "MLRO"
                  ? mlroComments
                  : comments.MLROCOMMENTS
              }
              onChangeText={(e) => setMlroComments(e)}
              style={styles.null}
              placeholderTextColor="#052a4f"
              editable={mlroCheck && pendingCasesCheck}
              multiline={true}
            ></TextInput>
            <Text style={styles.dateText}>{comments.MLORTIMESTAMP}</Text>
          </View>
        </View>
        {hide ? (
          <>
            <Block style={styles.savebutton}>
              <TouchableOpacity style={styles.save} onPress={saveHandler}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </Block>
          </>
        ) : null}
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
  heading: {
    marginHorizontal: "2%",
    flexDirection: "row",
    alignItems: "center",

    marginTop: "2%",
  },
  back: {
    width: "12%",
  },
  text: {
    color: "#052a4f",
    fontFamily: "Bold1",
    textAlign: "center",
    fontSize: RFValue(15),

    width: "70%",
  },
  system: {
    backgroundColor: "#f2f2f2",
    marginTop: "3%",
    marginHorizontal: "2%",
    flexDirection: "row",
    paddingHorizontal: "2%",
    // paddingVertical: "2%",
    // height: heightPercentageToDP("10.3%"),
    justifyContent: "center",
  },
  field: {
    // flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: "4%",
    // backgroundColor: "red",
  },
  source: {
    color: "#59595c",
    fontFamily: "Bold1",
    alignSelf: "center",
    // backgroundColor: "purple",
    // marginVertical: "2%",
  },
  null: {
    color: "#052a4f",
    fontFamily: "Bold1",
    marginTop: "6%",
    // height: Dimensions.get("window").height,
    // alignSelf: "flex-start",
    // alignItems: "center",
    // backgroundColor: "red",
    // flexWrap: "wrap",
    // paddingTop: "1%",
    // paddingBottom: "1%",

    // width: Dimensions.get("window").width,
  },

  dateText: {
    fontFamily: "Regular1",
    fontSize: RFValue(12),
    color: "#59595c",

    // backgroundColor: "yellow",
    marginBottom: "2%",
    textAlign: "right",
  },
  comment: {
    flex: 1,
    flexDirection: "column",
  },
  save: {
    backgroundColor: "#052A4F",
    marginHorizontal: "2%",
    paddingHorizontal: "8%",
    paddingVertical: "3%",
    borderRadius: 30,
  },
  savebutton: {
    alignItems: "flex-end",
    marginVertical: "8%",
    marginRight: "2%",
  },
  saveText: {
    fontFamily: "Regular1",
    color: appTheme.COLORS.WHITE,
    fontSize: RFValue(13),
  },
});
export default STR;
