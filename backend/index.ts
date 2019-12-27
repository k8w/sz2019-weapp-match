import { TsrpcServer } from "tsrpc";
import { BackConfig } from "./config";
import { serviceProto } from "./src/protocols/proto";
import * as path from "path";
import { FileServer } from './src/models/FileServer';

let server = new TsrpcServer({
    port: BackConfig.port,
    proto: serviceProto,
    cors: '*'
});

// 自动注册API
server.autoImplementApi(path.resolve(__dirname, 'src/api'));

// 静态文件服务
const fileServer = new FileServer(BackConfig.fileServer);

// 处理API之外的其它GET请求
server.dataFlow.push(async (data, conn) => {
    let httpReq = conn.options.httpReq;
    let httpRes = conn.options.httpRes;

    if (httpReq.method === 'GET') {
        conn.logger.log('[GET]', httpReq.url);
        // 静态文件服务
        if (fileServer.shouldServe(httpReq)) {
            fileServer.serve(httpReq, httpRes);
        }
        // 默认展示页面
        else {
            httpRes.end(`<h1>Card API</h1>
            <p style="line-height: 2rem; color: darkblue;">version ${require('./package.json').version}</p>
            <p style="font-size: 0.75rem; color: gray;">Powered by TSRPC</p>`)
        }
        return false;
    }

    return true;
})

server.start();