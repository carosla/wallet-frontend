import React, { useState, useEffect } from "react";
import { Alert, TextInput } from "react-native";
import { useTheme } from "styled-components/native";
import { Pen } from "phosphor-react-native";
import axios from "axios";

import { GoBack } from "../../../components/GoBack";
import {
  Container,
  Header,
  Avatar,
  UserName,
  InfoContainer,
  Label,
  InfoText,
  EditButton,
  Row,
  EditableInput,
} from "./styles";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ConnectedAccount = () => {
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

  // Buscar token
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      setToken(storedToken || "");
    };
    fetchToken();
  }, []);

  // Buscar dados do perfil
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

  const toggleEdicao = () => {
    setEditando(!editando);
  };

  const salvarEdicao = async () => {
    if (!perfilId) return;

    try {
      await axios.put(
        `${API_URL}/api/perfil`,
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
      <GoBack />
      <Container>
        
        <Header>
          <Avatar
            source={{ uri: fotoPerfil || "https://placehold.co/100x100" }}
          />
        </Header>

        <Row>
          <UserName>{nomeExibido}</UserName>
          <EditButton onPress={toggleEdicao}>
            <Pen size={24} color={COLORS.PURPLEDARK1} />
          </EditButton>
        </Row>

        <InfoContainer>
          <Label>Email:</Label>
          <InfoText>{email}</InfoText>

          <Label>Login:</Label>
          <InfoText>{login}</InfoText>

          <Label>Descrição:</Label>
          {editando ? (
            <EditableInput
              value={descricao}
              onChangeText={setDescricao}
              multiline
            />
          ) : (
            <InfoText>{descricao}</InfoText>
          )}
        </InfoContainer>

        {editando && (
          <EditButton onPress={salvarEdicao}>
            <InfoText style={{ color: COLORS.PURPLEDARK1 }}>Salvar</InfoText>
          </EditButton>
        )}
      </Container>
    </>
  );
};
