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

    protected _dir: string;
    protected _urlPrefix: string;
    protected _prefixReg: RegExp;
    protected _cacheHeader?: string;

    constructor(dir: string, urlPrefix: string, cacheHeader?: string) {
        this._dir = dir;
        this._urlPrefix = urlPrefix;
        this._prefixReg = new RegExp('^' + urlPrefix);
        this._cacheHeader = cacheHeader;

        // 确保uploadDir建立
        fse.ensureDirSync(dir);
    }

    /** 判断这个请求是否属于本服务应该处理的 */
    shouldServe(req: http.IncomingMessage) {
        return req.method === 'GET' && req.url && req.url.startsWith(this._urlPrefix);
    }

    /** 提供文件服务 */
    async serve(req: http.IncomingMessage, res: http.ServerResponse, logger?: Logger) {
        let filepath = req.url!.replace(this._prefixReg, '');

        try {
            let file = await fse.readFile(path.join(this._dir, filepath));

            // Mime Type
            let extMatch = filepath.match(/\.\w+$/);
            let mimeType = extMatch && MIME_TYPES[extMatch[0]];
            if (mimeType) {
                res.setHeader('Content-type', mimeType);
            }

            if (this._cacheHeader) {
                res.setHeader('Cache-Control', this._cacheHeader);
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