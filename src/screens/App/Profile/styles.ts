

export const Header = styled.View`
    align-items: center;
    flex-direction: row;
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

export const ContainerAtributos = styled.View`
  justify-content: center;
  align-items: center;
  font-family: ${({theme}: {theme: DefaultTheme}) => theme.FONTS.POPPINSBOLD};
  margin-top: 20px;
`;

export const ContainerButton = styled.View`
  margin-top: 60px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

export const EditableInput = styled.TextInput`
    border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.PURPLEDARK1};
    border-radius: 8px;
    padding: 10px;
    font-size: 16px;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.BLACK};
    margin-bottom: 10px;
    background-color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.WHITE};
    width: 200px;
`;

export const EditableInputDescription = styled.TextInput`
    border: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.PURPLEDARK1};
    border-radius: 8px;
    padding: 10px;
    font-size: 16px;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.BLACK};
    margin-bottom: 10px;
    background-color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.WHITE};
    width: 300px;
`;

import { Pressable } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  background-color: #f5f5f5;
`;

export const ContainerCampos = styled.View`
  margin-top: 120px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #fff;
`;

export const ContainerBotoes = styled.View`
  margin-top: 40px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

export const Button = styled.TouchableOpacity`
  width: 280px;
  height: 50px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.PURPLEDARK1};
  justify-content: center;
  align-items: center;
  border-radius: 9px;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.WHITE};
  font-size: 18px;
  font-weight: bold;
`;

export const ButtonGoBack = styled(Pressable)`
  position: absolute;
  bottom: 20px;
  right: 30px;
  padding: 10px;
  border-radius: 30px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.GRAY4};
`;

export const Title = styled.Text`
  font-family: "Poppins-Bold";
  font-size: 16px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.BLACK};
  margin-bottom: 4px;
`;


export const SubTitle = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 16px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.BLACK};
`;

export const InputInfo = styled.Text`
  font-family: "Poppins-Regular";
  font-size: 15px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.BLACK};
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.WHITE};
  padding: 10px 14px;
  border-radius: 12px;
  margin-bottom: 12px;
  width: 300px;
`;