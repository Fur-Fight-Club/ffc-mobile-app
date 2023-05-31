import { Fonts } from "@utils/fonts.utils";
import { hp, wp } from "@utils/responsive.utils";
import * as React from "react";
import {
  Modal,
  StyleSheet,
  View,
  Image,
  Touchable,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Avatar, Text } from "react-native-ui-lib";
import * as ImagePicker from "expo-image-picker";
import * as Camera from "expo-camera";
import { Spacer } from "../atoms/Spacer.component";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import * as Permissions from "expo-permissions";

interface AddMonsterModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: () => void;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

export const AddMonsterModal: React.FunctionComponent<AddMonsterModalProps> = ({
  visible,
  onClose,
  onAdd,
  image,
  setImage,
}) => {
  const handlePickImage = async () => {
    Alert.alert(
      "Choisir une image",
      "Comment voulez-vous choisir votre image ?",
      [
        // {
        //   text: "Caméra",
        //   onPress: () => {
        //     launchCamera();
        //   },
        // },
        {
          text: "Galerie",
          onPress: () => {
            pickImage();
          },
        },
        {
          text: "Annuler",
          style: "cancel",
        },
      ]
    );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].base64);
    }
  };

  // const launchCamera = async () => {
  //   const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
  //   const cameraRollPermission = await Permissions.askAsync(
  //     Permissions.MEDIA_LIBRARY
  //   );

  //   let result = await ImagePicker.launchCameraAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     quality: 0.5,
  //     base64: true,
  //   });

  //   if (!result.canceled) {
  //     // display 100 first characters of the base64 string
  //     console.log(result.assets[0].base64.substring(0, 100));
  //     setImage(result.assets[0].base64);
  //   }
  // };
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeImage}>
            <Image
              source={require("@assets/images/close.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.modalTitle}>Ajouter un monstre</Text>
            <Spacer size={hp("2%")} />
            <TouchableOpacity onPress={pickImage}>
              <Avatar
                label={"📸"}
                size={hp("10%")}
                source={{ uri: `data:image/png;base64,${image}` }}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
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
