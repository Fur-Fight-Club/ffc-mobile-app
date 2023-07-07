import { Monster } from "@store/monsters/monsters.model";
import {
  convertApiTypeToType,
  weightCategoryColors,
} from "@store/monsters/utils";
import { hp } from "@utils/responsive.utils";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Badge, Colors, View, Text, Button } from "react-native-ui-lib";
import { Spacer } from "../atoms/Spacer.component";
import { Fonts } from "@utils/fonts.utils";

interface MonsterStatsCardProps {
  monster: Monster;
  placeBet: () => void;
}

export const MonsterStatsCard: React.FunctionComponent<
  MonsterStatsCardProps
> = ({ monster, placeBet }) => {
  return (
    <View flex center>
      <Avatar
        label={"📸"}
        size={hp("10%")}
        source={{ uri: monster?.picture }}
      />
      <Spacer size={hp("1%")} />

      <Text style={styles.monsterName}>{monster?.name}</Text>
      <Spacer size={hp(".25%")} />
      <Text style={styles.monsterType}>
        {convertApiTypeToType(monster?.monster_type)}
      </Text>
      <Spacer size={hp("3%")} />
      <View row flex center>
        <Badge
          marginH-5
          label={`${monster?.weight} KG`}
          size={16}
          backgroundColor={weightCategoryColors(monster?.weight_category)}
        />
        <Spacer size={hp(".5%")} />
        <Badge
          marginH-5
          label={`${monster?.mmr} MMR`}
          size={16}
          backgroundColor={Colors.red20}
        />
      </View>
      <Spacer size={hp("3%")} />
      <Button
        label="Parier"
        backgroundColor={Colors.red30}
        onPress={placeBet}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  monsterName: {
    fontFamily: Fonts.BOLD,
    color: Colors.red30,
    fontSize: hp("2%"),
  },
  monsterType: {
    fontFamily: Fonts.LIGHT,
    color: Colors.grey10,
    fontSize: hp("1.5%"),
    textTransform: "uppercase",
  },
});
