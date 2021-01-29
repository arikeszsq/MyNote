const app = getApp();

// 判断是否已登录
const isLogin = () => {
  if (!wx.getStorageSync('userInfo')) {
      return false;
  }
  return true;
}
// 用户登录
const login = () => {
  // 微信登录
  var wxLogin = new Promise(function (resolve, reject) {
    wx.login({
      success: res => {
        resolve(res);
      }
    });
  });

  // 获取微信授权用户信息
  var wxGetUserInfo = new Promise(function (resolve, reject) {
    wx.getUserInfo({
      withCredentials: true,
      success: res => {
        console.log(res);
        resolve(res);
      }
    });
  });

  // 登录
  var doLogin = Promise.all([wxLogin, wxGetUserInfo]).then(function (results) {
    wx.request({
      url: app.globalData.domain + '/api/weChat/Index/saveUser',
      method: 'POST',
      data: {
        code: results[0].code,
        encrypted_data: results[1].encryptedData,
        iv: results[1].iv,
        raw_data: results[1].rawData,
        signature: results[1].signature,
        user_info: results[1].userInfo
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        // 缓存用户信息
        wx.setStorageSync('userInfo', res.data.response);
        Promise.resolve(true);
        
      }
    })
  });
  return doLogin;
}

module.exports = {
  isLogin: isLogin,
  login: login
}
