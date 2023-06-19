import { hp } from "@utils/responsive.utils";
import * as React from "react";
import { KeyboardTypeOptions, StyleSheet, View } from "react-native";
import { TextField } from "react-native-ui-lib";

interface InputProps {
  onChangeText: any;
  value: any;
  maxLenght?: number;
  showCharCounter?: boolean;
  placeholder: string;
  type?:
    | "none"
    | "URL"
    | "addressCity"
    | "addressCityAndState"
    | "addressState"
    | "countryName"
    | "creditCardNumber"
    | "emailAddress"
    | "familyName"
    | "fullStreetAddress"
    | "givenName"
    | "jobTitle"
    | "location"
    | "middleName"
    | "name"
    | "namePrefix"
    | "nameSuffix"
    | "nickname"
    | "organizationName"
    | "postalCode"
    | "streetAddressLine1"
    | "streetAddressLine2"
    | "sublocality"
    | "telephoneNumber"
    | "username"
    | "password"
    | "newPassword"
    | "oneTimeCode";
  width?: string;
  keyboardType?: KeyboardTypeOptions;
  pressEnter?: () => void;
}

export const Input: React.FunctionComponent<InputProps> = ({
  onChangeText,
  value,
  maxLenght,
  showCharCounter,
  placeholder,
  type,
  width,
  keyboardType,
  pressEnter,
}) => {
  return (
    <TextField
      placeholder={placeholder}
      floatingPlaceholder
      onChangeText={(value) => onChangeText(value)}
      value={value}
      textContentType={type}
      secureTextEntry={type === "password" ? true : false}
      keyboardType={keyboardType ? keyboardType : "default"}
      labelStyle={{
        fontFamily: "Poppins_400Regular",
      }}
      floatingPlaceholderStyle={{
        fontFamily: "Poppins_400Regular",
      }}
      onSubmitEditing={() => pressEnter()}
      fieldStyle={{
        width: width ? width : "80%",
        paddingVertical: hp("3%"),
        paddingHorizontal: hp("2%"),
        backgroundColor: "#fff",
        shadowColor: "rgba(0,0,0,0.5)",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: 10,
      }}
      style={{
        width: width ? width : "80%",
      }}
      showCharCounter={showCharCounter}
      maxLength={maxLenght ? maxLenght : undefined}
    />
  );
};

const styles = StyleSheet.create({});
