import { Input } from "@components/ui/atoms/Input.component";
import { Spacer } from "@components/ui/atoms/Spacer.component";
import { NotConnectedRoutes } from "@navigation/navigation.model";
import { useNavigation } from "@react-navigation/native";
import {
  useAskResetPasswordMutation,
  useLoginMutation,
} from "@store/application/slice";
import { hp, wp } from "@utils/responsive.utils";
import { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card, Colors, Text } from "react-native-ui-lib";
import { BackArrow } from "@components/ui/atoms/BackArrow.component";

interface ForgotPasswordScreenProps {}

export const ForgotPasswordScreen: React.FunctionComponent<
  ForgotPasswordScreenProps
> = ({}) => {
  const nav = useNavigation();

  const [askResetPassword, askResetPasswordMutation] =
    useAskResetPasswordMutation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (askResetPasswordMutation.isSuccess) {
      // @ts-ignore
      nav.navigate(NotConnectedRoutes.EMAIL_CONFIRMATION);
    }
  }, [askResetPasswordMutation.isSuccess]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <BackArrow onPress={() => nav.goBack()} />
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollviewContainer}
      >
        <View style={styles.card}>
          <Card flex center>
            <Text style={styles.textTitle}>Mot de passe oublié</Text>
            <Spacer size={hp("5%")} />
            <Input
              onChangeText={setEmail}
              value={email}
              type="emailAddress"
              placeholder="Adresse email"
            />
            <Spacer size={hp("5%")} />
            <Button
              label={"Envoyer un mail !"}
              size={Button.sizes.large}
              backgroundColor={Colors.red30}
              onPress={() => askResetPassword(email)}
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
    height: hp("42%"),
    width: wp("80%"),
  },
  textTitle: {
    paddingHorizontal: wp("2.5%"),
    fontFamily: "Poppins_900Black",
    fontSize: hp("4%"),
    textTransform: "uppercase",
    textAlign: "center",
  },
});
