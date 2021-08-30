import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { CInput } from '../components/CInput';
import { RootStackParamList } from '../helpers/RootStackParams';

type authScreenProp = StackNavigationProp<RootStackParamList, 'SignIn'>

export const SignInScreen = () => {
    const navigation = useNavigation<authScreenProp>();

    const handlerChange = (name: string, value: string) => {
        console.log(name, ":", value)
    }
    return (
        <View style={styles.container}>
            <View style={styles.loginBox}>
                <CInput
                    name="username"
                    label="Username"
                    onChange={handlerChange}
                />
                <CInput
                    type='password'
                    name="password"
                    label="Password"
                    onChange={handlerChange}
                />
            </View>
        </View>
    )
}
{/* <Text>Hola bb!!</Text>
  <Button title="ok" onPress={() => { navigation.navigate('SignUp') }} /> */}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    loginBox:{
        padding:20,
        width:440,
        height:300,
        borderRadius:20,
        borderWidth:1
    }
});