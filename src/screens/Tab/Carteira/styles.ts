import styled, { DefaultTheme } from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    margin-top: 40px
`;

export const ViewContainer = styled.View`
    padding: 0 30px;
    align-items: center;
    justify-content: center;
    
`;

export const Content = styled.View`
    width: 100%;
    height: 160px;
    flex-direction: row;
    border-radius: 50px;
    align-items: center;
    justify-content: space-around;
    background-color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.PURPLEDARK1};
`;

export const EllipseOne = styled.Image`
    top: 1px;
    left: 40px;
    position: absolute;
`;

export const EllipseTwo = styled.Image`
    right: 0;
    bottom: 0;
    position: absolute;
`;

export const ViewBalanceLeft = styled.View``;

export const ViewBalanceRight = styled.View`
    z-index: 1;
`;

export const TitleValor = styled.Text`
    font-size: 16px;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.WHITE};
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSBOLD};
`;

export const TitleValorConta = styled.Text`
    font-size: 20px;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.WHITE};
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSEXTRABOLD};
`;

export const TitleCartao = styled.Text`
    font-size: 16px;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.WHITE};
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSBOLD};
`;

export const TitleNomeCartao = styled.Text`
    font-size: 20px;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.WHITE};
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSEXTRABOLD};
`;

export const Body = styled.View`
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`;

export const IconPayment = styled.Image`
    width: 70px;
    height: 70px;
`;

export const IconTransfer = styled.Image`
    width: 70px;
    height: 70px;
`;

export const IconPayOut = styled.Image`
    width: 70px;
    height: 70px;
`;

export const IconTopUp = styled.Image`
    width: 70px;
    height: 70px;
`;

export const TitleTransfer = styled.Text`
    font-size: 13px;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.PURPLEDARK1};
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSMEDIUM};
`;

export const TitlePayments = styled.Text`
    font-size: 13px;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.PURPLEDARK1};
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSMEDIUM};
`;

export const TitlePayOut = styled.Text`
    font-size: 13px;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.PURPLEDARK1};
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSMEDIUM};
`;

export const TitleTopUp = styled.Text`
    font-size: 13px;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.PURPLEDARK1};
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSMEDIUM};
`;

export const Footer = styled.View`
    flex: 1;
`;

export const ContentFlat = styled.View`
    padding: 5px 20px;
    flex-direction: row;
`;

export const ContentFlatHeader = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 20px;
    justify-content: space-between;
`;

export const Title = styled.Text`
    font-size: 20px;
    margin-left: 13px;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.GRAY1};
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSBOLD};
`;

export const ButtonVerTotos = styled.TouchableOpacity`
    padding: 3px;
    border-width: 1px;
    border-radius: 30px;
    border-color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.PURPLEDARK1};
`;

export const ButtonTitleVertotos = styled.Text`
    font-size: 12px;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.PURPLEDARK1};
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSLIGHT};
`;

export const IconTransaction = styled.Image`
    width: 40px;
    height: 40px;
    margin-right: 10px;
`;

export const DetailsTransaction = styled.View`
    flex: 1;
`;

export const NameTransaction = styled.Text`
    font-weight: 900;
    font-size: 16px;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.GRAY1};
    font-weight: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSREGULAR};
`;

export const SubtTitleTransaction = styled.Text`
    font-size: 14px;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.GRAY4};
    font-weight: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSLIGHT};
`;

export const AmountTransaction = styled.Text`
    font-weight: 900;
    font-size: 16px;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.GRAY1};
    font-weight: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSREGULAR};
`;

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
