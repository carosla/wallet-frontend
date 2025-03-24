import styled, { DefaultTheme } from "styled-components/native";
import { FlatList } from "react-native";

export const Container = styled.View`
    flex: 1;
`;

export const ContentHeader = styled.View`
    width: 100%;
    height: 35%;
    align-items: center;
    padding: 5px 10px;
`;

export const ContentTopTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.BLACK};
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSLIGHT};
`;

export const ContentBody = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    padding: 0px 10px;
`;

export const ContentBodyTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.BLACK};
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSLIGHT};
`;

export const ContentFlat = styled.View`
    /* flex: 1; */
    margin-top: 10px;
    border-radius: 17px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.WHITE};
`;

export const NewNotificationsFlat = styled.View`
    width: 83%;
    padding: 10px;
    height: 88px;
`;

export const DataNotifications = styled.Text`

`;

export const DataNotificationsText = styled.Text`
    font-size: 12px;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.GRAY4};
`;

export const TitleNotifications = styled.View`
`;

export const TitleNotificationsText = styled.Text`
    font-size: 14px;
    font-weight: 500;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.TYPOSECONDARY};
`;

export const DescriptionNotifications = styled.View`

`;

export const DescriptionNotificationsText = styled.Text`
    font-size: 12px;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.GRAY4};
`;

export const NewButtonNotifications = styled.TouchableOpacity`
    width: 50px;
    height: 88px;
    align-items: center;
    justify-content: center;
`;