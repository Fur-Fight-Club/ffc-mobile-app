import * as React from "react";
import { Alert, Platform, StatusBar, StyleSheet, View } from "react-native";
import { BottomTabNavigation } from "./BottomTab.navigation";
import { Loader } from "@components/ui/molecules/Loader.component";
import { useSelector } from "react-redux";
import { applicationState } from "@store/application/selector";
import { NotConnectedNavigation } from "./NotConnected.navigation";
import * as Notifications from "expo-notifications";
import { useUpsertNotificationTokenMutation } from "@store/application/slice";
import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";

interface MainNavigationProps {}

export const MainNavigation: React.FunctionComponent<
  MainNavigationProps
> = ({}) => {
  const { loading, token, notification_token } = useSelector(applicationState);
  const [upsertNotificationToken] = useUpsertNotificationTokenMutation();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!");
      console.log(JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
  });

  if (!notification_token && token !== "") {
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

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
}

const styles = StyleSheet.create({});
