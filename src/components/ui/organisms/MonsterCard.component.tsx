import {
  addDotEveryThreeDigits,
  convertApiTypeToType,
} from "@store/monsters/utils";
import { Fonts } from "@utils/fonts.utils";
import { hp } from "@utils/responsive.utils";
import * as React from "react";
import { Colors, Avatar, Text, View, Button } from "react-native-ui-lib";
import { StyleSheet } from "react-native";
import { Spacer } from "../atoms/Spacer.component";
import { Monster } from "@store/monsters/monsters.model";

interface MonsterCardProps {
  monster: Monster;
  handleDeleteMonster: (id: number) => void;
}

export const MonsterCard: React.FunctionComponent<MonsterCardProps> = ({
  monster,
  handleDeleteMonster,
}) => {
  return (
    <View
      key={monster.id}
      style={styles.monsterContainer}
      backgroundColor={Colors.grey80}
      flex
      center
      marginV-10
      marginH-20
    >
      <Avatar
        source={{
          uri: monster.picture,
        }}
        label={monster.name.charAt(0)}
        size={hp("10%")}
      />

      <Text style={styles.monsterName}>{monster.name}</Text>
      <View row style={styles.monsterDataContainer}>
        <View row>
          <Text style={styles.monsterMmr}>{monster.mmr}</Text>
          <Text>MMR</Text>
        </View>
        <View row>
          <Text style={styles.monsterMmr}>
            {addDotEveryThreeDigits(monster.weight)}
          </Text>
          <Text>KG</Text>
        </View>
      </View>
      <Spacer size={hp("2%")} />
      <View row style={styles.monsterDataContainer}>
        <View center>
          <Text style={styles.monsterHint}>Type</Text>
          <Text style={styles.monsterSecondData}>
            {convertApiTypeToType(monster.monster_type)}
          </Text>
        </View>
        <View center>
          <Text style={styles.monsterHint}>Catégorie</Text>
          <Text style={styles.monsterSecondData}>
            {monster.weight_category.replaceAll("_", " ")}
          </Text>
        </View>
      </View>
      <Spacer size={hp("3%")} />
      <View row style={styles.monsterDataContainer}>
        <Button
          label={"Modifier"}
          size={Button.sizes.large}
          backgroundColor={Colors.red30}
          onPress={() => null}
        />
        <Button
          label={"Supprimer"}
          size={Button.sizes.large}
          backgroundColor={Colors.red10}
          onPress={() => handleDeleteMonster(monster.id)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  monsterContainer: {
    borderRadius: hp("2%"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  monsterDataContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
  },
  monsterName: {
    fontFamily: Fonts.BOLD,
    fontSize: hp("2.5%"),
  },
  monsterMmr: {
    color: Colors.red30,
    fontFamily: Fonts.BOLD,
    marginRight: hp(".5%"),
  },
  monsterSecondData: {
    fontFamily: Fonts.BOLD,
    fontSize: hp("1.75%"),
    color: Colors.red30,
    textTransform: "uppercase",
  },
  monsterHint: {
    fontFamily: Fonts.LIGHT,
    fontSize: hp("1.5%"),
    color: Colors.grey20,
    textTransform: "uppercase",
  },
});
