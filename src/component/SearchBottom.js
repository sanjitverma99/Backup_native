import { Block, Text } from "galio-framework";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
  TextInput,
  Appearance,
} from "react-native";
import { appTheme } from "../config";
import InputField from "./InputField";

import { useDispatch } from "react-redux";

import DropdownMenu from "react-native-dropdown-menu";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { Picker } from "@react-native-picker/picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { Divider } from "react-native-elements/dist/divider/Divider";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import { StackNavigator } from "react-navigation";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Actions from "../store/actions";
import { TouchableHighlight } from "react-native-gesture-handler";

const marginTop = Platform.select({
  ios: "28%",
  android: "16%",
});

const Rating = [
  { label: "HIGH", value: "HIGH" },
  { label: "MEDIUM", value: "MEDIUM" },
  { label: "LOW", value: "LOW" },
];
// const moduleType = [];
// if(user.roleName === "AMLUSER"){
//  moduleType = [
//   { label: "Pending Cases", value: "DefaultCase" },
//   { label: "Approved Case", value: "ApprovedCase" },
//   { label: "Pending Case", value: "PendingCase" },
//   { label: "Rejected Case", value: "RejectedCase" },
//   { label: "Closed Case", value: "ClosedCase" },

  
// ];
// }
// else if(user.roleName === "AMLO"){
//   moduleType = [
//     { label: "Default Value", value: "DefaultCase" },
//     { label: "Approved Case", value: "ApprovedCase" },
//     { label: "Pending Case", value: "PendingCase" },
//     { label: "Rejected Case", value: "RejectedCase" },
//     { label: "Closed Case", value: "ClosedCase" },
  
    
//   ];
// }

// else if(user.roleName === "MLRO"){
//   moduleType = [
//     { label: "Default Value", value: "DefaultCase" },
//     { label: "Approved Case", value: "ApprovedCase" },
//     { label: "Pending Case", value: "PendingCase" },
//     { label: "Rejected Case", value: "RejectedCase" },
//     { label: "Closed Case", value: "ClosedCase" },
    
//   ];
// }

function SearchBottom(props, { navigation }) {
  const user = useSelector(({ auth }) => auth.auth);
  const dispatch = useDispatch();
  const [caseValue, setCaseValue] = useState(null);
  const [typeValue, setTypeValue] = useState("");
  const [moduleType, setModuleType] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [fromDate, setfromDate] = useState(getFormattedDate(new Date()));
  const [toDate, settoDate] = useState(getFormattedDate(new Date()));
  const [pickerMode, setPickerMode] = useState(null);
  const [pickerMode1, setPickerMode1] = useState(null);
  const [accountNo, setAccountNo] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [caseStatus, setCaseStatus] = useState("");
  const title = "Search";

  let Type = [];

  const amlUser = [
    { label: "Pending Cases", value: "PendingCase" },
    { label: "Cases Closed By AMLUSER", value: "casesClosedByAMLUSER" },
    { label: "Cases Closed With STR", value: "casesClosedWithSTR" },
    { label: "Cases Closed Without STR", value: "casesClosedWithoutSTR" },
    
  ];

  const amlo = [
    { label: "Pending Cases", value: "PendingCase" },
    { label: "approved Cases By AMLO", value: "approvedCasesByAMLO" },
    { label: "rejected Cases By AMLO", value: "rejectedCasesByAMLO" },
    { label: "closed Cases Without STR By AMLUser To AMLO ", value: "closedCasesWithoutSTRByAMLUserToAMLO" },
    { label: "desktopClosedByAMLuserToAMLO", value: "desktopClosedByAMLuserToAMLO" },
    { label: "viewCasesToBeReviewedByAMLO", value: "viewCasesToBeReviewedByAMLO" },
  ];

  const mlro = [
    { label: "Pending Cases", value: "PendingCase" },
    { label: "deskTopClosedByMLRO", value: "deskTopClosedByMLRO" },
    { label: "rejectedCasesByAMLOToMLRO", value: "rejectedCasesByAMLOToMLRO" },
    { label: "approvedCasesByMLRO", value: "approvedCasesByMLRO" },
    { label: "rejectedCasesByMLRO", value: "rejectedCasesByMLRO" },
    { label: "Closed Case", value: "ClosedCase" }, 
  ]

  Type = user.roleName == "AMLUSER" ? amlUser : user.roleName == "AMLO" ? amlo : user.roleName == "MLRO" ? mlro : [];

  const arr = {
    title: title,
    userRole: user.roleName,
    moduleType: moduleType,
    accountNo: accountNo,
    customerId: customerId,
    caseValue: caseValue,
    fromDate: fromDate,
    toDate: toDate,
  };
  arr["lastClickedDateTime"] = new Date().getMilliseconds();

 
  function searchHandler() {
    dispatch(Actions.storeCurrentTitle(arr));
    console.log(arr, "arrrr")
    props.navigation.navigate("Cases");
  }

  function getFormattedDate(date) {
    let month = date.getMonth();
    month = month + 1;
    return (
      date.getDate() +
      "/" +
      (month <= 9 ? "0" + month : month) +
      "/" +
      date.getFullYear()
    );
  }



  function handleCaseType() {
    if(user.roleName === 'AMLUSER'){
    if (typeValue === "PendingCase") {
      setModuleType("N.A");
    } else if (typeValue === "casesClosedByAMLUSER") {
      setModuleType("viewDeskTopClosedByAMLUser");
    } else if (typeValue === "casesClosedWithSTR") {
      setModuleType("viewWithSTRClosedByAMLUser");
    } else if(typeValue === "casesClosedWithoutSTR") {
      setModuleType("viewWithoutSTRClosedByAMLUser");
    }
  }
  else if(user.roleName === 'AMLO'){
    if (typeValue === "PendingCase") {
      setModuleType("N.A");
    } else if (typeValue === "approvedCasesByAMLO") {
      setModuleType("viewApprovedCasesByAMLO");
    } else if (typeValue === "rejectedCasesByAMLO") {
      setModuleType("viewRejectedasesByAMLO");
    } else if(typeValue === "closedCasesWithoutSTRByAMLUserToAMLO") {
      setModuleType("viewWithoutSTRClosedByAMLUserToAMLO");
    }
    else if(typeValue === "desktopClosedByAMLuserToAMLO") {
      setModuleType("viewDeskTopClosedByAMLUserToAMLO");
    }
    else if(typeValue === "viewCasesToBeReviewedByAMLO") {
      setModuleType("N.A");  
  }
  }
  else if(user.roleName === 'MLRO'){
    if (typeValue === "deskTopClosedByMLRO") {
      setModuleType("viewDeskTopClosedByMLRO");
    } else if (typeValue === "rejectedCasesByAMLOToMLRO") {
      setModuleType("viewRejectedCasesByAMLOToMLRO");
    } else if (typeValue === "approvedCasesByMLRO") {
      setModuleType("viewApprovedCasesByMLRO");
    } else if(typeValue === "rejectedCasesByMLRO") {
      setModuleType("viewRejectedCasesByMLRO");
    }
    else if(typeValue === "viewCasesToBeReviewedByMLRO") {
      setModuleType("N.A");  
  }
  }
}

  function handleAccountNo(accountNo) {
    setAccountNo(accountNo);
  }
  function handleCustomerId(customerId) {
    setCustomerId(customerId);
  }

  const showDatesPicker = () => {
    setPickerMode("date");
  };

  const hidePicker = () => {
    setPickerMode(null);
  };

  const showDatesPicker1 = () => {
    setPickerMode1("date");
  };

  const hidePicker1 = () => {
    setPickerMode1(null);
  };

  const handleConfirm = (date) => {
    hidePicker();
    setfromDate(getFormattedDate(date));
  };
  const handleConfirm1 = (date) => {
    hidePicker1();

    settoDate(getFormattedDate(date));
  };

  function handleAccountNo(accountNo) {
    setAccountNo(accountNo);
  }
  function handleCustomerId(customerId) {
    setCustomerId(customerId);
  }

  return (
    <Block style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        // visible={modalVisible1}

        visible={props.visible}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        //   setModalVisible1(!modalVisible1);
        // }}
        onRequestClose={props.onRequestClose}
      >
        <TouchableWithoutFeedback onPress={props.onPress}>
          <View style={styles.centeredView1}>
            <Block style={styles.modalViews}>
              <Block style={styles.account}>
                <Block style={styles.dat}>
                  <Text style={styles.dateText}>Date</Text>
                </Block>
                <Block style={styles.dates}>
                  <TouchableOpacity
                    onPress={showDatesPicker}
                    style={styles.fromD}
                  >
                    <Text style={styles.headerfont}>{fromDate}</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={pickerMode !== null}
                    mode={pickerMode}
                    isDarkModeEnabled={
                      Appearance.getColorScheme() === "dark" ? true : false
                    }
                    onConfirm={handleConfirm}
                    onCancel={hidePicker}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                  />
                  <Block style={styles.gap}></Block>
                  <TouchableOpacity
                    onPress={showDatesPicker1}
                    style={styles.fromD}
                  >
                    <Text style={styles.headerfont}>{toDate}</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={pickerMode1 !== null}
                    mode={pickerMode1}
                    isDarkModeEnabled={true}
                    onConfirm={handleConfirm1}
                    onCancel={hidePicker1}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                  />
                </Block>
              </Block>
              <Block style={styles.account}>
                <Block style={styles.accountText}>
                  <Text style={styles.accountNo}>Account No</Text>
                </Block>
                <Block style={styles.field}>
                  <TextInput
                    style={styles.textField3}
                    onChangeText={(e) => handleAccountNo(e)}
                  ></TextInput>
                </Block>
              </Block>
              <Block style={styles.dropmenu}>
                <Block style={styles.accountText}>
                  <Text style={styles.accountNo}>Case Rating</Text>
                </Block>
                <Block style={styles.menu}>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus && { borderColor: "blue" },
                    ]}
                    dropdownPosition="bottom"
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={Rating}
                    placeholder="Select Rating"
                    // search
                    maxHeight={160}
                    labelField="label"
                    valueField="value"
                    // placeholder={!isFocus ? "Select item" : "..."}
                    // searchPlaceholder="Search..."
                    value={caseValue}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                      setCaseValue(item.value);
                      setIsFocus(false);
                    }}
                  />
                </Block>
              </Block>
              <Block style={styles.dropmenu}>
                <Block style={styles.accountText}>
                  <Text style={styles.accountNo}>Case Type</Text>
                </Block>
                <Block style={styles.menu}>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocus1 && { borderColor: "blue" },
                    ]}
                    dropdownPosition="bottom"
                    placeholder="Select Type"
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={Type}
                    // search
                    maxHeight={160}
                    labelField="label"
                    valueField="value"
                    // placeholder={!isFocus ? "Select item" : "..."}
                    // searchPlaceholder="Search..."
                    value={typeValue}
                    onFocus={() => setIsFocus1(true)}
                    onBlur={() => setIsFocus1(false)}
                    onChange={(item) => {
                      setTypeValue(item.value);
                      handleCaseType();
                      setIsFocus1(false);
                    }}
                    // renderLeftIcon={() => (
                    //   <AntDesign
                    //     style={styles.icon}
                    //     color={isFocus ? 'blue' : 'black'}
                    //     name="Safety"
                    //     size={20}
                    //   />
                    // )}
                  />
                </Block>
              </Block>
              <Block style={styles.account}>
                <Block style={styles.accountText}>
                  <Text style={styles.accountNo}>Customer ID</Text>
                </Block>
                <Block style={styles.field}>
                  <TextInput
                    style={styles.textField3}
                    onChangeText={(e) => handleCustomerId(e)}
                  ></TextInput>
                </Block>
              </Block>
              <Block style={styles.searchlogo2}>
                <Block
                  style={{
                    backgroundColor: "#052A4F",
                    borderRadius: widthPercentageToDP("10%"),
                  }}
                >
                  <Ionicons
                    name="search"
                    color="white"
                    size={30}
                    style={styles.icon1}
                    onPress={searchHandler}
                  ></Ionicons>
                  {/* </TouchableHighlight> */}
                </Block>
              </Block>
            </Block>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.COLORS.WHITE,
    justifyContent: "center",
  },

  centeredView1: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalViews: {
    backgroundColor: "#EFEFEF",
    borderRadius: widthPercentageToDP("7%"),
    // borderColor: "blue",
    // borderWidth: 1,
    // height: 300,
    marginTop: marginTop,
    paddingLeft: "2%",
    marginHorizontal: "2%",

    // alignItems: "center",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 10,
    // elevation: 5,

    // overflow: "hidden",
    // width: widthPercentageToDP("90%"),
  },
  dateForm: {
    // backgroundColor: "yellow",
    flexDirection: "row",
    // shadowColor: "#000",
    alignItems: "center",
    // justifyContent: "space-between",
    // marginTop: "5%",
  },
  account: {
    marginTop: "4%",
    justifyContent: "space-between",
    flexDirection: "row",

    alignItems: "center",
    // backgroundColor: "blue",
    height: heightPercentageToDP("5.5%"),
  },
  dat: {
    // backgroundColor: "yellow",
    // flex: 1,
    height: "100%",
    paddingLeft: "2%",
    justifyContent: "center",
    width: widthPercentageToDP("18%"),
  },
  accountText: {
    // backgroundColor: "yellow",
    // flex: 1,
    height: "100%",

    justifyContent: "center",
    width: widthPercentageToDP("32%"),
  },
  accountNo: {
    color: "#59595c",
    fontFamily: "Regular1",
    fontSize: RFValue(14),
    marginLeft: "10%",
  },
  dateText: {
    color: "#59595c",
    fontFamily: "Regular1",
    fontSize: RFValue(14),
    marginLeft: "12%",
    width: widthPercentageToDP("10%"),
    // backgroundColor: "red",
    textAlign: "justify",
  },
  field: {
    // backgroundColor: "yellow",
    // width: widthPercentageToDP("40%"),
    // alignItems: "center",
    // justifyContent: "center",
    // height: "100%",
    flex: 1,
  },
  textField3: {
    backgroundColor: "white",
    paddingLeft: "5%",
    width: widthPercentageToDP("50%"),
    height: "100%",
    marginLeft: "8%",
    borderRadius: widthPercentageToDP("12%"),
  },

  headerfont: {
    fontFamily: "Regular1",
  },

  case: {
    fontFamily: "sans-serif",
    color: appTheme.COLORS.BLACK,
    marginLeft: "1%",
  },
  searchlogo2: {
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },
  searchButton: {
    backgroundColor: "#052a4f",
    // borderRadius: widthPercentageToDP("20%"),
    alignItems: "center",
    justifyContent: "center",
  },
  icon1: {
    // backgroundColor: "red",
    padding: widthPercentageToDP("1.5%"),

    // borderRadius: widthPercentageToDP("10%"),
  },
  dropmenu: {
    marginTop: "4%",
    justifyContent: "space-between",
    flexDirection: "row",

    alignItems: "center",
    // backgroundColor: "blue",
    height: heightPercentageToDP("5.5%"),
  },
  menu: {
    // width: widthPercentageToDP("52%"),
    // backgroundColor: "white",
    // borderRadius: widthPercentageToDP("12%"),
    // marginRight: "7.2%",
    flex: 1,
    // backgroundColor: "white",
    // width: widthPercentageToDP("50%"),
    // height: "100%",

    // borderRadius: widthPercentageToDP("12%"),
  },
  dropdown: {
    borderBottomColor: "gray",
    height: heightPercentageToDP("6%"),
    backgroundColor: "white",
    width: widthPercentageToDP("50%"),
    height: "100%",
    marginLeft: "8%",
    // alignItems: "flex-start",
    borderRadius: widthPercentageToDP("12%"),
  },
  icon: {
    marginRight: "10%",
  },
  placeholderStyle: {
    fontSize: RFValue(12),
    fontFamily: "Regular1",
    marginLeft: "10%",
    color: "#b5b5b5",
    justifyContent: "space-between",
  },
  selectedTextStyle: {
    fontSize: RFValue(12),
    fontFamily: "Regular1",
    marginLeft: "10%",
    color: appTheme.COLORS.BLACK,
  },
  iconStyle: {
    width: widthPercentageToDP("3%"),
    height: heightPercentageToDP("3%"),
    marginRight: "10%",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dates: {
    flexDirection: "row",
    flex: 1,
    marginLeft: "5%",
    // backgroundColor: "red",
    // width: widthPercentageToDP("10%"),
  },

  fromD: {
    backgroundColor: "white",
    borderRadius: widthPercentageToDP("12%"),
    height: heightPercentageToDP("6%"),
    width: widthPercentageToDP("30%"),
    alignItems: "center",
    justifyContent: "center",
  },
  gap: {
    width: "6%",
  },
});
export default SearchBottom;
