import React, { useState } from "react";
import { API_URL } from "@env";

import { KeyboardAvoidingView, ScrollView, Text } from "react-native";

import Input from "../../../components/Input";
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
  ContentTitleForgotPassword,
} from "./styles";
import { ButtonPersonalizado } from "@src/components/ButtonPersonalizado";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import axios from "axios";
import { setItem } from "../../../services/storageService"; // Método para salvar o token no armazenamento local

const Login: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState(""); // Estado para armazenar o email
  const [senha, setSenha] = useState(""); // Estado para armazenar a senha
  const [error, setError] = useState<string>(""); // Estado para exibir possíveis erros de login
  const { COLORS } = useTheme();

  const handleCadastro = () => {
    navigation.navigate("Cadastro");
  };

  const handleRecuperarSenha = () => {
    navigation.navigate("RecuperarSenha");
  };

  const handleLogin = async () => {
    try {
      // Enviar a requisição para o backend com as credenciais
      const response = await axios.post(
        `https://wallet-backend-2rmo.onrender.com/api/auth/login`, // URL do backend
        { email, password: senha }
      );

      if (response.data.token) {
        // Salvar o token no armazenamento local
        await setItem("token", response.data.token);
        navigation.navigate("AppRoutes");
      }
    } catch (err) {
      setError("Email ou senha inválidos"); // Exibir mensagem de erro
    }
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ContentHeader>
            <Title>Seja bem vindo(a) {"\n"} a App Carteira</Title>

            {/*<Description>Entrar com redes sociais</Description>

            <ViewButton>
              <ButtonSocialGoogle title="Google" />
              <ButtonSocial IconName="facebook" title="Facebook" />
            </ViewButton>*/}
            
          </ContentHeader>

          <ContentBody>
            {error && <Text style={{ color: "red" }}>{error}</Text>}{" "}
            {/* Exibir erro se houver */}
            <Input
              leftIcon
              iconSize={23}
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={false}
              iconColor={COLORS.GRAY2}
              iconName="mail-outline"
              keyboardType="email-address"
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
              keyboardType="default"
              autoCapitalize="none"
              iconName="lock-closed-outline"
              placeholder="Digite sua senha"
              value={senha}
              onChangeText={setSenha} // Atualizar o estado com a senha digitada
            />
            <ContentForgotPassword>
              <ContentButtonForgotPassword onPress={handleRecuperarSenha}>
                <ContentTitleForgotPassword>
                  Recuperar Senha
                </ContentTitleForgotPassword>
              </ContentButtonForgotPassword>
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
        </ScrollView>
      </Container>
    </KeyboardAvoidingView>
  );
};

export { Login };
