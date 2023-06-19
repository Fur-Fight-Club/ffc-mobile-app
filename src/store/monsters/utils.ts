import { Colors } from "react-native-ui-lib";
import { Monster, WeightCategoryType } from "./monsters.model";

export const convertApiTypeToType = (
  apiType: Monster["monster_type"] | string
) => {
  switch (apiType) {
    case "ELEMENTARY":
      return "🌋 Élémentaire";
    case "FANTASTIC":
      return "🦄 Fantastique";
    case "MYTHOLOGICAL":
      return "🏛️ Mythologique";
    case "SCARY":
      return "👻 Effrayant";
    case "AQUATIC":
      return "🌊 Aquatique";
    case "WINGED":
      return "🪽 Ailé";
    case "PREHISTORIC":
      return "🦖 Préhistorique";
    case "MECHANICAL":
      return "⚙️ Mécanique";
    case "EXTRATERRESTRIAL":
      return "🛸 Extraterrestre";
    case "MAGICAL":
      return "🪄 Magique";
    default:
      return "❓ Inconnu";
  }
};

export const monsterType = [
  "ELEMENTARY",
  "FANTASTIC",
  "MYTHOLOGICAL",
  "SCARY",
  "AQUATIC",
  "WINGED",
  "PREHISTORIC",
  "MECHANICAL",
  "EXTRATERRESTRIAL",
  "MAGICAL",
];

export const weightCategories = [
  "A_FINE_BOI",
  "HE_CHOMNK",
  "A_HECKING_CHONKER",
  "HEFTY_CHONK",
  "MEGA_CHONKER",
  "OH_LAWD_HE_COMIN",
];

// Red color gradient for weight categories
export const weightCategoryColors = (weightCategory: WeightCategoryType) => {
  switch (weightCategory) {
    case "A_FINE_BOI":
      return Colors.red50;
    case "HE_CHOMNK":
      return Colors.red40;
    case "A_HECKING_CHONKER":
      return Colors.red30;
    case "HEFTY_CHONK":
      return Colors.red20;
    case "MEGA_CHONKER":
      return Colors.red10;
    case "OH_LAWD_HE_COMIN":
      return Colors.black;
    default:
      return Colors.red60;
  }
};

export const addDotEveryThreeDigits = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
