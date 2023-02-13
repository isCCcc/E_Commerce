// pages/cart/index.js
Page({
    data: {
        address:{}
    },

    // 判断当前用户是否已经添加了收货地址
    onShow() {
        const address = wx.getStorageSync("address")
        this.setData({address})
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
                            res.all=res.provinceName+res.cityName+res.countyName+res.detailInfo;
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
                                    res3.all=res3.provinceName+res3.cityName+res3.countyName+res3.detailInfo;
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