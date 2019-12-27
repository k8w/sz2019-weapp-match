export interface ReqUpload {
    openId: string,
    file: Uint8Array,
    ext: string
}

export interface ResUpload {
    uri: string
}