import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-ui-lib";

interface WalletScreenProps {}

export const WalletScreen: React.FunctionComponent<
  WalletScreenProps
> = ({}) => {
  return (
    <View>
      <Text>WalletScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
