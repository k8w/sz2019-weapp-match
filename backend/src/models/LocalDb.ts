import * as fse from 'fs-extra';
import * as path from "path";

/**
 * 为便于比赛，减少外部依赖，直接使用本地文件做简单DB
 */
export class LocalDb {

    private _dir: string;
    private _cache: { [key: string]: Object | null } = {};

    constructor(dir: string) {
        this._dir = dir;
        fse.ensureDirSync(dir);
    }

    async get<T>(key: string): Promise<T | null> {
        if (!this._cache[key]) {
            this._cache[key] = await fse.readJSON(path.join(this._dir, key + '.json')).catch(e => null);
        }
        return this._cache[key] as T | null;
    }

    async set(key: string, value: Object): Promise<void> {
        this._cache[key] = value;
        await fse.outputJSON(path.join(this._dir, key + '.json'), value);
    }

    async del(key: string): Promise<void> {
        delete this._cache[key];
        await fse.remove(path.join(this._dir, key + '.json'));
    }

}