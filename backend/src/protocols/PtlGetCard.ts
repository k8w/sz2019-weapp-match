import { Card } from './Card';
export interface ReqGetCard {
    openId: string;
    cardId: string;
}

export interface ResGetCard {
    card: Card;
}