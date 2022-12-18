// pages/category/index.js
import { request } from "../../request/index";
Page({
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
  },
  Cates: [],
  onLoad() {
    this.getCates()
  },
  getCates() {
    request({ url: "/categories" })
      .then(result => {
        this.Cates = result.data.message
        console.log(this.Cates)
        let leftMenuList = this.Cates.map(data => data.cat_name)
        let rightContent = this.Cates.map(data => data.children)
        this.setData({ leftMenuList, rightContent })
      })
  }
})