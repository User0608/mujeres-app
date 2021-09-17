import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { RootStackParamList } from '../helpers/RootStackParams';
import { CInput } from '../components/CInput';
import { postData } from '../service/service';
type authScreenProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
export const SignUpScreen = () => {
    const navigation = useNavigation<authScreenProp>();
    const [data, setData] = useState({
        username: "",
        password1: "",
        password2: ""
    })
    const { username, password1, password2 } = data

    const onChangeInputs = (name: string, value: string) => {
        setData({ ...data, [name]: value })
    }
    const handlerSubmit = async () => {
        if (data.password1.trim().length < 8 || data.password2.trim().length < 8 || data.username.trim().length < 8) {
            Alert.alert("Mensaje", "Tanto el usuario como la contraseña tienen que tener al menos 8 caracteres.", [
                { text: 'Okay' }
            ])
            return
        }
        if (data.password1 != data.password2) {
            Alert.alert("Mensaje", "Contraseña no coincide.", [
                { text: 'Okay' }
            ])
            setData({ ...data, password1: "", password2: "" })
            return
        }
        try {
            const response = await postData("/registrar", { username: data.username, password: data.password1 })                   
            if (response.code === "OK") {
                Alert.alert("Mensaje", "Datos registrados correctamente, ya puede iniciar session.", [
                    { text: 'Okay' }
                ])
                navigation.navigate("SignIn")
            } else {
                Alert.alert("Error Mensaje", "Lo sentimos, pero no se pudo completar la operacion, por favor intentelo mas tared", [
                    { text: 'Okay' }
                ])
            }
        } catch {
            Alert.alert("Error Message", "No se pudo establecer conexion con el servicio, compruebe su conexion de internet.", [
                { text: 'Okay' }
            ])
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.signUpBox}>
                <View>
                    <Text style={styles.title}>Formulario de registro</Text>
                </View>
                <CInput
                    value={username}
                    name="username"
                    label="Nombre de Usuario"
                    onChange={onChangeInputs}
                />
                <CInput
                    value={password1}
                    type="password"
                    name="password1"
                    label="Ingrese un contraseña"
                    onChange={onChangeInputs}
                />
                <CInput
                    value={password2}
                    name="password2"
                    type="password"
                    label="Vuelva a ingresar la contraseña"
                    onChange={onChangeInputs}
                />
                <Button
                    title="Registrar"
                    onPress={handlerSubmit}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpBox: {
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
    title: {
        textAlign: "center",
        marginTop: 10,
        marginBottom: 30,
        fontSize: 25,
        fontWeight: "700",
        color: "#0AAD4F"
    }
});
