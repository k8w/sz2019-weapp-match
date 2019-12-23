import { TsrpcServer } from "tsrpc";
import { BackConfig } from "./configs/BackConfig";
import { serviceProto } from "./protocols/proto";
import * as path from "path";

let server = new TsrpcServer({
    port: BackConfig.port,
    proto: serviceProto,
    cors: '*'
});

server.autoImplementApi(path.resolve(__dirname, 'src/api'));

server.start();