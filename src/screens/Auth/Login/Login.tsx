import React, { useState } from "react";

import { KeyboardAvoidingView, Text } from "react-native";

import Input from "../../../components/Input/input";
import { ButtonSocialGoogle } from "../../../components/ButtonSocialGoogle/ButtonSocialGoogle";
import { ButtonSocial } from "../../../components/ButtonSocial/ButtonSocial";
import {
    Container,
    ContentHeader,
    ContentBody,
    ContentFooter,
    Title,
    Description,
    ViewButton,
    ButtonSignUp,
    TitleButtonSignUp1,
    TitleButtonSignUp2,
    ContentForgotPassword,
    ContentButtonForgotPassword,
    ContentTitleForgotPassword
} from "./styles";
import { ButtonPersonalizado } from "@src/components/ButtonPersonalizado";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { setItem } from "../../../services/storageService"; // Método para salvar o token no armazenamento local


const Login: React.FC = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState(""); // Estado para armazenar o email
    const [senha, setSenha] = useState(""); // Estado para armazenar a senha
    const [error, setError] = useState<string>(""); // Estado para exibir possíveis erros de login


    const handleCadastro = () => {
        navigation.navigate('Cadastro');

    }

    const handleRecuperarSenha = () => {
        navigation.navigate('RecuperarSenha');
    }

    const handleLogin = async () => {
        try {
          // Enviar a requisição para o backend com as credenciais
          const response = await axios.post(
            "http://localhost:3000/api/auth/login", // URL do seu backend
            { email, password: senha }
          );
    
          if (response.data.token) {
            // Salvar o token no armazenamento local
            await setItem("token", response.data.token);
            navigation.navigate('AppRoutes');
          }
        } catch (err) {
          setError("Email ou senha inválidos"); // Exibir mensagem de erro
        }
      };

    return (
            <KeyboardAvoidingView
                behavior="position"
                enabled
            >
            <Container>
                <ContentHeader>
                    <Title>Seja bem vindo(a) {'\n'} a App Carteira</Title>

                    <Description>Entrar com redes sociais</Description>

                    <ViewButton>

                        <ButtonSocialGoogle title="Google"/>
                        <ButtonSocial IconName="facebook" title="Facebook"/>

                    </ViewButton>
                </ContentHeader>

                <ContentBody>
                {error && <Text style={{ color: 'red' }}>{error}</Text>} {/* Exibir erro se houver */}
                    <Input 
                        leftIcon 
                        iconSize={25} 
                        secureTextEntry={false}
                        autoCorrect={false}
                        keyboardType="default"
                        autoCapitalize="none"
                        iconName="mail-outline" 
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChangeText={setEmail} // Atualizar o estado com o email digitado
                    />
                    <Input 
                        leftIcon  
                        rightIcon
                        iconSize={25}
                        secureTextEntry
                        autoCorrect={false}
                        keyboardType="default"
                        autoCapitalize="none"
                        iconName="lock-closed-outline"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChangeText={setSenha} // Atualizar o estado com a senha digitada
                    />

                    <ContentForgotPassword>
                        <ContentButtonForgotPassword onPress={handleRecuperarSenha}>
                            <ContentTitleForgotPassword>Recuperar Senha</ContentTitleForgotPassword>
                        </ContentButtonForgotPassword>
                        {/* <ButtonPersonalizado
                            title="Recuperar Senha"
                            onPress={() => {}}
                            variant='transparent'
                        /> */}
                    </ContentForgotPassword>

                    <ButtonPersonalizado
                        title="Entrar"
                        variant="primary"
                        onPress={handleLogin}
                        style={{ marginBottom: 20 }}
                    />
                </ContentBody>

                <ContentFooter>
                    <ButtonSignUp onPress={handleCadastro}>
                        <TitleButtonSignUp1>Não tem cadastro ainda?</TitleButtonSignUp1>
                        <TitleButtonSignUp2>Cadastre-se</TitleButtonSignUp2>
                    </ButtonSignUp>
                </ContentFooter>
            </Container>
        </KeyboardAvoidingView>
    );
}

export { Login };