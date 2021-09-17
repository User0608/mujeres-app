import { useEffect, useState, useRef } from "react"
import { ToastAndroid } from 'react-native';
import RNLocation from 'react-native-location';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';


interface Location {
    latitude: number
    longitude: number
}

export const useLocation = () => {
    const [myLocation, setMyLocation] = useState<Location | null>(null)
    const ref = useRef(true)
    useEffect(() => {
        return () => { ref.current = false }
    }, [])
    useEffect(() => {
        RNLocation.configure({ distanceFilter: 5.0 })
        check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then((result) => {
            switch (result) {
                case RESULTS.DENIED:
                    request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then(r => {
                        if (r === RESULTS.GRANTED)
                            ToastAndroid.show("Welcome", ToastAndroid.SHORT)
                    })
                    break;
                case RESULTS.GRANTED:
                    RNLocation.getLatestLocation({ timeout: 100 }).then(
                        (result) => {
                            if (ref.current) {
                                let lat = -7.2277743
                                let long = -79.4313308
                                if (result) {
                                    if (result.latitude)
                                        lat = result.latitude
                                    if (result.longitude)
                                        long = result.longitude
                                }
                                setMyLocation({
                                    latitude: lat,
                                    longitude: long
                                })
                            }
                        }
                    )
                    break;
            }
            console.log("Se ejecuta", result)
        }).catch(err => {
            console.log("Error")
        })

    }, [])
    return myLocation
}