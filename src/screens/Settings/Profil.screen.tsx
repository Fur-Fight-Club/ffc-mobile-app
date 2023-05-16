import { BackArrow } from "@components/ui/atoms/BackArrow.component";
import { Input } from "@components/ui/atoms/Input.component";
import { Spacer } from "@components/ui/atoms/Spacer.component";
import { useNavigation } from "@react-navigation/native";
import { applicationState } from "@store/application/selector";
import { hp, wp } from "@utils/responsive.utils";
import * as React from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
} from "react-native";
import { Text, Button, Colors } from "react-native-ui-lib";
import { useSelector } from "react-redux";

interface ProfilScreenProps {}

export const ProfilScreen: React.FunctionComponent<
  ProfilScreenProps
> = ({}) => {
  const nav = useNavigation();
  const { user } = useSelector(applicationState);

  const [fullname, setFullname] = React.useState("");

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <BackArrow onPress={() => nav.goBack()} />
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollviewContainer}
      >
        <Text style={styles.textTitle}>Modifier votre Nom Prénom</Text>
        <Text style={styles.oldFullName}>
          {user.firstname} {user.lastname}
        </Text>
        <View style={styles.card}>
          <Input
            onChangeText={setFullname}
            value={fullname}
            type="name"
            placeholder="Nom complet"
          />
          <Spacer size={hp("2%")} />
          <Button
            label={"Modifier"}
            size={Button.sizes.large}
            backgroundColor={Colors.red30}
            onPress={() => handleSubmitRegister()}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp("100%"),
    height: hp("100%"),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollview: {},
  scrollviewContainer: {
    top: hp("5%"),
    justifyContent: "center",
    alignItems: "center",
    width: wp("100%"),
    height: hp("100%"),
  },
  card: {
    alignItems: "center",
    top: hp("5%"),
    height: Platform.OS === "ios" ? hp("70%") : hp("80%"),
    width: wp("100%"),
  },
  textTitle: {
    fontFamily: "Poppins_900Black",
    fontSize: hp("3%"),
    textTransform: "uppercase",
  },
  oldFullName: {
    top: hp("2%"),
    fontFamily: "Poppin",
    fontSize: hp("2%"),
  },
});
