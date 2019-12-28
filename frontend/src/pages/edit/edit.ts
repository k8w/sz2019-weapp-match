import { Card } from '../../protocols/Card';
import { Global } from '../../models/Global';
import { WxUtil } from '../../models/WxUtil';
export interface PageEditData {
    isSaving: boolean,
    isDeleting: boolean,
    card?: Card;
}

export interface PageEditCustom {
    cardId: string;
    loadCard(): Promise<void>;
    loadNewCard(): void;
    onInputBlur(e: any): void;
    onImageTap(): Promise<void>;
    onBtnSave(): Promise<void>;
    onBtnDel(): Promise<void>;
}

Page<PageEditData, PageEditCustom>({
    cardId: '',

    data: {
        isSaving: false,
        isDeleting: false
    },

    onLoad(query) {
        this.cardId = query.cardId || '';
        // 编辑
        if (this.cardId) {
            this.loadCard();
        }
        // 创建
        else {
            this.loadNewCard();
        }
    },

    async loadCard() {
        try {
            let res = await Global.apiClient.callApi('GetCard', {
                openId: Global.openId!,
                cardId: this.cardId
            })
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

    loadNewCard() {
        let card: Card = {
            id: '',
            /** 头像 */
            avatar: '',
            /** 姓名 */
            name: '',
            /** 电话 */
            tel: '',
            /** 公司 */
            company: '',
            /** 职位 */
            title: '',
            /** 最后更新时间 */
            lastModified: Date.now(),
            /** 创建时间 */
            created: Date.now()
        }
        this.setData({
            card: card
        })
    },

    onInputBlur(e) {
        this.data.card![e.currentTarget.dataset.name as 'name' | 'tel' | 'company' | 'title'] = e.detail.value
    },

    async onImageTap() {
        // Choose
        let image = await WxUtil.chooseAndReadImage();
        if (image) {
            try {
                // Upload
                let res = await Global.apiClient.callApi('Upload', {
                    openId: Global.openId!,
                    file: new Uint8Array(image.data),
                    ext: image.ext
                });
                this.data.card!.avatar = res.uri;

                this.setData({
                    card: this.data.card
                })
            }
            catch{
                await WxUtil.alert('网络开小差了，稍后再试试吧~');
            }
        }
    },

    async onBtnSave() {
        // 检查必填项
        if (!this.data.card!.avatar) {
            await WxUtil.alert('还没有上传头像哦~');
            return;
        }
        if (!this.data.card!.name) {
            await WxUtil.alert('还没有填写姓名~');
            return;
        }
        if (!this.data.card!.tel) {
            await WxUtil.alert('还没有填写电话哦~');
            return;
        }
        if (!this.data.card!.company) {
            await WxUtil.alert('还没有填写公司哦~');
            return;
        }
        if (!this.data.card!.title) {
            await WxUtil.alert('还没有填写职位哦~');
            return;
        }

        // 防止重复点击
        this.setData({
            isSaving: true
        });

        try {
            let res = await Global.apiClient.callApi('SaveCard', {
                openId: Global.openId!,
                card: this.data.card!
            });
            this.cardId = this.data.card!.id = res.cardId;

            wx.redirectTo({
                url: `/pages/show/show?openId=${Global.openId}&cardId=${this.cardId}`
            })
        }
        catch{
            await WxUtil.alert('网络开小差了，稍后再试试吧~');
        }
        finally {
            this.setData({
                isSaving: false
            });
        }
    },

    async onBtnDel() {
        if (!await WxUtil.confirm('确认要删除吗？')) {
            return;
        }

        this.setData({ isDeleting: true })
        try {
            let res = await Global.apiClient.callApi('DelCard', {
                openId: Global.openId!,
                cardId: this.data.card!.id
            })
            wx.reLaunch({
                url: '/pages/index/index'
            })
        }
        catch{
            await WxUtil.alert('网络开小差了，稍后再试试吧~');
        }
        finally {
            this.setData({ isDeleting: false })
        }
    },

    onShareAppMessage(options) {
        if (this.data.card) {
            return {
                title: this.data.card.name + ': 给你一张我名片，常联系~',
                path: `/pages/show/show?openId=${Global.openId}&cardId=${this.cardId}`
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