import * as React from "react";
import { Button, StyleSheet, View } from "react-native";
import Lottie from "lottie-react-native";
import { hp, iphoneX } from "@utils/responsive.utils";

interface LoaderProps {
  loading: boolean;
}

export const Loader: React.FunctionComponent<LoaderProps> = ({ loading }) => {
  const animation = React.useRef(null);
  React.useEffect(() => {
    animation.current?.play();
  }, []);
  return (
    <View style={[styles.container, { display: loading ? "flex" : "none" }]}>
      <Lottie
        source={require("../../../assets/anims/fire.json")}
        autoPlay
        ref={animation}
        loop
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
    width: hp("7%"),
    height: hp("7%"),
  },
});
