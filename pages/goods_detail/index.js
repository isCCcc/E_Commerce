// pages/goods_detail/index.js
import {request} from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
    data: {
        goodsObj: {}
    },
    picsList: [],
    onLoad(options) {
        const {goods_id} = options
        this.getGoodsDetail(goods_id)
    },

    // 获取商品详情数据
    async getGoodsDetail(goods_id) {
        const res = await request({url: "/goods/detail", data: {goods_id}})
        const goodsObj = res.data.message
        this.picsList = goodsObj.pics
        this.setData({
            goodsObj: {
                pics: goodsObj.pics,
                goods_price: goodsObj.goods_price,
                goods_name: goodsObj.goods_name,
                goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg')
            }
        })
    },

    // 点击轮播图，放大预览
    handlePreviewImage(e) {
        const urls = this.picsList.map(p => p.pics_mid)
        const current = e.currentTarget.dataset.url
        wx.previewImage({current, urls})
    }


})