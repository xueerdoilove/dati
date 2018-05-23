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
    this.getuserdata()//获得用户 信息
  },
  onHide: function () {
    // Do something when hide.当小程序从前台进入后台，会触发 onHide
  },
  onError: function (msg) {
    //当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
    console.log(msg)
  },
  mytoken:'0f5dd0e357f04b7786710efe1b597ceeb6eb741e55354cc49c45f069d0a685c3',
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      // wx.login({
      //   success: function () {
      //     wx.getUserInfo({
      //       success: function (res) {
      //         console.log(res)
      //         that.globalData.userInfo = res.userInfo
      //         typeof cb == "function" && cb(that.globalData.userInfo)
      //       }
      //     })
      //   }
      // })
    }
  },
  globalData:{
    userInfo:null
  },
  getuserdata:function(){
    var that  = this;
    wx.request({
      url: 'http://localhost:8080/qamini/api/myProfile',
      header: {
        'content-type': 'application/json',
        Authorization: this.mytoken,
      },
      success:function(res){
        that.globalData.userInfo = res.data.item
      }
    })
    // wx.getSetting({
    //   success(res) {
    //     console.log(res)
    //     if (!res.authSetting['scope.record']) {
    //       wx.authorize({
    //         scope: 'scope.record',
    //         success() {
    //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //           wx.startRecord()

    //         }
    //       })
    //     }
    //   }
    // })
  },
  getusercode:function(){

    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       //发起网络请求
    //       console.log(res)
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // });
  }
})