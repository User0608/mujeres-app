import { useEffect, useState } from "react"
import { ToastAndroid, Alert } from 'react-native';
import RNLocation from 'react-native-location';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

interface Location {
    latitude: number
    longitude: number
}

export const useLocation = (init: Location) => {
    const [myLocation, setMyLocation] = useState<Location>(init)
    useEffect(() => {
        check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
            switch (result) {             
                case RESULTS.DENIED:
                    console.log('The permission has not been requested / is denied but requestable');
                    break;               
                case RESULTS.GRANTED:
                    console.log('The permission is granted');
                    break;
            }
        })
    }, [])
    return myLocation
}