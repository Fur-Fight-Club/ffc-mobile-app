import { hp } from "@utils/responsive.utils";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

interface PickerProps {
  onValueChange: (value) => void;
  items: { label: string; value: string }[];
  width?: string;
  placeholder: string;
  value: { label: string; value: string };
}

export const Picker: React.FunctionComponent<PickerProps> = ({
  onValueChange,
  items,
  width,
  placeholder,
  value,
}) => {
  return (
    <RNPickerSelect
      placeholder={{ label: placeholder, value: null }}
      value={value.value}
      style={{
        inputIOS: {
          width: width ? width : "80%",
          ...styles.picker,
        },
        inputAndroid: {
          width: width ? width : "80%",
          ...styles.picker,
        },
      }}
      onValueChange={(value) => onValueChange({ label: value, value: value })}
      items={items}
    />
  );
};

const styles = StyleSheet.create({
  picker: {
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
  },
});
