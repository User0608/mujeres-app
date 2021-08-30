import React from 'react'
import { StyleSheet } from 'react-native'
import { HomeScreen } from './HomeScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { PerfilScreen } from './PerfilScreen';
import { CameraScreen } from './CameraScreen';
const Tab = createMaterialBottomTabNavigator();

export const HomeStackScreen = () => {    
    return (
        <Tab.Navigator initialRouteName="Home" >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarColor: '#009387',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="home"
                            color={color}
                            size={26}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Camera"
                component={CameraScreen}
                options={{
                    tabBarLabel: 'Camera',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="camera"
                            color={color}
                            size={26}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={PerfilScreen}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="account"
                            color={color}
                            size={26}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({

});