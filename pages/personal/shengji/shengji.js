// pages/library/library.js
"use strict";

var app = getApp();
var root_path = "../../../";
var api = require(root_path + 'api/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: { isback: true, text: '知识升级', backcolor: '#5FB882' },
    bookiphone5:'',
    booklist:[]
  },
  gotopage: function (event) {
    var bookid = event.target.dataset.bookid
    if(bookid==undefined){
      wx.showToast({
        title: '错误101',
        icon:'none'
      })
      return
    }
    wx.navigateTo({
      url: "/pages/personal/sj/sj?bookId=" + bookid
    })
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
    
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    api.get({
      url: api.get_mybook(),
      callback: function (res) {
        var d = []
        var f = []
        var c = 0
        for (var i = 0; i < res.items.length; i++) {
          if (d.length == 4) {
            f.push(d)
            d = []
            d.push(res.items[i])
          } else {
            d.push(res.items[i])
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
})