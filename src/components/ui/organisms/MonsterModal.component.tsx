import { Fonts } from "@utils/fonts.utils";
import { hp, wp } from "@utils/responsive.utils";
import * as React from "react";
import {
  Modal,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Avatar, Button, Colors, Text } from "react-native-ui-lib";
import * as ImagePicker from "expo-image-picker";
import { Spacer } from "../atoms/Spacer.component";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {
  Monster,
  MonsterType,
  WeightCategoryType,
} from "@store/monsters/monsters.model";
import { Input } from "../atoms/Input.component";
import { Picker } from "../atoms/Picker.component";
import {
  convertApiTypeToType,
  monsterType,
  weightCategories,
} from "@store/monsters/utils";
import { useSelector } from "react-redux";
import { applicationState } from "@store/application/selector";

interface MonsterModalProps {
  visible: boolean;
  onClose: () => void;
  onValidate: (monster: object) => void;
  monster?: Monster;
}

export const MonsterModal: React.FunctionComponent<MonsterModalProps> = ({
  visible,
  onClose,
  onValidate,
  monster,
}) => {
  const [image, setImage] = React.useState<string>(
    monster ? monster.picture : ""
  );
  const [name, setName] = React.useState<string>(monster ? monster.name : "");
  const [weight, setWeight] = React.useState<string>(
    monster ? monster.weight.toString() : ""
  );
  const [type, setType] = React.useState<{
    label: string;
    value: MonsterType | null;
  }>(
    monster
      ? {
          label: convertApiTypeToType(monster.monster_type),
          value: monster.monster_type,
        }
      : { label: "", value: null }
  );
  const [weightCategory, setWeightCategory] = React.useState<{
    label: WeightCategoryType | null;
    value: WeightCategoryType | null;
  }>(
    monster
      ? { label: monster.weight_category, value: monster.weight_category }
      : { label: null, value: null }
  );

  React.useEffect(() => {
    if (monster !== undefined) {
      setImage(monster.picture);
      setName(monster.name);
      setWeight(monster.weight.toString());
      setType({
        label: convertApiTypeToType(monster.monster_type),
        value: monster.monster_type,
      });
      setWeightCategory({
        label: monster.weight_category,
        value: monster.weight_category,
      });
    }
  }, [monster]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setImage(`data:image/png;base64,${result.assets[0].base64}`);
    }
  };

  const { user } = useSelector(applicationState);
  const addMonster = () => {
    if (
      !name ||
      !image ||
      type.value === null ||
      weightCategory.value === null ||
      !weight
    ) {
      Toast.show({
        type: "error",
        text1: "👹 Erreur",
        text2: "Veuillez remplir tous les champs",
      });
    } else {
      onValidate({
        id: monster ? monster.id : undefined,
        name,
        monster_type: type.value,
        weight_category: weightCategory.value,
        weight: +weight.replace(",", "."),
        picture: image,
        fk_user: user.id,
      });
    }
  };
  return (
    <Modal transparent visible={visible} animationType="fade">
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => {
                onClose();
                setName("");
                setImage("");
                setType({ label: "", value: null });
                setWeight("");
                setWeightCategory({ label: null, value: null });
              }}
              style={styles.closeImage}
            >
              <Image
                source={require("@assets/images/close.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>
            <ScrollView
              contentContainerStyle={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.modalTitle}>Ajouter un monstre</Text>
              <Spacer size={hp("2%")} />
              <TouchableOpacity onPress={pickImage}>
                <Avatar label={"📸"} size={hp("10%")} source={{ uri: image }} />
              </TouchableOpacity>
              <Spacer size={hp("2%")} />
              <Input
                onChangeText={setName}
                value={name}
                type="name"
                placeholder="Nom du monstre"
                width="100%"
              />
              <Input
                onChangeText={setWeight}
                value={weight}
                placeholder="Poids du monstre"
                width="100%"
                keyboardType="numeric"
              />
              <Spacer size={hp("2%")} />
              <Picker
                onValueChange={setWeightCategory}
                value={weightCategory}
                items={weightCategories.map((category) => ({
                  label: category.replaceAll("_", " "),
                  value: category,
                }))}
                width="100%"
                placeholder="Catégorie de poids..."
              />
              <Spacer size={hp("2%")} />
              <Picker
                onValueChange={setType}
                value={type}
                items={monsterType.map((type) => ({
                  label: convertApiTypeToType(type),
                  value: type,
                }))}
                width="100%"
                placeholder="Type du monstre..."
              />
              <Spacer size={hp("4%")} />
              <Button
                label={`${monster ? "Modifier" : "Ajouter"} le monstre`}
                onPress={addMonster}
                backgroundColor={Colors.red30}
                fullWidth
                size={Button.sizes.large}
              />
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: hp("100%"),
    width: wp("100%"),
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    height: hp("50%"),
    marginHorizontal: wp("5%"),
    width: wp("90%"),
    borderRadius: hp("2%"),
  },
  closeImage: {
    width: hp("3.5%"),
    height: hp("3.5%"),
    position: "absolute",
    right: hp("1.5%"),
    top: hp("1.5%"),
    zIndex: 99,
  },
  scrollView: {
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("2%"),
    display: "flex",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: hp("3%"),
    fontFamily: Fonts.BOLD,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
