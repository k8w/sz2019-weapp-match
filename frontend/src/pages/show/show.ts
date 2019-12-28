import { Card } from '../../protocols/Card';
import { WxUtil } from '../../models/WxUtil';
import { Global } from '../../models/Global';

export interface PageShowData {
    canEdit: boolean,
    card?: Card
}

export interface PageShowCustom {
    openId: string;
    cardId: string;
    loadCard(): Promise<void>;
    onBtnEdit(): void;
    onBtnHome(): void;
}

Page<PageShowData, PageShowCustom>({

    openId: '',
    cardId: '',
    data: {
        canEdit: false
    },

    async onLoad(query) {
        if (!query.openId || !query.cardId) {
            await WxUtil.alert('非法参数');
            wx.reLaunch({
                url: '/pages/index/index'
            });
            return;
        }

        this.openId = query.openId;
        this.cardId = query.cardId;
        this.setData({
            // 只能编辑自己的
            canEdit: Global.openId === this.openId
        })

        this.loadCard();
    },

    async loadCard() {
        try {
            let res = await Global.apiClient.callApi('GetCard', {
                openId: this.openId,
                cardId: this.cardId
            });
            this.setData({
                card: res.card
            })
        }
        catch{
            let op = await WxUtil.confirm('网络开小差了，稍后再试试吧~', '网络错误', {
                cancelText: '返回',
                confirmText: '重试'
            });
            op ? await this.loadCard() : wx.reLaunch({ url: '/pages/index/index' });
        }
    },

    onBtnEdit() {
        console.log('btn edit')
        wx.redirectTo({
            url: '/pages/edit/edit?cardId=' + this.cardId
        })
    },

    onBtnHome() {
        wx.reLaunch({
            url: '/pages/index/index'
        })
    },

    onShareAppMessage(options) {
        if (this.data.card) {
            return {
                title: this.data.card.name + ': 给你一张我名片，常联系~',
                path: `/pages/show/show?openId=${this.openId}&cardId=${this.cardId}`
            }
        }
        else {
            return {
                title: '推荐给你一个超好用的名片制作工具~',
                path: `/pages/index/index`
            }
        }
    }

})