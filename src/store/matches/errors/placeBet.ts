import Toast from "react-native-toast-message";
import { GenericApiError } from "@store/store.model";

export enum Errors {
  VALIDATION = "Validation failed",
  NOT_ENOUGH_MONEY = "You don't have enough credits",
  MINIMUM = "Minimum bet is 100 credits",
}

export const placeBetErrorHandler = (error: GenericApiError) => {
  console.log({ placeBetErrorHandler: error.error.data.message });

  switch (error.error.data.message) {
    case Errors.VALIDATION:
      Toast.show({
        type: "error",
        text1: "💸 Oups !",
        text2: "Veuillez vérifier le montant que vous avez saisi.",
      });
      break;
    case Errors.NOT_ENOUGH_MONEY:
      Toast.show({
        type: "error",
        text1: "💸 Oups !",
        text2: "Vous n'avez pas assez de crédits.",
      });
      break;
    case Errors.MINIMUM:
      Toast.show({
        type: "error",
        text1: "💸 Oups !",
        text2: "Le montant minimum est de 100 crédits.",
      });
      break;
    default:
      Toast.show({
        type: "error",
        text1: "💥 Oups !",
        text2: "Une erreur inconnue est survenue, veuillez réessayer.",
      });
  }
};
