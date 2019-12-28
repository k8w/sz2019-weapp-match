import * as path from "path";
import { FileServerOptions } from './src/models/FileServer';

export const BackConfig = {
    port: 8081,

    /** 微信小程序的APPID */
    wxAppId: 'wx98e454a8d51d0356',
    /** 微信小程序的APP Secret */
    wxAppSecret: 'adc302d2c4298dd5ea26ca0aa0c8ce72',

    /** 静态文件服务配置 */
    fileServer: {
        /** 静态文件根目录 */
        dir: path.resolve(__dirname, './static/'),
        /** 静态文件URL前缀 */
        urlPrefix: '/static/',
        /** 前台缓存时间（秒） */
        cacheSec: 0,
        // cacheSec: 315360000,
    } as FileServerOptions,

    /** 上传文件的存放目录（相对于fileServer根目录） */
    uploadDir: 'uploads',

    /** LocalDB的数据文件存放目录 */
    localDbDir: path.resolve(__dirname, './db'),

}