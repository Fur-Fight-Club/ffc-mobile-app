import Toast from "react-native-toast-message";
import { GenericApiError } from "@store/store.model";

export enum Errors {}

export const deleteMonstersHandler = (error: GenericApiError) => {
  console.log({ deleteMonstersHandler: error.error.data.message });

  switch (error.error.data.message) {
    default:
      Toast.show({
        type: "error",
        text1: "👹 Oups !",
        text2: "Une erreur inconnue est survenue, veuillez réessayer.",
      });
  }
};
