import React, { useEffect } from 'react'
import { View, Button, StyleSheet, Alert, Image, TouchableOpacity, Text } from 'react-native';
import { getFetchData } from '../service/service'
import { useToken } from '../hooks/useToken';
import { useState } from 'react';
import { AlertaModel } from '../models/AlertaModel';
import { AlertaComponent } from '../components/AlertaComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { CImagenContainer } from '../components/CImagenContainer';
import * as FS from 'react-native-fs'
import { uploadFile } from '../service/uploadFile';
import { ToastAndroid } from 'react-native';

export const AlertaDetalleComponent = ({ route }: any) => {
    const { alertaId } = route.params
    const token = useToken()
    const [alerta, setAlerta] = useState<AlertaModel>()
    const [mediaBox, setMediaBox] = useState(false);
    const [archivos, setArchivos] = useState<Array<string>>([])
    const [fileToSend, setFileToSend] = useState<Array<string>>([])
    const [show, setShow] = useState(false)

    const loadData = async () => {
        try {
            let response = await getFetchData(`alerta/${alertaId}`, token)
            if (response.code === "OK") {
                setAlerta(response.data)
            }
        } catch {
            Alert.alert('Error', 'No se pudo conectar con el servicio', [
                { text: 'Okay' }
            ]);
        }
    }
    useEffect(() => {
        if (token != "")
            loadData()
    }, [token])

    useEffect(() => {
        if (mediaBox) {
            let myFiles: Array<string> = []
            FS.readDir(`${FS.CachesDirectoryPath}/Camera`).then(files => {
                files.forEach(f => {
                    myFiles = [...myFiles, `file://${f.path}`]
                })
                setArchivos(myFiles)
            })
        }
    }, [mediaBox])

    const handlerSelect = (path: string) => {
        setFileToSend([...fileToSend, path])
    }

    const handlerUnSelect = (path: string) => {
        setFileToSend(fileToSend.filter(t => t != path))
    }
    const handlerStartUpload = () => {
       setShow(true)
    }
    const onUploaded = () => {
        ToastAndroid.show("Archivos Subidos", ToastAndroid.SHORT)
       setShow(false)
    }
    const onError = () => {
        Alert.alert('Error', 'No se pudo conectar con el servicio', [
            { text: 'Okay' }
        ]);
        setShow(false)
    }
    const handlerSendMedia = () => {
        Alert.alert("Mensaje", "Estas segura de enviar la alerta?",
            [{ text: "Cancel", style: "cancel" }, {
                text: "OK", onPress: async () => {
                    uploadFile(alertaId, fileToSend, handlerStartUpload, onUploaded, onError)
                }
            }
            ]);
    }
    return (
        <View>
            {alerta &&
                <View>
                    <AlertaComponent
                        id={alerta.alerta_id}
                        fecha={new Date(alerta.created)}
                        estado={alerta.estado}
                        num_files={alerta.multimedias.length}
                        handlerPress={() => { }}
                    />
                    <Button title="Subir archivos" onPress={() => { setMediaBox(true) }} />
                    {
                        alerta.multimedias.map((m) => (
                            <Image
                                source={{
                                    uri: m.url
                                }}
                            />
                        ))
                    }
                </View>
            }
            {mediaBox &&
                <View>
                    <ScrollView>
                        <View>
                            <CImagenContainer
                                onSelect={handlerSelect}
                                onUnSelect={handlerUnSelect}
                                imagenes={archivos}
                            />
                        </View>
                    </ScrollView>
                    {show && <Text style={{ marginLeft: 10 }}>Enviando...</Text>}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handlerSendMedia}
                    >
                        <Text style={styles.text}>
                            Enviar archivos seleccionados
                        </Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 200,
        borderRadius: 30,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 10,
        marginVertical: 5,
    },
    text: {
        color: 'white'
    }
});
