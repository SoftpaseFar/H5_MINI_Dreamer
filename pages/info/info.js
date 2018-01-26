// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    try {
      var info = wx.getStorageSync('info');
      var username = wx.getStorageSync('username');
      if (info && username) {
        that.setData({
          "info": info,
          "username": username
        });
      } else {






        var username;
        var password;
        try {
          username = wx.getStorageSync('username');
          password = wx.getStorageSync('password');
        } catch (e) {
          console.log(e);
        }
        wx.request({
          url: 'https://api.badguy.cn/qfnu/api/v1/info',
          method: "POST",
          data: {
            username: username,
            password: password
          },
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            console.log(res.data);
            that.setData({
              "info": res.data,
              "username": username
            });

            try {
              wx.setStorageSync('info', that.data.info);
            } catch (e) {
              console.log(e);
            }
          },
          fail: function (res) {
            console.log(res.data);
          },
        });









      }
    } catch (e) {
      console.log(e);
    }

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

  }
})