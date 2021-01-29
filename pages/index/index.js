var login = require('../../utils/login.js');
//获取应用实例
const app = getApp()
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  data: {
    imgUrls: [
      app.globalData.domain + '/banner/1.jpg',
      app.globalData.domain + '/banner/2.jpg',
      app.globalData.domain + '/banner/3.jpg'
    ],
    indicatorDots: true, //小点
    autoplay: true, //自动播放
    interval: 2000, //播放间隔 ms
    duration: 500,
    notices: [],
    lists: [],
    reminds: [{
        'name': '',
      }
    ],
    remind_img: '',
    test: ''

  },
  catchTouchMove: function (res) {
    return false
  },
  prevImg: function (e) {
    var swiper = this.data.swiper;
    var current = swiper.current;
    swiper.current = current > 0 ? current - 1 : swiper.imgUrls.length - 1;
    this.setData({
      swiper: swiper,
    })
  },
  nextImg: function () {
    var swiper = this.data.swiper;
    var current = swiper.current;
    swiper.current = current < (swiper.imgUrls.length - 1) ? current + 1 : 0;
    this.setData({
      swiper: swiper,
    })
  },

  onLoad(options) {

  },

  /** 页面显示/切入前台时触发*/
  onShow() {
    this.getIndexInfo();
  },

  /**页面初次渲染完成时触发*/
  onReady() {},

  gotoPage: function (event) {
    var type = event.target.id; //得到按钮类型
    if (type == 'xingzuo' || type == 'qiyun' || type == 'meet' || type == 'plan' || type == 'remind' || type == 'study' || type == 'note') {
      var url = "/pages/list/index?type=" + type;
    } else {
      var url = "/pages/create/index?type=" + type;
    }
    wx.navigateTo({
      url: url,
    });
  },
  gotoCount: function (event) {
    wx.navigateTo({
      url: '/pages/count/index',
    });
  },

  //跳转到详情
  toDetail: function (e) {
    let productId = e.currentTarget.dataset.productid
    wx.navigateTo({
      url: '../detail/index?productId=' + productId,
    })
  },

  getIndexInfo: function () {
    let that = this;
    wx.request({
      url: app.globalData.domain + '/api/weChat/Index/getInfo',
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
          remind_img: response.remind_img,
          lists: response.lists,
          notices: response.notices,
          reminds: response.reminds
        }) //和页面进行绑定可以动态的渲染到页面
      }
    })
  }

})