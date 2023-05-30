import { BackArrow } from "@components/ui/atoms/BackArrow.component";
import { Spacer } from "@components/ui/atoms/Spacer.component";
import { useNavigation } from "@react-navigation/native";
import { useGetMonstersQuery } from "@store/monsters/slice";
import { Fonts } from "@utils/fonts.utils";
import { wp, hp } from "@utils/responsive.utils";
import * as React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Colors, View, Card, Text } from "react-native-ui-lib";

interface ProfileScreenProps {}

export const ProfileScreen: React.FunctionComponent<
  ProfileScreenProps
> = ({}) => {
  const nav = useNavigation();

  const { data: monsters, refetch: refetchMonsters } = useGetMonstersQuery();

  const refetchResources = () => {};

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <BackArrow onPress={() => nav.goBack()} />
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollviewContainer}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refetchResources} />
        }
      >
        <View row marginH-30 marginT-100>
          <Card flex center>
            <Spacer size={hp("3%")} />

            <Text style={styles.textTitle}>Monstres</Text>
            <Spacer size={hp("3%")} />
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
    top: hp("5%"),
    alignItems: "center",
    width: wp("100%"),
  },
  card: {
    alignItems: "center",
    top: hp("5%"),
    height: Platform.OS === "ios" ? hp("70%") : hp("80%"),
    width: wp("100%"),
  },
  textTitle: {
    fontFamily: Fonts.BLACK,
    fontSize: hp("3%"),
    textTransform: "uppercase",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  textNumber: {
    fontFamily: Fonts.BLACK,
    fontSize: hp("4.5%"),
    color: Colors.red30,
  },
  textHint: {
    fontFamily: Fonts.LIGHT,
    fontSize: hp("1.5%"),
    color: Colors.grey20,
    textTransform: "uppercase",
  },
  textLast4: {
    fontFamily: Fonts.MEDIUM,
    fontSize: hp("2%"),
    color: Colors.grey20,
    marginLeft: wp("3%"),
  },
  flagImage: {
    width: wp("10%"),
    resizeMode: "contain",
  },
  modal: {
    height: hp("50%"),
    marginVertical: hp("25%"),
    marginHorizontal: hp("2.5%"),
    paddingHorizontal: hp("2.5%"),
  },
  coinImage: {
    height: wp("15%"),
    width: wp("15%"),
    resizeMode: "contain",
  },
});
