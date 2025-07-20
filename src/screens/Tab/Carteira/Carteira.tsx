import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Payments from "../../../assets/export.png";
import TopUp from "../../../assets/add-circle.png";
import PayOut from "../../../assets/money-send.png";
import EllipseOnePng from "../../../assets/ellipse1.png";
import EllipseTwoPng from "../../../assets/ellipse2.png";
import { Header } from "../../../components/Header/Header";
import { API_URL } from "@env";
import { ArrowsClockwise } from "phosphor-react-native";

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
  ReloadButton,
} from "./styles";
import theme from "@src/styles/theme";

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

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const Carteira = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [nomePerfil, setNomePerfil] = useState<string | null>(null);
  const [gastoHoje, setGastoHoje] = useState(0);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");

      const [transacoesRes, perfilRes] = await Promise.all([
        axios.get(`${API_URL}/api/transacao`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_URL}/api/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const transacoes = Array.isArray(transacoesRes.data) ? transacoesRes.data : [];
      transacoes.sort((a: Transaction, b: Transaction) => new Date(b.data).getTime() - new Date(a.data).getTime());

      const saldo = transacoes.reduce((acc: number, transacao: Transaction) => {
        return transacao.tipo_transacao.transacao === "entrada"
          ? acc + transacao.valor
          : acc - transacao.valor;
      }, 0);

      const hoje = new Date().toISOString().slice(0, 10);
      const totalGastoHoje = transacoes.reduce((acc: number, transacao: Transaction) => {
        const dataTransacao = new Date(transacao.data).toISOString().slice(0, 10);
        return transacao.tipo_transacao.transacao != 'entrada' && dataTransacao === hoje
          ? acc + transacao.valor
          : acc;
      }, 0);

      setTransactions(transacoes.length > 0 ? transacoes.slice(0, 5) : []);
      setTotalBalance(saldo);
      setNomePerfil(perfilRes.data.nome || perfilRes.data.login);
      setGastoHoje(totalGastoHoje);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Erro ao buscar dados:", error.response?.data || error);
        Alert.alert("Erro ao carregar dados", error.response?.data?.mensagem || "Erro desconhecido.");
      } else {
        console.error("Erro inesperado:", error);
        Alert.alert("Erro", "Ocorreu um erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleGoTransaction = () => {
    navigation.navigate("Transaction");
  };

  const handleReload = () => {
    fetchTransactions();
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <Container>
      <Header textLeft avatarRight appName={"Olá, " + (nomePerfil || "Wallet")} />

      <ViewContainer>
        <Content>
          <EllipseOne source={EllipseOnePng} />
          <ViewBalanceLeft>
            <TitleValor>Valor Total</TitleValor>
            <TitleValorConta>R$ {totalBalance.toFixed(2).replace(".", ",")}</TitleValorConta>
          </ViewBalanceLeft>

          <ViewBalanceRight>
            <TitleCartao>Gasto Hoje</TitleCartao>
            <TitleNomeCartao>R$ {gastoHoje.toFixed(2)}</TitleNomeCartao>
           
          </ViewBalanceRight>
          <EllipseTwo source={EllipseTwoPng} />
        </Content>

        <Body>
          <TouchableOpacity onPress={() => navigation.navigate("Recebimentos")} style={{ alignItems: "center" }}>
            <IconPayment source={Payments} />
            <TitlePayments>Recebimentos</TitlePayments>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Transacao")} style={{ alignItems: "center" }}>
            <IconPayOut source={PayOut} />
            <TitlePayOut>Pagamentos</TitlePayOut>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Categorias")} style={{ alignItems: "center" }}>
            <IconTopUp source={TopUp} />
            <TitleTopUp>Categorias</TitleTopUp>
          </TouchableOpacity>
        </Body>
      </ViewContainer>

      <Footer>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.transacao_id}
          renderItem={({ item }) => (
            <ContentFlat>
              <IconTransaction
                source={
                  item.tipo_transacao.transacao === "entrada"
                    ? require("../../../assets/recebimento.png")
                    : require("../../../assets/pagamento.png")
                }
              />
              <DetailsTransaction>
                <NameTransaction>{item.descricao}</NameTransaction>
                <SubtTitleTransaction>
                  {formatDate(item.data)} - {item.categorium?.categoria || "Sem categoria"}
                </SubtTitleTransaction>
              </DetailsTransaction>
              <AmountTransaction
                style={{
                  color:
                    item.tipo_transacao.transacao === "entrada"
                      ? theme.COLORS.BLUE
                      : theme.COLORS.RED,
                }}
              >
                R$ {item.valor.toFixed(2)}
              </AmountTransaction>
            </ContentFlat>
          )}
          ListHeaderComponent={
            <ContentFlatHeader>
              <Title>Minhas Transações</Title>
              <ReloadButton onPress={handleReload}>
                <ArrowsClockwise size={17} color="black" />
              </ReloadButton>
              <ButtonVerTotos onPress={handleGoTransaction}>
                <ButtonTitleVertotos>Ver Todos</ButtonTitleVertotos>
              </ButtonVerTotos>
            </ContentFlatHeader>
          }
          ListEmptyComponent={
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text style={{ fontSize: 16, color: "#555" }}>
                Nenhuma transação encontrada.
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </Footer>
    </Container>
  );
};