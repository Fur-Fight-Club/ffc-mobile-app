import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { BottomTabNavigation } from "./BottomTab.navigation";
import { Loader } from "@components/ui/molecules/Loader.component";
import { useSelector } from "react-redux";
import { applicationState } from "@store/application/selector";
import { NotConnectedNavigation } from "./NotConnected.navigation";
import * as Notifications from "expo-notifications";
import { useUpsertNotificationTokenMutation } from "@store/application/slice";

interface MainNavigationProps {}

export const MainNavigation: React.FunctionComponent<
  MainNavigationProps
> = ({}) => {
  const { loading, token, notification_token } = useSelector(applicationState);
  const [upsertNotificationToken] = useUpsertNotificationTokenMutation();

  if (!notification_token) {
    (async () => {
      console.log("No token found, retrieving a notification token...");
      const expoToken = (await Notifications.getDevicePushTokenAsync()).data;
      const platform = Platform.OS === "ios" ? "IOS" : "ANDROID";
      console.log("expoToken", expoToken, platform);
      upsertNotificationToken({
        token: expoToken,
        platform,
      });
    })();
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {token !== "" && typeof token === "string" && <BottomTabNavigation />}
      {(token === "" || token === undefined) && <NotConnectedNavigation />}
      <Loader loading={loading} />
    </>
  );
};

const styles = StyleSheet.create({});
