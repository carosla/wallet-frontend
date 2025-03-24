import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import Payments from "../../../assets/export.png";
import TopUp from "../../../assets/add-circle.png";
import PayOut from "../../../assets/money-send.png";
import EllipseOnePng from "../../../assets/ellipse1.png";
import EllipseTwoPng from "../../../assets/ellipse2.png";
import { Header } from "../../../components/Header/Header";
import { limited_transaction } from "../../../utils/limited_transactions";
import {
  Container,
  Content,
  ViewContainer,
  ViewBalanceLeft,
  ViewBalanceRight,
  TitleValor,
  TitleValorConta,
  TitleCartao,
  TitleNomeCartao,
  Body,
  IconPayment,
  IconTransfer,
  IconPayOut,
  IconTopUp,
  TitleTransfer,
  TitlePayments,
  TitlePayOut,
  TitleTopUp,
  Footer,
  ContentFlat,
  ContentFlatHeader,
  Title,
  ButtonVerTotos,
  ButtonTitleVertotos,
  IconTransaction,
  DetailsTransaction,
  NameTransaction,
  SubtTitleTransaction,
  AmountTransaction,
  EllipseOne,
  EllipseTwo,
} from "./styles";

export const Carteira = () => {
  const navigation = useNavigation();

  const hadleGoTransaction = () => {
    navigation.navigate("Transaction");
  };

  return (
    <Container>
      <Header textLeft avatarRight appName="Wallet" />

      <ViewContainer>
        <Content>
          <EllipseOne source={EllipseOnePng} />
          <ViewBalanceLeft>
            <TitleValor>Valor Total</TitleValor>
            <TitleValorConta>R$ 1.000,00</TitleValorConta>
          </ViewBalanceLeft>

          <ViewBalanceRight>
            <TitleCartao>Cartão</TitleCartao>
            <TitleNomeCartao>Wallet</TitleNomeCartao>
          </ViewBalanceRight>
          <EllipseTwo source={EllipseTwoPng} />
        </Content>

        <Body>
          <TouchableOpacity
            onPress={() => navigation.navigate("Recebimentos")}
            style={{ alignItems: "center" }}
          >
            <IconPayment source={Payments} />
            <TitlePayments>Recebtos</TitlePayments>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Transacao")}
            style={{ alignItems: "center" }}
          >
            <IconPayOut source={PayOut} />
            <TitlePayOut>Pagtos</TitlePayOut>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Categorias")}
            style={{ alignItems: "center" }}
          >
            <IconTopUp source={TopUp} />
            <TitleTopUp>Categorias</TitleTopUp>
          </TouchableOpacity>
        </Body>
      </ViewContainer>

      <Footer>
        <FlatList
          data={limited_transaction}
          renderItem={({ item }) => (
            <ContentFlat>
              <IconTransaction source={item.icon} />

              <DetailsTransaction>
                <NameTransaction>{item.title}</NameTransaction>
                <SubtTitleTransaction>{item.subtitle}</SubtTitleTransaction>
              </DetailsTransaction>

              <AmountTransaction>R$ {item.price}</AmountTransaction>
            </ContentFlat>
          )}
          ListHeaderComponent={
            <ContentFlatHeader>
              <Title>Minhas Transações</Title>
              <ButtonVerTotos onPress={hadleGoTransaction}>
                <ButtonTitleVertotos>Ver Todos</ButtonTitleVertotos>
              </ButtonVerTotos>
            </ContentFlatHeader>
          }
          showsVerticalScrollIndicator={false}
        />
      </Footer>
    </Container>
  );
};
