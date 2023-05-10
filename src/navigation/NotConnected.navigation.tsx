import * as React from "react";
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "@screens/Enrollment/Login.screen";
import { RegisterScreen } from "@screens/Enrollment/Register.screen";
import { NotConnectedRoutes } from "./navigation.model";
import { EmailConfirmationScreen } from "@screens/Enrollment/EmailConfirmation.screen";

const Stack = createStackNavigator();

interface NotConnectedNavigationProps {}

export const NotConnectedNavigation: React.FunctionComponent<
  NotConnectedNavigationProps
> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NotConnectedRoutes.LOGIN}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NotConnectedRoutes.REGISTER}
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NotConnectedRoutes.EMAIL_CONFIRMATION}
        component={EmailConfirmationScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
