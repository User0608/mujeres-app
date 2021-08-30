import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'
import { View, Text, StyleSheet } from 'react-native'
import { RootStackParamList } from '../helpers/RootStackParams';
type authScreenProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
export const SignUpScreen = () => {
    const navigation = useNavigation<authScreenProp>();
    return (
        <View>
            <Text>Hola bb!! upppp</Text>            
        </View>
    )
}

