// pages/count/index.js
var login = require('../../utils/login.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'list': []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!login.isLogin()){
      wx.redirectTo({
        url: '../authorize/authorize' + '?from=/pages/index/index',
      })
    }
    let that = this;
    wx.request({
      url: app.globalData.domain + '/api/weChat/BasicInfo/info',
      method: 'POST',
      data: {
        openid: wx.getStorageSync('userInfo').openid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var response = res.data.response;
        that.setData({
          list: response
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  toIndex: function () {
    const url = "/pages/index/index";
    wx.switchTab({
      url: url,
    })
  }
})