import React from 'react'

import { Fontisto } from '@expo/vector-icons'

import { RectButtonProps} from 'react-native-gesture-handler'

import { Button, IconeFacebook, Title } from './styles'


interface Props extends RectButtonProps {
    title: string;
    IconName: React.ComponentProps<typeof Fontisto>["name"]
}

const ButtonSocial: React.FC<Props> = ({ title, IconName, ...rest}) => {
    return (
        <Button {...rest}>
            <IconeFacebook name={IconName}/>
            <Title>{title}</Title>
        </Button>
    );
}

export {ButtonSocial};
