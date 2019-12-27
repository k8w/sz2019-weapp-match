import { Card } from '../../protocols/Card';
import { LocalDb } from '../LocalDb';
import { Global } from '../Global';

export interface UserCards {
    openId: string;
    cards: Card[];
}

export async function getOrCreateUserCards(openId: string): Promise<UserCards> {
    let userCards = await Global.localDb.get<UserCards>('cards_' + openId);
    return userCards || {
        openId: openId,
        cards: []
    }
}

export async function saveUserCards(userCards: UserCards) {
    Global.localDb.set('cards_' + userCards.openId, userCards);
}