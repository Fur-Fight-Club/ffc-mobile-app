import { Spacer } from "@components/ui/atoms/Spacer.component";
import { Fonts, FontsType } from "@utils/fonts.utils";
import { hp } from "@utils/responsive.utils";
import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native-ui-lib";

interface TestScreenProps {}

export const TestScreen: React.FunctionComponent<TestScreenProps> = ({}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.TITLE,
          fontSize: hp("5%"),
        }}
      >
        Fur Fight Club
      </Text>
      <Spacer size={hp("5%")} />
      {Object.keys(Fonts).map((font) => (
        <Text
          key={font}
          style={{
            fontFamily: Fonts[font as FontsType],
            fontSize: hp("3%"),
            textTransform: "capitalize",
          }}
        >
          {font}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});
