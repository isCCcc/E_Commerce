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
  },
  Cates: [],
  onLoad() {
    this.getCates()
  },
  getCates() {
    request({ url: "/categories" })
      .then(result => {
        this.Cates = result.data.message
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
      rightContent
    })
  },
})