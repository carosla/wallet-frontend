import React, { useEffect, useState } from "react";
import {
  BellSimpleRinging,
  ChartBarHorizontal,
  CurrencyCircleDollar,
} from "phosphor-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "@env";

import { Container, ContentHeader, Avatar, AppName, Status } from "./styles";

interface IHeader {
  appName: string;
  iconLeft?: boolean;
  textLeft?: boolean;
  avatarRight?: boolean;
  typeRelatorio?: boolean;
  typeTransaction?: boolean;
  typeNotification?: boolean;
}

// Mapeamento dos avatares pelo nome do arquivo
const avatarMap: Record<string, any> = {
  "avatar_0.png": require("../../assets/avatars/avatar_0.png"),
  "avatar_1.png": require("../../assets/avatars/avatar_1.png"),
  "avatar_2.png": require("../../assets/avatars/avatar_2.png"),
  "avatar_3.png": require("../../assets/avatars/avatar_3.png"),
  "avatar_4.png": require("../../assets/avatars/avatar_4.png"),
  "avatar_5.png": require("../../assets/avatars/avatar_5.png"),
  "avatar_6.png": require("../../assets/avatars/avatar_6.png"),
  "avatar_7.png": require("../../assets/avatars/avatar_7.png"),
  "avatar_8.png": require("../../assets/avatars/avatar_8.png"),
  "avatar_9.png": require("../../assets/avatars/avatar_9.png"),
  "avatar_10.png": require("../../assets/avatars/avatar_10.png"),
  "avatar_11.png": require("../../assets/avatars/avatar_11.png"),
};

export const Header = ({
  iconLeft,
  typeRelatorio,
  appName,
  textLeft,
  avatarRight,
  typeTransaction,
  typeNotification,
}: IHeader) => {
  const [fotoPerfil, setFotoPerfil] = useState<string>("avatar_0.png");

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(`${API_URL}/api/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { foto_perfil } = response.data;
        setFotoPerfil(foto_perfil || "avatar_1.png");
      } catch (error) {
        console.error("Erro ao buscar avatar do perfil:", error);
      }
    };

    fetchAvatar();
  }, []);

  return (
    <Container>
      {iconLeft && (
        <>
          {typeRelatorio && (
            <ChartBarHorizontal
              size={32}
              weight="light"
              style={{ marginLeft: 10 }}
            />
          )}
          {typeNotification && (
            <BellSimpleRinging
              size={32}
              weight="light"
              style={{ marginLeft: 10 }}
            />
          )}
          {typeTransaction && (
            <CurrencyCircleDollar
              size={32}
              weight="light"
              style={{ marginLeft: 10 }}
            />
          )}
        </>
      )}

      <ContentHeader>
        <AppName>{appName}</AppName>
        {textLeft && <Status>Ativo</Status>}
      </ContentHeader>

      {avatarRight && <Avatar source={avatarMap[fotoPerfil]} />}
    </Container>
  );
};
