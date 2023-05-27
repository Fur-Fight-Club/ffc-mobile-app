import * as React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingsRoutes } from "./navigation.model";
import { EmailConfirmationScreen } from "@screens/Enrollment/EmailConfirmation.screen";
import { SettingsScreen } from "@screens/Settings/Setttings.screen";
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
    <Stack.Navigator initialRouteName={SettingsRoutes.SETTINGS}>
      <Stack.Screen
        name={SettingsRoutes.SETTINGS}
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SettingsRoutes.SETTINGS_PROFIL}
        component={ProfilScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SettingsRoutes.SETTINGS_PASSWORD}
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
        name={SettingsRoutes.SETTINGS_NOTIFICATIONS}
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
