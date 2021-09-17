import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { AlertaDetalleComponent } from './AlertaDetalleComponent';
import { AlertaScreen } from './AlertaScreen';
import { View } from 'react-native-animatable';

const Stack = createStackNavigator();
export const AlertaRootScreen = () => {
    return (
        <Stack.Navigator initialRouteName="AlertaScreen">
            <Stack.Screen name="AlertaScreen" component={AlertaScreen} />
            <Stack.Screen name="DetalleAlerta" component={AlertaDetalleComponent} />
        </Stack.Navigator>
    )
}

