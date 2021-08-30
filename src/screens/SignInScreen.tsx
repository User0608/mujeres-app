import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { RootStackParamList } from '../helpers/RootStackParams';

type authScreenProp = StackNavigationProp<RootStackParamList,'SignIn'>

export const SignInScreen = () => {
    const navigation = useNavigation<authScreenProp>();
    return (
        <View>
            <Text>Hola bb!!</Text>
            <Button title="ok" onPress={() => { navigation.navigate('SignUp') }} />
        </View>
    )
}

