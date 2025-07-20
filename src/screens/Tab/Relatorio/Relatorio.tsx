import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Alert,
  Modal,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { Pie, PolarChart } from "victory-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { ArrowsClockwise, CaretDown } from "phosphor-react-native";
import dayjs from "dayjs";

import {
  Container,
  Header,
  SubHeader,
  ChartWrapper,
  ResumoContainer,
  ResumoTitleRow,
  ResumoLabel,
  ResumoRow,
  Receita,
  Despesa,
  SaldoTotal,
  ResumoItem,
  ResumoIconCircle,
  ResumoIconText,
  ChartSection,
  LegendWrapper,
  LegendItem,
  LegendColor,
  LegendText,
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

export const Relatorio = () => {
  const [loading, setLoading] = useState(true);
  const [saldo, setSaldo] = useState(0);
  const [receita, setReceita] = useState(0);
  const [despesa, setDespesa] = useState(0);
  const [topGastos, setTopGastos] = useState<
    { label: string; value: number; color: string }[]
  >([]);
  const [topGanhos, setTopGanhos] = useState<
    { label: string; value: number; color: string }[]
  >([]);

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const [mesSelecionado, setMesSelecionado] = useState(() => {
    const mesAtual = dayjs().month();
    return meses[mesAtual];
  });
  const [modalVisivel, setModalVisivel] = useState(false);

  const coresGastos = ["#ef4444", "#f97316", "#eab308", "#84cc16", "#10b981"];
  const coresGanhos = ["#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef"];

  const obterNumeroDoMes = (mes: string): string => {
    const indice = meses.findIndex(
      (m) => m.toLowerCase() === mes.toLowerCase()
    );
    return String(indice + 1).padStart(2, "0");
  };

  const fetchTransacoes = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/transacao`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const transacoes: Transaction[] = Array.isArray(response.data)
        ? response.data
        : [];
      const mesSelecionadoNumero = obterNumeroDoMes(mesSelecionado);

      const transacoesFiltradas = transacoes.filter((t) => {
        return dayjs(t.data).format("MM") === mesSelecionadoNumero;
      });

      let entradas = 0;
      let saidas = 0;
      const categoriasGastos: Record<string, number> = {};
      const categoriasGanhos: Record<string, number> = {};

      transacoesFiltradas.forEach(({ valor, tipo_transacao, categorium }) => {
        const tipo = tipo_transacao.transacao;
        const categoria = categorium?.categoria || "Sem categoria";

        if (tipo === "entrada") {
          entradas += valor;
          categoriasGanhos[categoria] =
            (categoriasGanhos[categoria] || 0) + valor;
        } else {
          saidas += valor;
          categoriasGastos[categoria] =
            (categoriasGastos[categoria] || 0) + valor;
        }
      });

      setReceita(entradas);
      setDespesa(saidas);
      setSaldo(entradas - saidas);

      setTopGastos(
        Object.entries(categoriasGastos)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([label, value], i) => ({
            label,
            value,
            color: coresGastos[i % coresGastos.length],
          }))
      );

      setTopGanhos(
        Object.entries(categoriasGanhos)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([label, value], i) => ({
            label,
            value,
            color: coresGanhos[i % coresGanhos.length],
          }))
      );
    } catch (error) {
      console.error("Erro ao buscar transações", error);
      Alert.alert("Erro", "Não foi possível carregar o relatório.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransacoes();
  }, [mesSelecionado]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <Container>
      <Header>Relatório Financeiro</Header>

      {/* Seletor de mês */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f3f4f6",
            padding: 8,
            borderRadius: 20,
          }}
          onPress={() => setModalVisivel(true)}
        >
          <Text style={{ fontWeight: "600", fontSize: 16 }}>
            {mesSelecionado}
          </Text>
          <CaretDown color="#000" size={16} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>

      {/* Modal de meses */}
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

      {/* Resumo de saldo e receitas/despesas */}
      <ResumoContainer>
        <ResumoTitleRow>
          <SubHeader>Saldo em contas</SubHeader>
        </ResumoTitleRow>
        <SaldoTotal>R$ {saldo.toFixed(2).replace(".", ",")}</SaldoTotal>

        <ResumoRow>
          <ResumoIconCircle style={{ backgroundColor: theme.COLORS.BLUE }}>
            <ResumoIconText>↑</ResumoIconText>
          </ResumoIconCircle>
          <ResumoItem>
            <ResumoLabel>Receitas</ResumoLabel>
            <Receita>R$ {receita.toFixed(2).replace(".", ",")}</Receita>
          </ResumoItem>

          <ResumoIconCircle style={{ backgroundColor: "#ef4444" }}>
            <ResumoIconText>↓</ResumoIconText>
          </ResumoIconCircle>
          <ResumoItem>
            <ResumoLabel>Despesas</ResumoLabel>
            <Despesa>R$ {despesa.toFixed(2).replace(".", ",")}</Despesa>
          </ResumoItem>
        </ResumoRow>
      </ResumoContainer>

      {/* Gráfico de Gastos */}
      <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 30,
          }}
        >
          <SubHeader>Distribuição de Gastos</SubHeader>
          <ReloadButton onPress={fetchTransacoes}>
            <ArrowsClockwise size={20} color="black" />
          </ReloadButton>
        </View>
      <ChartWrapper>      
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        ></View>
        <ChartSection>
          {topGastos.length === 0 ? (
            <Text style={{ fontStyle: "italic", color: "#6b7280" }}>
              Não há transações neste período.
            </Text>
          ) : (
            <>
              <PolarChart
                data={topGastos}
                colorKey="color"
                valueKey="value"
                labelKey="label"
              >
                <Pie.Chart>
                  {() => (
                    <>
                      <Pie.Slice>
                        <Pie.Label color="white" />
                      </Pie.Slice>
                      <Pie.SliceAngularInset
                        angularInset={{
                          angularStrokeWidth: 4,
                          angularStrokeColor: "#fff",
                        }}
                      />
                    </>
                  )}
                </Pie.Chart>
              </PolarChart>
              <LegendWrapper>
                {topGastos.map((item, index) => (
                  <LegendItem key={index}>
                    <LegendColor style={{ backgroundColor: item.color }} />
                    <LegendText>
                      {item.label}: R$ {item.value.toFixed(2).replace(".", ",")}
                    </LegendText>
                  </LegendItem>
                ))}
              </LegendWrapper>
            </>
          )}
        </ChartSection>
      </ChartWrapper>

      {/* Gráfico de Ganhos */}
      <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 30,
            marginBottom: 5
          }}
        >
          <SubHeader>Distribuição de Ganhos</SubHeader>
        </View>
      
      <ChartWrapper>
        <ChartSection>
          {topGanhos.length === 0 ? (
            <Text style={{ fontStyle: "italic", color: "#6b7280" }}>
              Não há transações neste período.
            </Text>
          ) : (
            <>
              <PolarChart
                data={topGanhos}
                colorKey="color"
                valueKey="value"
                labelKey="label"
              >
                <Pie.Chart>
                  {() => (
                    <>
                      <Pie.Slice>
                        <Pie.Label color="white" />
                      </Pie.Slice>
                      <Pie.SliceAngularInset
                        angularInset={{
                          angularStrokeWidth: 4,
                          angularStrokeColor: "#fff",
                        }}
                      />
                    </>
                  )}
                </Pie.Chart>
              </PolarChart>
              <LegendWrapper>
                {topGanhos.map((item, index) => (
                  <LegendItem key={index}>
                    <LegendColor style={{ backgroundColor: item.color }} />
                    <LegendText>
                      {item.label}: R$ {item.value.toFixed(2).replace(".", ",")}
                    </LegendText>
                  </LegendItem>
                ))}
              </LegendWrapper>
            </>
          )}
        </ChartSection>
      </ChartWrapper>
    </Container>
  );
};
