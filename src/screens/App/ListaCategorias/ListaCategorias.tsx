import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { CaretDoubleLeft, Trash } from "phosphor-react-native"; // Adicionar ícone Trash
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Header } from "../../../components/Header/Header";
import {
  Container,
  ContentFlat,
  IconTransaction,
  DetailsTransaction,
  NameTransaction,
  SubtTitleTransaction,
  AmountTransaction,
  ButtonGoBack,
} from "./styles";
import { API_URL } from "@env";

interface Categoria {
  categoria_id: string;
  categoria: string;
}

export const ListaCategorias = () => {
  const navigation = useNavigation();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(
          `${API_URL}/api/categorias`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  const handleGoBackHome = () => {
    navigation.goBack();
  };

  const handleDeleteCategoria = async (categoria_id: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.delete(
        `${API_URL}/api/categorias/${categoria_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        // Remover a categoria excluída da lista
        setCategorias((prevCategorias) =>
          prevCategorias.filter(
            (categoria) => categoria.categoria_id !== categoria_id
          )
        );
        Alert.alert("Categoria excluída com sucesso");
      }
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      Alert.alert("Erro", "Não foi possível excluir a categoria.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <>
      <Header iconLeft typeTransaction appName="Minhas Categorias" />
      <Container>
        <FlatList
          data={categorias}
          keyExtractor={(item) => item.categoria_id}
          renderItem={({ item }) => (
            <ContentFlat>
              {/* Aqui pode ter um ícone associado à categoria */}
              <IconTransaction
                source={require("")} // Substitua pelo ícone da categoria
              />

              <DetailsTransaction>
                <NameTransaction>{item.categoria}</NameTransaction>
              </DetailsTransaction>

              {/* Ícone de excluir categoria */}
              <TouchableOpacity 
                onPress={() => handleDeleteCategoria(item.categoria_id)}
                style={{ marginLeft: 10 }}
              >
                <Trash size={24} color="red" />
              </TouchableOpacity>
            </ContentFlat>
          )}
          showsVerticalScrollIndicator={false}
        />
        <ButtonGoBack onPress={handleGoBackHome}>
          <CaretDoubleLeft size={32} weight="light" />
        </ButtonGoBack>
      </Container>
    </>
  );
};
