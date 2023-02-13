// pages/cart/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    // 新增收获地址
    handleChoose() {
        // 1.获取权限状态
        wx.getSetting({
            success: (result) => {
                // 2.判断权限状态
                const scopeAddress = result.authSetting["scope.address"]
                if (scopeAddress === true || scopeAddress === undefined) {
                    // 3.调用获取收货地址的 api
                    wx.chooseAddress({
                        success: (result1) => {
                            console.log(result1);
                        }
                    })
                } else {
                    // 4.诱导用户打开授权页面
                    wx.openSetting({
                        success: (result2) => {
                            // 3.调用获取收货地址的 api
                            wx.chooseAddress({
                                success: (result3) => {
                                    console.log(result3);
                                }
                            })
                        }
                    })
                }
            }
        })
    }
})