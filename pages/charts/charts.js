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
  onShow: function () {
    var that = this;
    api.get({
      url: api.get_weekrank(0),
      callback:function(res){
        that.setData({
          paihanglist: res.items
        })
        if(res.items.length>0){
          api.get({
            url: api.get_myrank(res.items[0].weekId),
            callback: function (resd) {
              that.setData({
                myrankno: resd.item.ranking
              })
            }
          })
        }else{
          that.setData({
            myrankno: ''
          })
        }
        
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