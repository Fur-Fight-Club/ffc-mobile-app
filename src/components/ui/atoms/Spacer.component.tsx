import { hp } from "@utils/responsive.utils";
import * as React from "react";
import { StyleSheet, View } from "react-native";

interface SpacerProps {
  size?: number;
}

export const Spacer: React.FunctionComponent<SpacerProps> = ({
  size = hp("1%"),
}) => {
  return (
    <View
      style={{
        height: size,
      }}
    />
  );
};
