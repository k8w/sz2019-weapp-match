import { ApiCall } from "tsrpc";
import { ReqGetCard, ResGetCard } from '../protocols/PtlGetCard';
import { getOrCreateUserCards } from '../models/db/UserCards';

export async function ApiGetCard(call: ApiCall<ReqGetCard, ResGetCard>) {
    let userCards = await getOrCreateUserCards(call.req.openId);

    let card = userCards.cards.find(v => v.id === call.req.cardId);
    if (!card) {
        call.error('此名片已被删除', 'CARD_NOT_EXIST');
        return;
    }

    call.succ({
        card: card
    })
}