// pages/bank/bank.js
"use strict";
var app = getApp();
var root_path = "../../";
var api = require(root_path + 'api/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: { isback: true, text: '银行', backcolor: '#009199' },
    showjinbi:true,
    cionlist: [],
    userInfo:{},
    coinid:0,
    jibbibao:{},
    jibbishou:true,
    jbname:'',
    jbdetail:'',
    jbjg:'',
    qiandao:true,
    duoshaoti:0,
    datijinbi:0
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
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        if (res.system.match('iOS')) {
            that.setData({
              showjinbi: true
            })
        }else{
          that.setData({
            showjinbi: false
          })
        }
      }
    })
    api.get({
      url: api.get_datijinbi(),
      callback:function(resd){
        that.setData({
          datijinbi: resd.item.coinCnt
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;

    api.get({
      url: api._myCoinTask(),
      callback:function(res){
        console.log(res)
        that.setData({
          qiandao: res.item.isQualify,// true 领过了 false 没领过
          duoshaoti: res.item.topicSetCnt
        })
      }
    })
    setTimeout(function () {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }.bind(this), 100)
    api.get({
      url: api.get_bank(),
      callback: function (res) {
        that.setData({
          cionlist: res.items
        })
      }
    })
  },
  pqiandao:function(){// 签到领金币
  var thatt = this;
  if (thatt.data.duoshaoti>=10){
    api.post({
      url: api._myCoinTask(),
      callback: function (res) {
        wx.showModal({
          title: '恭喜答够10套题领取金币',
          content: '您领取了' + res.item.coinCnt + '个金币',
          success: function (resd) {
            if (resd.confirm) {
              app.getuserdata(function () {
                thatt.setData({
                  userInfo: app.globalData.userInfo,
                  qiandao: true,
                })
              })
            } else if (resd.cancel) {
            }
          }
        })
      }
    })
  }else{
    wx.showModal({
      title: '您今天还没有答够十套题',
      content: '您已经答了' + thatt.data.duoshaoti +'套题',
      success: function (resd) {
        
      }
    })
  }
    
  },
  showjinbibao: function (event) {// 显示金币包 详情
    this.data.coinid = event.target.dataset.coinid;
    this.setData({
      jibbishou: false,
      jbname: event.target.dataset.name,
      jbdetail: event.target.dataset.detail,
      jbjg: event.target.dataset.cost
    })
    setTimeout(function(){
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'linear',
      })
      animation.scale(1).step()
      this.setData({
        jibbibao: animation.export()
      })
    }.bind(this),30)
    
  },
  closejinbibao:function(){// 关闭金币包提示
    
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
    })
    animation.scale(0).step()
    this.setData({
      jibbibao: animation.export()
    })
    setTimeout(function(){
      this.setData({
        jibbishou:true,
      })
    }.bind(this),210)
  },
  getinfo:function(){
    var self = this;
    app.getuserdata(function(){
      self.setData({
        userInfo: app.globalData.userInfo
      })
    })
    
  },
  goumai:function(){//购买金币 
  var self = this;
    wx.getSystemInfo({
      success: function (res) {
        if (res.system.match('iOS')){
          wx.showToast({
            title: '苹果设备暂不支持购买',
            icon:'none'
          })
        }else{
          var coinid = self.data.coinid;
          api.post({
            url: api.post_goumaijinbi(coinid),
            data: {},
            callback: function (res) {
              wx.requestPayment({
                'timeStamp': res.item.timeStamp + '',
                'nonceStr': res.item.nonceStr,
                'package': res.item.package,
                'signType': 'MD5',
                'paySign': res.item.paySign,
                'success': function (res) {
                  self.getinfo()
                },
                'fail': function (res) {

                }
              })
            }
          })
        }
      }
    })
    return
   
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