
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
    nav: { isback: true, text: '知识升级', backcolor: '#01919A', isIphoneX: false },
    list:[],
    prelistindex:-1,
    cionxf:1,//该买套题需要的 金币数
    topicid:0,
    page:1,
    pageSize:3,
    notapi:true,
  },
  maiti:function(event){
    var self = this;
    var tagetid = event.target.dataset.topicsetid
    var page = event.target.dataset.page
    self.data.topicid = event.target.dataset.topicid
    app.getuserdata(function () {
      var myjinbi = app.globalData.userInfo.coinCnt - self.data.cionxf
      if (myjinbi > 0) {// 如果 余额大于 支付 金币
        api.post({
          url: api.post_maiti(tagetid),//topicSetId
          callback: function (res) {
            self.getonebookti(page)
            wx.showToast({
              title: '消费' + self.data.cionxf +'金币',
              icon:'none'
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    api.get({
      url: api.get_goumaiti(),
      callback: function (res) {
        that.setData({
          cionxf: res.item.configValue
        })
      }
    })
    that.getonebookti(1)
  },
  getonebookti:function(page){
    var that = this;
    
    var bookId = that.options.bookId
    var difficultyId = that.options.difficultyId
    api.get({
      url: api.get_mydaguodeti(bookId, difficultyId,page,that.data.pageSize),
      callback: function (res) {
        if (that.data.page < page+1) {
          if(res.items.length>0){
            that.data.page = page+1
          }
        }
        
        var arr = res.items;
        if(arr.length==0){return}
        var arr1 = []
        for (var i = 0; i < arr.length; i++) {
          for (var z = 0; z < arr[i].topicList.length; z++) {
            var a1 = {
              'title': arr[i].topicList[z].title,
              'jieshi': arr[i].topicList[z].answerExplanation || '',
              'active': '',
              'jiantoumovie': {},
              'xialamovie': 'height:0;',
              'wenzimovie': '',
              'topicSetId': arr[i].id,
              'topicid': arr[i].topicList[z].topicId,
              'page': page
            }
            if (that.data.topicid == arr[i].topicList[z].topicId){
              a1.xialamovie = 'height:auto;'
              a1.wenzimovie = 'opacity:1;'
              a1.active = 'active'
            }
            arr1.push(a1)
          }
        }
        var listlength = that.data.list.length;
        if(listlength==0){
          that.setData({
            list: arr1
          })
        }else{
          if((that.data.page-2)*that.data.pageSize*5==listlength){
            var dd = that.data.list.concat(arr1)
            that.setData({
              list: dd
            })
          }else{
            var dd = JSON.parse(JSON.stringify(that.data.list));
            for(var ee = 0;ee<arr1.length;ee++){
              dd.splice((page - 1) * that.data.pageSize * 5+ee, 1, arr1[ee])
            }
            
            console.log(dd)
            that.data.notapi = false;
            setTimeout(function(){
              that.data.notapi = true;
            },200)
            that.setData({
              list: dd
            })
          }
        }
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var self = this;
    self.setData({
      'nav.text': app.homepagecfg[1].name
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
    if (this.data.notapi){
      this.getonebookti(this.data.page)
    }
    
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