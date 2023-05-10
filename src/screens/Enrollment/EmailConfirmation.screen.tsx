import { Spacer } from "@components/ui/atoms/Spacer.component";
import { NotConnectedRoutes } from "@navigation/navigation.model";
import { useNavigation } from "@react-navigation/native";
import { hp, wp } from "@utils/responsive.utils";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card, Colors, Text } from "react-native-ui-lib";

interface EmailConfirmationScreenProps {}

export const EmailConfirmationScreen: React.FunctionComponent<
  EmailConfirmationScreenProps
> = ({}) => {
  const nav = useNavigation();
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollviewContainer}
      >
        <View style={styles.card}>
          <Card flex center>
            <Text style={styles.textTitle}>Et voilà !</Text>
            <Spacer size={hp("5%")} />
            <Text style={styles.text}>
              Nous vous avons envoyé un mail à la suite de votre demande ! Il ne
              vous reste plus qu'à vérifier votre boîte mail !
            </Text>
            <Spacer size={hp("2%")} />
            <Button
              label={"Me connecter"}
              size={Button.sizes.large}
              backgroundColor={Colors.red30}
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
    height: hp("34%"),
    width: wp("80%"),
  },
  textTitle: {
    fontFamily: "Poppins_900Black",
    fontSize: hp("4%"),
    textTransform: "uppercase",
  },
  text: {
    fontFamily: "Poppins_400Regular",
    fontSize: hp("2%"),
    textAlign: "center",
    paddingHorizontal: wp("5%"),
  },
});
