import { ApiCall } from "tsrpc";
import { ReqSaveCard, ResSaveCard } from '../protocols/PtlSaveCard';
import { getOrCreateUserCards, saveUserCards } from "../models/db/UserCards";
import { localDb } from '../../index';
import uuid = require("uuid");

export async function ApiSaveCard(call: ApiCall<ReqSaveCard, ResSaveCard>) {
    let userCards = await getOrCreateUserCards(localDb, call.req.openId);

    // Update
    if (call.req.card.id) {
        let cardIndex = userCards.cards.findIndex(v => v.id === call.req.card.id);
        if (cardIndex === -1) {
            call.error('不存在的卡片');
            return;
        }
        userCards.cards.splice(cardIndex, 1, call.req.card);
    }
    // Create
    else {
        call.req.card.id = uuid();
        userCards.cards.push(call.req.card);
    }
    
    await saveUserCards(localDb, userCards);

    call.succ({
        cardId: call.req.card.id
    });
}