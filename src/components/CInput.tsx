import React, { useState, useEffect } from 'react'
import { View, Text, StyleProp, ViewStyle } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { tStyles, iStyles } from '../../styles/styles';

interface Props {
    style?: StyleProp<ViewStyle>
    name: string
    label: string
    onChange: (name: string, value: string) => void
    type?: 'text' | 'password' | 'numeric'
    value?: string
}
const valid = "0123456789"
export const CInput = ({ value = "", style, name, label, type = 'text', onChange }: Props) => {
    const [err, setErr] = useState("")
    const [input, setInput] = useState(value);
    useEffect(() => {
        setInput(value)
    }, [value])
    const check = (text: string) => {
        setInput(text)
        if (type === 'numeric') {
            if (!parseInt(input)) {
                setErr("Solo ingrese números")
                return
            }
        }
        if (text.length > 0) {
            if (text[0] === ' ') {
                setErr("Espacios en blanco no permitido")
                return
            }
        }
        if (text.includes("  ")) {
            setErr("No se permite espacios en blanco")
            return
        }
        onChange(name, text)
        setErr("")
    }
    return (
        <View style={[style, { marginBottom: 10 }]}>
            <Text style={tStyles.label}>{label}</Text>
            <TextInput
                style={[iStyles.input, err != "" && iStyles.error]}
                onChangeText={check}
                value={input}
                secureTextEntry={type === 'password'}
            />
            {err != "" &&
                <Text style={tStyles.error}>{err}</Text>
            }
        </View>
    )
}
