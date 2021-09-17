import * as FS from 'react-native-fs'
export const pelador = async () => {
    try {
        let files = await FS.readDir(`${FS.CachesDirectoryPath}/Camera`)
        for (let i = 0; i < files.length; i++) {
            await FS.unlink(`${files[i].path}`)
            console.log("Se pelo:")
        }
        console.log("Fin!")
    } catch (e) {
        console.log("No se pudo hacer ni mierda:", e)
    }
}