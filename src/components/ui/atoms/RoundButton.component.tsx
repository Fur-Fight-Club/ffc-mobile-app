import { hp } from "@utils/responsive.utils";
import * as React from "react";
import { ImageStyle, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Button, ImageProps } from "react-native-ui-lib";

interface RoudButtonProps {
  color: string;
  icon: ImageProps["source"];
  iconStyle?: ImageStyle;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  shadow?: boolean;
}

export const RoudButton: React.FunctionComponent<RoudButtonProps> = ({
  color,
  icon,
  iconStyle,
  onPress,
  buttonStyle,
  shadow,
}) => {
  return (
    <Button
      color={color}
      iconSource={icon}
      iconStyle={[iconStyle, styles.icon]}
      onPress={onPress}
      style={[styles.button, buttonStyle, { backgroundColor: color }]}
      enableShadow={shadow}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    height: hp("7%"),
    width: hp("7%"),
  },
  icon: {
    height: hp("5%"),
    width: hp("5%"),
  },
});
