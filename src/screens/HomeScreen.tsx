import React from 'react'
import { View, Text} from 'react-native'
import { HeaderBarExitButton } from '../components/HeaderBarExitButton';

export const HomeScreen = () => {
    return (        
       <View>
           <HeaderBarExitButton title="Home"/>
           <Text>Hola bb!! home</Text>
       </View>
    )
}

