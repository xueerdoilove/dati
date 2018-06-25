// pages/charts/charts.js
"use strict";
var app = getApp();
var root_path = "../../";
var api = require(root_path + 'api/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: { isback: true, text: '排行榜', backcolor: '#01919A' },
    paihanglist:[],
    myrankno:'',
    zhounumber:0,
    page:1,
    pageSize:100,
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
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  paihang:function(){
    var that = this;
    that.setData({
      zhounumber:0
    })
    api.get({
      url: api.get_weekrank(that.data.zhounumber, that.data.page,that.data.pageSize),
      callback: function (res) {
        that.setData({
          paihanglist: res.items
        })
        if (res.items.length > 0) {
          api.get({
            url: api.get_myrank(res.items[0].weekId),
            callback: function (resd) {
              that.setData({
                myrankno: resd.item.ranking
              })
            }
          })
        } else {
          that.setData({
            myrankno: ''
          })
        }

      }
    })
  },
  spaihang: function () {
    var that = this;
    that.setData({
      zhounumber: 1
    })
    api.get({
      url: api.get_weekrank(that.data.zhounumber,that.data.page, that.data.pageSize),
      callback: function (res) {
        that.setData({
          paihanglist: res.items
        })
        if (res.items.length > 0) {
          api.get({
            url: api.get_myrank(res.items[0].weekId),
            callback: function (resd) {
              that.setData({
                myrankno: resd.item.ranking
              })
            }
          })
        } else {
          that.setData({
            myrankno: ''
          })
        }

      }
    })
  },
  onShow: function () {
    
    this.paihang()
   
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