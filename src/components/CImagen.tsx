import React, { useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
interface Props {
    path: string
    width?: number
    height?: number
    onSelect: (file: string) => void
    onUnSelect: (file: string) => void
}

export const CImagen = ({ path, width = 200, onSelect, onUnSelect }: Props) => {
    const [selected, setSelected] = useState(false)
    const handlerSelect = () => {
        if (selected) onUnSelect(path)
        else onSelect(path)
        setSelected(!selected)
    }
    return (
        <View>
            <Image
                style={{ width: width, height: width * 4 / 3, marginHorizontal: 10 }}
                resizeMode="center"
                source={{ uri: path }}
            />
            <TouchableOpacity
                onPress={handlerSelect}
                style={[
                    selected && styles.select,
                    styles.check,
                    { width: width * 0.15, height: width * 0.15 },
                ]}
            />
        </View>

    )
}
const styles = StyleSheet.create({
    check: {
        position: "absolute",
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "#EFEFEF",
        right: 20,
        top: 10,
    },
    select: {
        backgroundColor: "#41ACFF",
    }
})