import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import { SignOut } from 'phosphor-react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { Header } from '../../../components/Header/Header';
import { Profile } from '../../../components/Profile';
import {
    Container,
    ViewFooter,
    TitleFooter,
    ViewIconButton
} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Settings = () => {
    const { COLORS } = useTheme();
    const navigation = useNavigation();

    const handleGoPerfilUser = () => {
        navigation.navigate('Profile');
    }

    const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem("token"); // Remove o token

    // Navegar para a tela de login e limpar histórico de navegação
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }], // substitua por sua rota de login
      })
    );

    // (Opcional) Encerrar o app em Android
    // BackHandler.exitApp();
  } catch (error) {
    Alert.alert("Erro", "Não foi possível sair do app.");
    console.error("Erro ao sair:", error);
  }
};


    return (
        <>
            <Header appName='Configuração' />
            <Container>

                <Profile
                    iconLeft
                    typeUser
                    name='Perfil do Usuário'
                    onPress={handleGoPerfilUser}
                />

                <Profile
                    iconLeft
                    typeLogin
                    name='Configuração Login'
                    onPress={() => { }}
                />


                <ViewFooter>
                    <TouchableOpacity onPress={handleLogout}>
                        <ViewIconButton>
                            <SignOut
                                size={36}
                                weight="light"
                                color={COLORS.PURPLEDARK1}
                            />
                        </ViewIconButton>
                    </TouchableOpacity>
                    <TitleFooter>Sair da Wallet</TitleFooter>
                </ViewFooter>
            </Container>
        </>
    )
}