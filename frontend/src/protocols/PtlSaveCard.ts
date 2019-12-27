import { Card } from './Card';

export interface ReqSaveCard {
    openId: string;
    // id为空字符串时为新增，否则为更新
    card: Card;
}

export interface ResSaveCard {
    cardId: string;
}