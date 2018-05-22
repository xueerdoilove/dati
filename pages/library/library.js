// pages/library/library.js
"use strict";

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: { isback: true, text: '答题书库', backcolor: '#01919A' },
    bookiphone5:'',
    booklist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    wx.getSystemInfo({
      success: function (res) {
        if (res.model =='iPhone 5'){
          self.setData({
            bookiphone5:'bookip5'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/qamini/api/book?page=1&pageSize=16', //仅为示例，并非真实的接口地址
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var d = []
        var f = []
        var c = 0
        for(var i=0;i<res.data.items.length;i++){
          if(d.length==4){
            f.push(d)
            d=[]
            d.push(res.data.items[i])
          }else{
            d.push(res.data.items[i])
          }
          
        }
        f.push(d)
        that.setData({
          booklist: f
        })
      }
    })
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