import { ApiCall } from "tsrpc";
import { ReqLogin, ResLogin } from '../protocols/PtlLogin';
import { httpsGet } from '../models/HttpsGet';
import { BackConfig } from '../../config';

export async function ApiLogin(call: ApiCall<ReqLogin, ResLogin>) {
    let url = 'https://api.weixin.qq.com/sns/jscode2session?appid='
        + BackConfig.wxAppId + '&secret=' + encodeURIComponent(BackConfig.wxAppSecret)
        + '&js_code=' + call.req.code + '&grant_type=authorization_code';
    call.logger.debug('[wxReq]', url)
    let wxRes = await httpsGet(url);
    call.logger.debug('[wxRes]', wxRes);
    let resJson = JSON.parse(wxRes);

    if (resJson.openid) {
        call.succ({
            openId: resJson.openid
        })
    }
    else {
        call.error('登录失败', resJson);
    }
}