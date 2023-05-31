import Toast from "react-native-toast-message";
import { GenericApiError } from "@store/store.model";

export enum Errors {
  VALIDATION = "Validation failed",
}

export const updateMonstersHandler = (error: GenericApiError) => {
  console.log({ updateMonstersHandler: JSON.stringify(error.error.data) });

  switch (error.error.data.message) {
    case Errors.VALIDATION:
      Toast.show({
        type: "error",
        text1: "👹 Oups !",
        text2: "Vérifiez tous les champs et réessayez.",
      });

    default:
      Toast.show({
        type: "error",
        text1: "👹 Oups !",
        text2: "Une erreur inconnue est survenue, veuillez réessayer.",
      });
  }
};
