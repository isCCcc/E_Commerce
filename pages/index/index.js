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
        cateList: [],
        // 楼层数据
        floorList: [],

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.getSwiperList()
        this.getCateList()
        this.getFloorList()
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
    getFloorList() {
        request({url: '/home/floordata'})
            .then(result => {
                let data = JSON.stringify(result.data.message)
                    .replace(/goods_list/g, 'goods_list/index')
                this.setData({
                    floorList: JSON.parse(data),
                })
            })
    },
})