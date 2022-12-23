// components/Tabs/Tabs.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabs: Array,
        value: []
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        handlerItemTap(e) {
            const {index} = e.currentTarget.dataset
            // 触发父组件的事件更新
            this.triggerEvent("tabsItemChange",{index})
        },
    }
})
