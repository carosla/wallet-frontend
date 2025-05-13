import React, { useState, useEffect } from 'react';
import { Alert, TextInput } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Pen } from 'phosphor-react-native';

import { GoBack } from '../../../components/GoBack';
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
    EditableInput
} from './styles';

export const ConnectedAccount = () => {
    const { COLORS } = useTheme();

    // Suponha que os dados virão da API/backend
    const [nomePerfil, setNomePerfil] = useState<string | null>('Ana Profile');
    const [descricao, setDescricao] = useState<string>('Usuária ativa');
    const [email, setEmail] = useState<string>('ana@email.com');
    const [login, setLogin] = useState<string>('ana123');

    const [editando, setEditando] = useState(false);

    const nomeExibido = nomePerfil ?? login;

    const toggleEdicao = () => {
        setEditando(!editando);
    };

    const salvarEdicao = () => {
        // Aqui você colocaria lógica de salvar no backend
        setEditando(false);
        Alert.alert('Dados atualizados');
    };

    return (
        <>
            <GoBack />
            <Container>
                <Header>
                    <Avatar source={{ uri: 'https://avatars.githubusercontent.com/u/89313900?v=4' }} />
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
