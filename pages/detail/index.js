// pages/detail/index.js
const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    time: '',
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面初始化 options为页面跳转所带来的参数
    console.log(options)
    var id = options.productId
    let that = this
    wx.request({
      url: app.globalData.domain + '/api/weChat/Index/getDetail',
      method: 'POST',
      data: {
        id: id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var response = res.data.response;
        console.log(response)
        that.setData({
          title: response.detail.title,
          time: response.detail.created_at,
          content: response.detail.content,
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