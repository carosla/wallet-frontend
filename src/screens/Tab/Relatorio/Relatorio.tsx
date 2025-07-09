import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { CartesianChart, Line, useChartPressState, Pie, PolarChart } from "victory-native";
import Animated, { SharedValue, useAnimatedProps } from 'react-native-reanimated';
import { Circle } from '@shopify/react-native-skia';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const DATA = [
  { day: new Date("2024-04-09").getTime(), price: 600 },
  { day: new Date("2024-04-10").getTime(), price: 500 },
  { day: new Date("2024-04-11").getTime(), price: 630 },
  { day: new Date("2024-04-12").getTime(), price: 420 },
  { day: new Date("2024-04-13").getTime(), price: 900 },
  { day: new Date("2024-04-14").getTime(), price: 940 },
  { day: new Date("2024-04-15").getTime(), price: 820.90 },
  { day: new Date("2024-04-18").getTime(), price: 1520 },
];

const chartData = [
  { label: "Alimentação", value: 800, color: "#4f46e5" },
  { label: "Transporte", value: 450, color: "#10b981" },
  { label: "Lazer", value: 300, color: "#ec4899" },
  { label: "Educação", value: 200, color: "#f59e0b" },
  { label: "Outros", value: 150, color: "#6366f1" },
];

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color="black" />;
}

export const Relatorio = () => {
  const navigation = useNavigation();

  const handleGoTransaction = () => {
    navigation.navigate('Transaction');
  };

  const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });

  const animatedText = useAnimatedProps(() => {
    return {
      text: `R$ ${state.y.price.value.value.toFixed(2)}`,
      defaultValue: ""
    };
  });

  const animatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value);
    return {
      text: `${date.toLocaleDateString("pt-BR")}`,
      defaultValue: ""
    };
  });

  return (
    <View style={styles.container}>
      {/* Título da Tela */}
      <Text style={styles.title}>Relatório Financeiro</Text>

      {/* Gráfico de Linha - Histórico de Saldo 
      <View style={{ width: 200, height: 200 }}>
        {isActive ? (
          <View>
            <AnimatedTextInput
              editable={false}
              underlineColorAndroid={"transparent"}
              style={styles.animatedText}
              animatedProps={animatedText}
            />
            <AnimatedTextInput
              editable={false}
              underlineColorAndroid={"transparent"}
              style={styles.dateText}
              animatedProps={animatedDateText}
            />
          </View>
        ) : (
          <View>
            <Text style={styles.animatedText}>
              R$ {DATA[DATA.length - 1].price.toFixed(2)}
            </Text>
            <Text style={styles.dateText}>Hoje</Text>
          </View>
        )}

        <CartesianChart
          data={DATA}
          xKey="day"
          yKeys={["price"]}
          chartPressState={state}
          axisOptions={{
            tickCount: 5,
            labelOffset: { x: 3, y: 2 },
            labelPosition: "inset",
            formatYLabel: (value) => `${value}`,
            formatXLabel: (value) => format(new Date(value), "dd/MM"),
          }}
        >
          {({ points }) => (
            <>
              <Line points={points.price} color="blue" strokeWidth={4} />
              {isActive && (
                <ToolTip x={state.x.position} y={state.y.price.position} />
              )}
            </>
          )}
        </CartesianChart>
      </View>
*/}
      {/* Gráfico de Pizza - Distribuição de Gastos */}
      <View style={{ width: '100%', marginTop: 40 }}>
        <Text style={styles.title}>Distribuição de Gastos</Text>
        <View style={{ height: 200, width: "100%" }}>
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
                    <Pie.Label
                      color="white"
                    />
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
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  animatedText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#000",
  },
  dateText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
});
