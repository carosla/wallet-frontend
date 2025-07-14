import React from "react";
import { Pie, PolarChart } from "victory-native";
import { useNavigation } from "@react-navigation/native";

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
  Saldo,
  SaldoTotal,
  ResumoItem,
  ResumoIconCircle,
  ResumoIconText,
  ResumoValue,
  ChartSection,
  LegendWrapper,
  LegendItem,
  LegendColor,
  LegendText,
} from "./styles";
import { View } from "react-native";

const resumo = {
  receita: 5000,
  despesa: 2100,
  saldo: 2900,
};

const chartData = [
  { label: "Alimentação", value: 800, color: "#4f46e5" },
  { label: "Transporte", value: 450, color: "#10b981" },
  { label: "Lazer", value: 300, color: "#ec4899" },
  { label: "Educação", value: 200, color: "#f59e0b" },
  { label: "Outros", value: 150, color: "#6366f1" },
];

export const Relatorio = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Header>Relatório Financeiro</Header>

      <ResumoContainer>
        <ResumoTitleRow>
          <SubHeader>Saldo em contas</SubHeader>
        </ResumoTitleRow>

        <SaldoTotal>R$ {resumo.saldo.toFixed(2)}</SaldoTotal>

        <ResumoRow>
          <ResumoItem>
            <ResumoIconCircle style={{ backgroundColor: "#22c55e" }}>
              <ResumoIconText>↑</ResumoIconText>
            </ResumoIconCircle>
            <ResumoLabel>Receitas</ResumoLabel>
            <Receita>R$ {resumo.receita.toFixed(2)}</Receita>
          </ResumoItem>

          <ResumoItem>
            <ResumoIconCircle style={{ backgroundColor: "#ef4444" }}>
              <ResumoIconText>↓</ResumoIconText>
            </ResumoIconCircle>
            <ResumoLabel>Despesas</ResumoLabel>
            <Despesa>R$ {resumo.despesa.toFixed(2)}</Despesa>
          </ResumoItem>
        </ResumoRow>
      </ResumoContainer>

      

      <View style={{ height: 200, width: "100%", marginTop: 50}}>
        <SubHeader>Distribuição de Gastos</SubHeader>
        <ChartSection>
          <PolarChart
            data={chartData}
            colorKey="color"
            valueKey="value"
            labelKey="label"
          >
            <Pie.Chart>
              {({ slice }) => (
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
            {chartData.map((item, index) => (
              <LegendItem key={index}>
                <LegendColor style={{ backgroundColor: item.color }} />
                <LegendText numberOfLines={1} ellipsizeMode="tail">
                  {item.label}: R$ {item.value.toFixed(2)}
                </LegendText>
              </LegendItem>
            ))}
          </LegendWrapper>
        </ChartSection>
      </View>
    </Container>
  );
};
