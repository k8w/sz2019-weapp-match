import { ApiCall } from "tsrpc";
import { ReqGetCardList, ResGetCardList } from "../protocols/PtlGetCardList";
import { getOrCreateUserCards } from "../models/db/UserCards";

export async function ApiGetCardList(call: ApiCall<ReqGetCardList, ResGetCardList>) {
    let userCards = await getOrCreateUserCards(call.req.openId);
    call.succ({
        list: userCards.cards.map(v => ({
            id: v.id,
            name: v.name
        }))
    })
}