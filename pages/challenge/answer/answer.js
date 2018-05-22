
// pages/challenge/answer/answer.js
"use strict";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: { isback: true, text: '知识升级', backcolor: '#01919A' },
    list:[
      {
        title: '儒林外史 有几个章节',
        jieshi:'我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦',
        active:'',
        jiantoumovie:{},
        xialamovie:'',
        wenzimovie:''
      },
      {
        title: '儒林外史 有几个章节',
        jieshi: '我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦',
        active: '',
        jiantoumovie: {},
        xialamovie: '',
        wenzimovie: ''
      },
      {
        title: '儒林外史 有几个章节',
        jieshi: '我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦',
        active: '',
        jiantoumovie: {},
        xialamovie: '',
        wenzimovie: ''
      },
      {
        title: '儒林外史 有几个章节',
        jieshi: '我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦',
        active: '',
        jiantoumovie: {},
        xialamovie: '',
        wenzimovie: ''
      },
      {
        title: '儒林外史 有几个章节',
        jieshi: '我有好多各章节的 哦 ,你猜猜啊啊 啦啦啦',
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