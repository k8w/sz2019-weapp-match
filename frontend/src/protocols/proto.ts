import { ServiceProto } from 'tsrpc-proto';
import { ReqDelCard, ResDelCard } from './PtlDelCard'
import { ReqGetCard, ResGetCard } from './PtlGetCard'
import { ReqGetCardList, ResGetCardList } from './PtlGetCardList'
import { ReqSaveCard, ResSaveCard } from './PtlSaveCard'
import { ReqTest, ResTest } from './PtlTest'
import { ReqUpload, ResUpload } from './PtlUpload'

export interface ServiceType {
    req: {
        "DelCard": ReqDelCard,
        "GetCard": ReqGetCard,
        "GetCardList": ReqGetCardList,
        "SaveCard": ReqSaveCard,
        "Test": ReqTest,
        "Upload": ReqUpload
    },
    res: {
        "DelCard": ResDelCard,
        "GetCard": ResGetCard,
        "GetCardList": ResGetCardList,
        "SaveCard": ResSaveCard,
        "Test": ResTest,
        "Upload": ResUpload
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "services": [
        {
            "id": 2,
            "name": "DelCard",
            "type": "api",
            "req": "PtlDelCard/ReqDelCard",
            "res": "PtlDelCard/ResDelCard"
        },
        {
            "id": 3,
            "name": "GetCard",
            "type": "api",
            "req": "PtlGetCard/ReqGetCard",
            "res": "PtlGetCard/ResGetCard"
        },
        {
            "id": 4,
            "name": "GetCardList",
            "type": "api",
            "req": "PtlGetCardList/ReqGetCardList",
            "res": "PtlGetCardList/ResGetCardList"
        },
        {
            "id": 5,
            "name": "SaveCard",
            "type": "api",
            "req": "PtlSaveCard/ReqSaveCard",
            "res": "PtlSaveCard/ResSaveCard"
        },
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
        "PtlDelCard/ReqDelCard": {
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
                    "name": "cardId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlDelCard/ResDelCard": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "delCount",
                    "type": {
                        "type": "Number",
                        "scalarType": "uint"
                    }
                }
            ]
        },
        "PtlGetCard/ReqGetCard": {
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
                    "name": "cardId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlGetCard/ResGetCard": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "card",
                    "type": {
                        "type": "Reference",
                        "target": "Card/Card"
                    }
                }
            ]
        },
        "Card/Card": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "desc",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "lastModified",
                    "type": {
                        "type": "Number",
                        "scalarType": "uint"
                    }
                }
            ]
        },
        "PtlGetCardList/ReqGetCardList": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "openId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlGetCardList/ResGetCardList": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "list",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Interface",
                            "properties": [
                                {
                                    "id": 0,
                                    "name": "id",
                                    "type": {
                                        "type": "String"
                                    }
                                },
                                {
                                    "id": 1,
                                    "name": "name",
                                    "type": {
                                        "type": "String"
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        },
        "PtlSaveCard/ReqSaveCard": {
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
                    "name": "card",
                    "type": {
                        "type": "Reference",
                        "target": "Card/Card"
                    }
                }
            ]
        },
        "PtlSaveCard/ResSaveCard": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "cardId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
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