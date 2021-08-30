import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from './SignInScreen';

const RootStack = createStackNavigator();
const RootScreen = () => {
    return (
        // headerMode='none'
        <RootStack.Navigator>
            <RootStack.Screen name="SignInScreen" component={SignInScreen} />
            {/* <RootStack.Screen name="SplashScreen" component={SplashScreen} />
            <RootStack.Screen name="SignUpScreen" component={SignUpScreen} /> */}
        </RootStack.Navigator>
    )
}

export default RootScreen
