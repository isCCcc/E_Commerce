let ajaxtimes = 0;  // 计数器：记录异步请求的数量
export const request = (params) => {
    let header = {...params.header};
    if (params.url.includes("/my/")) {
        header["Authorization"] = wx.getStorageSync('token')
    }

    ajaxtimes++;
    wx.showLoading({
        title: '加载中',
        mask: true
    })

    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            header: header,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                ajaxtimes--;
                if (ajaxtimes == 0) {  // 需处理完所有的异步请求，才可以关闭提示框
                    wx.hideLoading();
                }
            }
        });
    })
}