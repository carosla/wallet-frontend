import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { Container, InputContainer } from "./styles";

interface InputProps extends TextInputProps {
    placeholder?: string;
    value: string;
}

const InputDescricao: React.FC<InputProps> = ({ placeholder, value, ...rest }) => {
    const [isFocused, setIsFocused] = useState(false);


    return (
        <Container>
            <InputContainer
                placeholder={placeholder}
                value={value}
                {...rest}
            />
        </Container>
    );
};

export default InputDescricao;
