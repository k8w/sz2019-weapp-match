import * as http from "http";
import * as fse from "fs-extra";
import * as path from "path";
import { Logger } from "tsrpc";

const MIME_TYPES: { [key: string]: string | undefined } = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg'
};

/** 简单文件服务 */
export class FileServer {

    protected _options: FileServerOptions;
    // 去除URL前缀的正则
    protected _prefixReg: RegExp;

    constructor(options: FileServerOptions) {
        this._options = options;
        this._prefixReg = new RegExp('^' + options.urlPrefix);

        // 确保uploadDir建立
        fse.ensureDirSync(options.dir);
    }

    /** 判断这个请求是否属于本服务应该处理的 */
    shouldServe(req: http.IncomingMessage) {
        return req.method === 'GET' && req.url && req.url.startsWith(this._options.urlPrefix);
    }

    /** 提供文件服务 */
    async serve(req: http.IncomingMessage, res: http.ServerResponse, logger?: Logger) {
        let filepath = req.url!.replace(this._prefixReg, '');

        try {
            let file = await fse.readFile(path.join(this._options.dir, filepath));

            // Mime Type
            let extMatch = filepath.match(/\.\w+$/);
            let mimeType = extMatch && MIME_TYPES[extMatch[0]];
            if (mimeType) {
                res.setHeader('Content-type', mimeType);
            }

            if (this._options.cacheSec) {
                res.setHeader('Cache-Control', 'max-age=' + this._options.cacheSec);
            }

            res.end(file);
        }
        catch (e) {
            logger?.error('File not found: ' + req.url);
            res.statusCode = 404;
            res.end('File not found');
            return;
        }
    }

}

export interface FileServerOptions {
    /** 文件根目录 */
    dir: string,
    /** URL前缀 */
    urlPrefix: string,
    /** 前台缓存时间（秒） */
    cacheSec: number
}