import { LocalDb } from "./LocalDb";
import { BackConfig } from '../../config';

export class Global {
    // 本地简易数据库
    static localDb = new LocalDb(BackConfig.localDbDir);
}