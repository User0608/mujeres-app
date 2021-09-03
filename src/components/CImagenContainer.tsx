import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { CImagen } from './CImagen';

interface Props {
    imagenes: Array<string>
    onSelect: (file: string) => void
    onUnSelect: (file: string) => void
}
export const CImagenContainer = ({ imagenes, onSelect, onUnSelect }: Props) => {
    console.log(">>>>>>>>>>>>", imagenes.length)
    return (
        <View >
            <ScrollView
                contentContainerStyle={styles.container}
                horizontal={true}
            >
                {
                    imagenes.map((path) => (
                        <CImagen
                            key={path}
                            onSelect={onSelect}
                            onUnSelect={onUnSelect}
                            path={path}
                        />
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 250,
        backgroundColor: "red"
    },
    imagen: {
        width: 150,
        marginHorizontal: 10,
        backgroundColor: "yellow"
    }
});