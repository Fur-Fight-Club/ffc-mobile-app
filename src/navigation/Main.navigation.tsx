import * as React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { BottomTabNavigation } from "./BottomTab.navigation";
import { Loader } from "@components/ui/molecules/Loader.component";
import { useSelector } from "react-redux";
import { applicationState } from "@store/application/selector";
import { NotConnectedNavigation } from "./NotConnected.navigation";

interface MainNavigationProps {}

export const MainNavigation: React.FunctionComponent<
  MainNavigationProps
> = ({}) => {
  const { loading, token } = useSelector(applicationState);

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
