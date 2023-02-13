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
                // TODO：没有图片的情况
                pics: goodsObj.pics,
                // || [{pics_mid:"https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg"}],
                goods_id: goods_id,
                goods_price: goodsObj.goods_price,
                goods_name: goodsObj.goods_name,
                goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
                goods_small_logo: goodsObj.goods_small_logo
            }
        })
    },

    // 点击轮播图，放大预览
    handlePreviewImage(e) {
        const urls = this.picsList.map(p => p.pics_mid)
        const current = e.currentTarget.dataset.url
        wx.previewImage({current, urls})
    },

    // 加入购物车
    handleCartAdd() {
        let cart = wx.getStorageSync('cart') || [];
        let index = cart.findIndex(v => v.goods_id === this.data.goodsObj.goods_id);
        if (index === -1) {
            this.data.goodsObj.num = 1;
            this.data.goodsObj.checked = true;
            cart.push(this.data.goodsObj);
        } else {
            cart[index].num++;
        }
        wx.setStorageSync('cart', cart)
        wx.showToast({
            title: '加入成功',
            icon: 'success',
            mask: true
        })
    }


})