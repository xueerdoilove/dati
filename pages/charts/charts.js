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
    nav: { isback: true, text: '排行榜', backcolor: '#01919A', isIphoneX: false},
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
    var self = this;
    self.setData({
      'nav.text': app.homepagecfg[3].name
    })
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
      url: api.get_allrank(that.data.page, that.data.pageSize),
      callback: function (res) {
        that.setData({
          paihanglist: res.items
        })
        if (res.items.length > 0) {
          api.get({
            url: api.get_myrk,//--------------------------- 查询在用户中的 排行顺序
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
  onShareAppMessage: function (res) {
    var title = app.wxsharemsg.filter(function (elmt) {
      return elmt.seq == 3
    })[0].content
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: title,
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
})