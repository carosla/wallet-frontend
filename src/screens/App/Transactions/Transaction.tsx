import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { CaretDoubleLeft } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Header } from "../../../components/Header/Header";
import {
  Container,
  ContentFlat,
  IconTransaction,
  DetailsTransaction,
  NameTransaction,
  SubtTitleTransaction,
  AmountTransaction,
  ButtonGoBack,
} from "./styles";
import { API_URL } from "@env";

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

export const Transaction = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(
          `${API_URL}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleGoBackHome = () => {
    navigation.goBack();
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <>
      <Header iconLeft typeTransaction appName="Minhas Transações" />
      <Container>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.transacao_id}
          renderItem={({ item }) => (
            <ContentFlat>
              <IconTransaction
                source={
                  item.tipo_transacao.transacao === "entrada"
                    ? require("../../../assets/income.png") // Ícone para entrada
                    : require("../../../assets/expense.png") // Ícone para saída
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
          showsVerticalScrollIndicator={false}
        />
        <ButtonGoBack onPress={handleGoBackHome}>
          <CaretDoubleLeft size={32} weight="light" />
        </ButtonGoBack>
      </Container>
    </>
  );
};
