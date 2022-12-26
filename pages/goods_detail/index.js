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
        this.getGoodsDetail(goods_id)
    },
    async getGoodsDetail(goods_id) {
        const res = await request({url: "/goods/detail", data: {goods_id}})
        const goodsObj = res.data.message
        this.setData({
            goodsObj: {
                pics: goodsObj.pics,
                goods_price: goodsObj.goods_price,
                goods_name: goodsObj.goods_name,
                goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg')
            }
        })
    },


})