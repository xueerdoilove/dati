"use strict";
var app = getApp();
var root_path = "../../../";
var api = require(root_path + 'api/api.js');
Page({
  data: {
    // text:"这是一个页面"
    nav: { isback: true, text: '周挑战赛', backcolor: '#009199'},
    bookdetail:{},

  },
  onLoad: function (options) {
    
  },
  onReady: function () {
    
  },
  onShow: function () {
    wx.getStorage({
      key: 'yinyue',
      success: function (res) {
        if (res.data) {
          app.bgmusic.play()
        }
      }
    })
    // 页面显示
    app.getuserdata()
    var that = this;
    api.get({
      url: api.get_bookdefi(that.options.bookId),
      callback: function (res) {
        console.log(res)
        that.setData({
          bookdetail: res.item
        })
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload:function(){
    // console.log('页面写在了')

  },
  onPageScroll: function (obj){
    // console.log('页面滚动了')
  },
  onUnload: function () {
    // 页面关闭
  },
  onReachBottom:function(){
    // console.log('触底了')
  },
  gotopage: function (event) {
    var difid = event.currentTarget.dataset.difid
    var lock = event.currentTarget.dataset.lock;
    if(lock=='lock'){
      wx.showModal({
        title: '请完成上一级别的挑战',
        content: '',
        success: function (res) {
          if (res.confirm) {
          } else if (res.cancel) {
          }
        }
      })
    }else{
      if (app.globalData.userInfo.coinCnt > event.currentTarget.dataset.coin){
        wx.navigateTo({
          url: "../game/game?bookId=" + this.options.bookId + '&difid=' + difid + '&huodejinbi=' + event.currentTarget.dataset.jinbi
        })
      }else{
        wx.showModal({
          title: '您的金币不够进入此关',
          content: '',
          success: function (res) {
            if (res.confirm) {
            } else if (res.cancel) {
            }
          }
        })
      }
      
    }
    
  },
})