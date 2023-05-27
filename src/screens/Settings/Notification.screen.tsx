import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-ui-lib";

interface NotificationScreenProps {}

export const NotificationScreen: React.FunctionComponent<
  NotificationScreenProps
> = ({}) => {
  return (
    <View>
      <Text>NotificationScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
