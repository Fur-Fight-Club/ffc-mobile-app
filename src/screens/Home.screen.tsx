import { Spacer } from "@components/ui/atoms/Spacer.component";
import { MonsterStatsCard } from "@components/ui/organisms/MonsterStatsCard.component";
import { useFocusEffect } from "@react-navigation/native";
import { useGetMatchesQuery } from "@store/matches/slice";
import {
  convertApiTypeToType,
  weightCategoryColors,
} from "@store/monsters/utils";
import { Fonts } from "@utils/fonts.utils";
import { hp, wp } from "@utils/responsive.utils";
import * as React from "react";
import {
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Avatar, Badge, Card, Colors, Text, View } from "react-native-ui-lib";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";

interface HomeScreenProps {}

export const HomeScreen: React.FunctionComponent<HomeScreenProps> = ({}) => {
  const {
    data: matches,
    isFetching: matchesFetching,
    refetch: refetchMatches,
  } = useGetMatchesQuery();

  const refetchResources = () => {
    refetchMatches();
  };

  useFocusEffect(
    React.useCallback(() => {
      refetchResources();

      return () => {};
    }, [])
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollviewContainer}
        refreshControl={
          <RefreshControl
            refreshing={matchesFetching}
            onRefresh={() => refetchResources()}
          />
        }
      >
        <View marginH-30 marginT-100>
          {matches?.map((match) => (
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
            </Card>
          ))}
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
