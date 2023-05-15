import * as React from "react";
import { StyleSheet, View } from "react-native";
import FeatherIcon from "@expo/vector-icons/Feather";
import { Colors } from "react-native-ui-lib";
import { hp } from "@utils/responsive.utils";
import { FeatherIconsType } from "@utils/icons.utils";
import { Platform } from "react-native";

interface TabBarIconProps {
  focused: boolean;
  icon: FeatherIconsType;
}

export const TabBarIcon: React.FunctionComponent<TabBarIconProps> = ({
  focused,
  icon,
}) => {
  return (
    <View style={styles.container}>
      <FeatherIcon
        name={icon}
        size={hp("3.5%")}
        color={focused ? Colors.$iconMajor : Colors.$iconDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp("7%"),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: Platform.OS === "ios" ? -hp("7%") / 2 : -hp("3%") / 2,
  },
});
