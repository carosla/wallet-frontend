import styled, {DefaultTheme} from "styled-components/native";

export const Container = styled.View`
    ${({theme}: {theme: DefaultTheme}) => theme.COLORS}
`;
