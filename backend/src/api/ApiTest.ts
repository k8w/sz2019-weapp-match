import { ApiCall } from "tsrpc";
import { ReqTest, ResTest } from "../protocols/PtlTest";

export async function ApiTest(call: ApiCall<ReqTest, ResTest>) {
    call.succ({
        reply: 'Hello, ' + call.req.name
    })
}