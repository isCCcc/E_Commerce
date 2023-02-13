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
        wx.getSetting({
            success:(result)=>{
                const scopeAddress = result.authSetting["scope.address"]
                if(scopeAddress===true||scopeAddress===undefined){
                    wx.chooseAddress({
                        success: (result1) => {
                            console.log(result1);
                        }
                    })
                }else {
                    wx.openSetting({
                        success:(result2)=>{
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