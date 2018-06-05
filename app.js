//app.js App() 必须在 app.js 中注册，且不能注册多个。 通过 getApp() 获取实例之后，不要私自调用生命周期函数 不要在定义于 App() 内的函数中调用 getApp() ，使用 this 就可以拿到 app 实例。
App({
  onLaunch: function (options) {
    //调用API从本地缓存中获取数据 不要在 onLaunch 的时候调用 getCurrentPages()，此时 page 还没有生成。
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
  },
  onShow: function (options) {
    // Do something when show.当小程序启动，或从后台进入前台显示，会触发 onShow
    // console.log(options)
  },
  onHide: function () {
    // Do something when hide.当小程序从前台进入后台，会触发 onHide
  },
  onError: function (msg) {
    //当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
    console.log(msg)
  },
  mytoken:'',
  myId:'',
  checksessionkey:function(){
    wx.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        wx.login() //重新登录
      }
    })
  },
  globalData:{
    userInfo:null
  },
  getuserdata: function (callbackd){//从自己的 服务器获取用户信息
    var that  = this;
    wx.request({
      url: 'https://doushu.kaipai.com/qamini/api/myProfile',
      // url: 'https://localhost:8080/qamini/api/myProfile',
      header: {
        'content-type': 'application/json',
        Authorization: this.mytoken,
      },
      success:function(res){
        if (res.statusCode==401){// token 过期
          that.mytoken = ''
          that.getusercode()
        }else{
          that.globalData.userInfo = res.data.item
          if (!!callbackd) { callbackd() }
        }
      },
      fail:function(res){
        console.log(res)
      }
    })
  },
  wxapost:function(json) {//自定义 post
    wx.request({
      url: json.url,
      method: 'POST',
      data: json.data,
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        json.callback(res.data)
      },
      fail:function(res){
        console.log(res)
      }
    })
  },
  getusercode: function (callbackd, fallcallback){
    var self = this;
    // return
    if(this.mytoken.length>0){
      self.getuserdata(callbackd)
    }else{
      wx.login({
        success: function (res) {
          if (res.code) {// 如果 微信的 登陆成功
            var code = res.code
            wx.getUserInfo({// 获取 用户信息 得到 data 和 iv
              header: { withCredentials: true },
              success: function (resd) {

                self.wxapost({
                  // url: 'https://localhost:8080/qamini/api/user',
                  url: 'https://doushu.kaipai.com/qamini/api/user',
                  data: JSON.stringify({ code: code, encryptedData: resd.encryptedData,iv:resd.iv }),
                  callback: function (dd) {
                    self.mytoken = dd.item.token
                    self.myId = dd.item.userId
                    self.getuserdata(callbackd)
                    
                  }
                })
                
              },
              fail:function(resd){
                fallcallback()
              }
            })
            
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });
    }
  }
})