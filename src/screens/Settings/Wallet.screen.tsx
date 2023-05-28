import { BackArrow } from "@components/ui/atoms/BackArrow.component";
import { Spacer } from "@components/ui/atoms/Spacer.component";
import { useNavigation } from "@react-navigation/native";
import { applicationState } from "@store/application/selector";
import { useGetUserQuery } from "@store/application/slice";
import { bankAccountState } from "@store/bank-account/selector";
import {
  useCreateBankAccountMutation,
  useDeleteBankAccountMutation,
  useGetBankAccountQuery,
} from "@store/bank-account/slice";
import {
  useBuyCreditsMutation,
  useGetWalletBalanceQuery,
  useWithdrawWalletMutation,
} from "@store/wallet/slice";
import { BuyCreditsRequest } from "@store/wallet/wallet.model";
import { Fonts } from "@utils/fonts.utils";
import { iphoneX } from "@utils/responsive.utils";
import { hp, wp } from "@utils/responsive.utils";
import * as React from "react";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  Modal,
} from "react-native";
import { Button, Card, Colors, Text, View } from "react-native-ui-lib";
import { useSelector } from "react-redux";

interface WalletScreenProps {}

export const WalletScreen: React.FunctionComponent<
  WalletScreenProps
> = ({}) => {
  const nav = useNavigation();
  const { user } = useSelector(applicationState);
  const { country, last4, id: bankAccountId } = useSelector(bankAccountState);
  const ba = useSelector(bankAccountState);

  React.useEffect(() => {
    console.log("bankAccount", ba);
  }, [ba]);

  const {
    data: walletBalance,
    isFetching: walletFetching,
    refetch: refetchWallet,
  } = useGetWalletBalanceQuery();
  const { isFetching: bankAccountFetching, refetch: refetchBankAccount } =
    useGetBankAccountQuery();

  /**
   * DELETE BANK ACCOUNT
   */

  const [deleteBankAccount, { isSuccess: isSuccessDelete }] =
    useDeleteBankAccountMutation();

  const { refetch: refetchMe, isFetching: meFetching } = useGetUserQuery();
  const confirmDeleteAccount = () =>
    Alert.alert(
      "🗑️ Compte bancaire",
      "Voulez-vous vraiment supprimer votre compte bancaire ? Vous ne pourrez plus acheter ou retirer de crédits !",
      [
        {
          text: "Oui, je suis sûr !",
          onPress: () => deleteBankAccount(),
          style: "destructive",
        },
        {
          text: "En fait non !",
          onPress: () => null,
        },
      ]
    );

  /**
   * ADD BANK ACCOUNT
   */
  const [createBankAccount, { isSuccess: isSuccessCreate }] =
    useCreateBankAccountMutation();
  const addAcount = () => {
    Alert.prompt(
      "🏦 Ajouter un compte bancaire",
      "Veuillez entrer votre IBAN afin que nous puissions vous versez vos gains",
      [
        {
          text: "Annuler",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Ajouter",
          onPress: (iban) => {
            createBankAccount({ iban });
          },
        },
      ],
      "plain-text"
    );
  };

  /**
   * WITHDRAW CREDITS
   */
  const [withdrawWallet, { isSuccess: isSuccessWithdraw }] =
    useWithdrawWalletMutation();
  const withdrawCredits = () => {
    Alert.prompt(
      "🏦 Retirer mes gains",
      "Veuillez entrer le nombre de crédits que vous souhaitez retirer (min. 10.000 crédits)",
      [
        {
          text: "Annuler",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Retirer",
          onPress: (amount) => {
            withdrawWallet({ amount: +amount });
          },
        },
      ],
      "plain-text"
    );
  };

  const refetchResources = () => {
    refetchWallet();
    refetchMe();
    refetchBankAccount();
  };

  React.useEffect(() => {
    if (isSuccessCreate || isSuccessDelete || isSuccessWithdraw) {
      refetchResources();
    }
  }, [isSuccessCreate, isSuccessDelete, isSuccessWithdraw]);

  /**
   * BUY COINS
   */
  const coins = [
    { image: require("@assets/images/coins/1.png"), amount: "475", price: 5 },
    { image: require("@assets/images/coins/2.png"), amount: "1000", price: 10 },
    { image: require("@assets/images/coins/3.png"), amount: "2050", price: 20 },
    { image: require("@assets/images/coins/4.png"), amount: "3650", price: 35 },
    { image: require("@assets/images/coins/5.png"), amount: "5350", price: 50 },
    {
      image: require("@assets/images/coins/6.png"),
      amount: "11000",
      price: 100,
    },
  ];

  const [buyCredit] = useBuyCreditsMutation();

  const handleBuyCredit = (
    amount: BuyCreditsRequest["credits"],
    price: number
  ) => {
    Alert.alert(
      "🛒 Acheter des crédits",
      `Voulez-vous vraiment acheter ${amount} crédits pour ${price}€ ?`,
      [
        {
          text: "Oui, je suis sûr !",
          onPress: () => buyCredit({ credits: amount }),
          style: "default",
        },
        {
          text: "En fait non !",
          onPress: () => null,
          style: "cancel",
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <BackArrow onPress={() => nav.goBack()} />
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollviewContainer}
        refreshControl={
          <RefreshControl
            refreshing={walletFetching || bankAccountFetching || meFetching}
            onRefresh={refetchResources}
          />
        }
      >
        <View row marginH-30 marginT-100>
          <Card flex center>
            <Spacer size={hp("3%")} />
            <Text style={styles.textTitle}>Mon portefeuille</Text>
            <Spacer size={hp("3%")} />

            <View row>
              <View flex center>
                <Text style={styles.textNumber}>{walletBalance?.credits}</Text>
                <Text style={styles.textHint}>crédits</Text>
              </View>
              <View flex center>
                <Text style={styles.textNumber}>{walletBalance?.euro}</Text>
                <Text style={styles.textHint}>euros</Text>
              </View>
            </View>

            <View>
              <Spacer size={hp("3%")} />
              <Button
                label={"Retirer mes gains"}
                size={Button.sizes.large}
                backgroundColor={Colors.red30}
                onPress={withdrawCredits}
              />
            </View>

            <Spacer size={hp("3%")} />
          </Card>
        </View>
        <Spacer size={hp("3%")} />
        <View row marginH-30>
          <Card flex center>
            <Spacer size={hp("3%")} />
            <Text style={styles.textTitle}>Compte bancaire</Text>
            <Spacer size={hp("3%")} />
            {bankAccountId !== -1 ? (
              <View center>
                <View row>
                  <Image
                    source={{
                      uri: `https://flagcdn.com/80x60/${country.toLocaleLowerCase()}.png`,
                    }}
                    style={styles.flagImage}
                  />

                  <Text style={styles.textLast4}>●●●● {last4}</Text>
                </View>
                <Spacer size={hp("3%")} />
                <Button
                  label={"Supprimer mon compte bancaire"}
                  size={Button.sizes.large}
                  backgroundColor={Colors.red30}
                  onPress={confirmDeleteAccount}
                />
              </View>
            ) : (
              <Button
                label={"Ajouter mon compte bancaire"}
                size={Button.sizes.large}
                backgroundColor={Colors.red30}
                onPress={addAcount}
              />
            )}
            <Spacer size={hp("3%")} />
          </Card>
        </View>
        <Spacer size={hp("3%")} />
        <View row marginH-30>
          <Card flex center>
            <Spacer size={hp("3%")} />
            <Text style={styles.textTitle}>Acheter des crédits</Text>
            <Spacer size={hp("3%")} />
            {coins.map((coin, index) => (
              <View key={index} row center marginH-5>
                <Image source={coin.image} style={styles.coinImage} />
                <Button
                  label={`${coin.amount} 🪙 — ${coin.price}€`}
                  size={Button.sizes.large}
                  backgroundColor={Colors.yellow20}
                  onPress={() =>
                    handleBuyCredit(
                      coin.amount as BuyCreditsRequest["credits"],
                      coin.price
                    )
                  }
                  style={{
                    width: "50%",
                    marginLeft: hp("5%"),
                  }}
                />
              </View>
            ))}
            <Spacer size={hp("3%")} />
          </Card>
        </View>
        <Spacer size={hp("20%")} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp("100%"),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollview: {},
  scrollviewContainer: {
    top: hp("5%"),
    alignItems: "center",
    width: wp("100%"),
  },
  card: {
    alignItems: "center",
    top: hp("5%"),
    height: Platform.OS === "ios" ? hp("70%") : hp("80%"),
    width: wp("100%"),
  },
  textTitle: {
    fontFamily: Fonts.BLACK,
    fontSize: hp("3%"),
    textTransform: "uppercase",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  textNumber: {
    fontFamily: Fonts.BLACK,
    fontSize: hp("4.5%"),
    color: Colors.red30,
  },
  textHint: {
    fontFamily: Fonts.LIGHT,
    fontSize: hp("1.5%"),
    color: Colors.grey20,
    textTransform: "uppercase",
  },
  textLast4: {
    fontFamily: Fonts.MEDIUM,
    fontSize: hp("2%"),
    color: Colors.grey20,
    marginLeft: wp("3%"),
  },
  flagImage: {
    width: wp("10%"),
    resizeMode: "contain",
  },
  modal: {
    height: hp("50%"),
    marginVertical: hp("25%"),
    marginHorizontal: hp("2.5%"),
    paddingHorizontal: hp("2.5%"),
  },
  coinImage: {
    height: wp("15%"),
    width: wp("15%"),
    resizeMode: "contain",
  },
});
