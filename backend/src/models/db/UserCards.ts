import { Card } from '../../protocols/Card';
import { LocalDb } from '../LocalDb';

export interface UserCards {
    openId: string;
    cards: Card[];
}

export async function getOrCreateUserCards(db: LocalDb, openId: string): Promise<UserCards> {
    let userCards = await db.get<UserCards>('cards_' + openId);
    return userCards || {
        openId: openId,
        cards: []
    }
}

export async function saveUserCards(db: LocalDb, userCards: UserCards) {
    db.set('cards_' + userCards.openId, userCards);
}