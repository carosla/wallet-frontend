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
import { ArrowsClockwise } from "phosphor-react-native"; // Alterado para o ícone Refresh

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
  ReloadButton, // Estilo do botão de reload
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
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  
  // Função para buscar as transações da API
  const fetchTransactions = async () => {
    setLoading(true); // Ativar o carregamento antes de buscar os dados
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/transacao`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const transacoes = Array.isArray(response.data) ? response.data : [];

      // Ordenar do mais recente para o mais antigo
    transacoes.sort((a: Transaction, b: Transaction) => {
      return new Date(b.data).getTime() - new Date(a.data).getTime();
    });

      // Calculando o saldo total (somando as entradas e subtraindo as saídas)
      const saldo = transacoes.reduce((acc: number, transacao: Transaction) => {
        if (transacao.tipo_transacao.transacao === "entrada") {
          return acc + transacao.valor;
        } else {
          return acc - transacao.valor;
        }
      }, 0);

      setTransactions(transacoes.length > 0 ? transacoes.slice(0, 5) : []);
      setTotalBalance(saldo);
    } catch (error: unknown) {
      // Verifica se o erro é do tipo AxiosError
      if (axios.isAxiosError(error)) {
        console.error("Erro ao buscar transações:", error.response?.data || error);
  
        Alert.alert(
          "Erro ao carregar transações",
          error.response?.data?.mensagem || "Erro desconhecido."
        );
      } else {
        console.error("Erro inesperado:", error);
        Alert.alert("Erro", "Ocorreu um erro inesperado.");
      }
    } finally {
      setLoading(false); // Desativar o carregamento após os dados serem carregados
    }
  };

  useEffect(() => {
    fetchTransactions(); // Chama ao carregar a tela pela primeira vez
  }, []);
  
  

  // Função para navegar para a tela de transações completas
  const handleGoTransaction = () => {
    navigation.navigate("Transaction");
  };

  // Função de reload para atualizar as transações
  const handleReload = () => {
    fetchTransactions(); // Recarrega os dados
  };

   if (loading) {
      return <ActivityIndicator size="large" color="#000" />;
    }

  return (
    <Container>
      <Header textLeft avatarRight appName="Wallet" />

      <ViewContainer>
        <Content>
          <EllipseOne source={EllipseOnePng} />
          <ViewBalanceLeft>
            <TitleValor>Valor Total</TitleValor>
            <TitleValorConta>
              R$ {totalBalance.toFixed(2).replace(".", ",")}
            </TitleValorConta>
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
                    color:
                      item.tipo_transacao.transacao === "entrada"
                        ? "blue"
                        : "red",
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
                  <ArrowsClockwise size={20} color="black" />
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
        )}
      </Footer>
    </Container>
  );
};
