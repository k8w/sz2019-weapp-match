import { LocalDb } from "./LocalDb";
import { BackConfig } from '../configs/BackConfig';

export class Global {
    // 本地简易数据库
    static localDb = new LocalDb(BackConfig.localDbDir);
}