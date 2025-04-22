import { Pressable } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import Edit from '../../../assets/edit.png'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

export const ContainerHeader = styled.View`
   position: "absolute";
   top: 0;
   left: 0;
   background-color: #f5f5f5;
`;

export const ContainerImage = styled.View`
    justify-content: center;
    align-items: center;
    background-color: transparent;
    margin-bottom: 50px;
    border-radius: 30px;
    width: 86px;
    height: 86px;

`;

export const ImageButton = styled.TouchableOpacity`
    width: 56px;
    height: 56px;
    justify-content: center;
    align-items: center;
`;

export const ImageCategoria = styled.Image`
  width: 52px;
  height: 52px;
`;

export const ContainerAtributos = styled.View`
  justify-content: center;
  align-items: center;
  background-color: transparent;
  font-family: ${({ theme }: { theme: DefaultTheme }) => theme.FONTS.POPPINSBOLD};
  margin-bottom: 20px;
`;

export const ContainerButton = styled.TouchableOpacity`
  margin-top: 60px;
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

export const Button = styled.TouchableOpacity`
  width: 210px;
  height: 60px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.COLORS.PURPLEDARK1};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
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
