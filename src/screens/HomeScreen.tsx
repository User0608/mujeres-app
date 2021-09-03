import React, { useState, useEffect } from 'react'
import { View, Text, Image, Button } from 'react-native'
import { HeaderBarExitButton } from '../components/HeaderBarExitButton';
import { ScrollView } from 'react-native-gesture-handler';
import * as FS from 'react-native-fs'
import { CImagenContainer } from '../components/CImagenContainer';
import MapView, { Marker, PROVIDER_GOOGLE, LatLng, MapEvent } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';

export const HomeScreen = () => {
    const [archivos, setArchivos] = useState<Array<string>>([])
    const position = {
        latitude: -7.179077,
        longitude: -79.436883,
        latitudeDelta: 0.0952,
        longitudeDelta: 0.0451,
    }
    const [location, setLocation] = useState<LatLng>(
        {
            latitude: -7.1783096,
            longitude: -79.4388577
        }
    )
    const l = useLocation(location)
    useEffect(() => {
        let myFiles: Array<string> = []
        FS.readDir(`${FS.CachesDirectoryPath}/Camera`).then(files => {
            files.forEach(f => {
                myFiles = [...myFiles, `file://${f.path}`]
            })
            setArchivos(myFiles)
        })
    }, [])
    const handlerSelect = (path: string) => {
        console.log("Selected:", path)
    }
    const handlerUnSelect = (path: string) => {
        console.log("Unselected:", path)
    }

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
                style={{
                    width: "100%",
                    height: "100%",
                }}
                region={{ ...position, ...location }}
            >
                {!!location && <Marker
                    coordinate={{ ...location }}
                    title="Home"
                />}
            </MapView>
        </View>
    )
}

