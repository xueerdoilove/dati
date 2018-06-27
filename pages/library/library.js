// pages/library/library.js
"use strict";

var app = getApp();
var root_path = "../../";
var api = require(root_path + 'api/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: { isback: true, text: '答题书库', backcolor: '#01919A', isIphoneX: false},
    bookiphone5:'',
    booklist:[],
    page:1,
    pageSize:24,
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
      url: "/pages/challenge/list/list?bookId=" + bookid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getbooklist(1)
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
    var self = this;
    wx.getSystemInfo({
      success: function (res) {
        if (res.model == 'iPhone X') {
          self.setData({
            'nav.isIphoneX': true
          })
        }
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  getbooklist:function(page){
    var that = this;
    api.get({
      url: api.get_booklist(page, that.data.pageSize),
      callback: function (res) {
        if(res.items&&res.items.length>0){
          that.data.page = page+1
          var a = []
          for(var q = 0;q<that.data.booklist.length;q++){
            a = a.concat(that.data.booklist[q])
          }
          a = a.concat(res.items)
          var d = []
          var f = []
          var c = 0
          for (var i = 0; i < a.length; i++) {
            if (d.length == 4) {
              f.push(d)
              d = []
              d.push(a[i])
            } else {
              d.push(a[i])
            }
          }
          f.push(d)
          that.setData({
            booklist: f
          })
        }else{
          wx.showToast({
            title: '没有更多书籍了',
            icon:'none'
          })
        }
        
      }
    })
  },
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
    this.getbooklist(this.data.page)
  },

 
})