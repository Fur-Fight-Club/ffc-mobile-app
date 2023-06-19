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
import {
  Avatar,
  Badge,
  Button,
  Card,
  Colors,
  Text,
  View,
} from "react-native-ui-lib";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import { MonsterVersusCard } from "@components/ui/organisms/MonsterVersusCard.component";

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
            <MonsterVersusCard
              key={match.id}
              match={match}
              refetch={refetchResources}
            />
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
    paddingBottom: hp("10%"),
  },
  textTitle: {
    fontFamily: Fonts.BLACK,
    fontSize: hp("3%"),
    textTransform: "uppercase",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
