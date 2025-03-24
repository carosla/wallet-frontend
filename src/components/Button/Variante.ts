import theme from "../../styles/theme";

interface ButtonStyle {
    Button: {
        backgroundColor: string;
        borderWidth?: number;
        borderColor?: string;
    };
    title: {
        color: string;
    };
    icon: {
        color: string;
    }
};

export interface ButtonVariant {
    enabled: ButtonStyle;
    desabled: ButtonStyle;
};

const ButtonPrimary: ButtonVariant = {
    enabled: {
        Button: {
            backgroundColor: theme.COLORS.PRIMARY,
        },
        title: {
            color: theme.COLORS.WHITE,
        },
        icon: {
            color: theme.COLORS.WHITE
        }
    },
    desabled: {
        Button: {
            backgroundColor: theme.COLORS.GRAY_100,
        },
        title: {
            color: theme.COLORS.WHITE,
        },
        icon: {
            color: theme.COLORS.WHITE
        }
    },
}

const buttonOutLine : ButtonVariant = {
    enabled: {
        Button: {
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: theme.COLORS.PRIMARY,
        },
        title: {
            color: theme.COLORS.GRAY1,
        },
        icon: {
            color: theme.COLORS.GRAY1,
        },
    },
    desabled: {
        Button: {
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: theme.COLORS.PRIMARY,
        },
        title: {
            color: theme.COLORS.GRAY_100,
        },
        icon: {
            color: theme.COLORS.GRAY_100,
        },
    },
}

const buttonBlack: ButtonVariant = {
    enabled: {
        Button: {
            backgroundColor: theme.COLORS.BLACK,
        },
        title: {
            color: theme.COLORS.ORANGE_300,
        },
        icon: {
            color: theme.COLORS.ORANGE_300,
        },
    },
    desabled: {
        Button: {
            backgroundColor: theme.COLORS.GRAY_100,
        },
        title: {
            color: theme.COLORS.WHITE,
        },
        icon: {
            color: theme.COLORS.WHITE,
        },
    },
}

export const variants = {
    primary: ButtonPrimary,
    outline: buttonOutLine,
    black: buttonBlack,
}