import { hp } from "@utils/responsive.utils";
import * as React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { getStatusBarHeight, isIphoneX } from "react-native-iphone-x-helper";
import { Colors } from "react-native-ui-lib";

interface BackArrowProps {
  onPress: () => void;
}

export const BackArrow: React.FunctionComponent<BackArrowProps> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.btnBack} onPress={onPress}>
      <Image
        style={styles.image}
        source={require("@assets/images/backArrow.png")}
      ></Image>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnBack: {
    position: "absolute",
    backgroundColor: Colors.red30,
    borderRadius: 100,
    left: hp("4%"),
    marginTop: isIphoneX() ? getStatusBarHeight() : 0,
    top: hp("5%"),
    alignSelf: "flex-start",
    width: hp("5%"),
    height: hp("5%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  image: {
    width: hp("4%"),
    height: hp("4%"),
    tintColor: "white",
  },
});
