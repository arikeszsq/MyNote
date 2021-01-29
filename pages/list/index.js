// pages/list/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type) {
      this.setData({
        type: options.type
      });
    }
    let that = this;
    wx.request({
      url: app.globalData.domain + '/api/weChat/Index/getLists',
      method: 'POST',
      data: {
        appid: wx.getStorageSync('userInfo').openid,
        type: that.data.type
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var response = res.data.response;
        that.setData({
          lists: response.lists
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
  //跳转到详情
  toDetail: function (e) {
    let productId = e.currentTarget.dataset.productid
    wx.navigateTo({
      url: '../detail/index?productId=' + productId,
    })
  },
  toIndex: function () {
    const url = "/pages/index/index";
    wx.switchTab({
      url: url,
    })
  }
})