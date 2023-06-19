import { Match } from "@store/matches/matches.model";
import { Fonts } from "@utils/fonts.utils";
import { hp, wp } from "@utils/responsive.utils";
import * as React from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Card, Colors, Text, View } from "react-native-ui-lib";

interface ModalBetsProps {
  visible: boolean;
  onClose: () => void;
  bets: Match["Transaction"];
}

export const ModalBets: React.FunctionComponent<ModalBetsProps> = ({
  visible,
  onClose,
  bets,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      style={{
        width: wp("100%"),
        height: hp("100%"),
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <View
        flex
        center
        style={{
          width: wp("100%"),
          height: hp("100%"),
        }}
      >
        <Card
          style={{
            width: wp("90%"),
            height: hp("50%"),
            backgroundColor: Colors.white,
          }}
          padding-20
        >
          <TouchableOpacity onPress={onClose} style={styles.closeImage}>
            <Image
              source={require("@assets/images/close.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: hp("3%"),
              fontFamily: Fonts.MEDIUM,
            }}
          >
            Paris
          </Text>
          <ScrollView
            style={{
              height: "100%",
              width: "100%",
            }}
            contentContainerStyle={{
              width: "100%",
              height: "100%",
              display: "flex",
            }}
          >
            <View
              style={{
                width: "100%",
                display: "flex",
              }}
            >
              <View
                style={{
                  width: "100%",
                  display: "flex",
                }}
              >
                {bets?.length === 0 && (
                  <Text style={{ fontSize: hp("2%") }}>
                    Aucun paris pour ce match, soyez le premier !
                  </Text>
                )}
                {bets?.map((bet) => (
                  <View
                    padding-20
                    marginV-10
                    style={{
                      width: "100%",
                      justifyContent: "space-between",
                      display: "flex",
                      flexDirection: "row",
                      backgroundColor: Colors.grey80,
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ fontSize: hp("1.75%") }}>
                      {bet?.Wallet.User?.firstname} à parié sur{" "}
                      {bet?.Monster?.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: hp("2%"),
                        color: Colors.red20,
                        fontWeight: 700,
                      }}
                    >
                      {formatNumber(bet?.amount)} jetons
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </Card>
      </View>
    </Modal>
  );
};

function formatNumber(num: number) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

const styles = StyleSheet.create({
  closeImage: {
    width: hp("3.5%"),
    height: hp("3.5%"),
    position: "absolute",
    right: hp("1.5%"),
    top: hp("1.5%"),
    zIndex: 99,
  },
});
