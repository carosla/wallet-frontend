import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Container,
  ButtonText,
  ContainerAtributos,
  Button,
  ContainerButton,
  ContainerValor,
  ContainerHeader,
  ButtonGoBack,
} from "./styles";
import { Calendar, Pen } from "phosphor-react-native";
import { Text, Alert, TouchableOpacity, View, Modal } from "react-native";
import { CaretDoubleLeft } from "phosphor-react-native";
import InputDescricao from "../../../components/Input_Descricao";
import InputValor from "../../../components/Input_Valor";
import COLORS from "../../../styles/theme";
import DropdownInput from "../../../components/Dropdown";
import theme from "../../../styles/theme";
import { Header } from "../../../components/Header/Header";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export const Recebimentos = () => {
  const navigation = useNavigation();
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState(""); // string formatada para exibir
  const [categorias, setCategorias] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(
    null
  );
  const [token, setToken] = useState<string | null>(null);

  // Date Picker
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Função para formatar data para exibição (dd-mm-yyyy)
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Converte para yyyy-mm-dd antes de enviar
  const convertDateToTimestamp = (date: string) => {
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (event: any, selected?: Date) => {
    setShowDatePicker(false);
    if (selected) {
      setSelectedDate(selected);
      setData(formatDate(selected));
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      setToken(storedToken || "");
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const fetchCategorias = async () => {
      if (!token) return;
      try {
        const response = await axios.get(`${API_URL}/api/categorias`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const categoriasFormatadas = response.data.map((cat: any) => ({
          label: cat.categoria,
          value: cat.categoria_id.toString(),
        }));

        setCategorias(categoriasFormatadas);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        Alert.alert("Erro", "Não foi possível carregar as categorias.");
      }
    };

    fetchCategorias();
  }, [token]);

  const handleSendData = async () => {
    const formattedDate = convertDateToTimestamp(data);

    try {
      const response = await axios.post(
        `${API_URL}/api/transacao`,
        {
          categoria_id: selectedCategoria,
          valor,
          data: formattedDate,
          tipo_transacao: "entrada",
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
      console.error("Erro na requisição:", error.response?.data || error);
      Alert.alert("Erro", "Não foi possível cadastrar o recebimento.");
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
              placeholder="Entre com a descrição"
              placeholderTextColor={"#999"}
              value={descricao}
              onChangeText={setDescricao}
              style={{
                width: "100%",
                borderBottomColor: "transparent",
                marginTop: 10,
                fontFamily: theme.FONTS.POPPINSREGULAR,
              }}
            />
            <Pen size={20} color="#888" />
          </View>
        </ContainerAtributos>

        <ContainerAtributos>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 14,
              backgroundColor: "#fff",
              width: "80%",
            }}
          >
            <Text
              style={{
                flex: 1,
                color: "#999",
                fontFamily: theme.FONTS.POPPINSREGULAR,
              }}
            >
              {data || "Selecione a data"}
            </Text>
            <Calendar size={20} color="#888" />
          </TouchableOpacity>

          {showDatePicker && (
            <Modal transparent={true} animationType="fade">
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(51, 51, 52, 0.68)", 
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="inline" 
                  onChange={handleDateChange}
                  accentColor={theme.COLORS.PURPLEDARK1}
                />
              </View>
            </Modal>
          )}
        </ContainerAtributos>

        <ContainerAtributos>
          <DropdownInput
            selectedValue={selectedCategoria}
            onValueChange={setSelectedCategoria}
            options={categorias}
          />
        </ContainerAtributos>

        <ContainerButton>
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
