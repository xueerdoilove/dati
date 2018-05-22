"use strict";
var app = getApp();
var root_path = "../../../";
var api = require(root_path + 'api/api.js');
Page({
  data: {
    nav: { isback: true, text: '以书会友', backcolor:'rgba(0,0,0,0)'},
    userInfo: { userimg: '../../../images/pic.png' },
    mybook1: [{}, {}, {}, {}, {}],
    mybook2: [{}, {}, {}, {}, {}],
    mybook3: [{}, {}, {}, {}, {}],

    
  },
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    console.log(this.data.userInfo)
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
        that.setData({
          mybook:res.items
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
    // 页面关闭
  }
})