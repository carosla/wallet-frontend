import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Container, ButtonText, ContainerAtributos, Button, ContainerButton, ContainerHeader, ContainerImage, ImageCategoria, ImageButton } from "./styles";
import { CaretDoubleLeft } from "phosphor-react-native";
import { ButtonGoBack } from "./styles";
import InputDescricao from "../../../components/Input_Descricao";
import COLORS from "../../../styles/theme";
import { Header } from "@src/components/Header/Header";
import Edit from '../../../assets/edit.png';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const Categorias = () => {
  const navigation = useNavigation();
  const [categoria, setCategoria] = useState(""); // Estado para armazenar a categoria
  const [token, setToken] = useState(""); // Armazena o token

  // Função para buscar o token armazenado (geralmente no AsyncStorage ou contexto global)
  useEffect(() => {
    // Aqui você pode pegar o token de onde ele está armazenado
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token'); // Exemplo, substitua com seu método de obtenção do token
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
          'http://localhost:3000/api/categorias',
          { categoria },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Adicionando o token no cabeçalho
            },
          }
        );
        
        // Verifica a resposta da API
        if (response.status === 201) {
          Alert.alert('Categoria cadastrada com sucesso')
          navigation.navigate('TabRoutes'); // Navega para a tela de Carteira
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

  return (
    <>
      <ContainerHeader>
        <Header appName="Categorias" />
      </ContainerHeader>
      <Container>
        <ContainerImage
          style={{
            shadowColor: COLORS.COLORS.BLACK,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 6,
          }}
        >
          <ImageButton>
            <ImageCategoria source={Edit} />
          </ImageButton>
        </ContainerImage>

        <ContainerAtributos>
          <InputDescricao
            placeholder="Entre com o nome da categoria"
            value={categoria}  // Usando o estado correto
            onChangeText={setCategoria}  // Atualiza o estado corretamente
          />
        </ContainerAtributos>

        <ContainerButton style={{ zIndex: -1 }}>
          <Button
            title=""
            onPress={handleSendData}  // Chama a função para enviar os dados
            style={{
              shadowColor: COLORS.COLORS.PURPLEDARK2,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 6,
            }}
          >
            <ButtonText>Cadastrar</ButtonText>
          </Button>
        </ContainerButton>

        <ButtonGoBack onPress={handleGoBackHome}>
          <CaretDoubleLeft size={25} weight="light" />
        </ButtonGoBack>
      </Container>
    </>
  );
};
