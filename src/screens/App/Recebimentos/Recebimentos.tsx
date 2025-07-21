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
import { Calendar, Pen, CaretDoubleLeft } from "phosphor-react-native";
import { Text, Alert, TouchableOpacity, View, Modal, Keyboard } from "react-native";
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR");
  };

  const handleDateChange = (event: any, selected?: Date) => {
    if (event.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }

    if (selected) {
      setSelectedDate(selected);
    }

    setShowDatePicker(false);
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
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
    const localDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
    const formattedDate = localDate.toISOString().split("T")[0];


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
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
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
              onSubmitEditing={handleSubmit}
              returnKeyType="done"
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
              {formatDate(selectedDate)}
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
