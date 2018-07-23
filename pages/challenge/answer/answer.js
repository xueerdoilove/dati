
// pages/challenge/answer/answer.js
"use strict";
var app = getApp();
var root_path = "../../../";
var api = require(root_path + 'api/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: { isback: true, text: '知识升级', backcolor: '#01919A', isIphoneX: false},
    cionxf:0,
    list:[
      {
        title: '',
        jieshi:'',
        active:'',
        jiantoumovie:{},
        xialamovie:'',
        wenzimovie:''
      },
      {
        title: '',
        jieshi: '',
        active: '',
        jiantoumovie: {},
        xialamovie: '',
        wenzimovie: ''
      },
      {
        title: '',
        jieshi: '',
        active: '',
        jiantoumovie: {},
        xialamovie: '',
        wenzimovie: ''
      },
      {
        title: '',
        jieshi: '',
        active: '',
        jiantoumovie: {},
        xialamovie: '',
        wenzimovie: ''
      },
      {
        title: '',
        jieshi: '',
        active: '',
        jiantoumovie: {},
        xialamovie: '',
        wenzimovie: ''
      },
    ],
    prelistindex:-1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.gettaotidaan()
    
  },
  gettaotidaan:function(iddd){
    var that = this;
    var topicsetid = that.options.topicsetid
    api.get({
      url: api.get_myTopicSet(topicsetid),
      callback: function (res) {
        var arr = res.items;
        var arr1 = []
        for (var i = 0; i < arr.length; i++) {
          var a1 = {
            'title': arr[i].title,
            'jieshi': arr[i].answerExplanation || '',
            'active': '',
            'jiantoumovie': {},
            'xialamovie': '',
            'wenzimovie': '',
            'id': arr[i].id,
            'buyState': arr[i].buyState
          }
          if(iddd){
            if (iddd == a1.id){
              a1.xialamovie = 'height:auto;'
              a1.wenzimovie = 'opacity:1;'
              a1.active = 'active'
            }
          }
          arr1.push(a1)
        }

        that.setData({
          list: arr1
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var self = this;
    self.setData({
      'nav.text': app.homepagecfg[0].name
    })
    api.get({
      url: api.get_goumaiti(),
      callback: function (res) {
        self.setData({
          cionxf: res.item.configValue
        })
      }
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
  onShow: function () {
    wx.getStorage({
      key: 'yinyue',
      success: function (res) {
        if (res.data) {
          app.bgmusic.play()
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
  payoneti:function(event){
    var self = this;
    var id = event.currentTarget.dataset.topicid
    app.getuserdata(function () {
      var myjinbi = app.globalData.userInfo.coinCnt - self.data.cionxf
      if (myjinbi > 0) {// 如果 余额大于 支付 金币
        api.post({
          url: api.post_maiti(id),//topicid
          callback: function (res) {
            self.gettaotidaan(id)
            wx.showToast({
              title: '消费' + self.data.cionxf + '金币',
              icon: 'none'
            })
          }
        })
      } else {
        wx.showModal({
          title: '金币不足,需要购买金币吗',
          content: '当前金币为' + app.globalData.userInfo.coinCnt + ',还需' + (-1 * myjinbi) + '金币',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/bank/bank',
              })
            } else if (res.cancel) {

            }
          }
        })
      }
    })
  },
  showjieshi: function (event){
    var btnindex = event.currentTarget.dataset.index
    if(this.data.prelistindex==-1){
      this.data.prelistindex = btnindex
      var a1 = wx.createAnimation({
        duration:100,
      })
      a1.rotate(0).step()
      var b1 = 'list[' + btnindex + '].jiantoumovie'
      var b2 = 'list[' + btnindex + '].active'
      var b3 = 'list[' + btnindex + '].wenzimovie'
      var b4 = 'list[' + btnindex +'].xialamovie'
      this.setData({
        [b1]: a1.export(),
        [b2]: 'active',
        [b3]: 'opacity:1;',
        [b4]: 'height:auto;'
      })
    } else if (this.data.prelistindex != btnindex){
      var preindex = this.data.prelistindex
      var a1 = wx.createAnimation({
        duration: 100,
      })
      a1.rotate(-90).step()
      var b1 = 'list[' + preindex + '].jiantoumovie'
      var b2 = 'list[' + preindex + '].active'
      var b3 = 'list[' + preindex + '].wenzimovie'
      var b4 = 'list[' + preindex + '].xialamovie'
      this.setData({
        [b1]: a1.export(),
        [b2]: '',
        [b3]: 'opacity:0;',
        [b4]: 'height:0;'
      })
      //-----------------------------------------------
      var d1 = wx.createAnimation({
        duration: 100,
      })
      d1.rotate(0).step()
      var c1 = 'list[' + btnindex + '].jiantoumovie'
      var c2 = 'list[' + btnindex + '].active'
      var c3 = 'list[' + btnindex + '].wenzimovie'
      var c4 = 'list[' + btnindex + '].xialamovie'
      this.setData({
        [c1]: d1.export(),
        [c2]: 'active',
        [c3]: 'opacity:1;',
        [c4]: 'height:auto;'
      })
      this.data.prelistindex = btnindex
      
    }else{
      var preindex = this.data.prelistindex
      var a1 = wx.createAnimation({
        duration: 100,
      })
      a1.rotate(-90).step()
      var b1 = 'list[' + preindex + '].jiantoumovie'
      var b2 = 'list[' + preindex + '].active'
      var b3 = 'list[' + preindex + '].wenzimovie'
      var b4 = 'list[' + preindex + '].xialamovie'
      this.setData({
        [b1]: a1.export(),
        [b2]: '',
        [b3]: 'opacity:0;',
        [b4]: 'height:0;'
      })
      this.data.prelistindex = -1
    }
  },
})