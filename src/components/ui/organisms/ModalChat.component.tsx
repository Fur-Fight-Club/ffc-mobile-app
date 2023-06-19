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
  KeyboardAvoidingView,
} from "react-native";
import { Card, Colors, Text, View } from "react-native-ui-lib";
import { Input } from "../atoms/Input.component";
import { useSendMessageMutation } from "@store/matches/slice";
import { useSelector } from "react-redux";
import { applicationState } from "@store/application/selector";

interface ModalChatProps {
  visible: boolean;
  onClose: () => void;
  refetch: () => void;
  matchId: number;
  messages: Match["MatchMessage"];
}

export const ModalChat: React.FunctionComponent<ModalChatProps> = ({
  visible,
  onClose,
  refetch,
  matchId,
  messages,
}) => {
  const [message, setMessage] = React.useState("");
  const [sendMessage, { isSuccess }] = useSendMessageMutation();
  const { user } = useSelector(applicationState);

  React.useEffect(() => {
    if (isSuccess) {
      refetch();
      setMessage("");
    }
  }, [isSuccess]);

  return (
    <KeyboardAvoidingView behavior="padding">
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
              height: hp("70%"),
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
              {messages.map((message) => (
                <View
                  key={message.id}
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent:
                      message?.User?.id === user.id ? "flex-end" : "flex-start",
                  }}
                >
                  <Card
                    style={{
                      width: "80%",
                      backgroundColor:
                        message?.User?.id === user.id
                          ? Colors.red20
                          : Colors.grey60,
                      padding: 10,
                      borderRadius: 10,
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                    enableShadow={false}
                  >
                    <Text
                      style={{
                        color: Colors.grey40,
                        fontFamily: Fonts.LIGHT,
                        position: "absolute",
                        top: -hp("1.25%"),
                        left: 5,
                        fontSize: hp("1.25%"),
                      }}
                    >
                      {message.User?.firstname} {message.User?.lastname} le{" "}
                      {new Date(message.createdAt).toLocaleString()}
                    </Text>
                    <Text
                      style={{
                        color:
                          message?.User?.id === user.id
                            ? Colors.white
                            : Colors.black,
                        fontFamily: Fonts.BODY,
                      }}
                    >
                      {message.message}
                    </Text>
                  </Card>
                </View>
              ))}
            </ScrollView>
            <Input
              onChangeText={setMessage}
              value={message}
              type="none"
              placeholder="Mon message..."
              width="100%"
              pressEnter={() => {
                sendMessage({ id: matchId, message });
              }}
            />
          </Card>
        </View>
      </Modal>
    </KeyboardAvoidingView>
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
