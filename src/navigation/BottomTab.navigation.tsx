import * as React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TemplateScreen } from "@screens/Template.screen";
import { TestScreen } from "@screens/Test.screen";
import { hp, wp } from "@utils/responsive.utils";
import { TabBarIcon } from "@components/ui/molecules/TabBarIcon.component";
import { BottomTabRoutes } from "./navigation.model";
import { useGetUserQuery } from "@store/application/slice";
import { useEffect } from "react";
import { SettingsScreen } from "@screens/Settings/Setttings.screen";
import { SettingsNavigation } from "./Settings.navigation";

interface BottomTabNavigationProps {}

export const BottomTabNavigation: React.FunctionComponent<
  BottomTabNavigationProps
> = ({}) => {
  const Tab = createBottomTabNavigator();

  const { refetch } = useGetUserQuery();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: tabStyle.menuSettings,
      }}
      initialRouteName={BottomTabRoutes.HOME}
    >
      <Tab.Screen
        name={BottomTabRoutes.PROFILE}
        component={TemplateScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"award"} />
          ),
        }}
      />
      <Tab.Screen
        name={BottomTabRoutes.HOME}
        component={TestScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"home"} />
          ),
        }}
      />
      <Tab.Screen
        name={BottomTabRoutes.SETTINGS}
        component={SettingsNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon="settings" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const tabStyle = StyleSheet.create({
  menuSettings: {
    position: "absolute",
    bottom: 0,
    left: hp("2.5%"),
    alignSelf: "center",
    width: wp("90%"),
    height: hp("7%"),
    border: "none",
    borderRadius: 15,
    marginBottom: hp("2%"),
    shadowColor: "#757575",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3,
  },
});
