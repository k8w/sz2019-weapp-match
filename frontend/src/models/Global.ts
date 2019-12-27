import { TsrpcClient } from "tsrpc-miniapp";
import { FrontConfig } from '../config';
import { serviceProto } from '../protocols/proto';

export class Global {
    static apiClient = new TsrpcClient({
        server: FrontConfig.server,
        proto: serviceProto
    })
}