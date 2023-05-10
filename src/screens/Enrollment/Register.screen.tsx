import { Input } from "@components/ui/atoms/Input.component";
import { Spacer } from "@components/ui/atoms/Spacer.component";
import { NotConnectedRoutes } from "@navigation/navigation.model";
import { useNavigation } from "@react-navigation/native";
import { useRegisterMutation } from "@store/application/slice";
import { hp, wp } from "@utils/responsive.utils";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { Button, Card, Colors, Text } from "react-native-ui-lib";

interface RegisterScreenProps {}

export const RegisterScreen: React.FunctionComponent<
  RegisterScreenProps
> = ({}) => {
  const nav = useNavigation();

  const [register, registerMutation] = useRegisterMutation();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmitRegister = () => {
    const strongPasswordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const [firstname, lastname] = fullname.split(" ");

    if (!lastname) {
      Toast.show({
        type: "error",
        text1: "✍️ Oups !",
        text2: "Veuillez entrer votre nom complet",
      });
    } else if (!email) {
      Toast.show({
        type: "error",
        text1: "✉️ Oups !",
        text2: "Veuillez entrer votre adresse email",
      });
    } else if (!password || !passwordConfirmation) {
      Toast.show({
        type: "error",
        text1: "🔐 Oups !",
        text2: "Veuillez entrer votre mot de passe",
      });
    } else if (password !== passwordConfirmation) {
      Toast.show({
        type: "error",
        text1: "🔐 Oups !",
        text2: "Les mots de passe ne correspondent pas",
      });
    } else if (!strongPasswordRegex.test(password)) {
      Toast.show({
        type: "error",
        text1: "🔐 Oups !",
        text2: "Veuillez saisir un mot de passe plus complèxe !",
      });
    }

    register({ firstname, lastname, email, password });
  };

  useEffect(() => {
    if (registerMutation.isSuccess) {
      // @ts-ignore
      nav.navigate(NotConnectedRoutes.EMAIL_CONFIRMATION);
    }
  }, [registerMutation.isSuccess]);
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollviewContainer}
      >
        <View style={styles.card}>
          <Card flex center>
            <Text style={styles.textTitle}>S'inscrire</Text>
            <Spacer size={hp("5%")} />
            <Input
              onChangeText={setFullname}
              value={fullname}
              type="name"
              placeholder="Nom complet"
            />
            <Input
              onChangeText={setEmail}
              value={email}
              type="emailAddress"
              placeholder="Adresse email"
            />
            <Input
              onChangeText={setPassword}
              value={password}
              type="password"
              placeholder="Mot de passe"
            />
            <Input
              onChangeText={setPasswordConfirmation}
              value={passwordConfirmation}
              type="password"
              placeholder="Confirmer mot de passe"
            />
            <Spacer size={hp("2%")} />
            <Button
              label={"Créer mon compte"}
              size={Button.sizes.large}
              backgroundColor={Colors.red30}
              onPress={() => handleSubmitRegister()}
            />
            <Spacer size={hp("3%")} />
            <Button
              label={"Vous avez déjà un compte ? Se connecter"}
              size={Button.sizes.large}
              backgroundColor={Colors.red30}
              labelStyle={{
                color: Colors.red30,
              }}
              hyperlink
              // @ts-ignore
              onPress={() => nav.navigate(NotConnectedRoutes.LOGIN)}
            />
          </Card>
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
    justifyContent: "center",
    alignItems: "center",
    width: wp("100%"),
    height: hp("100%"),
  },
  card: {
    height: hp("70%"),
    width: wp("80%"),
  },
  textTitle: {
    fontFamily: "Poppins_900Black",
    fontSize: hp("4%"),
    textTransform: "uppercase",
  },
});
