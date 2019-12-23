Page({
    onLoad() {
        this.setData({
            date: new Date().toISOString()
        })
    },

    go() {
        wx.navigateTo({ url: '/pages/page2/index'})
    }
})