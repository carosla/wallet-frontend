import React, { useState } from "react";
import { TextInputProps, View } from "react-native";
import { Container, ContainerValor, InputContainer } from "./styles";
import { TextAlignCenter } from "phosphor-react-native";

interface InputProps extends TextInputProps {
    placeholder?: string;
    value: string;
}

const InputValor: React.FC<InputProps> = ({ placeholder, value, ...rest }) => {
    const [isFocused, setIsFocused] = useState(false);


    return (
        <Container>
            <ContainerValor>
            
            <InputContainer
                placeholder={placeholder}
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...rest}
            /> 
            </ContainerValor>

        </Container>
    );
};

export default InputValor;
