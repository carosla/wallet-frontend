import React, { useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Modal,
  View,
  Text,
} from "react-native";
import {
  CaretDoubleLeft,
  TrashSimple,
  CaretDown,
  FileArrowDown,
} from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

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

export const Transaction = () => {
  const navigation = useNavigation();
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisivel, setModalVisivel] = useState(false);

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  const [mesSelecionado, setMesSelecionado] = useState(() => {
    const mesAtual = dayjs().month(); // 0 a 11
    return meses[mesAtual];
  });

  const obterNumeroDoMes = (mes: string): string => {
    const index = meses.findIndex(
      (nome) => nome.toLowerCase() === mes.toLowerCase()
    );
    return String(index + 1).padStart(2, "0");
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/transacao`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: Transaction[] = Array.isArray(response.data) ? response.data : [];
      setAllTransactions(data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtrarPorMes = () => {
    const mesNumero = obterNumeroDoMes(mesSelecionado);
    const filtradas = allTransactions.filter((t) =>
      dayjs(t.data).format("MM") === mesNumero
    );
    setFilteredTransactions(filtradas);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    filtrarPorMes();
  }, [allTransactions, mesSelecionado]);

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
        setAllTransactions((prev) =>
          prev.filter((t) => t.transacao_id !== transacao_id)
        );
        Alert.alert("Transação excluída com sucesso");
      }
    } catch (error) {
      console.error("Erro ao excluir transação:", error);
      Alert.alert("Erro", "Não foi possível excluir a transação.");
    }
  };

  const exportarRelatorioPDF = async () => {
  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #700298ff; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background-color: #f3f4f6; }
        </style>
      </head>
      <body>
        <h1>Relatório de Transações - ${mesSelecionado}</h1>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Valor (R$)</th>
            <th>Data</th>
          </tr>
          ${filteredTransactions.map(t => `
            <tr>
              <td>${t.descricao}</td>
              <td>${t.tipo_transacao.transacao}</td>
              <td>${t.categorium?.categoria || "Sem categoria"}</td>
              <td>${typeof t.valor === 'number' ? t.valor.toFixed(2).replace('.', ',') : '0.00'}</td>
              <td>${dayjs.utc(t.data).tz("America/Sao_Paulo").format("DD/MM/YYYY")}</td>
            </tr>
          `).join("")}
        </table>
      </body>
    </html>
  `;
  try {
    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri);
  } catch (error) {
    Alert.alert("Erro", "Não foi possível exportar o PDF.");
    console.error(error);
  }
};


  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <>
      <Header iconLeft typeTransaction appName="Minhas Transações" />
      <Container>

        {/* Filtros e botão de exportação */}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 16,
          marginTop: 10,
          marginBottom: 20
        }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#f3f4f6",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
            }}
            onPress={() => setModalVisivel(true)}
          >
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              {mesSelecionado}
            </Text>
            <CaretDown color="#000" size={16} style={{ marginLeft: 6 }} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={exportarRelatorioPDF}
            style={{
              flexDirection: "row",
              backgroundColor: theme.COLORS.PURPLEDARK1,
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <FileArrowDown color="#fff" size={20} />
            <Text style={{ color: "#fff", marginLeft: 8 }}>Exportar</Text>
          </TouchableOpacity>
        </View>

        {/* Modal de seleção de mês */}
        <Modal visible={modalVisivel} animationType="slide" transparent>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.4)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                width: "80%",
                borderRadius: 10,
                padding: 20,
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
              >
                Selecione o mês
              </Text>
              <FlatList
                data={meses}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{ paddingVertical: 10 }}
                    onPress={() => {
                      setMesSelecionado(item);
                      setModalVisivel(false);
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Lista de transações filtradas */}
        {filteredTransactions.length === 0 ? (
          <Text
            style={{
              textAlign: "center",
              fontStyle: "italic",
              color: "#6b7280",
              marginTop: 30,
            }}
          >
            Não há transações neste período.
          </Text>
        ) : (
          <FlatList
            data={filteredTransactions}
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
                    {item.tipo_transacao.transacao} -{" "}
                    {item.categorium?.categoria || "Sem categoria"}
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
                  R$ {typeof item.valor === 'number' ? item.valor.toFixed(2) : '0.00'}
                </AmountTransaction>

                <TouchableOpacity
                  onPress={() => handleDeleteTransaction(item.transacao_id)}
                  style={{ marginLeft: 10 }}
                >
                  <TrashSimple size={24} color={theme.COLORS.RED} />
                </TouchableOpacity>
              </ContentFlat>
            )}
            showsVerticalScrollIndicator={false}
          />
        )}

        <ButtonGoBack onPress={handleGoBackHome}>
          <CaretDoubleLeft size={32} weight="light" />
        </ButtonGoBack>
      </Container>
    </>
  );
};
