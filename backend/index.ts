import { TsrpcServer } from "tsrpc";
import { BackConfig } from "./src/configs/BackConfig";
import { serviceProto } from "./src/protocols/proto";
import * as path from "path";
import { FileServer } from './src/models/FileServer';
import { LocalDb } from './src/models/LocalDb';

let server = new TsrpcServer({
    port: BackConfig.port,
    proto: serviceProto,
    cors: '*'
});

server.autoImplementApi(path.resolve(__dirname, 'src/api'));

// 静态文件服务
const fileServer = new FileServer(BackConfig.staticDir, BackConfig.staticUri, BackConfig.staticCacheHeader);

// 处理TSRPC之外的其它请求
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
            httpRes.end(`<h1>Mini Program API</h1>
            <p style="line-height: 2rem; color: darkblue;">version ${require('./package.json').version}</p>
            <p style="font-size: 0.75rem; color: gray;">Powered by TSRPC</p>`)
        }
        return false;
    }

    return true;
})

server.start();

// 本地DB
export const localDb = new LocalDb(BackConfig.localDbDir);