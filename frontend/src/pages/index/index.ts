import { ResGetCardList } from '../../protocols/PtlGetCardList';
import { Global } from '../../models/Global';
import { WxUtil } from '../../models/WxUtil';

export interface PageIndexData {
    list: ResGetCardList['list'];
}

export interface PageIndexCustom {
    onCardTap(e: any): void;
    onBtnCreate(): void;
    ensureLogin(): Promise<void>;
    reloadList(): Promise<void>;
}

Page<PageIndexData, PageIndexCustom>({
    data: {
        list: []
    },

    async onShow() {
        await this.ensureLogin();
        this.reloadList();
    },

    async reloadList() {
        try {
            var res = await Global.apiClient.callApi('GetCardList', {
                openId: Global.openId!
            });
            this.setData({
                list: res.list
            });            
        }
        catch{
            await WxUtil.alert('网络开小差了，稍后再试试吧~');
            await this.reloadList();
        }

    },

    /** 强制登录后才可以使用 */
    async ensureLogin() {
        while (!Global.openId) {
            try {
                wx.showLoading({
                    title: '登录中',
                    mask: true
                })

                // Login
                let code = await WxUtil.getCode();
                let res = await Global.apiClient.callApi('Login', {
                    code: code
                })
                Global.openId = res.openId;

                wx.hideLoading();
            }
            catch (e) {
                wx.hideLoading();
                await WxUtil.alert('网络不太好哦，稍后再试试看~', '登录失败');
            }
        }
    },

    onCardTap(e: any) {
        wx.navigateTo({
            url: '/pages/show/show?cardId=' + e.currentTarget.dataset.cardId + '&openId=' + Global.openId
        })
    },

    onBtnCreate() {
        console.log('BtnCreate')
        wx.navigateTo({
            url: '/pages/edit/edit'
        })
    }
})