// public/index/index.js
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
    setTimeout(function () {
      console.log('adfadf')
      wx.reLaunch({
        url: '/pages/information/index/index'
      });
      // wx.navigateTo({
      //   url: '/pages/information/detail/detail'
      // });
    }, 1000)
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
    // Do something when page close.
    console.log('页面卸载了 跳转用到了wx.reLaunch 会卸载页面 就触发这个事件')
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


  clickMe: function () {
    console.log('adfa')
    wx.navigateTo({
      url: '/pages/information/index/index'
    });
  }
})