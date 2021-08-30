import React from 'react'
import { HomeScreen } from './HomeScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

export const HomeStackScreen = () => {
    return (

        <Tab.Navigator>

            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',                   
                }}
            />

        </Tab.Navigator>
    )
}
