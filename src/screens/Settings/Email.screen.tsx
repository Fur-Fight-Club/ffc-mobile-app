import { BackArrow } from "@components/ui/atoms/BackArrow.component";
import { Input } from "@components/ui/atoms/Input.component";
import { Spacer } from "@components/ui/atoms/Spacer.component";
import { SettingsRoutes } from "@navigation/navigation.model";
import { useNavigation } from "@react-navigation/native";
import { applicationState } from "@store/application/selector";
import {
  useUpdateUserEmailMutation,
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
} from "@store/application/slice";
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
import { useSelector } from "react-redux";

interface EmailScreenProps {}

export const EmailScreen: React.FunctionComponent<EmailScreenProps> = ({}) => {
  const nav = useNavigation();
  const [update, updateMutation] = useUpdateUserMutation();
  const [email, setEmail] = useState("");
  const { user } = useSelector(applicationState);

  const handleSubmitProfil = () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "✉️ Oups !",
        text2: "Veuillez entrer votre adresse email",
      });
      return;
    }

    update({ email, id: user.id });
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
        <Text style={styles.textTitle}>Modifier mon adresse email</Text>
        <Text style={styles.oldEmail}>{user.email}</Text>
        <View style={styles.card}>
          <Input
            onChangeText={setEmail}
            value={email}
            type="emailAddress"
            placeholder="Nouvelle adresse email"
          />
          <Spacer size={hp("2%")} />
          <Button
            label={"Modifier"}
            size={Button.sizes.large}
            backgroundColor={Colors.red30}
            onPress={() => handleSubmitProfil()}
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
  oldEmail: {
    top: hp("2%"),
    fontSize: hp("2%"),
  },
});
