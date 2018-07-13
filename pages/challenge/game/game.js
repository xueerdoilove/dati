// pages/challenge/game/game.js
"use strict";
var app = getApp();
var root_path = "../../../";
var api = require(root_path + 'api/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: { isback: true, text: '周挑战赛', backcolor: '#01919A', isIphoneX: false},
    fanhui:false,
    daduijiti:0,// 答对几题
    animationData: {},//正转动画
    animationData1: {},//倒转动画
    bgmovie:{},//倒计时 背景动画
    indexmovie:{},// 第几题 动画
    timumovie:{},// 题目 动画
    chakandn:{},//查看答案 动画
    donghuaView: true,
    btnstate:{a1:'',a2:'',a3:'',a4:''},//按钮 答案提示
    proData: { showValue: 0, value: 0, animation: {}, animation1: {} },
    btnmovie:{}, //按钮 动画
    jiazai:{},//加载转圈动画 
    endimgmovie:{},//答题结束胜利失败 动画
    yssurl:'http://image.didayundong.com/3ddbb780-d786-4a0d-95e9-f48b1dfd6ae2',
    ysscss:'lostimg',
    endimgmovie1:{},
    tssurl:'http://image.didayundong.com/94a23aa9-7e91-406b-a359-d869da121aa4',
    datichaoshi:null,//答题超时 计时器
    datikaiguan:false,
    datijieend:false,//答题结束后 的 页面 显示控制器
    fxzj:true,//分享战绩 按钮  显示 开关
    rightyinyue: '',// 答对的音乐播放
    falseyinyue:'',// 答对的音乐播放
    slyinyue: '',// 胜利 音乐
    sbyinyue:'',// 失败 音乐
    sjyinyue:'',//升级
    timu:[
      { q: '1+2=', a1: '1', a2: '2', a3: '3', a4: '4', index: '一', fenzhi: 20, ans: '3', topicId: '0'},
      { q: '1+1=', a1: '1', a2: '2', a3: '3', a4: '4', index: '二', fenzhi: 20, ans: '2', topicId: '0'},
      { q: '1+3=', a1: '1', a2: '2', a3: '3', a4: '4', index: '三', fenzhi: 20, ans: '4', topicId: '0'},
      { q: '1+4=', a1: '1', a2: '2', a3: '3', a4: '5', index: '四', fenzhi: 20, ans: '5', topicId: '0'},
      { q: '1+5=', a1: '1', a2: '2', a3: '3', a4: '6', index: '五', fenzhi: 20, ans: '6', topicId: '0'},
    ],
    taotiId:0,// 本套题的 id
    timudetail: { q: '1+2=', a1: '1', a2: '2', a3: '3', a4: '4', index: '一', fenzhi: 20, ans: '3', topicId: '0'},
    timuindex:-1,
    userInfo:{},
    answerList:[],//传送给服务器的 数据
    zuihoudefen:0,//最终得分
    huodejinbi:0,// 获得金币
    cionxf:1,// 购买题 需花多少金币
    yimaidaan:false,// 初始设置 还没买过题
    fenxiangjinbi:0,//分享 获得 多少金币
    jibieshow:false,// 升级 显示控制 
    jibie:'',// 升级 等级 名称
    meitile:false,// 没有提了 控制 页面显示用
    yxvalue:true,//  音效开关
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    wx.getStorage({//  查询 音效 本地缓存 赋值 
      key: 'yinxiao',
      success: function (res) {
        self.setData({
          yxvalue: res.data
        })
      },
      fail: function (res) {
        self.setData({
          yxvalue: true
        })
      }
    })
    api.get({
      url: api.get_goumaiti(),
      callback:function(res){
        self.setData({
          cionxf: res.item.configValue
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
    wx.getSystemInfo({
      success: function (res) {
        if (res.model == 'iPhone X') {
          self.setData({
            'nav.isIphoneX': true
          })
        }
      }
    })
    this.data.rightyinyue = wx.createInnerAudioContext();
    this.data.rightyinyue.src = 'https://doushudahui.com/dati/zhengque.mp3'
    this.data.falseyinyue = wx.createInnerAudioContext();
    this.data.falseyinyue.src = 'https://doushudahui.com/dati/cuowu.mp3'
    this.data.slyinyue = wx.createInnerAudioContext();
    this.data.slyinyue.src = 'https://doushudahui.com/dati/guoguan.mp3'
    this.data.sbyinyue = wx.createInnerAudioContext();
    this.data.sbyinyue.src = 'https://doushudahui.com/dati/mguoguan.mp3'
    this.data.sjyinyue = wx.createInnerAudioContext();
    this.data.sjyinyue.src = 'https://doushudahui.com/dati/shengji.mp3'
    var animation = wx.createAnimation({
      duration: 20000,
      timingFunction: 'linear',
    })
    var animation1 = wx.createAnimation({
      duration: 20000,
      timingFunction: 'linear',
    })
    // this.animation = animation
    // this.animation1 = animation
    setTimeout(function () {
      animation.rotate(1020).step()
      animation1.rotate(-1020).step()
      this.setData({
        animationData: animation.export(),
        animationData1: animation1.export(),
        huodejinbi:this.options.huodejinbi,// url 参数中 带入的 获得金币数目
      })
    }.bind(this), 300);
    setTimeout(function () {
      this.jiazaimove()// 加载动画  上移 动画
    }.bind(this), 3000)
    setTimeout(function () {
      this.setData({//显示 答题 ,关闭 进入 动画
        donghuaView: false
      })
      this.bgdonghua()//倒计时背景 动画
      this.nexttimu()// 开始 第一题
    }.bind(this), 4000)
    var that = this;
    api.get({
      url: api.get_dati(this.options.bookId, this.options.difid),
      callback:function(res){
        if (res.item==undefined){//------------------------------本级别题目打完了---------------------
          that.setData({
            donghuaView:false,
            meitile:true
          })
          wx.showModal({
            title: '本级别题已答完',
            content: '请选择其他级别进行答题吧',
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              } else if (res.cancel) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
          return;
        }
        that.data.taotiId = res.item.id;

        var a = { q: '1+2=', a1: '1', a2: '2', a3: '3', a4: '4', index: '一', fenzhi: 20, ans: '3', topicId:'0'}
        var list = []
        var b = res.item.topicList
        for (var i = 0; i < b.length;i++){
          if(i==0){
            a.index='一'
          } else if (i == 1) {
            a.index = '二'
          } else if (i == 2) {
            a.index = '三'
          } else if (i == 3) {
            a.index = '四'
          } else if (i == 4) {
            a.index = '五'
          }
          a.q = b[i].title
          a.topicId = b[i].id
          var dd = b[i].answerList.length;
          if(dd==2){
            a.a1 = b[i].answerList[0].answerText;
            a.a2 = b[i].answerList[1].answerText;
            a.a3 = ''
            a.a4 = ''
          }else{
            a.a1 = b[i].answerList[0].answerText;
            a.a2 = b[i].answerList[1].answerText;
            a.a3 = b[i].answerList[2].answerText;
            a.a4 = b[i].answerList[3].answerText;
          }
          a.ans = b[i].answerList[b[i].answer - 1].answerText
          
          list.push(JSON.parse(JSON.stringify(a)))
        }
        that.setData({
          timu: list
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    app.getuserdata(function(){
      that.setData({
        userInfo: app.globalData.userInfo
      })
    })
    api.get({
      url: api.get_fenxiangjinbi(),
      callback: function (resd) {
        that.setData({
          fenxiangjinbi: resd.item.coinCnt
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.data.rightyinyue.destroy()
    this.data.falseyinyue.destroy()
    this.data.slyinyue.destroy()
    this.data.sbyinyue.destroy()
    this.data.sjyinyue.destroy()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.data.fanhui = true;
    this.data.rightyinyue.destroy()
    this.data.falseyinyue.destroy()
    this.data.slyinyue.destroy()
    this.data.sbyinyue.destroy()
    this.data.sjyinyue.destroy()
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '我在斗书大会答题中获得了' + this.data.zuihoudefen +'分',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        api.post({
          url: api.post_fenxiang(),
          data:{},
          callback:function(res){
            if (res.item.coinCnt>0){
              wx.showToast({
                title: '分享成功,获得' + res.item.coinCnt + '金币',
                icon: 'none',
                duration: 3000
              })
            }else{
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
  centinue:function(){//继续答题
    wx.navigateBack({
      delta: 1
    })
  },
  gotodaan:function(){

    var id = this.data.taotiId;
    var myjinbi 
    var self = this;
    if (self.data.yimaidaan){
      
      wx.navigateTo({
        url: '../answer/answer?topicsetid=' + id,
      })
    }else{
      app.getuserdata(function () {
        myjinbi = app.globalData.userInfo.coinCnt - self.data.cionxf
        if (myjinbi > 0) {// 如果 余额大于 支付 金币
          api.post({
            url: api.post_maiti(id),
            callback: function (res) {
              self.setData({
                yimaidaan:true
              })
              wx.navigateTo({
                url: '../answer/answer?topicsetid=' + id,
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
    }
    
   
    
  },
  setprogress: function (val, showVal) {// 得分进度 动画
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease-in-out',
    })
    var animation1 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-in-out',
    })
    animation.width(val).step()
    animation1.scale(1.5, 1.5).step()
    animation1.scale(1,1).step()
    this.setData({
      'proData.value': val,
      'proData.showValue': showVal,
      'proData.animation': animation.export(),
      'proData.animation1': animation1.export(),
    })
  },
  bgdonghua:function(){//背景 圆点动画
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-in-out',
    })
    animation.scale(1, 1).step()
    this.setData({
      'bgmovie': animation.export(),
    })
  },
  indexdonghua:function(){//第一题 动画
    var animation = wx.createAnimation({
      duration:300,
      timingFunction:'ease-in-out'
    })
    animation.scale(1.2, 1.2).opacity(1).step()
    animation.scale(1 ,1 ).step()
    this.setData({
      'indexmovie':animation.export()
    })
  },
  timushow:function(){ //问题 显示 动画
    var animation = wx.createAnimation({
      duration:20,
    })
    animation.opacity(1).step()
    this.setData({
      'timumovie':animation.export()
    })
  },
  timuhide:function(){// 问题 隐藏动画
    var animation = wx.createAnimation({
      duration: 20,
    })
    animation.opacity(0).step()
    this.setData({
      'timumovie': animation.export()
    })
  },
  btnshow:function(){ // 答案 选项 show 动画
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-in-out',
    })
    animation.scale(1.1, 1.1).step()
    animation.scale(1, 1).step()
    this.setData({
      'btnmovie': animation.export(),
    })
  },
  btnhidden: function () {// 答案 选项 hide 动画
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-in-out',
    })
    animation.scale(0, 0).step()
    this.setData({
      'btnmovie': animation.export(),
    })
  },
  jiazaimove:function(){ //场景加载 上移动画
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease-in-out',
    })
    animation.translateY(-1000).step()
    this.setData({
      'jiazai': animation.export(),
    })
  },
  stopTime:function(){ //停止 秒表 并返回 剩余时间
    var timesurplus = this.selectComponent("#componentId").stopDrawCircle()
    return timesurplus
  },
  initTime:function(){ // 秒表 归位 10
    this.selectComponent("#componentId").backInit()
  },
  startTime:function(){// 开始 计时
    this.selectComponent("#componentId").countInterval()
  },
  datikaishi:function(){// 开始 答题
    setTimeout(function(){
      this.btnshow()
    }.bind(this),2000)
    setTimeout(function () {
      this.data.datikaiguan = true;
      this.selectComponent("#componentId").countInterval()
      this.data.datichaoshi = setTimeout(function () {
        this.nexttimu()
      }.bind(this), 11000)
    }.bind(this), 3000)
  },
  datijieshu:function(){// 答题结束

    this.setData({
      datijieend:true
    })
    this.endimgdonghua()
  },
  defen: function (event){//答题 得分
    // {
    //   topicId: 123, -> 题目id
    //   answer: 2, -> 用户选择的选项
    //   seconds: 7, -> 用户答题用时间
    //   points: 120 -> 用户得分
    // }
    if (!this.data.datikaiguan){return}
    this.data.datikaiguan = false;
    clearTimeout(this.data.datichaoshi)
    var ans = event.target.dataset.ans
    var btnindex = event.target.dataset.index
    var yks = 'btnstate.' + btnindex
    this.setData({
      [yks]: 'checked',
    })
    if (ans == this.data.timudetail.ans){// 答对了
      if (this.data.yxvalue){
        this.data.rightyinyue.play()
      }
      var asr = { topicId: event.target.dataset.topicid, answer: event.target.dataset.idx, seconds: this.stopTime(), points: this.stopTime() * this.data.timudetail.fenzhi / 10}
      this.data.daduijiti++
      var bb = 'btnstate.' + btnindex
      //proData: { showValue: 0, value: 0, animation: {}, animation1: {} },
      var a = this.stopTime() * this.data.timudetail.fenzhi / 10 +this.data.proData.showValue;
      var b = this.stopTime() * 2 + this.data.proData.value
      this.setprogress(b,a)
      setTimeout(function(){
        this.setData({
          [bb]: 'correct',
          zuihoudefen: a,
        })
      }.bind(this),300)
      
    } else {// 答错了
      if (this.data.yxvalue) {
        this.data.falseyinyue.play()
      }
      
      var asr = { topicId: event.target.dataset.topicid, answer: event.target.dataset.idx, seconds: this.stopTime(), points: 0 }
      var bb = 'btnstate.' + btnindex
      for(var key in this.data.timudetail){
        if(key=='ans') continue
        if (this.data.timudetail[key]==this.data.timudetail.ans)
        {
          var dd = key
        }
      }
      var cc = 'btnstate.' + dd
      this.stopTime()
      setTimeout(function () {
        this.setData({
          [bb]: 'wrong',
        })
      }.bind(this), 300)
      setTimeout(function () {
        this.setData({
          [cc]: 'correct'
        })
      }.bind(this), 600)
    }
    this.data.answerList.push(JSON.parse(JSON.stringify(asr)))
    setTimeout(function(){
      this.nexttimu()
    }.bind(this),2000)

  },
  shengji:function(str){// 等级 提升 提示
    this.setData({
      jibie:str,
      jibieshow:true,
    })
  },
  closeshengji:function(){// 关闭 等级 升级提示
    this.setData({
      jibieshow: false,
    })
  },
  nexttimu: function () {// 下一道题目 
    this.data.rightyinyue.stop()
    this.data.falseyinyue.stop()
  
    if(this.data.fanhui){// 如果 进入之后闪退 结束 答题计时
      return ;
    }
    this.data.timuindex++
    var that = this;
    if (this.data.timuindex > this.data.answerList.length) {
      this.data.answerList.push({ topicId: '0', answer: '0', seconds: '0', points: '0' })
    }
    if(this.data.timuindex>4){ 
      this.datijieshu()
      var st  = this;
                          // 答题结束  上传 分数 成绩
      api.post({
        url: api.post_defen(that.data.taotiId),
        data: JSON.stringify({'answerList':that.data.answerList}),
        callback:function(res){
          if (res.item.title.length>0){
            st.shengji(res.item.title)
          }
        }
      })
      return;
    }
    
    this.initTime()
    this.btnhidden()
    this.timuhide()
    this.setData({
      'btnstate.a1': '',
      'btnstate.a2': '',
      'btnstate.a3': '',
      'btnstate.a4':''
    })
    setTimeout(function () {
      this.setData({
        timudetail: this.data.timu[this.data.timuindex]
      })
      
      this.indexdonghua()//第一题 显现 变大变小
      setTimeout(function () {
        this.timushow()
        this.datikaishi()// 开始答题
        
      }.bind(this), 1500)
    }.bind(this), 1000)
  },
  endimgdonghua:function(){//挑战结果 胜败 动画
    if (this.data.daduijiti>=3){
      if (this.data.yxvalue) {
        app.bgmusic.pause()
        this.data.slyinyue.play()
        this.data.slyinyue.onEnded(() => {
          wx.getStorage({
            key: 'yinyue',
            success: function (res) {
              if (res.data) {
                app.bgmusic.play()
              }
            }
          })

        })
      }
      
      
      this.setData({
        yssurl:'http://image.didayundong.com/00590b3d-50b4-475b-a88a-fe6d7e6962fe',
        ysscss:'victoryimg',
        tssurl:'http://image.didayundong.com/a5513882-a7e4-4eb1-9892-06318262c5a4',
        fxzj: true,
        daduijiti: this.data.daduijiti,
      })
    }else{
      if (this.data.yxvalue) {
        app.bgmusic.pause()
        this.data.sbyinyue.play()
        this.data.sbyinyue.onEnded(() => {
          wx.getStorage({
            key: 'yinyue',
            success: function (res) {
              if (res.data) {
                app.bgmusic.play()

              }
            }
          })
        })
      }
      this.setData({
        yssurl: 'http://image.didayundong.com/3ddbb780-d786-4a0d-95e9-f48b1dfd6ae2',
        ysscss: 'lostimg',
        tssurl: 'http://image.didayundong.com/94a23aa9-7e91-406b-a359-d869da121aa4',
        fxzj:false,
        daduijiti: this.data.daduijiti,
        huodejinbi:0
      })
    }
    
    setTimeout(function(){
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-in-out',
      })
      animation.translateY(-215).step()
      this.setData({
        endimgmovie: animation.export(),
      })
    }.bind(this),320)
    setTimeout(function () {
      var animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-in-out',
      })
      animation.opacity(1).scale(1,1).step()
      this.setData({
        endimgmovie1: animation.export(),
      })
    }.bind(this), 20)
    setTimeout(function(){
      var ani = wx.createAnimation({
        duration:300,
        timingFunction:'ease-in-out'
      })
      ani.translateY(-70).step()
      this.setData({
        chakandn:ani.export()
      })
    }.bind(this),1000)
  },
})