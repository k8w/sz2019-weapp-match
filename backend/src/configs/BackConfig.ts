import * as path from "path";

export const BackConfig = {
    port: 3000,

    /** 文件服务根目录 */
    staticDir: path.resolve(__dirname, '../../static/'),
    /** 文件服务URL前缀 */
    staticUri: '/static/',
    /** 上传文件的存放目录（相对于static） */
    uploadDir: 'uploads',
    /** 允许前台缓存 */
    staticCacheHeader: 'max-age=315360000',

    localDbDir: path.resolve(__dirname, '../../db'),

}