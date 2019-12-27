import { ApiCall } from "tsrpc";
import { ReqDelCard, ResDelCard } from "../protocols/PtlDelCard";
import { getOrCreateUserCards, saveUserCards } from "../models/db/UserCards";

export async function ApiDelCard(call: ApiCall<ReqDelCard, ResDelCard>) {
    let userCards = await getOrCreateUserCards(call.req.openId);

    // Remove
    let lengthBefore = userCards.cards.length;
    userCards.cards.removeOne(v => v.id === call.req.cardId);
    let delCount = lengthBefore - userCards.cards.length;
    await saveUserCards(userCards);

    call.succ({
        delCount: delCount
    })
}