import React, { 
  useEffect, 
  useState 
} from "react";

import { 
  FlatList, 
  ActivityIndicator, 
  Alert, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  View, 
  Text, 
  Button 
} from "react-native";

import { 
  CaretDoubleLeft, 
  Trash, 
  PencilSimple 
} from "phosphor-react-native";

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

  // Estados para edição
  const [modalVisible, setModalVisible] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState<Categoria | null>(null);
  const [novoNomeCategoria, setNovoNomeCategoria] = useState("");

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/categorias`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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

  const handleEditCategoria = (categoria: Categoria) => {
    setCategoriaEditando(categoria);
    setNovoNomeCategoria(categoria.categoria);
    setModalVisible(true);
  };

  const handleSalvarEdicao = async () => {
    if (!categoriaEditando) return;

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/api/categorias/${categoriaEditando.categoria_id}`,
        { categoria: novoNomeCategoria },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setCategorias((prevCategorias) =>
          prevCategorias.map((cat) =>
            cat.categoria_id === categoriaEditando.categoria_id
              ? { ...cat, categoria: novoNomeCategoria }
              : cat
          )
        );
        Alert.alert("Categoria atualizada com sucesso");
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
      Alert.alert("Erro", "Não foi possível editar a categoria.");
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

              {/* Botão de editar categoria */}
              <TouchableOpacity
                onPress={() => handleEditCategoria(item)}
                style={{ marginLeft: 10 }}
              >
                <PencilSimple size={24} color="blue" />
              </TouchableOpacity>

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

       {/* Modal de Edição */}
       <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Editar Categoria</Text>

            <TextInput
              value={novoNomeCategoria}
              onChangeText={setNovoNomeCategoria}
              placeholder="Novo nome da categoria"
              style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 }}
            />

            <Button title="Salvar" onPress={handleSalvarEdicao} />
            <View style={{ marginTop: 10 }} />
            <Button title="Cancelar" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};
