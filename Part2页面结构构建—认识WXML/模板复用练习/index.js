//index.js
//获取应用实例
const app = getApp()
let timestamp = 1514736000000+parseInt(Math.random() * 8640000000)
let myDate = new Date(timestamp)
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    timestamp: timestamp,
    year: myDate.getFullYear(),
    month: myDate.getMonth() + 1,
    date: myDate.getDate(),
    hour: myDate.getHours(),
    minute: myDate.getMinutes(),
    second: myDate.getSeconds(),
    weekItem: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log("index onLoad")
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReady:function(){
    console.log("index onReady");
    let item = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
    let interval = setInterval(function(){
      this.data.weekItem.unshift(item.pop());
      this.setData(this.data);
      if(!item.length){
        clearInterval(interval);
      }
    }.bind(this),5000);
  },
  onShow:function(){
    console.log("index onShow")
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
