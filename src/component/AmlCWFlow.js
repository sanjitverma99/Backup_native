import { Block, Text } from "galio-framework";
import React from "react";
import { StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { RFValue } from "react-native-responsive-fontsize";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { appTheme, Images } from "../config";

function AmlCWFlow(props) {
  const { ALL, AMLUSER, MLRO, AMLO } = props;
  return (
    
     <Block style={styles.container}> 
      <Block style={styles.cases}>
        {ALL ? (
          <>
            <Block style={styles.row}>
              <TouchableOpacity
                onPress={props.pendingCases}
                style={{ alignItems: "center" }}
              >
                <Image
                  style={styles.image}
                  source={Images.Pending}
                  resizeMode="contain"
                ></Image>
                <Text style={styles.bottomcases}>P</Text>
              </TouchableOpacity>
            </Block>
           {/*  <Block style={styles.row}>
              <TouchableOpacity
                onPress={props.ClosedonPress}
                style={{ alignItems: "center" }}
              >
                <Image
                  style={styles.image}
                  source={Images.Closed}
                  resizeMode="contain"
                ></Image>
                <Text style={styles.bottomcases}>Closed Cases By Self</Text>
              </TouchableOpacity>
            </Block> */}
          </>
        ) : null}
        {AMLUSER ? (
          <>
            <Block style={styles.row}>
              <TouchableOpacity
                onPress={props.desktopClosedCasesByAMLUser}
                style={{ alignItems: "center" }}
              >
                <Image
                  style={styles.image}
                  source={Images.Rejected}
                  resizeMode="contain"
                ></Image>
                <Text style={styles.bottomcases}>CCbySelf</Text>
              </TouchableOpacity>
            </Block>
            <Block style={styles.row}>
              <TouchableOpacity
                onPress={props.closedCasesWithSTR}
                style={{ alignItems: "center" }}
              >
                <Image
                  style={styles.image}
                  source={Images.Rejected}
                  resizeMode="contain"
                ></Image>
                <Text style={styles.bottomcases}>CCwithSTR</Text>
              </TouchableOpacity>
            </Block>
            <Block style={styles.row}>
              <TouchableOpacity
                onPress={props.closedCasesWithoutSTR}
                style={{ alignItems: "center" }}
              >
                <Image
                  style={styles.image}
                  source={Images.Rejected}
                  resizeMode="contain"
                ></Image>
                <Text style={styles.bottomcases}>CCwoutSTR</Text>
              </TouchableOpacity>
            </Block>
            
          </>
        ) : null}
        {MLRO ? (
          <>
          <Block style={styles.row}>
            <TouchableOpacity
              onPress={props.desktopClosedCasesByMLRO}
              style={{ alignItems: "center" }}
            >
              <Image
                source={Images.Approved}
                style={styles.image}
                resizeMode="contain"
              ></Image>
              <Divider />
              <Text style={styles.bottomcases}>DCaseBSelf</Text>
            </TouchableOpacity>
          </Block>
          <Block style={styles.row}>
            <TouchableOpacity
              onPress={props.rejectedCasesByAMLOtoMLRO}
              style={{ alignItems: "center" }}
            >
              <Image
                source={Images.Approved}
                style={styles.image}
                resizeMode="contain"
              ></Image>
              <Divider />
              <Text style={styles.bottomcases}>RCasesBAMLO</Text>
            </TouchableOpacity>
          </Block>
          <Block style={styles.row}>
            <TouchableOpacity
              onPress={props.approvedCasesByMLRO}
              style={{ alignItems: "center" }}
            >
              <Image
                source={Images.Approved}
                style={styles.image}
                resizeMode="contain"
              ></Image>
              <Divider />
              <Text style={styles.bottomcases}>ACasesBS</Text>
            </TouchableOpacity>
          </Block>
          <Block style={styles.row}>
            <TouchableOpacity
              onPress={props.rejectedCasesByMLRO}
              style={{ alignItems: "center" }}
            >
              <Image
                source={Images.Approved}
                style={styles.image}
                resizeMode="contain"
              ></Image>
              <Divider />
              <Text style={styles.bottomcases}>RCBySelf</Text>
            </TouchableOpacity>
          </Block>

          <Block style={styles.row}>
            <TouchableOpacity
              onPress={props.viewCasesToBeReviewedByMLRO}
              style={{ alignItems: "center" }}
            >
              <Image
                source={Images.Approved}
                style={styles.image}
                resizeMode="contain"
              ></Image>
              <Divider />
              <Text style={styles.bottomcases}>VRCMLRO</Text>
            </TouchableOpacity>
          </Block>

          </>
        ) : null}
        {AMLO ? (
          <>
          <Block style={styles.row}>
            <TouchableOpacity
              onPress={props.approvedCasesByAMLO}
              style={{ alignItems: "center" }}
            >
              <Image
                source={Images.Approved}
                style={styles.image}
                resizeMode="contain"
              ></Image>
              <Divider />
              <Text style={styles.bottomcases}>ACBSelf</Text>
            </TouchableOpacity>
          </Block>
          
          <Block style={styles.row}>
            <TouchableOpacity
              onPress={props.rejectedCasesByAMLO}
              style={{ alignItems: "center" }}
            >
              <Image
                source={Images.Approved}
                style={styles.image}
                resizeMode="contain"
              ></Image>
              <Divider />
              <Text style={styles.bottomcases}>RCBSelf</Text>
            </TouchableOpacity>
          </Block>
          <Block style={styles.row}>
            <TouchableOpacity
              onPress={props.desktopClosedCasesByAMLO}
              style={{ alignItems: "center" }}
            >
              <Image
                source={Images.Approved}
                style={styles.image}
                resizeMode="contain"
              ></Image>
              <Divider />
              <Text style={styles.bottomcases}>CCBSelf</Text>
            </TouchableOpacity>
          </Block>
          <Block style={styles.row}>
            <TouchableOpacity
              onPress={props.desktopClosedCasesByAMLUserToAMLO}
              style={{ alignItems: "center" }}
            >
              <Image
                source={Images.Approved}
                style={styles.image}
                resizeMode="contain"
              ></Image>
              <Divider />
              <Text style={styles.bottomcases}>DCCBAMLUSER</Text>
            </TouchableOpacity>
          </Block>
          <Block style={styles.row}>
            <TouchableOpacity
              onPress={props.withoutSTRClosedByAMLUserToAMLO}
              style={{ alignItems: "center" }}
            >
              <Image
                source={Images.Approved}
                style={styles.image}
                resizeMode="contain"
              ></Image>
              <Divider />
              <Text style={styles.bottomcases}> CCoutSTRBAMLUSER</Text>
            </TouchableOpacity>
          </Block>
          <Block style={styles.row}>
            <TouchableOpacity
              onPress={props.viewCasesToBeReviewedByAMLO}
              style={{ alignItems: "center" }}
            >
              <Image
                source={Images.Approved}
                style={styles.image}
                resizeMode="contain"
              ></Image>
              <Divider />
              <Text style={styles.bottomcases}> VCRAMLO</Text>
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
    backgroundColor: "#052a4f",
    marginBottom: "2%",
    marginRight: "2%",
    marginLeft: "2%",
  },
  cases: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "1%",
  },
  row: {
    alignItems: "center",
    marginVertical: "1%",
    // backgroundColor: "blue",
    // width: widthPercentageToDP("17%"),
  },
  bottomcases: {
    fontFamily: "Regular1",
    textAlign: "center",
    color: "white",
    width: widthPercentageToDP("37%"),
  },
  image: {
    height: heightPercentageToDP("4%"),
    width: widthPercentageToDP("8%"),
    // backgroundColor: "red",
  },
});
export default AmlCWFlow;
