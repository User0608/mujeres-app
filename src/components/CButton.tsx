import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StyleProp,
    ViewStyle
} from 'react-native'

interface Props {
    onPress: (id?: string) => void
    id?: string
    text: string
    style?: StyleProp<ViewStyle>
    color?: string
}

export const CButton = ({color, text, id, style, onPress }: Props) => {
    return (
        <View style={[styles.bordes, style]}>
            <TouchableOpacity 
            onPress={()=>onPress(id)}
            style={{ ...styles.small}}
            >
                <Text style={{ color: color,fontSize:15 }}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View >
    )
}
const styles = StyleSheet.create({
    bordes: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    small: {        
        height: '100%',
        width:'110%',
        justifyContent:'center',
        alignItems:'center',
    }
});