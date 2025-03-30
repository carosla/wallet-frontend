import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { CaretDoubleLeft, Trash } from "phosphor-react-native"; // Adicionar ícone Trash
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
          `${API_URL}/api/transacao`,
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

  const handleDeleteTransaction = async (transacao_id: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.delete(
        `${API_URL}/api/transacao/${transacao_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        // Remover a transação excluída da lista
        setTransactions((prevTransactions) =>
          prevTransactions.filter(
            (transaction) => transaction.transacao_id !== transacao_id
          )
        );
        Alert.alert("Transação excluída com sucesso");
      }
    } catch (error) {
      console.error("Erro ao excluir transação:", error);
      Alert.alert("Erro", "Não foi possível excluir a transação.");
    }
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

              {/* Ícone de excluir transação */}
              <TouchableOpacity 
                onPress={() => handleDeleteTransaction(item.transacao_id)}
                style={{marginLeft: 10}}>
                <Trash size={24} color="red" />
              </TouchableOpacity>
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
