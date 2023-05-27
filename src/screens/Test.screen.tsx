import * as React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";

interface TestScreenProps {}

export const TestScreen: React.FunctionComponent<TestScreenProps> = ({}) => {
  return <View flex paddingH-25 paddingT-120></View>;
};

const styles = StyleSheet.create({});
