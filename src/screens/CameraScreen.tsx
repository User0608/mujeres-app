import React, { useRef } from 'react';
import { useState } from 'react';
import {
    View,
    ToastAndroid,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export const CameraScreen = () => {
    const cameraRef = useRef<any>()
    const [recording, setRecording] = useState(false);

    const takePicture = async () => {
        if (cameraRef) {
            const options = { quality: 0.5, base64: true };
            try {
                await cameraRef.current.takePictureAsync(options);
                ToastAndroid.show("Imagen guardada", ToastAndroid.SHORT)
            } catch (e) {
                Alert.alert('Error', "No se pudo guardar el archivo", [
                    { text: 'Okay' }
                ]);
            }
        }
    };
    const recordVideo = async () => {
        if (cameraRef.current && !cameraRef.current.state.recording) {
            cameraRef.current.state.recording = true
            const options = {
                quality: '480p',
                maxDuration: 300,
                maxFileSize: 100 * 1024 * 1024
            }
            cameraRef.current.setState({ recording: true, elapsed: -1 }, async () => {
                let result = null
                try {
                    setRecording(true)
                    result = await cameraRef.current.recordAsync(options)
                } catch (err) {
                    console.warn("VIDEO RECORD FAIL", err.message, err);
                    Alert.alert("Error", "No se pudo guardar el video" + err.message);
                    setRecording(false)
                }
                if (result) {
                    ToastAndroid.show("Video guardado!", ToastAndroid.SHORT)
                }
                setTimeout(() => {
                    cameraRef.current.setState({ recording: false });
                    console.log("Si se ejecuto")
                }, 500)
            })
        }
    }
    const stopRecording = async () => {
        if (cameraRef.current && cameraRef.current.state.recording) {
            cameraRef.current.stopRecording();
            setRecording(false)
        }
    }
    return (
        <View style={styles.container}>
            <RNCamera
                ref={cameraRef}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            />
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    onPress={takePicture}
                >
                    <MaterialCommunityIcons
                        name="camera"
                        color="white"
                        size={50}
                    />
                </TouchableOpacity>
                {!recording?
                    <TouchableOpacity
                        onPress={recordVideo}
                    >
                        <MaterialCommunityIcons
                            name="record"
                            color="red"
                            size={60}
                        />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={stopRecording}
                    >
                        <MaterialCommunityIcons
                            name="stop"
                            color="red"
                            size={60}
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 50,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

});
