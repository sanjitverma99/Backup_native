import { Block, Text } from "galio-framework";
import React from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { appTheme } from "../config";
import { useSelector } from "react-redux";
function Bottom(props) {
  const { AMLUser, AMLO, MLRO, AMLOReview, MLROReview } = props;
  const utils = useSelector(
    ({ caseworkflow }) => caseworkflow.caseworkflow.data
  );
  const size = [
    utils.title === "pending Cases" ? [styles.reject] : [styles.viewcomment],
  ];
  const textSize = [
    utils.title === "pending Cases" ? [styles.text] : [styles.viewcommentText],
  ];
  return (
    <Block style={styles.container}>
      {AMLUser ? (
        <>
          <TouchableOpacity style={size} onPress={props.BonafideOk}>
            <Text style={textSize}>Bonafide Ok</Text>
          </TouchableOpacity>
          <TouchableOpacity style={size} onPress={props.ForReview}>
            <Text style={textSize}>For Review</Text>
          </TouchableOpacity>
          <TouchableOpacity style={size} onPress={props.ForSTR}>
            <Text style={textSize}>For STR</Text>
          </TouchableOpacity>
        </>
      ) : null}
      {AMLO ? (
        <>
          <TouchableOpacity style={size} onPress={props.BonafideOk}>
            <Text style={textSize}>Bonafide Ok</Text>
          </TouchableOpacity>
          <TouchableOpacity style={size} onPress={props.ForReview}>
            <Text style={textSize}>For Review</Text>
          </TouchableOpacity>
          <TouchableOpacity style={size} onPress={props.Approve}>
            <Text style={textSize}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity style={size} onPress={props.Reject}>
            <Text style={textSize}>Reject</Text>
          </TouchableOpacity>
        </>
      ) : null}
      {AMLOReview ? (
        <>
          <TouchableOpacity style={size} onPress={props.ReviewToBeOK}>
            <Text style={textSize}>Review Found To Be Ok</Text>
          </TouchableOpacity>
          <TouchableOpacity style={size} onPress={props.ReopenCase}>
            <Text style={textSize}>Reopen Case</Text>
          </TouchableOpacity>
          
        </>
      ) : null}
      {MLROReview ? (
        <>
          <TouchableOpacity style={size} onPress={props.ReviewToBeOKByMLRO}>
            <Text style={textSize}>Review Found To Be Ok by MLRO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={size} onPress={props.ReopenCaseByMLRO}>
            <Text style={textSize}>Reopen Case by MLRO</Text>
          </TouchableOpacity>
          
        </>
      ) : null}
      {MLRO ? (
        <>
          <TouchableOpacity style={size} onPress={props.BonafideOk}>
            <Text style={textSize}>Bonafide Ok</Text>
          </TouchableOpacity>
          <TouchableOpacity style={size} onPress={props.Approve}>
            <Text style={textSize}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity style={size} onPress={props.Reject}>
            <Text style={textSize}>Reject</Text>
          </TouchableOpacity>
        </>
      ) : null}
      <TouchableOpacity
        style={size}
        onPress={(() => sethide(false), props.ViewComment)}
      >
        <Text style={textSize}>View Comment</Text>
      </TouchableOpacity>
    </Block>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  reject: {
    backgroundColor: "#052a4f",
    marginHorizontal: "1.5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: widthPercentageToDP("7%"),
    marginVertical: "3%",
    height: heightPercentageToDP("5%"),
    width: widthPercentageToDP("22%"),
  },
  text: {
    color: appTheme.COLORS.WHITE,
    fontFamily: "Regular1",
    marginHorizontal: "3.7%",
    marginVertical: "10%",
    fontSize: RFValue(8),
    textAlign: "center",
  },
  viewcomment: {
    backgroundColor: "#052a4f",
    marginHorizontal: "1.5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: widthPercentageToDP("7%"),
    marginVertical: "3%",
    height: heightPercentageToDP("5%"),
    width: widthPercentageToDP("28%"),
  },
  viewcommentText: {
    color: appTheme.COLORS.WHITE,
    fontFamily: "Regular1",
    marginHorizontal: "3.7%",
    marginVertical: "10%",
    fontSize: RFValue(11),
  },
});
export default Bottom;
