import styled, {DefaultTheme} from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../styles/theme";

export const Button = styled(RectButton)`
    width: ${RFValue(145)}px;
    height: ${RFValue(50)}px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-bottom: 14px;
    border-radius: ${RFValue(5)}px;
    margin-left: ${RFValue(10)}px;;
    box-shadow: 1px 3px 3px rgba(0,0,0,0.2);
    background-color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.GRAY6};
`;

export const IconeGoogle = styled.Image`
    width: ${RFValue(25)}px;
    height: ${RFValue(25)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(17)}px;
    margin-left: ${RFValue(10)}px;
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSLIGHT};
`;
