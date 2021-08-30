const API_URL = "http://192.16.0.101:91/v1"


const normalizePath = (path: string) => {
    if (path.length === 0) path = "/"
    else if (path[0] != "/") path = `/${path}`
    return path
}

const postData = async (path = "", data: any) => {
    path = normalizePath(path)
    const response = await fetch(`${API_URL}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    )
    return response.json()
}
const getFetchData = async (path = "", token: string) => {
    path = normalizePath(path)
    const response = await fetch(`${API_URL}${path}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    )
    return response.json()
}
const postFetchData = async (path = "", data: any, token: string) => {
    path = normalizePath(path)
    const response = await fetch(`${API_URL}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    }
    )
    return response.json()
}
const putFetchData = async (path = "", data: any, token: string) => {
    path = normalizePath(path)
    const response = await fetch(`${API_URL}${path}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    }
    )
    return response.json()
}
export {
    API_URL,
    postData,
    getFetchData,
    postFetchData,
    putFetchData
}

