import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { CButton } from '../components/CButton'
import { CInput } from '../components/CInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFetchData, postFetchData, putFetchData } from '../service/service';

export const PerfilScreen = () => {
    const [data, setData] = useState(
        {
            nombre: "",
            apellido_paterno: "",
            apellido_materno: "",
            telefono: "",
            dni: "",
            direccion: {
                provincia: "",
                distrito: "",
                direccion: "",
                referencia: ""
            }
        }
    )
    const [exist, setExist] = useState(false)
    const [tokenVale, setTokenValue] = useState("")
    const { direccion } = data

    useEffect(() => {
        AsyncStorage.getItem("@token").then(token => {
            AsyncStorage.getItem("@usuario_id").then(id => {
                getFetchData(`usuario/detalle/${id}`, token ? token : "")
                    .then((response) => {
                        if (response.code === "OK") {
                            setData({ ...data, ...response.data })
                            setExist(true)
                        }
                        if (response.code === "NO_FIND") setExist(false)
                        setTokenValue(token ? token : "")
                    }).catch(console.log)
            })
        })
    }, [])


    const handlerOnChangeDatos = (name: string, value: string) => {
        setData({
            ...data,
            [name]: value
        })
    }
    const handlerOnChangeDireccion = (name: string, value: string) => {
        setData({
            ...data,
            direccion: {
                ...direccion,
                [name]: value
            }
        })
    }
    const handlerSaveButton = () => {
        if (exist) {
            putFetchData("/usuario/detalle", data, tokenVale).then(response => {
                if (response?.code === "OK") {
                    Alert.alert('Success', "Datos Guardados correctamente", [
                        { text: 'Aceptar' }
                    ]);
                } else {
                    Alert.alert('Error', "Neo se completo la operación", [
                        { text: 'Aceptar' }
                    ]);
                    return
                }
                setData({ ...data, ...response.data })
            })
        } else {
            postFetchData("/usuario/detalle", data, tokenVale).then(response => {
                if (response?.code === "OK") {
                    Alert.alert('Success', "Datos Guardados correctamente", [
                        { text: 'Aceptar' }
                    ]);
                } else {
                    Alert.alert('Error', "Neo se completo la operación", [
                        { text: 'Aceptar' }
                    ]);
                    return
                }
                setData({ ...data, ...response.data })
            })
        }
    }
    return (
        <View style={styles.container}>
            <CButton
                style={styles.button}
                text="Guardar"
                color="white"
                onPress={handlerSaveButton}
            />
            <ScrollView style={{ marginTop: 50, paddingHorizontal: 20 }}>
                <View style={styles.formBox}>
                    <Text style={styles.title}>Datos personales</Text>
                    <CInput
                        name="nombre"
                        label="Nombres"
                        value={data.nombre}
                        onChange={handlerOnChangeDatos}
                    />
                    <CInput
                        name="apellido_paterno"
                        label="Apellido Paterno"
                        value={data.apellido_paterno}
                        onChange={handlerOnChangeDatos}
                    />
                    <CInput
                        name="apellido_materno"
                        label="Apellido Materno"
                        value={data.apellido_materno}
                        onChange={handlerOnChangeDatos}
                    />
                    <View style={{
                        flexDirection: 'row',
                        width: '100%'
                    }}>
                        <View style={{ flex: 2, paddingRight: 30 }}>
                            <CInput
                                name="telefono"
                                label="Telefono"
                                value={data.telefono}
                                onChange={handlerOnChangeDatos}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <CInput
                                name="dni"
                                label="Dni"
                                value={data.dni}
                                onChange={handlerOnChangeDatos}
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={{ ...styles.title, opacity: 0.5 }}>Dirección</Text>
                    <CInput
                        name="provincia"
                        label="Provincia"
                        value={direccion.provincia}
                        onChange={handlerOnChangeDireccion}
                    />
                    <CInput
                        name="distrito"
                        label="Distrito"
                        value={direccion.distrito}
                        onChange={handlerOnChangeDireccion}
                    />
                    <CInput
                        name="direccion"
                        label="Direccion vivienda"
                        value={direccion.direccion}
                        onChange={handlerOnChangeDireccion}
                    />
                    <CInput
                        name="referencia"
                        label="Referencias de la vivienda"
                        value={direccion.referencia}
                        onChange={handlerOnChangeDireccion}
                    />
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        paddingHorizontal: 20,
        fontWeight: '600',
        marginBottom: 30,
    },
    formBox: {
        marginBottom: 20,
    },
    button: {
        position: 'absolute',
        backgroundColor: '#0f5cf4',
        borderRadius: 20,
        top: 10,
        right: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 10,
    }
});