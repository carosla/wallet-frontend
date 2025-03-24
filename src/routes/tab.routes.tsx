import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View } from 'react-native'
import { ChartBar, CreditCard, GearSix} from 'phosphor-react-native'

import theme from '../styles/theme'
import { Carteira } from '../screens/Tab/Carteira'
import { Relatorio } from '../screens/Tab/Relatorio'
import { Settings } from '../screens/Tab/Settings'

const {Navigator, Screen} = createBottomTabNavigator();

export const TabRoutes = () => {
  return (
    <Navigator
      initialRouteName='Carteira'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: theme.COLORS.WHITE,
        tabBarActiveTintColor: theme.COLORS.WHITE,
        tabBarStyle: {
          backgroundColor: theme.COLORS.WHITE,
          height: 70,
          width: 250,
          bottom: 20,
          alignSelf: 'center',
          borderRadius: 60,
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: { width: 2, height: 10 }, 
          shadowColor: theme.COLORS.PURPLEDARK1,
          elevation: 5, 
          borderColor: 'transparent'
        }
      }}
    >
      <Screen 
        name='Carteira' 
        component={Carteira}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <View
            style={{
              marginTop: 30,
              alignItems: 'center',
              justifyContent: 'center',
          }}
            >
              {focused ? (
              <CreditCard 
                size={27} 
                weight='light'
                color={focused ? theme.COLORS.PURPLEDARK1 : theme.COLORS.PURPLEDARK2}
              />
              ) : (
                <CreditCard 
                size={27} 
                weight='fill'
                color={focused ? theme.COLORS.PURPLEDARK1 : theme.COLORS.PURPLEDARK2}
              />
              )}
            </View>
          ),
        }}
      />
      {/* <Screen 
        name='Notificacao' 
        component={Notificacao}
        options={{
          tabBarLabel: 'Notificação',
          tabBarIcon: ({ focused }) => (
            <View
            style={{
              marginTop: 5,
              alignItems: 'center',
              justifyContent: 'center',
          }}
            >
              {focused ? (
              <Bell 
                size={25} 
                weight='light'
                color={focused ? theme.COLORS.PURPLEDARK1 : theme.COLORS.PURPLEDARK2}
              />
              ) : (
                <Bell 
                size={25} 
                weight='fill'
                color={focused ? theme.COLORS.PURPLEDARK1 : theme.COLORS.PURPLEDARK2}
              />
              )}
              </View>
          )
        }}
      /> */}
      <Screen 
        name='Relatorio' 
        component={Relatorio}
        options={{
          tabBarLabel: 'Relatorio',
          tabBarIcon: ({ focused }) => (
            <View
            style={{
              marginTop: 30,
              alignItems: 'center',
              justifyContent: 'center',
          }}
            >
              {focused ? (
              <ChartBar 
                size={27} 
                weight='light'
                color={focused ? theme.COLORS.PURPLEDARK1 : theme.COLORS.PURPLEDARK2}
              />
              ) : (
                <ChartBar 
                size={27} 
                weight='fill'
                color={focused ? theme.COLORS.PURPLEDARK1 : theme.COLORS.PURPLEDARK2}
              />
              )}
              </View>
          )
        }}
      />
      <Screen 
        name='Settings' 
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ focused }) => (
            <View
            style={{
              marginTop: 30,
              alignItems: 'center',
              justifyContent: 'center',
          }}
            >
              {focused ? (
              <GearSix 
                size={27} 
                weight='light'
                color={focused ? theme.COLORS.PURPLEDARK1 : theme.COLORS.PURPLEDARK2}
              />
              ) : (
                <GearSix
                size={27} 
                weight='fill'
                color={focused ? theme.COLORS.PURPLEDARK1 : theme.COLORS.PURPLEDARK2}
              />
              )}
              </View>
          )
        }}
      />

    </Navigator>
  )
}