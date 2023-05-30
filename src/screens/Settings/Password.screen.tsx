import { BackArrow } from "@components/ui/atoms/BackArrow.component";
import { Input } from "@components/ui/atoms/Input.component";
import { Spacer } from "@components/ui/atoms/Spacer.component";
import { SettingsRoutes } from "@navigation/navigation.model";
import { useNavigation } from "@react-navigation/native";
import { useUpdateUserPasswordMutation } from "@store/application/slice";
import { hp, wp } from "@utils/responsive.utils";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Button, Colors, Text } from "react-native-ui-lib";

interface PasswordScreenProps {}

export const PasswordScreen: React.FunctionComponent<
  PasswordScreenProps
> = ({}) => {
  const nav = useNavigation();
  const [update, updateMutation] = useUpdateUserPasswordMutation();
  const [password, setPassword] = useState("");
  const [oldPassword, setOdlPassword] = useState("");
  const [verifPassword, setVerifPassword] = useState("");

  const handleSubmitPassword = () => {
    const strongPasswordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (!password || !oldPassword || !verifPassword) {
      Toast.show({
        type: "error",
        text1: "✍️ Oups !",
        text2: "Veuillez entrer tous les champs",
      });
      return;
    } else if (!password || !verifPassword) {
      Toast.show({
        type: "error",
        text1: "🔐 Oups !",
        text2: "Veuillez entrer votre mot de passe",
      });
    } else if (password !== verifPassword) {
      Toast.show({
        type: "error",
        text1: "🔐 Oups !",
        text2: "Les mots de passe ne correspondent pas",
      });
      return;
    } else if (!strongPasswordRegex.test(password)) {
      Toast.show({
        type: "error",
        text1: "🔐 Oups !",
        text2: "Veuillez saisir un mot de passe plus complèxe !",
      });
      return;
    }

    update({ oldPassword, password });
  };

  useEffect(() => {
    if (updateMutation.isSuccess) {
      // @ts-ignore
      nav.navigate(SettingsRoutes.MENU);
    }
  }, [updateMutation.isSuccess]);
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <BackArrow onPress={() => nav.goBack()} />
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollviewContainer}
      >
        <Text style={styles.textTitle}>Modifier votre mot de passe</Text>
        <Text style={styles.oldFullName}></Text>
        <View style={styles.card}>
          <Input
            onChangeText={setOdlPassword}
            value={oldPassword}
            type="password"
            placeholder="Ancien mot de passe"
          />
          <Input
            onChangeText={setPassword}
            value={password}
            type="password"
            placeholder="Nouveau mot de passe"
          />
          <Input
            onChangeText={setVerifPassword}
            value={verifPassword}
            type="password"
            placeholder="Confirmer le nouveau mot de passe"
          />
          <Spacer size={hp("2%")} />
          <Button
            label={"Modifier le mot de passe"}
            size={Button.sizes.large}
            backgroundColor={Colors.red30}
            onPress={() => handleSubmitPassword()}
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
    fontSize: hp("2%"),
  },
});
