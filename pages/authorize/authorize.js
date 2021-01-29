var login = require('../../utils/login.js');

//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    from: '/pages/index/index'
  },
  onLoad: function (e) {
    if (e.from) {
      this.setData({
        from: e.from
      });
    }
    // 在没有 open-type=getUserInfo 版本的兼容处理
    if (!this.data.canIUse) {
      wx.getUserInfo({
        success: res => {
          login.login().then(function (results) {
            wx.reLaunch({
              url: '../count/index',
            })
          });
        },
      })
    }
  },
  //open-type=getUserInfo 版本处理
  getUserInfo: function (e) {
    let _this = this;
    login.login().then(function (results) {
      wx.reLaunch({
        url: _this.data.from,
      })
    });
  }
})