// pages/create/index.js
var login = require('../../utils/login.js');
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    lists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    if(!login.isLogin()){
      wx.redirectTo({
        url: '../authorize/authorize' + '?from=/pages/index/index',
      })
    }
    if (e.type) {
      this.setData({
        type: e.type
      });
    }
    let that = this;
    wx.request({
      url: app.globalData.domain + '/api/weChat/Consume/getList',
      method: 'POST',
      data: {
        openid: wx.getStorageSync('userInfo').openid,
        type: e.type
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var response = res.data.response;
        console.log(response)
        that.setData({
          lists: response
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

  formSubmit: function (e) {
    var that = this;
    var num = e.detail.value.num;
    var backup = e.detail.value.backup;
    wx.request({
      method: "POST",
      url: app.globalData.domain + '/api/weChat/Consume/add',
      data: {
        'type': that.data.type,
        'num': num,
        'backup': backup,
        'openid': wx.getStorageSync('userInfo').openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.showToast({
          title: '保存成功',
          duration: 2000
        })
      }
    })
  },

  toIndex: function () {
    const url = "/pages/index/index";
    wx.switchTab({
      url: url,
    })
  },
  //跳转到详情
  deleteList: function (e) {
    let productId = e.currentTarget.dataset.productid;
    let that = this;
    wx.request({
      method: "POST",
      url: app.globalData.domain + '/api/weChat/Consume/delete',
      data: {
        'type': that.data.type,
        'id': productId,
        'openid': wx.getStorageSync('userInfo').openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.showToast({
            title: '成功',
            duration: 2000
          })
      }
    })
  }
})