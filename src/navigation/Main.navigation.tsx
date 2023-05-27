import * as React from "react";
import { Alert, Platform, StatusBar, StyleSheet, View } from "react-native";
import { BottomTabNavigation } from "./BottomTab.navigation";
import { Loader } from "@components/ui/molecules/Loader.component";
import { useSelector } from "react-redux";
import { applicationState } from "@store/application/selector";
import { NotConnectedNavigation } from "./NotConnected.navigation";
import { useUpsertNotificationTokenMutation } from "@store/application/slice";
import messaging from "@react-native-firebase/messaging";
import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import * as Linking from "expo-linking";
import { event } from "react-native-reanimated";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

interface MainNavigationProps {}

export const MainNavigation: React.FunctionComponent<
  MainNavigationProps
> = ({}) => {
  const { loading, token, notification_token } = useSelector(applicationState);
  const [upsertNotificationToken] = useUpsertNotificationTokenMutation();

  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const url = Linking.useURL();

  useEffect(() => {
    console.log({ url });
  }, [url]);

  useEffect(() => {
    console.log("notification_token", notification_token);

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      schedulePushNotification(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
        remoteMessage.data
      );
      console.log(JSON.stringify(remoteMessage));
    });

    if (!notification_token && token !== "") {
      (async () => {
        await requestUserPermission();

        messaging()
          .getToken()
          .then((token) => {
            console.log("token", token);
            const platform = Platform.OS === "ios" ? "IOS" : "ANDROID";
            upsertNotificationToken({
              token,
              platform,
            });
          });
      })();
    }

    // @ts-ignore
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // @ts-ignore
        setNotification(notification);
      });
    // @ts-ignore
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    /**
     * DEEPLINKING
     */
    Linking.addEventListener("url", (event) => {
      const data = Linking.parse(event.url);
      console.log("deeplinking data => ", data);
    });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
      unsubscribe();
    };
  }, []);

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
  });

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
  }
}

async function schedulePushNotification(
  title: string,
  body: string,
  data: any
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
    },
    trigger: { seconds: 2 },
  });
}

const styles = StyleSheet.create({});
