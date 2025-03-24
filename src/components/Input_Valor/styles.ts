import styled, { DefaultTheme } from "styled-components/native";

export const ContainerValor = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSBOLD};
`;

export const Container = styled.View`
    height: 50px;
    width: 80%;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    border-radius: 0.5px;
`;

export const InputContainer = styled.TextInput`
    height: 50px;
    width: 120px;
    font-size: 35px;
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSBOLD};
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.BLACK};
    
`