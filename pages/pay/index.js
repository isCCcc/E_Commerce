// pages/pay/index.js
import {showToast} from "../../utils/asyncWx";
import regeneratorRuntime from "../../lib/runtime/runtime"

Page({
    data: {
        address: {},
        cart: [],
        totalPrice: 0,
        totalNum: 0
    },

    onShow() {
        const address = wx.getStorageSync("address")
        let cart = wx.getStorageSync("cart")
        //计算全选：注意空数组调用every时为true
        // const allChecked = cart.length ? cart.every(v => v.checked) : false;
        this.setData({address})
        let totalPrice = 0, totalNum = 0
        cart = cart.filter(c => c.checked)
        cart.forEach(item => {
            totalPrice += item.goods_price * item.num
            totalNum += item.num
        })
        this.setData({cart, totalPrice, totalNum})
    }
})