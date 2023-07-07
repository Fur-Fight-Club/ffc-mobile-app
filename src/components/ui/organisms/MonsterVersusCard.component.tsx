import { hp, wp } from "@utils/responsive.utils";
import { Monster } from "ffc-prisma-package/dist/client";
import * as React from "react";
import { Alert, Modal, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Button, Card, Colors, Text, View } from "react-native-ui-lib";
import { Spacer } from "../atoms/Spacer.component";
import { MonsterStatsCard } from "./MonsterStatsCard.component";
import { Fonts } from "@utils/fonts.utils";
import { Match } from "@store/matches/matches.model";
import { usePlaceBetMutation } from "@store/matches/slice";
import { ModalBets } from "./ModalBets.component";
import { ModalChat } from "./ModalChat.component";

interface MonsterVersusCardProps {
  match: Match;
  refetch: () => void;
}

export const MonsterVersusCard: React.FunctionComponent<
  MonsterVersusCardProps
> = ({ match, refetch }) => {
  const [betsVisible, setBetsVisible] = React.useState(false);
  const [placeBet, { isSuccess }] = usePlaceBetMutation();
  React.useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  const handlePlaceBet = (monster: Monster) => {
    Alert.prompt(
      `Parier sur ${monster?.name}`,
      `Combien de jetons voulez-vous parier sur ${monster?.name} ?`,
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Parier",
          onPress: (amount) => {
            placeBet({
              matchId: match.id,
              monster: monster?.id,
              amount: parseInt(amount),
            });
          },
        },
      ],
      "plain-text"
    );
  };

  const [chatVisible, setChatVisible] = React.useState(false);

  return (
    <Card flex center style={styles.card} marginV-10 key={match.id}>
      <Spacer size={hp("3%")} />
      <View row center flex>
        <MonsterStatsCard
          monster={match.Monster1}
          placeBet={() => handlePlaceBet(match.Monster1)}
        />
        <Text style={styles.versus}>VS</Text>
        <MonsterStatsCard
          monster={match.Monster2}
          placeBet={() => handlePlaceBet(match.Monster2)}
        />
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
      <View
        row
        center
        flex
        style={{
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <Button
          label="Chat du match"
          backgroundColor={Colors.red30}
          onPress={() => {
            refetch();
            setChatVisible(true);
          }}
        />
        <Button
          label="Voir les paris"
          backgroundColor={Colors.red30}
          onPress={() => setBetsVisible(true)}
        />
      </View>
      <ModalBets
        visible={betsVisible}
        onClose={() => {
          setBetsVisible(false);
        }}
        bets={match.Transaction}
      />
      <ModalChat
        visible={chatVisible}
        onClose={() => setChatVisible(false)}
        refetch={refetch}
        matchId={match.id}
        messages={match.MatchMessage}
      />
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
