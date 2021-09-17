import React, { useReducer, useEffect, useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './src/helpers/contextApp';
import { RootStackScreen } from './src/screens/RootScreen';
import { initialLoginState, loginReducer } from './src/helpers/loginReducer';
import { useAuthContext } from './src/hooks/useAuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native-animatable';
import { HomeStackScreen } from './src/screens/HomeStackScreen';

export const App = () => {
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);
  const context = useAuthContext(dispatch);  
  useEffect(() => {
    setTimeout(async () => {
      let token: string = ''
      let username: string = ''
      try {
        let t = await AsyncStorage.getItem('@token');
        token = t ? t : ""
        let un = await AsyncStorage.getItem('@username');
        username = un ? un : ""
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token, username });      
    }, 1000);
  }, []);


  return (
    <AuthContext.Provider value={context}>
      <NavigationContainer>
        {loginState.token === "" ?
          <RootStackScreen /> :
          <HomeStackScreen />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
