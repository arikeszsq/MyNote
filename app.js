//app.js
App({
  
  onLoad: function(options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          //已授权，可以获取用户信息
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo); //对象
              console.log(res.rawData); //Json
              var avatarUrl = res.userInfo.avatarUrl;
              var userName = res.userInfo.nickName;
              that.setData({
                avatarUrl: avatarUrl,
                userName: userName
              })
              
            }
          })
        }
      }
    })
  },

  onLaunch: function () {
    //获取缓存中用户信息，
    var userInfo = wx.getStorageSync('userInfo')
    wx.setStorageSync('userInfo', userInfo)
    //展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  onShow: function(){
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  
  // request - post请求方法封装方法
  post(url, data, callback) {
    wx.request({
      url,
      data: {
        token:wx.getStorageSync('userInfo').token,
        device_string: 'min:nim:ss:ss:' + wx.getStorageSync('userInfo').userid,
        ...data
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded '
      },
      success(res) {
        callback(res.data);
      },
      fail(e) {
        wx.showToast({
          title: e,
        })
      }
    })
  },

  globalData: {
    userInfo: null,
    // domain: "https://zhusq.top"
    domain: "http://zhusq.local"
  }
})