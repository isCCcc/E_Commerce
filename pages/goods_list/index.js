// pages/goods_list/index.js
import {request} from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
    data: {
        tabs: [
            {id: 0, value: '综合', isActive: true},
            {id: 1, value: '销量', isActive: false},
            {id: 2, value: '价格', isActive: false},
        ],
        goodsList: [],
    },
    queryParams: {
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10
    },
    totalPages: 1,
    onLoad(options) {
        this.queryParams.cid = options.cid || ''
        this.getGoodsList()
    },
    // 切换导航栏
    handletabsItemChange(e) {
        const {index} = e.detail
        let {tabs} = this.data
        tabs.forEach(v => v.isActive = index === v.id)
        this.setData({tabs})
    },
    // 获取商品列表数据
    async getGoodsList() {
        let res = await request({url: "/goods/search", data: this.queryParams})
        const total = res.data.message.total;
        this.totalPages = Math.ceil(total / this.queryParams.pagesize)
        this.setData({
            goodsList: [...this.data.goodsList, ...res.data.message.goods]
        })

        // 关闭下拉刷新窗口
        wx.stopPullDownRefresh();
    },

    // 页面相关事件处理函数--监听用户下拉动作
    onPullDownRefresh() {
        this.setData({goodsList: []})
        this.queryParams.pagenum = 1
        this.getGoodsList()
    },

    // 页面上拉触底事件的处理函数
    onReachBottom() {
        if (this.queryParams.pagenum >= this.totalPages) {
            wx.showToast({
                title: '没有下一页数据'
            })
        } else {
            this.queryParams.pagenum++
            this.getGoodsList()
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})