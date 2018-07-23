"use strict";

var root_path = "../../";
var api = require(root_path + 'api/api.js');
var util = require(root_path + 'utils/util.js');

var app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    ysq:true,//授权页面显示 
    userInfo: {},
    nav: { isback: false, text: '斗书大会', backcolor: '#009199', isIphoneX:false},
    hotbook: { id: 0, authorName: "", name: "", introduction: "" },
    shezhishow:false,// 设置框 显示否
    tsvalue: true,// 推送值
    tuisongdata:{},//推送数据
    tuisongshow:false,//推送 显示开关
    yyvalue:true,//背景音乐 值
    yxvalue:true,// 音效 
    hbdata:{id:0},//红包数据
    hongbaoshow:false,// 红包页面 显示开关
    animationData:{},//红包 动画 
    amount: 0,
    hongbaomessage:'',
    ztzsHeight: '',// 周挑战赛 高度
    zssjHeight:'',// 知识升级 高度
    dtskHeight: '',// 答题书库
    phbHeight: '',// 排行榜
    yhHeight: '',// 银行
    szHeight:'',// 设置
    ztzstmb:'',
    left1: {},
    left2: {},
    right1: {},
    right2: {},
    right3: {},
    right4: {},
  },
  onReady: function () {
    var self = this;
    wx.getStorage({//  查询 音效 本地缓存 赋值 
      key: 'yinxiao',
      success: function (res) {
        self.setData({
          yxvalue: res.data
        })
      },
      fail:function(res){
        wx.setStorage({
          key: 'yinxiao',
          data: true,
        })  
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        var divwidt = (res.screenWidth-30)*0.48// 每个小框字的 宽度
        var divmargin = divwidt * 0.06 // 每个小框子的 间隔
        
        self.setData({
          ztzsHeight: 'height:' + divwidt * 1.52 + 'px',
          ztzstmb: 'padding-top:' + (divmargin-6) +'px',
          zssjHeight: 'height:' +divwidt * 1.15 + 'px;margin-top:' + divmargin + 'px',
          dtskHeight: 'height:' +divwidt * 1.09 + 'px',
          phbHeight: 'height:' +divwidt * 0.55 + 'px;margin-top:' + divmargin + 'px',
          yhHeight: 'height:' +divwidt * 0.55 + 'px;margin-top:' + divmargin + 'px',
          szHeight: 'height:' +divwidt * 0.36 + 'px;margin-top:' + divmargin + 'px',
        })

        if (res.model == 'iPhone X') {
          self.setData({
            'nav.isIphoneX': true
          })
        }
      }
    })
    // app.getusercode()
    // app.getUserInfo()

  },
  onShow: function () {
    var self = this;
    self.gethomepagecfg()
    app.getusercode(this.getbooklist, function () {
      self.setData({
        ysq: false,
      })
    })//获取热门书籍
    
  },
  onShareAppMessage: function (res) {
    var title = app.wxsharemsg.filter(function(elmt){
      return elmt.seq==1
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
  bindGetUserInfo: function (e) {
    wx.redirectTo({
      url: 'index'
    })
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
  },
  stopPullDownRefresh: function () {
    
  },
  
  onHide: function () {
    // console.log('页面隐藏 跳转到下一页面时触发了')
  },
  onTabItemTap: function (item) {
    // console.log(item.index)
    // console.log(item.pagePath)
    // console.log(item.text)
    // console.log('ontabitemtap  当前是 tab 页时，点击 tab 时触发')
    //可以用于刷新数据, 返回顶部,等 一些特殊操作 要求功能
  },
  onPageScroll: function (obj) {
    // console.log(obj)
  },
  getwxsharemsg: function () {// 查询分享 文案
    api.get({
      url: api.get_wxsharemsg(),
      callback:function(res){
        app.wxsharemsg = res.items
        var title = app.wxsharemsg.filter(function (elmt) {
          return elmt.seq == 1
        })[0].content
        console.log(title)
      }
    })
  },
  gethomepagecfg:function(){//获取首页图面
    var self = this;
    api.get({
      url: api.get_homepagecfg(),
      callback:function(res){
        
        for (var i = 0; i < res.items.length; i++) {
          if (res.items[i].seq == 1) {
            self.setData({
              left1: res.items[i]
            })
          } else if (res.items[i].seq == 2) {
            self.setData({
              left2: res.items[i]
            })
          } else if (res.items[i].seq == 3) {
            self.setData({
              right1: res.items[i]
            })
          } else if (res.items[i].seq == 4) {
            self.setData({
              right2: res.items[i]
            })
          } else if (res.items[i].seq == 5) {
            self.setData({
              right3: res.items[i]
            })
            app.right3 = res.items[i]
          } else if (res.items[i].seq == 6) {
            self.setData({
              right4: res.items[i]
            })
          }
        }
        setTimeout(function(){
          app.homepagecfg=[]
          app.homepagecfg.push(self.data.left1)
          app.homepagecfg.push(self.data.left2)
          app.homepagecfg.push(self.data.right1)
          app.homepagecfg.push(self.data.right2)
          app.homepagecfg.push(self.data.right3)
          app.homepagecfg.push(self.data.right4)
        },30)
      }
    })
  },
  closedsz:function(){//关闭设置
    this.setData({
      shezhishow:false,
    })
  },
  showshezhi:function(){// 打开设置
    this.setData({
      shezhishow:true,
    })
  },
  tuisongset: function (e) {//  推送 开关
    // console.log(e.detail.value)
    var self = this;
    this.setData({
      tsvalue: e.detail.value
    })
    wx.setStorage({
      key: "tuisong",
      data: e.detail.value
    })
    wx.getStorage({
      key: 'yinyue',
      success: function (res) {
        self.putmyconfig({ pushConfig: e.detail.value ? 1 : 0, backgroundMusic: res.data ? 1 : 0, answerMusic:0})
      }
    })
  },
  yinxiaoset: function (e) {// 音效 开管
    var self = this;
    this.setData({
      yxvalue: e.detail.value
    })
    wx.setStorage({
      key: "yinxiao",
      data: e.detail.value
    })
    wx.getStorage({
      key: 'yinxiao',
      success: function (res) {
      }
    })
  },
  yinyueset: function (e) {// 音乐 开管
    // console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    var self = this;
    this.setData({
      yyvalue: e.detail.value
    })
    if(e.detail.value){
      app.bgmusic.play()
    }else{
      app.bgmusic.pause()
    }
    wx.setStorage({
      key: "yinyue",
      data: e.detail.value
    })
    wx.getStorage({
      key: 'tuisong',
      success: function (res) {
        self.putmyconfig({ backgroundMusic: e.detail.value ? 1 : 0, pushConfig: res.data ? 1 : 0, answerMusic: 0})
      }
    })
    
  },
  closedts: function () {
    this.setData({
      tuisongshow: false
    })
  },
  gettuisong: function () {// 查询广告
    var self = this;
    api.get({
      url: api.get_latestAds,
      callback: function (res) {
        if (res.item.name) {
          self.setData({
            tuisongdata: res.item,
            tuisongshow: true
          })
        }

      }
    })
  },
  getmyconfig: function () {
    var self = this;
    api.get({
      url:api.get_myconfig(),
      callback:function(res){
        app.myconfig = res.item
        wx.setStorage({
          key: "yinyue",
          data: res.item.backgroundMusic==1?true:false,
        })
        wx.setStorage({
          key: "tuisong",
          data: res.item.pushConfig == 1 ? true : false,
        })
        
        wx.getStorage({
          key: 'tuisong',
          success: function (res) {
            // console.log(res.data)
            self.setData({
              tsvalue: res.data
            })
            if (res.data){
              wx.getStorage({
                key: 'tuisongnum',
                success: function(res) {
                  if (res.data != util.formatDate()){
                    wx.setStorage({
                      key: 'tuisongnum',
                      data: util.formatDate(),
                    })
                    self.gettuisong()
                  }
                },
                fail:function(res){
                  wx.setStorage({
                    key: 'tuisongnum',
                    data: util.formatDate(),
                  })
                  self.gettuisong()
                }
              })
            }
          }
        })
        wx.getStorage({
          key: 'yinyue',
          success: function (res) {
            self.setData({
              yyvalue: res.data
            })
            if (app.bgmusic.src == undefined) {
              if (res.data) {
                app.bgmusic = wx.createInnerAudioContext()
                app.bgmusic.autoplay = true
                app.bgmusic.loop = true
                app.bgmusic.src = 'https://doushudahui.com/dati/bj.mp3'
                app.bgmusic.onPlay(() => {
                  // console.log('开始播放')
                })
              } else {
                app.bgmusic = wx.createInnerAudioContext()
                app.bgmusic.loop = true
                app.bgmusic.src = 'https://doushudahui.com/dati/bj.mp3'
              }
            }else{
              if (res.data) {
                // app.bgmusic.src = 'https://doushudahui.com/dati/bj.mp3'
                if (app.bgmusic.src !='https://doushudahui.com/dati/bj.mp3'){
                  app.bgmusic.src = 'https://doushudahui.com/dati/bj.mp3'
                }
                app.bgmusic.play()
              }
            }
          }
        })
      }
    })
  },
  putmyconfig:function(obj){
    var self = this;
    var data = {answerMusic:0}
    if (obj.pushConfig!=undefined){
      data.pushConfig = obj.pushConfig
    }
    if (obj.backgroundMusic != undefined) {
      data.backgroundMusic = obj.backgroundMusic
    }
    api.put({
      url: api.put_myconfig(app.myconfig.id),
      data: JSON.stringify(data),
        callback: function (res) {
      }
    })
  },
  
  gotopage:function(event){
    if(this.data.hotbook.id!=0){
      wx.navigateTo({
        url: "../challenge/list/list?bookId="+this.data.hotbook.id
      })
    }else{
      wx.showToast({
        title: '网络错误',
        icon: 'none',
        duration: 2000
      })
    }
    
  },
  gotopage1: function (event) {
    wx.navigateTo({
      url: "../personal/index/index"
    })
  },
  gotopage2: function (event) {
    wx.navigateTo({
      url: "../personal/shengji/shengji"
    })
  },
  gotopaihang: function (event) {
    wx.navigateTo({
      url: "../charts/charts"
    })
  },
  gotoshuku: function (event) {
    wx.navigateTo({
      url: "../library/library"
    })
  },
  gotobank: function (event) {
    wx.navigateTo({
      url: "../bank/bank"
    })
  },
  getbooklist: function () {
    var that = this;
    var eee = app.globalData.userInfo 
    this.setData({// 展示用户 信息
      userInfo: eee
    })
    api.get({
      url: api.get_bookf(),
      // url: api.get_booklist(2,1),
      callback:function(res){
        that.setData({
          hotbook: res.items[0]
        })
      }
    })
    that.getmyconfig()// 获取用户 配置信息
    that.gethongbao()//获取红包
    that.getwxsharemsg()// 调用 查询分享文案
  },
  hongbaomovie: function () {// 红包 动画 方法
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear',
    })
    animation.rotate(10).scale(1.2, 1.2).translateX(3).step()
    animation.rotate(-10).scale(1.2, 1.2).translateX(-3).step()
    animation.rotate(10).scale(1.2, 1.2).translateX(3).step()
    animation.rotate(-10).scale(1.2, 1.2).translateX(-3).step()
    animation.rotate(10).scale(1.2, 1.2).translateX(3).step()
    animation.rotate(0).scale(1,1).translateX(0).step()
    setTimeout(function(){
      this.setData({
        animationData: animation.export(),
      })
    }.bind(this),1000)
  },
  lingquhb:function(){//领取红包
  var self = this;
    wx.showModal({
      title: '领取红包成功',
      content: '恭喜您领取' + this.data.amount +'元红包,已发放到您的余额',
      color:'red',
      success: function (res) {
        if (res.confirm) {
          self.closedhb()
        } else if (res.cancel) {
          self.closedhb()
        }
      }
    })
  },
  closedhb: function () {//关闭红包
    this.setData({
      hongbaoshow: false,
    })
  },
  gethongbaozg:function(){// 查询红包资格
    var self = this;
    api.post({
      url: api.post_hongbaozg(self.data.hbdata.id),
      callback:function(res){
        console.log(res)
        
        if(res.item){
          api.put({
            url: api.put_hongbao(res.item.id),
            callback: function (resd) {
              if(resd.item){
                self.setData({
                  hongbaoshow: true,
                  amount: resd.item.amount
                })
              }else{
                self.setData({
                  hongbaoshow: true,
                  amount: -1,
                  hongbaomessage: '红包领取失败'
                })
              }
            }
          })
        }else{

          self.setData({
            hongbaoshow: true,
            amount: -1,
            hongbaomessage: res.errorMessage
          })
        }
        
      }
    })
  },
  gethongbao:function(){//查询本周有红包 活动 没
    var self = this;
    api.get({
      url: api.get_hongbao(),
      callback:function(resd){
        if (resd.item.id==undefined){
          self.setData({
            hbdata: {id:0}
          })
        }else{
          self.setData({
            hbdata:resd.item
          })
          self.hongbaomovie()
        }
      }
    })
  }
});
