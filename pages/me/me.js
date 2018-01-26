// pages/me/me.js
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
    var change = wx.getStorageSync('change');
    if (change == 1) {
      wx.showToast({
        title: '修改成功',
        mask: true,
        icon: "success",
      });
      wx.setStorageSync('change', 0);
      console.log(wx.getStorageSync('username'));
      console.log(wx.getStorageSync('password'));
    }
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

  logout: function (e) {




    wx.showModal({
      title: '提示',
      content: '您的客户端设置将会被清除！',
      success: function (res) {
        if (res.confirm) {
          try {
            wx.clearStorageSync();
            wx.reLaunch({
              url: '/pages/login/login',
            })
          } catch (e) {
            console.log(e);
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })






  }
})