import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { View, StyleSheet, Image, Alert, Button } from 'react-native';
import { CInput } from '../components/CInput';
import { RootStackParamList } from '../helpers/RootStackParams';
import { CButton } from '../components/CButton';
import { AuthContext } from '../helpers/contextApp';
import { useState } from 'react';
import { postData } from '../service/service';

type authScreenProp = StackNavigationProp<RootStackParamList, 'SignIn'>

export const SignInScreen = () => {
    const navigation = useNavigation<authScreenProp>();
    const context = React.useContext(AuthContext)

    const [datos, setDatos] = useState({
        username: "user002",
        password: "segura2020"
    })

    const handlerChange = (name: string, value: string) => {
        setDatos({
            ...datos,
            [name]: value
        })
    }
    const handlerLogin = () => {
        if (datos.username.length == 0 || datos.password.length == 0) {
            Alert.alert('Input Error!', 'Username or password no pueden ser nulos', [
                { text: 'Okay' }
            ]);
            return;
        }
        postData("login", { username: datos.username, password: datos.password }).then(r => {
            if (r.code === "OK") {
                context?.signIn(r.usuario.usuario_id.toString(), r.token);
                if (!context) console.log("El contexto es null!!!")
                return
            } else {
                Alert.alert('Error', r.message, [
                    { text: 'Okay' }
                ]);
            }
        }
        ).catch(() => {
            Alert.alert('Error', 'No se pudo conectar a internet', [
                { text: 'Okay' }
            ]);
            return
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.loginBox}>
                <Image
                    style={styles.imagen}
                    source={require('../../assets/logo.png')}
                />
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
                <Button
                    title="Hola"
                    onPress={handlerLogin}
                />

            </View>
            <CButton
                style={styles.bottomRight}
                text="Registrarse"
                onPress={() => { navigation.navigate('SignUp') }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginBox: {
        justifyContent: 'center',
        marginTop: 30,
        padding: 20,
        maxWidth: 440,
        maxHeight: 450,
        minWidth: 330,
        borderRadius: 20,
        borderWidth: 1,
        bottom: 100,
    },
    imagen: {
        alignSelf: 'center',
        width: 150,
        height: 180,
        marginBottom: 30,
    },
    bottomRight: {
        position: 'absolute',
        bottom: 40,
        right: 40,
        backgroundColor: '#00c853',
    },
    loginButton: {
        position: 'absolute',
        backgroundColor: "#ffb04c",
    }
});