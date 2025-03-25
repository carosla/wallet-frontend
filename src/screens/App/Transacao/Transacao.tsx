import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Container,
  ButtonText,
  ContainerAtributos,
  Button,
  ContainerButton,
  ContainerValor,
  ContainerHeader,
} from "./styles";
import { Text, Alert } from "react-native";
import { CaretDoubleLeft } from "phosphor-react-native";
import { ButtonGoBack } from "./styles";
import InputDescricao from "../../../components/Input_Descricao";
import InputValor from "../../../components/Input_Valor";
import COLORS from "../../../styles/theme";
import DropdownInput from "../../../components/Dropdown";
import theme from "../../../styles/theme";
import { Header } from "../../../components/Header/Header";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export const Transacao = () => {
  const navigation = useNavigation();
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [categorias, setCategorias] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(
    null
  );
  const [token, setToken] = useState<string | null>(null);
  

  // Função para buscar o token armazenado
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      setToken(storedToken || "");
    };
    fetchToken();
  }, []);

  // Carregar as categorias
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/categorias`
        );
        console.log("Categorias retornadas:", response.data); // Verifique o formato da resposta aqui

        // Garantir que a resposta esteja no formato esperado
        const categoriasFormatadas = response.data.map((cat: any) => ({
          label: cat.categoria, // Verifique o nome do campo
          value: cat.categoria_id.toString(), // Verifique o nome do campo
        }));

        setCategorias(categoriasFormatadas);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        Alert.alert("Erro", "Não foi possível carregar as categorias.");
      }
    };

    fetchCategorias();
  }, []);

  // Função para enviar os dados
  const handleSendData = async () => {
    // Verificando os dados antes de enviar
    console.log("Enviando dados para o backend:", {
      categoria_id: selectedCategoria,
      valor,
      data,
      tipo_transacao: "saída", // Sempre "saída" neste caso
      descricao,
    });
  
    try {
      const response = await axios.post(
        `${API_URL}/api/transacao`,
        {
          categoria_id: selectedCategoria,
          valor,
          data,
          tipo_transacao: "saída",
          descricao,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 201) {
        Alert.alert("Recebimento cadastrado com sucesso");
        navigation.navigate("TabRoutes");
      }
    } catch (error: any) {
      console.error("Erro na requisição:", error.response.data); // Exibe o erro do backend
    }
  };
  
  return (
    <>
      <ContainerHeader>
        <Header appName="Recebimentos" />
      </ContainerHeader>
      <Container>
        <ContainerValor>
          <Text
            style={{
              fontFamily: theme.FONTS.POPPINSBOLD,
              marginRight: 5,
              fontSize: 20,
            }}
          >
            R$
          </Text>
          <InputValor
            placeholder="0,00"
            keyboardType="numeric"
            value={valor}
            onChangeText={setValor}
            placeholderTextColor={COLORS.COLORS.BLACK}
          />
        </ContainerValor>

        <ContainerAtributos>
          <InputDescricao
            placeholder="Entre com a descrição"
            value={descricao}
            onChangeText={setDescricao}
          />
        </ContainerAtributos>

        <ContainerAtributos>
          <InputDescricao
            placeholder="Data (ex: 2025-03-16)"
            value={data}
            onChangeText={setData}
          />
        </ContainerAtributos>

        <ContainerAtributos>
          <DropdownInput
            selectedValue={selectedCategoria}
            onValueChange={setSelectedCategoria}
            options={categorias}
          />
        </ContainerAtributos>

        

        <ContainerButton style={{ zIndex: -1 }}>
          <Button title="" onPress={handleSendData}>
            <ButtonText>Enviar</ButtonText>
          </Button>
        </ContainerButton>

        <ButtonGoBack onPress={() => navigation.goBack()}>
          <CaretDoubleLeft size={25} weight="light" />
        </ButtonGoBack>
      </Container>
    </>
  );
};
