import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { HeaderBarExitButton } from '../components/HeaderBarExitButton';
import { ScrollView } from 'react-native-gesture-handler';
import { CImagenContainer } from '../components/CImagenContainer';
import MapView, { Marker, PROVIDER_GOOGLE, LatLng, MapEvent } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { AppParamList } from '../helpers/RootStackParams';
import { useNavigation } from '@react-navigation/native';
import { pelador } from '../helpers/pelador';


type AppProps = MaterialBottomTabNavigationProp<AppParamList, 'Home'>
export const HomeScreen = () => {
    const navigation = useNavigation<AppProps>()
    const position = {
        latitude: -7.179077,
        longitude: -79.436883,
        latitudeDelta: 0.0952,
        longitudeDelta: 0.0451,
    }
    const loca = useLocation()     
    return (
        <View>
            <HeaderBarExitButton title="Home" />
            {/* <ScrollView>
                <View>
                    <CImagenContainer
                        onSelect={handlerSelect}
                        onUnSelect={handlerUnSelect}
                        imagenes={archivos}
                    />
                </View>
            </ScrollView> */}
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ width: "100%", height: "100%" }}
                region={{ ...position, ...loca }}
            >
                {!!loca && <Marker
                    coordinate={{ latitude: loca.latitude, longitude: loca.longitude }}
                    title="Home"
                />}
            </MapView>
            <TouchableOpacity
                style={styles.alertaButton}
                onPress={() => { navigation.navigate('Alerta') }}
            >
                <Text style={styles.alertaText}>ALERTAR</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    alertaButton: {
        display: "flex",
        height: 60,
        width: 300,
        position: "absolute",
        bottom: 80,
        borderRadius: 20,
        backgroundColor: "#E74452",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
    },
    alertaText: {
        fontSize: 30,
        color: "#FFFFFF",
        textAlign: "center"
    }
});