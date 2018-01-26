Page({
  data: {
    phone: '',
    password: ''
  },

  // 获取输入账号  
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入密码  
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录  
  login: function (e) {
    if (this.data.phone.length == 0) {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else if (this.data.password.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      // 这里修改成跳转的页面  
      wx.showLoading({
        title: '正在登录',
      });
      var username = e.detail.value.username;
      var password = e.detail.value.password;
      wx.request({
        url: 'http://47.100.120.40:8081/other/qfnu/token',
        method: "POST",
        data: {
          username: username,
          password: password
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          if (res.data.status == 1) {
            try {
              wx.setStorageSync('token', res.data.msg);
              wx.setStorageSync('username', username);
              wx.setStorageSync('password', password);
              console.log(res.data.msg);
            } catch (e) {
              console.log(e);
            }

            wx.hideLoading();
            wx.switchTab({
              url: '/pages/index/index'
            });
            
          } else {
            wx.showToast({
              title: '登录失败',
              icon: 'none',
              duration: 2000
            });
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 2000
          });
        }
      })

    }
  }
})  