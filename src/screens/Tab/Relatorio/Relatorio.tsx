import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { Pie, PolarChart } from "victory-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { ArrowsClockwise } from "phosphor-react-native";

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

  const coresGastos = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#84cc16",
    "#10b981",
  ];

  const coresGanhos = [
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#d946ef",
  ];

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

      let entradas = 0;
      let saidas = 0;

      const categoriasGastos: Record<string, number> = {};
      const categoriasGanhos: Record<string, number> = {};

      for (const transacao of transacoes) {
        const valor = transacao.valor;
        const tipo = transacao.tipo_transacao.transacao;
        const categoria = transacao.categorium?.categoria || "Sem categoria";

        if (tipo === "entrada") {
          entradas += valor;
          categoriasGanhos[categoria] = (categoriasGanhos[categoria] || 0) + valor;
        } else {
          saidas += valor;
          categoriasGastos[categoria] = (categoriasGastos[categoria] || 0) + valor;
        }
      }

      setReceita(entradas);
      setDespesa(saidas);
      setSaldo(entradas - saidas);

      const topGastosData = Object.entries(categoriasGastos)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([label, value], index) => ({
          label,
          value,
          color: coresGastos[index % coresGastos.length],
        }));

      const topGanhosData = Object.entries(categoriasGanhos)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([label, value], index) => ({
          label,
          value,
          color: coresGanhos[index % coresGanhos.length],
        }));

      setTopGastos(topGastosData);
      setTopGanhos(topGanhosData);
    } catch (error) {
      console.error("Erro ao buscar transações", error);
      Alert.alert("Erro", "Não foi possível carregar o relatório.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransacoes();
  }, []);

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

      <ResumoContainer>
        <ResumoTitleRow>
          <SubHeader>Saldo em contas</SubHeader>
        </ResumoTitleRow>

        <SaldoTotal>R$ {saldo.toFixed(2).replace(".", ",")}</SaldoTotal>

        <ResumoRow>
          <ResumoItem>
            <ResumoIconCircle style={{ backgroundColor: "#22c55e" }}>
              <ResumoIconText>↑</ResumoIconText>
            </ResumoIconCircle>
            <ResumoLabel>Receitas</ResumoLabel>
            <Receita>R$ {receita.toFixed(2).replace(".", ",")}</Receita>
          </ResumoItem>

          <ResumoItem>
            <ResumoIconCircle style={{ backgroundColor: "#ef4444" }}>
              <ResumoIconText>↓</ResumoIconText>
            </ResumoIconCircle>
            <ResumoLabel>Despesas</ResumoLabel>
            <Despesa>R$ {despesa.toFixed(2).replace(".", ",")}</Despesa>
          </ResumoItem>
        </ResumoRow>
      </ResumoContainer>

      {/* Gráfico de Gastos */}
      <View style={{ height: 150, width: "100%", marginTop: 40 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <SubHeader>Distribuição de Gastos</SubHeader>
          <ReloadButton onPress={fetchTransacoes}>
            <ArrowsClockwise size={20} color="black" />
          </ReloadButton>
        </View>

        <ChartSection>
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
                <LegendText numberOfLines={1}>
                  {item.label}: R$ {item.value.toFixed(2).replace(".", ",")}
                </LegendText>
              </LegendItem>
            ))}
          </LegendWrapper>
        </ChartSection>
      </View>

      {/* Gráfico de Ganhos */}
      <View style={{ height: 150, width: "100%", marginTop: 40 }}>
        <SubHeader>Distribuição de Ganhos</SubHeader>

        <ChartSection>
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
                <LegendText numberOfLines={1}>
                  {item.label}: R$ {item.value.toFixed(2).replace(".", ",")}
                </LegendText>
              </LegendItem>
            ))}
          </LegendWrapper>
        </ChartSection>
      </View>
    </Container>
  );
};
