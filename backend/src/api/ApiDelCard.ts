import { ApiCall } from "tsrpc";
import { ReqDelCard, ResDelCard } from "../protocols/PtlDelCard";
import { getOrCreateUserCards } from "../models/db/UserCards";
import { localDb } from "../..";

export async function ApiDelCard(call: ApiCall<ReqDelCard, ResDelCard>) {
    let userCards = await getOrCreateUserCards(localDb, call.req.openId);

    // Remove
    let lengthBefore = userCards.cards.length;
    userCards.cards.removeOne(v => v.id === call.req.cardId);
    let delCount = lengthBefore - userCards.cards.length;

    call.succ({
        delCount: delCount
    })
}