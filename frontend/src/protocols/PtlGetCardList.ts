import { Card } from './Card';
export interface ReqGetCardList {
    openId: string;
}

export interface ResGetCardList {
    list: Card[];
}