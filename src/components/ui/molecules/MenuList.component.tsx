import * as React from "react";
import { StyleSheet } from "react-native";
import { hp } from "@utils/responsive.utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native-ui-lib";

interface MenuListProps {
  onPress: () => void;
  color?: string;
  children: string;
}

export const MenuList: React.FunctionComponent<MenuListProps> = ({
  onPress,
  color = "black",
  children,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.buttonText, { color: color }]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    marginVertical: hp("1.5%"),
    fontSize: hp("2.4%"),
    textAlign: "left",
    fontWeight: "500",
    paddingTop: 10,
    paddingBottom: 10,
  },
});
