import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, SafeAreaView } from "react-native"
import AppLoading from "expo-app-loading"
import {ThemeProvider} from "styled-components/native"
import { NavigationContainer } from "@react-navigation/native";

import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_800ExtraBold
} from "@expo-google-fonts/poppins"

import { DMSans_400Regular } from "@expo-google-fonts/dm-sans"
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display"
import theme from "../src/styles/theme";
import {Routes} from './routes'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
    const [fontsLoaded] = useFonts({
        Poppins_300Light,
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold,
        Poppins_800ExtraBold,
        DMSans_400Regular,
        DMSerifDisplay_400Regular,
    })

    if(!fontsLoaded){
        return <AppLoading />
    }

    return (
        <GestureHandlerRootView style={{flex: 1}}>
        <ThemeProvider theme={theme}>
            <NavigationContainer>
            <StatusBar
                style="dark"
                translucent
                backgroundColor="transparent"
            />
        <View
            style={{
                flex: 1,
                backgroundColor: theme.COLORS.WHITE,
            }}
        >
             <Routes/> 
        </View>
        </NavigationContainer>
        </ThemeProvider>
        </GestureHandlerRootView>
    );
}

