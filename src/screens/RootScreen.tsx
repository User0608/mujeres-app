import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import {SignInScreen} from './SignInScreen';
import {SignUpScreen} from './SignUpScreen';

const Stack = createStackNavigator();

export const RootStackScreen = () => (
    <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignInScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
    </Stack.Navigator>
);

