export interface ReqGetCardList {
    openId: string;
}

export interface ResGetCardList {
    list: {
        id: string,
        name: string
    }[];
}