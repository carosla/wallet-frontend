import React, { useState } from "react";
import Icon from '@expo/vector-icons/Ionicons'
import { useTheme } from "styled-components";
import { TextInputProps, TouchableOpacity } from "react-native";
import COLORS from "../../styles/theme";

import { Container, InputContainer } from "./styles";
interface InputProps {
    rightIcon?: boolean;
    leftIcon?: boolean;
    iconName: keyof typeof Icon.glyphMap;
    iconSize?: number;
    iconColor?: string;
    secureTextEntry?: boolean;
}

const Input: React.FC<InputProps & TextInputProps> = ({
    rightIcon, 
    leftIcon, 
    iconName, 
    iconSize, 
    secureTextEntry,
    iconColor, 
    ...rest
}: InputProps) => {

    const [secury, setSecury] = useState(secureTextEntry);

    return (
        <Container>
            {leftIcon && (
                <Icon
                name={iconName}
                size={iconSize}
                color={iconColor || COLORS.COLORS.GRAY2}
                style={{padding: 5}}
                />     
            )}
            <InputContainer 
                {...rest}
                secureTextEntry={secury}
                placeholderTextColor={COLORS.COLORS.GRAY3}
            />
                {rightIcon && (
                    <TouchableOpacity onPress={() => setSecury(!secury)}>
                        <Icon
                        name={secury ? 'eye' : 'eye-off'}
                        size={iconSize}
                        color={iconColor || COLORS.COLORS.GRAY2}
                        style={{padding: 5}}
                        />
                    </TouchableOpacity>
                )}
        </Container>
    )
}

export default Input

