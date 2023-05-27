import { applicationState } from "@store/application/selector";
import { SettingsRoutes } from "@navigation/navigation.model";
import { hp, wp } from "@utils/responsive.utils";
import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { getStatusBarHeight, isIphoneX } from "react-native-iphone-x-helper";
import { Colors } from "react-native-ui-lib";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setToken } from "@store/application/slice";
import { MenuList } from "@components/ui/molecules/MenuList.component";

interface SettingsScreenProps {}

export const SettingsScreen: React.FunctionComponent<
  SettingsScreenProps
> = ({}) => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const { user } = useSelector(applicationState);

  return (
    <View style={styles.container}>
      <View style={styles.infoUserHeader}>
        <Text style={styles.nameUser}>
          {user.firstname} {user.lastname}
        </Text>
        <Text style={styles.emailUser}>{user.email}</Text>
      </View>
      <View style={styles.settingsUser}>
        <MenuList
          children="Modifier mon profil"
          // @ts-ignore
          onPress={() => nav.navigate(SettingsRoutes.SETTINGS_PROFIL)}
        />
        <MenuList
          children="Modifier mon mot de passe"
          // @ts-ignore
          onPress={() => nav.navigate(SettingsRoutes.SETTINGS_PASSWORD)}
        />
        <MenuList
          children="Voir mon wallet"
          // @ts-ignore
          onPress={() => nav.navigate(SettingsRoutes.WALLET)}
        />
        <MenuList
          children="Paramètres de notifications"
          // @ts-ignore
          onPress={() => nav.navigate(SettingsRoutes.SETTINGS_NOTIFICATIONS)}
        />
        <MenuList
          children="Déconnexion"
          color="red"
          // @ts-ignore
          onPress={() => dispatch(setToken(""))}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "column",
  },
  infoUserHeader: {
    flex: 0.5,
    width: wp("100%"),
    backgroundColor: Colors.white,
    paddingTop: isIphoneX() ? getStatusBarHeight() + 65 : 0,
    borderBottomColor: Colors.orange30,
    borderBottomWidth: 3,
  },
  nameUser: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  emailUser: {
    fontSize: hp("2%"),
    textAlign: "center",
    fontWeight: "200",
  },
  settingsUser: {
    flex: 5,
    width: wp("100%"),
    backgroundColor: Colors.white,
    paddingTop: isIphoneX() ? getStatusBarHeight() : 0,
    paddingLeft: hp("6%"),
  },
});
