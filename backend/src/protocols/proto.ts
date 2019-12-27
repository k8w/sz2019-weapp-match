import { ServiceProto } from 'tsrpc-proto';
import { ReqTest, ResTest } from './PtlTest'
import { ReqUpload, ResUpload } from './PtlUpload'

export interface ServiceType {
    req: {
        "Test": ReqTest,
        "Upload": ReqUpload
    },
    res: {
        "Test": ResTest,
        "Upload": ResUpload
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "services": [
        {
            "id": 0,
            "name": "Test",
            "type": "api",
            "req": "PtlTest/ReqTest",
            "res": "PtlTest/ResTest"
        },
        {
            "id": 1,
            "name": "Upload",
            "type": "api",
            "req": "PtlUpload/ReqUpload",
            "res": "PtlUpload/ResUpload"
        }
    ],
    "types": {
        "PtlTest/ReqTest": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlTest/ResTest": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "reply",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlUpload/ReqUpload": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "openId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "file",
                    "type": {
                        "type": "Buffer",
                        "arrayType": "Uint8Array"
                    }
                },
                {
                    "id": 2,
                    "name": "ext",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlUpload/ResUpload": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "uri",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        }
    }
};