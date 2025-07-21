import styled, { DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

// Container principal com padding
export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  padding: ${RFValue(20)}px;
`;

// Cabeçalho principal
export const Header = styled.Text`
  margin-top: ${RFValue(25)}px;
  font-size: ${RFValue(19)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINSBOLD};
  text-align: left;
  margin-bottom: ${RFValue(10)}px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY1};
`;

// Subtítulo
export const SubHeader = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINSMEDIUM};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY1};
`;

// Card do gráfico
export const ChartCard = styled.View`
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.SHAPE || "#fff"};
  border-radius: ${RFValue(16)}px;
  padding: ${RFValue(16)}px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  margin-top: ${RFValue(24)}px;
`;

// Container do gráfico e da legenda
export const ChartSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100;
`;

// Gráfico
export const ChartWrapper = styled.View`
  width: 100%;
  height: ${RFValue(130)}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.WHITE_100};
  border-radius: ${RFValue(16)}px;
  margin-top: ${RFValue(3)}px;
`;

// Legenda
export const LegendWrapper = styled.View`
  width: 55%;
  justify-content: center;
`;

export const LegendItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${RFValue(8)}px;
`;

export const LegendColor = styled.View`
  width: ${RFValue(10)}px;
  height: ${RFValue(10)}px;
  border-radius: 5px;
  margin-right: ${RFValue(8)}px;
`;

export const LegendText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINSMEDIUM};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY3};
  flex-shrink: 1;
`;

// Resumo
export const ResumoContainer = styled.View``;

export const ResumoTitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  justify-content: center;
`;

export const ResumoLabel = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINSMEDIUM};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.TEXT};
`;

export const SaldoTotal = styled.Text`
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINSBOLD};
  text-align: center;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY2};
  margin-bottom: ${RFValue(20)}px;
`;

export const ResumoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.WHITE};
  padding: ${RFValue(12)}px;
  border-radius: ${RFValue(8)}px;
`;

export const ResumoItem = styled.View`
  flex: 1;
  margin-left: ${RFValue(8)}px;
`;

export const ResumoIconCircle = styled.View`
  width: ${RFValue(28)}px;
  height: ${RFValue(28)}px;
  border-radius: 14px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${RFValue(4)}px;
`;

export const ResumoIconText = styled.Text`
  color: white;
  font-size: ${RFValue(14)}px;
  font-weight: bold;
`;

export const ResumoValue = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) =>
    theme.FONTS.POPPINSBOLD};
  color: white;
  margin-top: ${RFValue(2)}px;
`;

export const Receita = styled(ResumoValue)`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.BLUE};
`;

export const Despesa = styled(ResumoValue)`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.RED};
`;
export const Saldo = styled(ResumoValue)``;

export const ReloadButton = styled.TouchableOpacity`
  align-items: center;
  background-color: #f0f0f0;
  padding: 5px;
  border-radius: 50px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.COLORS.GRAY5};
`;
