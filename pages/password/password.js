Page({
  data: {
    phone: '',
    password: '',
    'courses': [
      { "week": 1, "sequence": 1, "counts": 3, "name": "曲阜师范大学" },
      { "week": 1, "sequence": 5, "counts": 3, "name": "曲阜师范大学" },
      { "week": 2, "sequence": 1, "counts": 2, "name": "曲阜师范大学" },
      { "week": 2, "sequence": 8, "counts": 2, "name": "曲阜师范大学" },
      { "week": 3, "sequence": 4, "counts": 1, "name": "曲阜师范大学" },
      { "week": 3, "sequence": 8, "counts": 1, "name": "曲阜师范大学" },
      { "week": 3, "sequence": 5, "counts": 2, "name": "曲阜师范大学" },
      { "week": 4, "sequence": 2, "counts": 3, "name": "曲阜师范大学" },
      { "week": 4, "sequence": 8, "counts": 2, "name": "曲阜师范大学" },
      { "week": 5, "sequence": 1, "counts": 2, "name": "曲阜师范大学" },
      { "week": 6, "sequence": 3, "counts": 2, "name": "曲阜师范大学" },
      { "week": 7, "sequence": 5, "counts": 3, "name": "曲阜师范大学" },
    ],
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
  login: function () {
    if (this.data.phone.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      // 这里修改成跳转的页面  
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      })
    }
  },

  submit: function (e) {

    wx.showLoading({
      title: '',
    });


    var newPassword = e.detail.value.newPassword;
    var passwordAgain = e.detail.value.passwordAgain;
    var username;
    var password;
    var that = this;


    try {
      username = wx.getStorageSync('username');
      password = wx.getStorageSync('password');
    } catch (e) {
      console.log(e);
    }
    wx.request({
      url: 'https://api.badguy.cn/qfnu/api/v1/modify',
      method: "POST",
      data: {
        username: username,
        password: password,
        newPassword: newPassword,
        passwordAgain: passwordAgain,
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data == "sucess") {
          wx.setStorageSync('password', newPassword);
          wx.setStorageSync('change', 1);
          wx.navigateBack({
            url: '/pages/me/me',
          });
        } else {
          wx.showToast({
            title: '修改失败',
            mask: true,
            icon: "none",
          });
        }
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '修改失败',
          mask: true,
          icon: "none",
        });
      },
    });

  }






})  