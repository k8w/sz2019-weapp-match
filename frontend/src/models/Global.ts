import { TsrpcClient } from "tsrpc-miniapp";
import { FrontConfig } from '../config';
import { serviceProto } from '../protocols/proto';

export class Global {

    /** 当前已登录用户的OpenID，为空表示未登录 */ 
    static openId?: string;

    static apiClient = new TsrpcClient({
        server: FrontConfig.server,
        proto: serviceProto
    })
}

getApp().Global = Global;