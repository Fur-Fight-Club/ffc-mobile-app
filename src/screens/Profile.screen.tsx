import { BackArrow } from "@components/ui/atoms/BackArrow.component";
import { Spacer } from "@components/ui/atoms/Spacer.component";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  useCreateMonsterMutation,
  useDeleteMonsterMutation,
  useGetMonstersQuery,
  useUpdateMonsterMutation,
} from "@store/monsters/slice";
import { Fonts } from "@utils/fonts.utils";
import { wp, hp } from "@utils/responsive.utils";
import * as React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  Colors,
  View,
  Card,
  Text,
  Avatar,
  Button,
  Image,
} from "react-native-ui-lib";
import Slick from "react-native-slick";
import { convertApiTypeToType } from "@store/monsters/utils";
import { RoudButton } from "@components/ui/atoms/RoundButton.component";
import { MonsterCard } from "@components/ui/organisms/MonsterCard.component";
import { MonsterModal } from "@components/ui/organisms/MonsterModal.component";
import { Monster } from "@store/monsters/monsters.model";
import { set } from "react-native-reanimated";

interface ProfileScreenProps {}

export const ProfileScreen: React.FunctionComponent<
  ProfileScreenProps
> = ({}) => {
  const nav = useNavigation();

  const {
    data: monsters = [],
    refetch: refetchMonsters,
    isFetching: monsterFetching,
  } = useGetMonstersQuery();

  const [deleteMonster, { isSuccess: monsterDeleteSuccess }] =
    useDeleteMonsterMutation();

  const handleDeleteMonster = (id: number) => {
    Alert.alert(
      "Supprimer le monstre",
      "Êtes-vous sûr de vouloir supprimer ce monstre ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          onPress: () => {
            deleteMonster(id);
          },
          style: "destructive",
        },
      ]
    );
  };

  const refetchResources = () => {
    refetchMonsters();
  };

  useFocusEffect(
    React.useCallback(() => {
      refetchResources();
    }, [])
  );

  React.useEffect(() => {
    if (monsterDeleteSuccess) {
      refetchResources();
    }
  }, [monsterDeleteSuccess]);

  /**
   * CREATE MONSTER
   */
  const [modalVisible, setModalVisible] = React.useState(false);
  const [createMonster, { isSuccess: monsterCreateSuccess }] =
    useCreateMonsterMutation();

  /**
   * UPDATING MONSTER
   */

  const [editingMonster, setEditingMonster] = React.useState<
    Monster | undefined
  >(undefined);
  const [updateMonster, { isSuccess: monsterUpdateSuccess }] =
    useUpdateMonsterMutation();

  const handleUpdateMonster = (monster: Monster) => {
    setEditingMonster(monster);
    setModalVisible(true);
  };

  React.useEffect(() => {
    if (monsterCreateSuccess || monsterUpdateSuccess) {
      setModalVisible(false);
      setEditingMonster(undefined);
      refetchResources();
    }
  }, [monsterCreateSuccess, monsterUpdateSuccess]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <MonsterModal
        visible={modalVisible}
        onClose={() => {
          setEditingMonster(undefined);
          setModalVisible(false);
        }}
        onValidate={editingMonster ? updateMonster : createMonster}
        monster={editingMonster}
      />
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollviewContainer}
        refreshControl={
          <RefreshControl
            refreshing={monsterFetching}
            onRefresh={refetchResources}
          />
        }
      >
        <View row marginH-30 marginT-100>
          <Card flex center>
            <Spacer size={hp("3%")} />

            <Text style={styles.textTitle}>Mes monstres</Text>
            <Spacer size={hp("3%")} />
            {monsters.length ? (
              <Slick
                style={{
                  height: hp("40%"),
                }}
                showsButtons={false}
                showsPagination={true}
                dotColor={Colors.grey}
                activeDotColor={Colors.red30}
              >
                {monsters?.map((monster) => (
                  <MonsterCard
                    monster={monster}
                    key={monster.id}
                    handleDeleteMonster={handleDeleteMonster}
                    handleUpdateMonster={handleUpdateMonster}
                  />
                ))}
              </Slick>
            ) : (
              <Text style={styles.noMontersText}>
                Vous n'avez pas encore de monstres, commencez par en ajouter un
                !
              </Text>
            )}
            <Spacer size={hp("3%")} />
            <Button
              label="Ajouter un monstre"
              size={Button.sizes.large}
              backgroundColor={Colors.red30}
              onPress={() => setModalVisible(true)}
            />
            <Spacer size={hp("3%")} />
          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp("100%"),
    height: hp("100%"),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollview: {},
  scrollviewContainer: {
    alignItems: "center",
    width: wp("100%"),
  },
  textTitle: {
    fontFamily: Fonts.BLACK,
    fontSize: hp("3%"),
    textTransform: "uppercase",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  noMontersText: {
    fontFamily: Fonts.BODY,
    fontSize: hp("2%"),
    textAlign: "center",
    marginHorizontal: wp("10%"),
    fontStyle: "italic",
  },
});
