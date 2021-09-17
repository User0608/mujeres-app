import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';


export const useToken = () => {
    const ref = useRef(true)
    const [token, setToken] = useState("")
    useEffect(() => {
        return () => { ref.current = false }
    }, [])

    useEffect(() => {
        AsyncStorage.getItem("@token").then(value => {
            if (ref.current)
                setToken(value ? value : "")
        })
    }, [])
    return token
}
