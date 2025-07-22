import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "styled-components/native";
import { Pen } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { GoBack } from "../../../components/GoBack";
import {
  Container,
  Header,
  Avatar,
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

// Avatares com nome e imagem
const avatarOptions = [
  { nome: "avatar_0.png", src: require("../../../assets/avatars/avatar_0.png") },
  { nome: "avatar_4.png", src: require("../../../assets/avatars/avatar_4.png") },
  { nome: "avatar_1.png", src: require("../../../assets/avatars/avatar_1.png") },
  { nome: "avatar_2.png", src: require("../../../assets/avatars/avatar_2.png") },
  { nome: "avatar_3.png", src: require("../../../assets/avatars/avatar_3.png") },
  { nome: "avatar_5.png", src: require("../../../assets/avatars/avatar_5.png") },
  { nome: "avatar_6.png", src: require("../../../assets/avatars/avatar_6.png") },
  { nome: "avatar_7.png", src: require("../../../assets/avatars/avatar_7.png") },
  { nome: "avatar_8.png", src: require("../../../assets/avatars/avatar_8.png") },
  { nome: "avatar_9.png", src: require("../../../assets/avatars/avatar_9.png") },
  { nome: "avatar_10.png", src: require("../../../assets/avatars/avatar_10.png") },
  { nome: "avatar_11.png", src: require("../../../assets/avatars/avatar_11.png") },
  { nome: "avatar_12.png", src: require("../../../assets/avatars/avatar_12.png") },
];

export const Profile = () => {
  const navigation = useNavigation();
  const { COLORS } = useTheme();

  const [perfilId, setPerfilId] = useState<number | null>(null);
  const [nomePerfil, setNomePerfil] = useState<string | null>(null);
  const [descricao, setDescricao] = useState<string>("");
  const [fotoPerfil, setFotoPerfil] = useState<{ nome: string; src: any }>(avatarOptions[0]);
  const [email, setEmail] = useState<string>("");
  const [login, setLogin] = useState<string>("");

  const [editando, setEditando] = useState(false);
  const [modalDescricaoVisivel, setModalDescricaoVisivel] = useState(false);
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

        const { nome, descricao, foto_perfil, perfil_id, email, login } = response.data;

        setNomePerfil(nome);
        setDescricao(descricao);
        setPerfilId(perfil_id);
        setEmail(email || "");
        setLogin(login || "");

        const avatarEncontrado = avatarOptions.find(a => a.nome === foto_perfil);
        setFotoPerfil(avatarEncontrado || avatarOptions[0]);
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
          foto_perfil: fotoPerfil.nome,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditando(false);
      setModalDescricaoVisivel(false);
      Alert.alert("Sucesso", "Dados atualizados com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      Alert.alert("Erro", "Não foi possível salvar as alterações");
    }
  };

  const handleSelectAvatar = (avatar: { nome: string; src: any }) => {
    setFotoPerfil(avatar);
  };

  return (
    <>
      <ContainerHeader>
        <GoBack />
        <HeaderComponent appName="Perfil" />
      </ContainerHeader>

      <Container>
        <Header>
          <Avatar source={fotoPerfil.src} />
          <View>
            <Title>Nome</Title>
            {editando ? (
              <EditableInput
                value={nomePerfil || ""}
                onChangeText={setNomePerfil}
                placeholder="Nome do perfil"
                returnKeyType="done"
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

        {editando && (
          <FlatList
            data={avatarOptions}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.nome}
            contentContainerStyle={styles.avatarList}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectAvatar(item)}>
                <Image
                  source={item.src}
                  style={[
                    styles.avatarOption,
                    fotoPerfil.nome === item.nome && styles.selectedAvatar,
                  ]}
                />
              </TouchableOpacity>
            )}
          />
        )}

        <ContainerAtributos>
          <Title>Email</Title>
          <InputInfo>{email}</InputInfo>

          <Title>Login</Title>
          <InputInfo>{login}</InputInfo>

          <Title>Descrição</Title>
          {editando ? (
            <TouchableOpacity
              onPress={() => setModalDescricaoVisivel(true)}
              style={{
              
               
              }}
            >
              <InputInfo 
              numberOfLines={3} 
              style={
                { color: COLORS.GRAY1,  
                borderWidth: 1,
                borderColor: COLORS.PURPLEDARK1
                }}>
                {descricao || "Toque para editar..."}
              </InputInfo>
            </TouchableOpacity>
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

      <Modal
        visible={modalDescricaoVisivel}
        animationType="slide"
        transparent={true}
      >
        <View
          style={{
           flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingBottom: 350
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              width: "100%",
              padding: 20,
            }}
          >
            <Title style={{ marginBottom: 10 }}>Editar Descrição</Title>
            <TextInput
              value={descricao}
              onChangeText={setDescricao}
              multiline
              numberOfLines={6}
              style={{
                borderWidth: 1,
                borderColor: COLORS.GRAY2,
                borderRadius: 8,
                padding: 10,
                textAlignVertical: "top",
                minHeight: 100,
                marginBottom: 20,
              }}
              autoFocus
            />
            <Button
              onPress={() => {
                setModalDescricaoVisivel(false);
              }}
            >
              <ButtonText>Salvar</ButtonText>
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  avatarList: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  avatarOption: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedAvatar: {
    borderColor: "#6A5ACD",
  },
});
