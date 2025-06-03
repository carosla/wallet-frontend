import styled, { DefaultTheme } from 'styled-components/native';

export const Container = styled.View`
    padding: 20px;
    
`;

export const Header = styled.View`
    align-items: center;
    margin-bottom: 20px;
`;

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
`;

export const UserName = styled.Text`
    font-size: 22px;
    font-family: ${({ theme }: { theme: DefaultTheme }) => theme.FONTS.POPPINSLIGHT};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.PURPLEDARK1};
`;

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

export const InfoContainer = styled.View`
    margin-top: 20px;
`;

export const Label = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY1};
`;

export const InfoText = styled.Text`
    font-size: 16px;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY2};
    margin-bottom: 10px;
`;

export const EditButton = styled.TouchableOpacity`
    margin-top: 15px;
    align-self: center;
`;

export const EditableInput = styled.TextInput`
    border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY4};
    border-radius: 8px;
    padding: 10px;
    font-size: 16px;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY2};
    margin-bottom: 10px;
`;
