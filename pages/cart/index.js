// pages/cart/index.js
Page({
    data: {
        address: {},
        cart: [],
        allChecked: false,
        totalPrice: 0,
        totalNum: 0
    },

    // 判断当前用户是否已经添加了收货地址
    onShow() {
        const address = wx.getStorageSync("address")
        const cart = wx.getStorageSync("cart")
        //计算全选：注意空数组调用every时为true
        // const allChecked = cart.length ? cart.every(v => v.checked) : false;
        // 计算总价格、商品总数量
        let totalPrice = 0, totalNum = 0, allChecked = true
        cart.forEach(c => {
            if (c.checked) {
                totalPrice += c.goods_price * c.num
                totalNum += c.num
            } else {
                allChecked = false
            }
        })
        allChecked = cart.length ? allChecked : false
        this.setData({address, cart, allChecked, totalPrice, totalNum})
        console.log(cart);
    },

    // 新增收获地址
    handleChoose(obj) {
        // 1.获取权限状态
        wx.getSetting({
            success: (result) => {
                // 2.判断权限状态
                const scopeAddress = result.authSetting["scope.address"]
                if (scopeAddress === true || scopeAddress === undefined) {
                    // 3.调用获取收货地址的 api
                    wx.chooseAddress({
                        success: (res) => {
                            res.all = res.provinceName + res.cityName + res.countyName + res.detailInfo;
                            wx.setStorageSync('address', res)
                        }
                    })
                } else {
                    // 4.诱导用户打开授权页面
                    wx.openSetting({
                        success: (result2) => {
                            // 3.调用获取收货地址的 api
                            wx.chooseAddress({
                                success: (res3) => {
                                    res3.all = res3.provinceName + res3.cityName + res3.countyName + res3.detailInfo;
                                    wx.setStorageSync('address', res3)
                                }
                            })
                        }
                    })
                }
            }
        })
    }
})