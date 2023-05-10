import { Input } from "@components/ui/atoms/Input.component";
import { Spacer } from "@components/ui/atoms/Spacer.component";
import { NotConnectedRoutes } from "@navigation/navigation.model";
import { useNavigation } from "@react-navigation/native";
import { useLoginMutation } from "@store/application/slice";
import { hp, wp } from "@utils/responsive.utils";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card, Colors, Text } from "react-native-ui-lib";

interface LoginScreenProps {}

export const LoginScreen: React.FunctionComponent<LoginScreenProps> = ({}) => {
  const nav = useNavigation();

  const [login] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollviewContainer}
      >
        <View style={styles.card}>
          <Card flex center>
            <Text style={styles.textTitle}>Se connecter</Text>
            <Spacer size={hp("5%")} />
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
            <Spacer size={hp("2%")} />
            <Button
              label={"Se connecter"}
              size={Button.sizes.large}
              backgroundColor={Colors.red30}
              onPress={() => login({ email, password })}
            />
            <Spacer size={hp("3%")} />
            <Button
              label={"Vous n'avez pas de compte ? S'inscire"}
              size={Button.sizes.large}
              backgroundColor={Colors.red30}
              labelStyle={{
                color: Colors.red30,
              }}
              // @ts-ignore
              onPress={() => nav.navigate(NotConnectedRoutes.REGISTER)}
              hyperlink
            />
            <Spacer size={hp("1.5%")} />
            <Button
              label={"Mot de passe oublié ?"}
              size={Button.sizes.large}
              backgroundColor={Colors.red30}
              labelStyle={{
                color: Colors.red30,
              }}
              // @ts-ignore
              onPress={() => nav.navigate(NotConnectedRoutes.FORGOT_PASSWORD)}
              hyperlink
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
    height: hp("52%"),
    width: wp("80%"),
  },
  textTitle: {
    fontFamily: "Poppins_900Black",
    fontSize: hp("4%"),
    textTransform: "uppercase",
  },
});
