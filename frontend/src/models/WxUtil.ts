export class WxUtil {
    private static _lastToastPromise?: Promise<any>;

    /**
     * 类似浏览器的alert
     * await的话会等到点击确认才继续
     */
    static alert(content: string, title: string = '', confirmText: string = '确定'): Promise<void> {
        let promiseFunc = (rs: Function, rj: Function) => {
            wx.showModal({
                title: title,
                content: content,
                showCancel: false,
                confirmText: confirmText,
                success: () => {
                    rs()
                },
                fail: (err: any) => {
                    rj(err)
                }
            })
        };

        if (this._lastToastPromise) {
            this._lastToastPromise = this._lastToastPromise.then(() => new Promise(promiseFunc));
        }
        else {
            this._lastToastPromise = new Promise(promiseFunc)
        }

        return this._lastToastPromise;
    }

    /**
     * 类似浏览器的confirm
     * await的话会等到点击确认或取消才继续
     * @return true代表点击了确定，false代表点击了取消
     */
    static confirm(content: string, title: string = '', options?: {
        cancelText?: string,
        cancelColor?: string,
        confirmText?: string,
        confirmColor?: string,
    }): Promise<boolean> {
        let promiseFunc = (rs: Function, rj: Function) => {
            wx.showModal(Object.assign({
                title: title,
                content: content,
                success: function (res: any) {
                    if (res.confirm) {
                        rs(true)
                    } else if (res.cancel) {
                        rs(false)
                    }
                },
                fail: (err: any) => {
                    rj(err);
                }
            }, options))
        }

        if (this._lastToastPromise) {
            this._lastToastPromise = this._lastToastPromise.then(() => new Promise(promiseFunc));
        }
        else {
            this._lastToastPromise = new Promise(promiseFunc);
        }
        return this._lastToastPromise;
    }

    /** 选取并读取一张图片 */
    static chooseAndReadImage(): Promise<{ ext: string, data: ArrayBuffer } | null> {
        return new Promise(rs => {
            wx.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                success: res => {
                    let imgPath = res.tempFilePaths[0]
                    wx.getFileSystemManager().readFile({
                        filePath: imgPath,
                        success: async res => {
                            let ext = imgPath.match(/\.\w+$/);
                            if (!ext || !(res.data instanceof ArrayBuffer)) {
                                WxUtil.alert('不支持的格式');
                                rs(null);
                                return;
                            }
                            rs({
                                ext: ext[0],
                                data: res.data
                            })
                        },
                        fail: e => { rs(null) }
                    })
                },
                fail: e => { rs(null) }
            })
        })
    }

    static getCode(): Promise<string> {
        return new Promise((rs, rj) => {
            wx.login({
                success: res => {
                    rs(res.code)
                },
                fail: rj
            })
        })
    }
}