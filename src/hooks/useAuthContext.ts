import React, { Dispatch, useMemo, useRef, useEffect } from "react";
import { ActionLoginReducer } from '../helpers/loginReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthContext = (dispatch: Dispatch<ActionLoginReducer>) => {
    const context = useMemo(() => ({
        signIn: async (username: string, token: string) => {
            try {
                await AsyncStorage.setItem('@token', token);
                await AsyncStorage.setItem('@usuario_id', username);
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'LOGIN', username, token });
        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('@token');
                await AsyncStorage.removeItem('@usuario_id');
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'LOGOUT', username: "", token: "" });
        },
        signUp: () => {
        },
    }), []);
    return context;
}
