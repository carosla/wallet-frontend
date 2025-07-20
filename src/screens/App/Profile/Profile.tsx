import React, { useEffect, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";
import { Pen } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { GoBack } from "../../../components/GoBack";
import {
  Container,
  Header,
  Avatar,
  Row,
  EditableInput,
  Button,
  ButtonText,
  ContainerAtributos,
  ContainerHeader,
  ContainerButton,
  Title,
  SubTitle,
  InputInfo,
} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import axios from "axios";
import { Header as HeaderComponent } from "../../../components/Header/Header";
import theme from "@src/styles/theme";

export const Profile = () => {
  const navigation = useNavigation();
  const { COLORS } = useTheme();
  const [perfilId, setPerfilId] = useState<number | null>(null);
  const [nomePerfil, setNomePerfil] = useState<string | null>(null);
  const [descricao, setDescricao] = useState<string>("");
  const [fotoPerfil, setFotoPerfil] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [login, setLogin] = useState<string>("");

  const [editando, setEditando] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const nomeExibido = nomePerfil ?? login;

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      setToken(storedToken || "");
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const buscarPerfil = async () => {
      if (!token) return;

      try {
        const response = await axios.get(`${API_URL}/api/perfil`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { nome, descricao, foto_perfil, perfil_id, email, login } =
          response.data;

        setNomePerfil(nome);
        setDescricao(descricao);
        setFotoPerfil(foto_perfil);
        setPerfilId(perfil_id);
        setEmail(email || "");
        setLogin(login || "");
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do perfil");
      }
    };

    buscarPerfil();
  }, [token]);

  const salvarEdicao = async () => {
    if (!perfilId) return;

    try {
      await axios.put(
        `${API_URL}/api/perfil/${perfilId}`,
        {
          nome: nomePerfil,
          descricao,
          foto_perfil: fotoPerfil,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditando(false);
      Alert.alert("Sucesso", "Dados atualizados com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      Alert.alert("Erro", "Não foi possível salvar as alterações");
    }
  };

  return (
    <>
      <ContainerHeader>
        <GoBack /> <HeaderComponent appName="Perfil" />
      </ContainerHeader>

      <Container>
        <Header>
          <Avatar source={require("../../../assets/mulher.png")} />
          <View>
            <Title>Nome</Title>
            {editando ? (
              <EditableInput
                value={nomePerfil || ""}
                onChangeText={setNomePerfil}
                placeholder="Nome do perfil"
              />
            ) : (
              <SubTitle>{nomeExibido}</SubTitle>
            )}
          </View>

          <TouchableOpacity
            onPress={() => setEditando(true)}
            style={{ marginLeft: 10 }}
          >
            <Pen size={24} color={COLORS.PURPLEDARK1} />
          </TouchableOpacity>
        </Header>

        <ContainerAtributos>
          <Title>Email</Title>
          <InputInfo>{email}</InputInfo>

          <Title>Login</Title>
          <InputInfo>{login}</InputInfo>

          <Title>Descrição</Title>
          {editando ? (
            <EditableInput
              value={descricao}
              onChangeText={setDescricao}
              multiline
            />
          ) : (
            <InputInfo>{descricao}</InputInfo>
          )}
        </ContainerAtributos>

        {editando && (
          <ContainerButton>
            <Button onPress={salvarEdicao}>
              <ButtonText>Salvar</ButtonText>
            </Button>

            <Button
              onPress={() => setEditando(false)}
              style={{
                borderWidth: 1,
                borderColor: COLORS.GRAY1,
                marginTop: 10,
                backgroundColor: "transparent",
              }}
            >
              <ButtonText style={{ color: theme.COLORS.GRAY1 }}>
                Cancelar
              </ButtonText>
            </Button>
          </ContainerButton>
        )}
      </Container>
    </>
  );
};
