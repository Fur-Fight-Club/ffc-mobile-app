import { Monster } from "./monsters.model";

export const convertApiTypeToType = (apiType: Monster["monster_type"]) => {
  switch (apiType) {
    case "ELEMENTARY":
      return "Élémentaire";
    case "FANTASTIC":
      return "Fantastique";
    case "MYTHOLOGICAL":
      return "Mythologique";
    case "SCARY":
      return "Effrayant";
    case "AQUATIC":
      return "Aquatique";
    case "WINGED":
      return "Ailé";
    case "PREHISTORIC":
      return "Préhistorique";
    case "MECHANICAL":
      return "Mécanique";
    case "EXTRATERRESTRIAL":
      return "Extraterrestre";
    case "MAGICAL":
      return "Magique";
    default:
      return "Inconnu";
  }
};
