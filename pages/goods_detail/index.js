// pages/goods_detail/index.js
import {request} from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const {goods_id} = options
        console.log(goods_id);
        this.getGoodsDetail(goods_id)
    },
    async getGoodsDetail(goods_id) {
        const res = await request({url: "/goods/detail", data: {goods_id}})
        this.setData({
            goodsObj: res
        })
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
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})