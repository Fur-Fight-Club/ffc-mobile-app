import { Loader } from "@components/ui/molecules/Loader.component";
import { PersistGateLoader } from "@components/ui/molecules/PersistGateLoader.component";
import { store } from "@store/store";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native-ui-lib";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useFonts } from "expo-font";
import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabNavigation } from "@navigation/BottomTab.navigation";

export default function App() {
  let persistor = persistStore(store);

  const [loaded] = useFonts({
    SplatterKings: require("./src/assets/fonts/SplatterKings-Bgex.ttf"),
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  if (!loaded) {
    return <PersistGateLoader />;
  }
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<PersistGateLoader />}>
        <NavigationContainer>
          <BottomTabNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
