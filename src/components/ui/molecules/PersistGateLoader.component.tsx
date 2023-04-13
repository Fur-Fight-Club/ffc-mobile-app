import * as React from "react";
import { Button, StyleSheet, View } from "react-native";
import Lottie from "lottie-react-native";
import { hp, wp } from "@utils/responsive.utils";

interface PersistGateLoaderProps {}

export const PersistGateLoader: React.FunctionComponent<
  PersistGateLoaderProps
> = ({}) => {
  const animation = React.useRef(null);
  React.useEffect(() => {
    animation.current?.play();
  }, []);
  return (
    <View style={styles.container}>
      <Lottie
        source={require("../../../assets/anims/fire.json")}
        autoPlay
        ref={animation}
        style={{ width: wp("10%"), height: hp("10%") }}
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: wp("100%"),
    height: hp("100%"),
  },
});
