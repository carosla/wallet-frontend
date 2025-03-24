import styled, { DefaultTheme } from "styled-components/native";

export const Container = styled.View`
    height: 50px;
    width: 100%;
    padding: 0 12px;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    border-radius: 8px;
    background-color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.GRAY5};
`;

export const InputContainer = styled.TextInput`
    flex: 1;
    height: 50px;
    border: 0;
    border-radius: 8px;
    font-size: 14px;
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSLIGHT};
`