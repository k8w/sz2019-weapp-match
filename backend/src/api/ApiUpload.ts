import { ApiCall } from "tsrpc";
import { ReqUpload, ResUpload } from "../protocols/PtlUpload";
import * as fse from "fs-extra";
import * as path from "path";
import { BackConfig } from "../../config";

export async function ApiUpload(call: ApiCall<ReqUpload, ResUpload>) {
    if (call.req.ext !== '.png' && call.req.ext !== '.jpg') {
        call.error('不允许的扩展名: ' + call.req.ext);
        return;
    }

    let filepath = `${BackConfig.uploadDir}/${new Date().format('yyyyMMdd')}/${call.req.openId}_${Date.now()}${call.req.ext}`;
    await fse.outputFile(path.join(BackConfig.fileServer.dir, filepath), call.req.file);

    call.succ({
        uri: filepath
    })
}