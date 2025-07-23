import React, { useState } from "react";
import { useTheme } from "styled-components/native";
import { useNavigation } from '@react-navigation/native';
import { Alert, KeyboardAvoidingView, ScrollView } from 'react-native';

import Input from '../../../components/Input';
import { ButtonPersonalizado } from "../../../components/ButtonPersonalizado";
import { registerUser } from "../../../services/authService";

import {
    Container,
    ContentHeader,
    Title,
    Description,
    ContentBody,
    ContentFoooter,
    ButtonFooter,
    Title1,
    Title2,
    Logo,
} from "./styles";

export const Cadastro = () => {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { COLORS } = useTheme();
    const navigation  = useNavigation();

    const handleVoltarLogin = () => {
        navigation.navigate('Login');
    }

    const handleCadastro = async () => {
        try {
            const userData = { login, email, password };
            await registerUser(userData); // Chama a função do authService
            Alert.alert('Cadastro realizado com sucesso!');
            navigation.navigate('Login'); // Redireciona para o Login
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    return (
        <Container>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <ContentHeader>
                    <Logo source={require('../../../assets/logo/logo_grow_3.png')} resizeMode="contain" />
                </ContentHeader>

                <ContentBody>
                    <Input
                        leftIcon
                        iconSize={23}
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='default'
                        secureTextEntry={false}
                        iconColor={COLORS.GRAY2}
                        iconName="person-outline"
                        placeholder="Digite seu login"
                        value={login}
                        onChangeText={setLogin}
                    />

                    <Input
                        leftIcon
                        iconSize={23}
                        autoCorrect={false}
                        autoCapitalize='none'
                        secureTextEntry={false}
                        iconColor={COLORS.GRAY2}
                        iconName="mail-outline"
                        keyboardType='email-address'
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Input
                        leftIcon
                        rightIcon
                        iconSize={23}
                        secureTextEntry
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='default'
                        iconColor={COLORS.GRAY2}
                        iconName="lock-closed-outline"
                        placeholder="Digite sua senha"
                        value={password}
                        onChangeText={setPassword}
                    />

                    <ButtonPersonalizado
                        title="Cadastrar"
                        onPress={handleCadastro}
                        style={{
                            marginTop: 50,
                        }}
                    />
                </ContentBody>

                <ContentFoooter>
                    <ButtonFooter onPress={handleVoltarLogin}>
                        <Title1>Já tem conta?</Title1>
                        <Title2>Logar-se</Title2>
                    </ButtonFooter>
                </ContentFoooter>
            </ScrollView>
        </Container>
    );
};