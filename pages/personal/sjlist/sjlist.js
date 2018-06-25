"use strict";
var app = getApp();
var root_path = "../../../";
var api = require(root_path + 'api/api.js');
Page({
  data: {
    // text:"这是一个页面"
    nav: { isback: true, text: '知识升级', backcolor: '#5FB882' },
    bookdetail: {},

  },
  onLoad: function (options) {

  },
  onReady: function () {
    // 页面显示
    var that = this;
    api.get({
      // url: api.get_bookdefi(that.options.bookId),
      url: api.get_bookdefi(that.options.bookId),
      callback: function (res) {
        that.setData({
          bookdetail: res.item
        })
      }
    })
  },
  onShow: function () {
    
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // console.log('页面写在了')

  },
  onPageScroll: function (obj) {
    // console.log('页面滚动了')
  },
  onUnload: function () {
    // 页面关闭
  },
  onReachBottom: function () {
    // console.log('触底了')
  },
  gotopage: function (event) {
    var difficultyId = event.currentTarget.dataset.difid
    var lock = event.currentTarget.dataset.lock;
    if (lock == 'lock') {
      wx.showModal({
        title: '本级别还未答题',
        content: '',
        success: function (res) {
          if (res.confirm) {
          } else if (res.cancel) {
          }
        }
      })
    } else {
      // 查看本级别 的 题 
      wx.navigateTo({
        url: "/pages/personal/sj/sj?bookId=" + this.options.bookId + '&difficultyId=' + difficultyId
        // url: "/pages/personal/sjlist/sjlist?bookId=" + bookid
      })
    }

  },
})