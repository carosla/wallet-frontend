import { Pressable } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';

export const Container = styled.View`
    padding: 20px;
    margin-top: 30%;
`;

export const ContentHeader = styled.View`
    width: 100%;
    margin-left: -10px;
    align-items: center;
    justify-content: space-between;
`;

export const Title = styled.Text`
    text-align: center;
    font-size: 25px;
    margin-top: 40px;
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSMEDIUM};
`;

export const Description = styled.Text`
    font-size:  35px;
    margin-top: 60px;
    margin-bottom: 10px;
    font-family: ${({theme}: {theme: DefaultTheme})=> theme.FONTS.POPPINSEXTRABOLD};
`;

export const ContentBody = styled.View`
    margin-bottom: 20px;
`;

export const ContentFoooter = styled.View`
    margin-top: 50px;
    align-items: center;
    justify-content: center;
`;

export const ButtonFooter = styled(Pressable)`
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

export const Title1 = styled.Text`
    font-size: 14px;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.GRAY3};
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSMEDIUM};
`;

export const Title2 = styled.Text`
    font-size: 17px;
    margin-left: 10px;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.PURPLEDARK1};
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSBOLD};
`;