import { Loader } from "@components/ui/molecules/Loader.component";
import { PersistGateLoader } from "@components/ui/molecules/PersistGateLoader.component";
import { store } from "@store/store";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native-ui-lib";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={<PersistGateLoader />}
      ></PersistGate>
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
