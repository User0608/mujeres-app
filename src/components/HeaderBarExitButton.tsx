import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../helpers/contextApp';
interface Props {
    title?: string
}
export const HeaderBarExitButton = ({ title }: Props) => {
    const context = React.useContext(AuthContext)
    const handlerExit = () => {
        Alert.alert(
            "Mensaje",
            "Close session?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK", onPress: () => {
                        
                        context?.signOut()
                    }
                }
            ]
        );
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <TouchableOpacity
                onPress={handlerExit}
            >
                <MaterialCommunityIcons
                    name="exit-to-app"
                    color="#ab000d" size={26}
                />
                <Text style={styles.label}>Close</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 40,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20

    },
    label: {
        fontSize: 10,
    },
    text: {
        fontSize: 25,
        fontWeight: '800',
    }
});
