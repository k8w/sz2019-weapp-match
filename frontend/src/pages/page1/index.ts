import { Global } from '../../models/Global';

export interface Page1Data {
    imgSrc: string
}

export interface Page1Custom {
    testApi(): Promise<void>,
    upload(): Promise<void>
}

Page<Page1Data, Page1Custom>({
    data: {
        imgSrc: ''
    },

    async testApi() {
        console.log('Res', await Global.apiClient.callApi('Test', { name: 'Jack' }))
    },

    async upload() {
        return new Promise((rs, rj) => {
            wx.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                success: res => {
                    let imgPath = res.tempFilePaths[0]
                    wx.getFileSystemManager().readFile({
                        filePath: imgPath,
                        success: async res => {
                            let ext = imgPath.match(/\.(png|jpg)$/);
                            if (!ext || !(res.data instanceof ArrayBuffer)) {
                                wx.showToast({ title: '不支持的格式' });
                                rj();
                                return;
                            }
                            let uploadRes = await Global.apiClient.callApi('Upload', {
                                openId: 'xxx',
                                ext: ext[0],
                                file: new Uint8Array(res.data)
                            });
                            this.setData({
                                imgSrc: uploadRes.uri
                            })
                        },
                        fail:rj
                    })
                },
                fail: rj
            })
        })
    }
})