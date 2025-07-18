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
  margin-top: ${RFValue(50)}px;
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) => theme.FONTS.POPPINSBOLD};
  text-align: left;
  margin-bottom: ${RFValue(10)}px;
`;

// Subtítulo
export const SubHeader = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) => theme.FONTS.POPPINSMEDIUM};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.TEXT};
`;

// Card do gráfico
export const ChartCard = styled.View`
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.SHAPE || '#fff'};
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
  margin-top: ${RFValue(12)}px;
  height: 100;
`;

// Gráfico
export const ChartWrapper = styled.View`
  width: 45%;
  height: ${RFValue(160)}px;
  justify-content: center;
  align-items: center;
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
  font-family: ${({ theme }: { theme: DefaultTheme }) => theme.FONTS.POPPINSMEDIUM};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.TEXT};
  flex-shrink: 1;
`;

// Resumo
export const ResumoContainer = styled.View`
  margin-top: ${RFValue(20)}px;
`;

export const ResumoTitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${RFValue(8)}px;
`;

export const ResumoLabel = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) => theme.FONTS.POPPINSMEDIUM};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.TEXT};
`;

export const SaldoTotal = styled.Text`
  font-size: ${RFValue(26)}px;
  font-family: ${({ theme }: { theme: DefaultTheme }) => theme.FONTS.POPPINSBOLD};
  text-align: center;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.TEXT};
  margin-bottom: ${RFValue(12)}px;
`;

export const ResumoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${RFValue(12)}px;
`;

export const ResumoItem = styled.View`
  flex: 1;
  align-items: center;
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
  font-family: ${({ theme }: { theme: DefaultTheme }) => theme.FONTS.POPPINSBOLD};
  color: white;
  margin-top: ${RFValue(2)}px;
`;

export const Receita = styled(ResumoValue)`
    color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.TEXT};
`;
  
export const Despesa = styled(ResumoValue)`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.TEXT};
`;
export const Saldo = styled(ResumoValue)``;

export const ReloadButton = styled.TouchableOpacity`
  background-color: #f0f0f0;
  padding: 5px;
  border-radius: 50px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  elevation: 6;
  shadow-offset: 0px 3px;
`;

