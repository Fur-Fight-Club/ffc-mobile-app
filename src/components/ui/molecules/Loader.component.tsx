import * as React from "react";
import { Button, StyleSheet, View } from "react-native";
import Lottie from "lottie-react-native";
import { hp, iphoneX, wp } from "@utils/responsive.utils";

interface LoaderProps {
  loading: boolean;
}

export const Loader: React.FunctionComponent<LoaderProps> = ({ loading }) => {
  return (
    <View style={[styles.container, { display: loading ? undefined : "none" }]}>
      <Lottie
        source={require("../../../assets/anims/fire.json")}
        autoPlay
        loop
        style={{ width: wp("5%"), height: hp("5%"), zIndex: 999 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: iphoneX.check ? iphoneX.topHeight() : 0,
    alignItems: "center",
    justifyContent: "center",
    width: wp("100%"),
    height: hp("7%"),
  },
});
