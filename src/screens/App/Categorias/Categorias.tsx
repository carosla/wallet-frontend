import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {
  Container,
  ButtonText,
  ContainerAtributos,
  Button,
  ContainerButton,
  ContainerHeader,
  ContainerImage,
  ImageCategoria,
  ImageButton,
  ButtonVerTotos,
  ButtonTitleVertotos,
} from "./styles";
import { CaretDoubleLeft, List } from "phosphor-react-native";
import { ButtonGoBack } from "./styles";
import InputDescricao from "../../../components/Input_Descricao";
import COLORS from "../../../styles/theme";
import { Header } from "@src/components/Header/Header";
import Edit from "../../../assets/edit.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, View } from "react-native";
import { API_URL } from "@env";
import theme from "../../../styles/theme";

export const Categorias = () => {
  const navigation = useNavigation();
  const [categoria, setCategoria] = useState(""); // Estado para armazenar a categoria
  const [token, setToken] = useState(""); // Armazena o token

  // Função para buscar o token armazenado (geralmente no AsyncStorage ou contexto global)
  useEffect(() => {
    // Aqui você pode pegar o token de onde ele está armazenado
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token"); // Exemplo, substitua com seu método de obtenção do token
      setToken(storedToken || "");
    };
    fetchToken();
  }, []);

  const handleSendData = async () => {
    // Verifique se os campos estão preenchidos
    if (categoria.trim() !== "") {
      try {
        // Verifica se o token está presente
        if (!token) {
          alert("Você precisa estar logado para criar uma categoria.");
          return;
        }

        // Enviar dados para o backend (API)
        const response = await axios.post(
          `${API_URL}/api/categorias`, // Certifique-se de que a URL esteja correta
          { categoria },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Adicionando o token no cabeçalho
            },
          }
        );

        // Verifica a resposta da API
        if (response.status === 201) {
          Alert.alert("Categoria cadastrada com sucesso");
          navigation.navigate("TabRoutes"); // Navega para a tela de Carteira
        } else {
          console.error("Erro ao cadastrar categoria:", response.data);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    } else {
      alert("Preencha todos os campos.");
    }
  };

  const handleGoBackHome = () => {
    navigation.goBack();
  };

  const handleViewCategories = () => {
    // Navega para a tela de visualização das categorias
    navigation.navigate("ListaCategorias"); // Aqui, 'ViewCategories' deve ser o nome da tela de visualização das categorias
  };

  return (
    <>
      <ContainerHeader>
        <Header appName="Categorias" />
      </ContainerHeader>
      <Container>
        <View
          style={{
            marginBottom: 10,
            marginLeft: 140
          }}
        >
          <ButtonVerTotos
            title="Visualizar Categorias"
            onPress={handleViewCategories}
          >
            <ButtonTitleVertotos>Visualizar Categorias</ButtonTitleVertotos>
          </ButtonVerTotos>
        </View>

        <ContainerAtributos>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              paddingHorizontal: 12,
              backgroundColor: "#fff",
              width: "80%",
              marginBottom: 10,
            }}
          >
            <InputDescricao
              placeholder="Digite a categoria"
              placeholderTextColor={"#999"}
              value={categoria} // Usando o estado correto
              onChangeText={setCategoria} // Atualiza o estado corretamente
              style={{
                width: "100%",
                borderBottomColor: "transparent",
                marginTop: 10,
                fontFamily: theme.FONTS.POPPINSREGULAR,
              }}
            />
            <List size={20} color="#888" />
          </View>
        </ContainerAtributos>

        <Button
          onPress={handleSendData} // Chama a função para enviar os dados
          style={{}}
        >
          <ButtonText>Cadastrar</ButtonText>
        </Button>

        <ButtonGoBack onPress={handleGoBackHome}>
          <CaretDoubleLeft size={25} weight="light" />
        </ButtonGoBack>
      </Container>
    </>
  );
};
