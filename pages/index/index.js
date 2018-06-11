"use strict";

var root_path = "../../";
var api = require(root_path + 'api/api.js');

var app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    ysq:true,
    userInfo: {},
    nav: { isback: false, text: '斗书大会', backcolor: '#009199'},
    hotbook: { id: 0, authorName: "", name: "", introduction: "" },
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '快来斗书大会答题吧',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        api.post({
          url: api.post_fenxiang(),
          data: {},
          callback: function (res) {
            
            if (res.item.coinCnt > 0) {
              wx.showToast({
                title: '分享成功,获得' + res.item.coinCnt + '金币',
                icon: 'none',
                duration: 3000
              })
            } else {
              wx.showToast({
                title: '分享成功,分享任务每天只可获得一次金币',
                icon: 'none',
                duration: 4000
              })
            }

          }
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '分享失败',
          icon: 'none'
        })
      }
    }
  },
  bindGetUserInfo: function (e) {
    wx.redirectTo({
      url: 'index'
    })
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
  },
  stopPullDownRefresh: function () {
    
  },
  onReady: function () {
    // app.getusercode()
    // app.getUserInfo()
    
  },
  onShow: function () {
    var self = this;
    app.getusercode(this.getbooklist, function () {
      self.setData({
        ysq: false,
      })
    })//获取热门书籍
    
  },
  getmyconfig: function () {
    api.get({
      url:api.get_myconfig(),
      callback:function(res){
        app.myconfig = res.item
      }
    })
  },
  putmyconfig:function(){
    var self = this;
    api.put({
      url: api.put_myconfig(app.myconfig.id),
      data: JSON.stringify({pushConfig: 0,musicConfig : 1}),
      callback: function (res) {
        self.getmyconfig()
      }
    })
  },
  onHide:function(){
    console.log('页面隐藏 跳转到下一页面时触发了')
  },
  onTabItemTap: function (item){
    // console.log(item.index)
    // console.log(item.pagePath)
    // console.log(item.text)
    // console.log('ontabitemtap  当前是 tab 页时，点击 tab 时触发')
    //可以用于刷新数据, 返回顶部,等 一些特殊操作 要求功能
  },
  onPageScroll:function(obj){
    // console.log(obj)
  },
  gotopage:function(event){
    if(this.data.hotbook.id!=0){
      wx.navigateTo({
        url: "../challenge/list/list?bookId="+this.data.hotbook.id
      })
    }else{
      wx.showToast({
        title: '网络错误',
        icon: 'none',
        duration: 2000
      })
    }
    
  },
  gotopage1: function (event) {
    wx.navigateTo({
      url: "../personal/index/index"
    })
  },
  gotopage2: function (event) {
    wx.navigateTo({
      url: "../personal/shengji/shengji"
    })
  },
  gotopaihang: function (event) {
    wx.navigateTo({
      url: "../charts/charts"
    })
  },
  gotoshuku: function (event) {
    wx.navigateTo({
      url: "../library/library"
    })
  },
  gotobank: function (event) {
    wx.navigateTo({
      url: "../bank/bank"
    })
  },
  getbooklist: function () {
    var that = this;
    var eee = app.globalData.userInfo 
    this.setData({// 展示用户 信息
      userInfo: eee
    })
    api.get({
      url: api.get_bookf(),
      // url: api.get_booklist(2,1),
      callback:function(res){
        that.setData({
          hotbook: res.items[0]
        })
      }
    })
    that.getmyconfig()
    
  }
});
