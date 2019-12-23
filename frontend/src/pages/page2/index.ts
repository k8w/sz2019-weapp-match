Page({
    onLoad() {
        this.setData({
            date: new Date().toDateString()
        })
    },
    
    go() {
        wx.navigateTo({ url: '/pages/page1/index' })
    }
})