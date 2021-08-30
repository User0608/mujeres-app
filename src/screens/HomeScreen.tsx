import React from 'react'
import { View, Text, Image } from 'react-native'
import { HeaderBarExitButton } from '../components/HeaderBarExitButton';
import { Dirs, FileSystem } from 'react-native-file-access'
import { useState } from 'react';
import { useEffect } from 'react';

export const HomeScreen = () => {
    const [medias, setMedia] = useState<string[]>([])
    FileSystem.ls(`${Dirs.CacheDir}/Camera`).then((files) => {
        let fs: string[] = []
        files.forEach((fName) => {
            let path = `file://${Dirs.CacheDir}/Camera/${fName}`
            fs = [...fs, path]
        })
        setMedia(fs)
    })

    return (
        <View>
            <HeaderBarExitButton title="Home" />
            <Text>Hola bb!! home</Text>
            {medias.map((f) => (
                <Image
                    key={f}
                    style={{ width: 100, height: 100 }}
                    source={{
                        uri: f
                    }}
                />
            ))
            }

        </View>
    )
}

