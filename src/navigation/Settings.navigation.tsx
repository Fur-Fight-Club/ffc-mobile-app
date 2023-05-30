import * as React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingsRoutes } from "./navigation.model";
import { EmailConfirmationScreen } from "@screens/Enrollment/EmailConfirmation.screen";
import { SetttingsMenuScreen } from "@screens/Settings/SetttingsMenu.screen";
import { WalletScreen } from "@screens/Settings/Wallet.screen";
import { ProfilScreen } from "@screens/Settings/Profil.screen";
import { PasswordScreen } from "@screens/Settings/Password.screen";
import { NotificationScreen } from "@screens/Settings/Notification.screen";

const Stack = createStackNavigator();

interface SettingsNavigationProps {}

export const SettingsNavigation: React.FunctionComponent<
  SettingsNavigationProps
> = ({}) => {
  return (
    <Stack.Navigator initialRouteName={SettingsRoutes.MENU}>
      <Stack.Screen
        name={SettingsRoutes.MENU}
        component={SetttingsMenuScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SettingsRoutes.PROFIL}
        component={ProfilScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SettingsRoutes.PASSWORD}
        component={PasswordScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SettingsRoutes.WALLET}
        component={WalletScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SettingsRoutes.NOTIFICATIONS}
        component={NotificationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SettingsRoutes.LOGOUT}
        component={EmailConfirmationScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
