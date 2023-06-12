import { hp, wp } from "@utils/responsive.utils";
import { Monster } from "ffc-prisma-package/dist/client";
import * as React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Button, Card, Colors, Text, View } from "react-native-ui-lib";
import { Spacer } from "../atoms/Spacer.component";
import { MonsterStatsCard } from "./MonsterStatsCard.component";
import { Fonts } from "@utils/fonts.utils";
import { Match } from "@store/matches/matches.model";

interface MonsterVersusCardProps {
  match: Match;
}

export const MonsterVersusCard: React.FunctionComponent<
  MonsterVersusCardProps
> = ({ match }) => {
  return (
    <Card flex center style={styles.card} marginV-10 key={match.id}>
      <Spacer size={hp("3%")} />
      <View row center flex>
        <MonsterStatsCard monster={match.Monster1} />
        <Text style={styles.versus}>VS</Text>
        <MonsterStatsCard monster={match.Monster2} />
      </View>
      <Spacer size={hp("3%")} />
      <Card flex center style={styles.innerCard}>
        <MapView
          scrollEnabled={false}
          moveOnMarkerPress={false}
          region={{
            latitude: match.Arena.latitude,
            longitude: match.Arena.longitude,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0221,
          }}
          style={{
            width: wp("80%"),
            height: hp("15%"),
            borderRadius: 10,
          }}
        >
          <Marker
            coordinate={{
              latitude: match.Arena.latitude,
              longitude: match.Arena.longitude,
            }}
            title={match.Arena.name}
            description={`${match.Arena.address}, ${match.Arena.city} ${match.Arena.zipcode}, ${match.Arena.country}`}
          />
        </MapView>
      </Card>
      <Spacer size={hp("3%")} />
      <View row center flex>
        <Button label="Détails du match" backgroundColor={Colors.red30} />
      </View>
      <Spacer size={hp("3%")} />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp("90%"),
  },
  innerCard: {
    width: wp("80%"),
  },
  versus: {
    fontFamily: Fonts.TITLE,
    fontSize: hp("5%"),
    color: Colors.grey10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
