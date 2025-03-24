import styled, {DefaultTheme} from "styled-components/native";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
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
    background-color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.BLUE};
`;

export const IconeFacebook = styled(Fontisto)`
    font-size: ${RFValue(30)}px;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.WHITE};
`;

export const Title = styled.Text`
    font-size: ${RFValue(17)}px;
    margin-left: ${RFValue(10)}px;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.WHITE};
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSLIGHT};
`;
