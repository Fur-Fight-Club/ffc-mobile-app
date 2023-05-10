import { Spacer } from "@components/ui/atoms/Spacer.component";
import {
  setToken,
  useLoginMutation,
  useTestQuery,
} from "@store/application/slice";
import { Fonts, FontsType } from "@utils/fonts.utils";
import { hp } from "@utils/responsive.utils";
import * as React from "react";
import { StyleSheet } from "react-native";
import { TextField, View, Text, Button } from "react-native-ui-lib";
import {
  KeyboardTrackingView,
  KeyboardAwareInsetsView,
  KeyboardRegistry,
  KeyboardAccessoryView,
  KeyboardUtils,
} from "react-native-ui-lib/keyboard";
import { useDispatch } from "react-redux";

interface TestScreenProps {}

export const TestScreen: React.FunctionComponent<TestScreenProps> = ({}) => {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <View flex paddingH-25 paddingT-120>
      <Button
        text70
        white
        background-orange30
        label="Logout"
        onPress={() => dispatch(setToken(""))}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
