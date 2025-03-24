import styled, { DefaultTheme } from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    padding: 10px 15px;
`;

export const ViewFooter = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`;

export const TitleFooter = styled.Text`
    font-size: 17px;
    margin-top: 10px;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.PURPLEDARK1};
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSREGULAR};
`;

export const ViewIconButton = styled.View`
    padding: 10px;
    border-radius: 30px;
    border-width: 1px;
    border-color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.GRAY5};
`;