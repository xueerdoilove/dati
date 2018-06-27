"use strict";
var app = getApp();
var root_path = "../../../";
var api = require(root_path + 'api/api.js');
Page({
  data: {
    nav: { isback: true, text: '斗书大会', backcolor: 'rgba(0,0,0,0)', isIphoneX: false},
    userInfo: { userimg: '../../../images/pic.png' },
    mybook1: [{}, {}, {}, {}, {}],
    mybook2: [{}, {}, {}, {}, {}],
    mybook3: [{}, {}, {}, {}, {}],
    iphone5:false,

  },
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  onReady: function () {
    var self = this;
    wx.getSystemInfo({
      success: function (res) {
        if (res.model == 'iPhone X') {
          self.setData({
            'nav.isIphoneX': true
          })
        } else if (res.model == 'iPhone 5'){
          self.setData({
            iphone5:true,
          })
        }
      }
    })
    var that = this;
    api.get({
      url: api.get_mybook(1,15,2),
      callback:function(res){
        var aaa  = []
        for(var i=0;i<res.items.length;i++){
          if (res.items[i].bookState==2){
            aaa.push(res.items[i])
          }
        }
        for (var i = 0; i < aaa.length;i++){
          if(i<5){
            var a = 'mybook1[' + i + ']'
            that.setData({
              [a]: aaa[i]
            })
            console.log(a)
          }else if(i<10){
            var a = 'mybook2[' + (i-5) + ']'
            that.setData({
              [a]: aaa[i]
            })
          }else if(i<15){
            var a = 'mybook3[' + (i - 10) + ']'
            that.setData({
              [a]: aaa[i]
            })
          }
        }
      }
    })
  },
  onShow: function () {
    // this.drawimg()
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
  onHide: function () {
    
  },
  onUnload: function () {
    // 页面关闭
    
  },
  savetupian:function(){
    
  },
  drawimg:function(){
    // authorName "施耐庵"
    // bookState 1
    // id 2
    // introduction "石头记"
    // name "红楼梦"
    // weight 6
    var ctx = wx.createCanvasContext('mycanvas')
    ctx.drawImage('http://image.didayundong.com/4a97bd12-1bb3-40e8-ae9a-8dd05a29965f', 0, 0, 315, 560)
    ctx.setFillStyle('#ffffff')
    var b1 = this.data.mybook1
    var b2 = this.data.mybook2
    var b3 = this.data.mybook3
    ctx.setFontSize(10)
    for(var i=0;i<b1.length;i++){
      if (b1[i].name==undefined){continue}
      ctx.fillText(b1[i].name, 20+i*60, 250)
    }
    for (var i = 0; i < b2.length; i++) {
      if (b2[i].name == undefined) { continue }
      ctx.fillText(b2[i].name, 20 + i * 60, 345)
    }
    for (var i = 0; i < b3.length; i++) {
      if (b3[i].name == undefined) { continue }
      ctx.fillText(b3[i].name, 20 + i * 60, 440)
    }
    ctx.draw()


  },
  gotopage:function(event){
    var bookid = event.target.dataset.bookid
    if (bookid == undefined) {
      // wx.showToast({
      //   title: '错误101',
      //   icon: 'none'
      // })
      return
    }
    wx.navigateTo({
      url: "/pages/challenge/list/list?bookId=" + bookid
    })
  }
})