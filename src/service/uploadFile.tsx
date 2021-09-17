import * as FS from 'react-native-fs'

interface FilePost {
    filename: string,
    filepath: string,
    name: string
    filetype: 'imagen/jpg' | 'video/mp4'
}
const handlerProgress = (res: any) => {
    console.log(res)
}
type Handler = () => void
export const uploadFile = (alertaID: number, files: Array<string>, uploadBegin: Handler, uploaded: Handler, onError: Handler) => {
    let myFiles: Array<FilePost> = []
    files.forEach((path, i) => {
        let type: 'imagen/jpg' | 'video/mp4' = 'imagen/jpg'
        let sl = path.split("/")
        let name = sl[sl.length - 1]
        path = path.replace("file://", "")
        console.log(path)
        if (path.includes('mp4')) type = 'video/mp4'

        myFiles = [...myFiles, {
            name: `file${i + 1}`,
            filepath: path,
            filename: name,
            filetype: type
        }]
    })
    FS.uploadFiles({
        toUrl: "http://ec2-18-217-113-62.us-east-2.compute.amazonaws.com:91/v1/multimedia/files",
        files: myFiles,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        fields: {
            'data': `${alertaID}`,
        },
        begin: uploadBegin,        
    }).promise.then((response) => {
        if (response.statusCode == 200) {
            uploaded()
        } else {
            onError()
        }
    }).catch((err) => {
        if (err.description === "cancelled") {
        }
        onError()
        console.log(err);
    });
}
