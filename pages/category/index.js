// pages/category/index.js
import { request } from "../../request/index";
Page({
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    // 被点击的菜单索引
    currentIndex: 0,
    // 右侧商品数据同顶部的距离
    scrollTop: 0,
  },
  Cates: [],
  onLoad() {
    let Cates = wx.getStorageSync('cates')
    if (!Cates) {
      this.getCates()
    } else {
      // 设置5分钟缓存失效
      if (Date.now - Cates.time > 1000 * 60 * 5) {
        this.getCates()  // 重新发送请求
      } else {
        // 使用旧数据
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(data => data.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({ leftMenuList, rightContent })
      }
    }
  },
  getCates() {
    request({ url: "/categories" })
      .then(result => {
        this.Cates = result.data.message

        // 将接口数据存入本地存储
        wx.setStorageSync('cates', { time: Date.now(), data: this.Cates })

        let leftMenuList = this.Cates.map(data => data.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({ leftMenuList, rightContent })
      })
  },
  // 左侧菜单栏的点击事件
  handleItemTap(e) {
    const { index } = e.currentTarget.dataset
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  },
})