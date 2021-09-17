import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
    id: number
    fecha: Date
    estado: string
    num_files: number
    handlerPress: (id: number) => void
}
export const AlertaComponent = ({ id, fecha, estado, num_files, handlerPress }: Props) => {


    return (
        <TouchableOpacity style={styles.container}
            onLongPress={() => { handlerPress(id) }}
        >
            <View style={styles.leftBox}>
                <Text style={styles.idText}>{id}</Text>
            </View>
            <View style={styles.rightBox}>
                <View>
                    <Text style={styles.fecha}>
                        {fecha.getDay()}/
                        {fecha.getMonth()}/
                        {fecha.getFullYear()}
                    </Text>
                    <Text style={styles.files}>{num_files} file upload</Text>
                    <Text style={styles.estado}>{estado}</Text>
                    <Text >{fecha.getHours()}:{fecha.getMinutes()}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    fecha: {
        marginTop: 5,
        fontSize: 19
    },
    estado: {
        textAlign: "right"
    },
    files: {
        color: '#523AFF'
    },
    container: {
        height: 100,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 5,
    },
    leftBox: {
        width: 60,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 20,
    },
    rightBox: {
        flex: 1,
        borderBottomWidth: 2,
        borderColor: '#DBDEE0'
    },
    idText: {
        fontSize: 40,
        fontWeight: "700",
        color: "#8A8989",
    },
});