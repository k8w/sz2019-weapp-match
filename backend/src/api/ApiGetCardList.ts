import { ApiCall } from "tsrpc";
import { ReqGetCardList, ResGetCardList } from "../protocols/PtlGetCardList";
import { getOrCreateUserCards } from "../models/db/UserCards";
import { localDb } from '../../index';

export async function ApiGetCardList(call: ApiCall<ReqGetCardList, ResGetCardList>) {
    let userCards = await getOrCreateUserCards(localDb, call.req.openId);
    call.succ({
        list: userCards.cards.map(v => ({
            id: v.id,
            name: v.name
        }))
    })
}