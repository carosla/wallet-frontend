import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Payments from "../../../assets/export.png";
import TopUp from "../../../assets/add-circle.png";
import PayOut from "../../../assets/money-send.png";
import EllipseOnePng from "../../../assets/ellipse1.png";
import EllipseTwoPng from "../../../assets/ellipse2.png";
import { Header } from "../../../components/Header/Header";
import { API_URL } from "@env";

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
  IconPayOut,
  IconTopUp,
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

interface Transaction {
  transacao_id: string;
  descricao: string;
  valor: number;
  data: string;
  tipo_transacao: {
    transacao: string;
  };
  categorium?: {
    categoria: string;
  };
}

export const Carteira = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/transacao`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data.slice(0, 5)); // Pega apenas as 5 primeiras transações
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleGoTransaction = () => {
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
            <TitlePayments>Recebimentos</TitlePayments>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Transacao")}
            style={{ alignItems: "center" }}
          >
            <IconPayOut source={PayOut} />
            <TitlePayOut>Pagamentos</TitlePayOut>
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
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.transacao_id}
            renderItem={({ item }) => (
              <ContentFlat>
                <IconTransaction
                  source={
                    item.tipo_transacao.transacao === "entrada"
                      ? require("../../../assets/income.png")
                      : require("../../../assets/expense.png")
                  }
                />

                <DetailsTransaction>
                  <NameTransaction>{item.descricao}</NameTransaction>
                  <SubtTitleTransaction>
                    {item.tipo_transacao.transacao} -{" "}
                    {item.categorium?.categoria || "Sem categoria"}
                  </SubtTitleTransaction>
                </DetailsTransaction>

                <AmountTransaction
                  style={{
                    color: item.tipo_transacao.transacao === "entrada" ? "blue" : "red",
                  }}
                >
                  R$ {item.valor.toFixed(2)}
                </AmountTransaction>
              </ContentFlat>
            )}
            ListHeaderComponent={
              <ContentFlatHeader>
                <Title>Minhas Transações</Title>
                <ButtonVerTotos onPress={handleGoTransaction}>
                  <ButtonTitleVertotos>Ver Todos</ButtonTitleVertotos>
                </ButtonVerTotos>
              </ContentFlatHeader>
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </Footer>
    </Container>
  );
};
