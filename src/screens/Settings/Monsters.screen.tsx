import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-ui-lib";

interface MonstersScreenProps {}

export const MonstersScreen: React.FunctionComponent<
  MonstersScreenProps
> = ({}) => {
  return (
    <View>
      <Text>MonstersScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
