"use strict";
var app = getApp();
var root_path = "../../../";
var api = require(root_path + 'api/api.js');
Page({
  data: {
    nav: { isback: true, text: '以书会友', backcolor:'rgba(0,0,0,0)'},
    userInfo: { userimg: '../../../images/pic.png' },
    mybook1: [{}, { }, {}, {}, {}],
    mybook2: [{}, { }, {}, {}, {}],
    mybook3: [{}, {}, {}, { }, {}],

    
  },
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  onReady: function () {
    var that = this;
    api.get({
      url: api.get_mybook(),
      callback:function(res){
        for(var i=0;i<res.items.length;i++){
          if(i<5){
            var a = 'mybook1[' + i + ']'
            that.setData({
              [a]:res.items[i]
            })
            console.log(a)
          }else if(i<10){
            var a = 'mybook2[' + (i-5) + ']'
            that.setData({
              [a]: res.items[i]
            })
          }else if(i<15){
            var a = 'mybook3[' + (i - 10) + ']'
            that.setData({
              [a]: res.items[i]
            })
          }
        }
      }
    })
  },
  onShow: function () {
    // this.drawimg()
  },
  onHide: function () {
    // 页面隐藏
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
      wx.showToast({
        title: '错误101',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: "/pages/challenge/list/list?bookId=" + bookid
    })
  }
})