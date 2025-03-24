import styled, { DefaultTheme } from "styled-components/native";



export const Container = styled.View`
    height: 50px;
    width: 80%;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    border-radius: 1px;
`;

export const InputContainer = styled.TextInput`
    height: 50px;
    width: 350px;
    font-size: 13px;
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSLIGHT};
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.GRAY3};
    border-bottom-width: 1px;
    border-color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.BLACK};
    
`

