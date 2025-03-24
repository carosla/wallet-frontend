import styled, { DefaultTheme } from "styled-components/native";

export const Container = styled.View`
    width: 325;
    padding: 10px;
    border-radius: 60px;
    height: 60;
    align-items: 'center';
    justify-content: 'center';
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSLIGHT};
`;