// pages/login/index.js
import {request} from "../../request/index";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 轮播图数据
        swiperList: [],
        // 商品分类数据
        cateList: []

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.getSwiperList()
        this.getCateList()
    },
    getSwiperList() {
        request({url: '/home/swiperdata',})
            .then(result => {
                this.setData({
                    swiperList: result.data.message
                })
            })
    },
    getCateList() {
        request({url: '/home/catitems',})
            .then(result => {
                this.setData({
                    cateList: result.data.message
                })
            })
    },
})