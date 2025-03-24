import styled, { DefaultTheme } from "styled-components/native";
import { Pressable } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: center;
    margin-top: ${RFValue(15)}px;
    border-radius: ${RFValue(8)}px;
    background-color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.PRIMARY};
`;

export const Content = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSMEDIUM};
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.BACKGROUNDDARK};
`;