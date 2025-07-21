import styled, { DefaultTheme } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';

export const Container = styled(TouchableOpacity).attrs({

})`
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: center;
    margin-top: ${RFValue(15)}px;
    border-radius: ${RFValue(8)}px;
`;

export const Content = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    color: ${({theme}: {theme: DefaultTheme}) => theme.COLORS.WHITE};   
    font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSMEDIUM};
`;

