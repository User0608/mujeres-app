import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Alert, Button, TouchableOpacity } from 'react-native';
import { useLocation } from '../hooks/useLocation';
import { ScrollView } from 'react-native-gesture-handler';
import { useToken } from '../hooks/useToken';
import { getFetchData, postFetchData } from '../service/service';
import { useState } from 'react';
import { AlertaModel } from '../models/AlertaModel';
import { AlertaComponent } from '../components/AlertaComponent';
import { AlertaParamList } from '../helpers/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type AlertaNavigationProps = StackNavigationProp<AlertaParamList, 'AlertaScreen'>

export const AlertaScreen = () => {
    const location = useLocation()
    const navigation = useNavigation<AlertaNavigationProps>()
    const token = useToken()
    const [alertas, setAlertas] = useState<Array<AlertaModel>>([])
    const loadAlertas = () => {
        getFetchData("alerta", token).then(data => {
            if (data.code === "OK") {
                setAlertas([...data.data])
            }
        }).catch(() => {
            Alert.alert('Error', "No se pudo conectar con el servicio")
        })
    }
    useEffect(() => {
        if (token != "")
            loadAlertas()
        console.log("Si se ejecuta")
    }, [token])

    const handlerAlert = () => {
        Alert.alert("Mensaje", "Estas segura de enviar la alerta?",
            [{ text: "Cancel", style: "cancel" }, {
                text: "OK", onPress: async () => {
                    let response = await postFetchData("alerta", {
                        latitude: location?.latitude.toString(),
                        longitude: location?.longitude.toString()
                    }, token)
                    if (response.code === "OK")
                        loadAlertas()
                }
            }
            ]);
    }
    const handlerItemPress = (id: number) => {
        navigation.navigate('DetalleAlerta', { alertaId: id })

    }

    return (

        <ScrollView style={{ marginTop: 10 }}>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handlerAlert}
                >
                    <Text style={{ fontSize: 17, fontWeight: "900", color: "white" }}>Enviar Nueva alerta</Text>
                </TouchableOpacity>
                <Text style={styles.coordenadaText}>{location?.latitude},  {location?.longitude}</Text>
            </View>
            <View style={styles.container}>
                {
                    alertas.map((a) => (
                        <AlertaComponent
                            key={a.alerta_id}
                            id={a.alerta_id}
                            estado={a.estado}
                            fecha={new Date(a.created)}
                            num_files={a.multimedias.length}
                            handlerPress={handlerItemPress}
                        />)
                    )
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    button: {
        height: 50,
        width: 200,
        borderRadius: 10,
        backgroundColor: '#f57f17',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginRight: 20,
        marginVertical: 5,

    },
    coordenadaText: {
        textAlign: 'right',
        marginRight: 5,
        fontSize: 10,
    },
});