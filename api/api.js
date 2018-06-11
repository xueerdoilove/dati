// var _host = 'http://localhost:8080/qamini/api/';
var _host = 'https://doushu.kaipai.com/qamini/api/';
var app1 = getApp();


// wx.request
function wxget(json){
  wx.request({
    url: json.url,
    method:'GET',
    header:{
      'content-type': 'application/json',
      Authorization: app1.mytoken,
    },
    success:function(res){
      if (res.statusCode == 401) {// token 过期
        app1.mytoken = ''
        app1.getusercode(function(){
          
          var pages = getCurrentPages() //获取加载的页面
          var currentPage = pages[pages.length - 1] //获取当前页面的对象
          var url1 = currentPage.route //当前页面url
          var options1 = currentPage.options //如果要获取url中所带的参数可以查看options
          var aid =0;
          for(var iv in options1){
            aid ++
          }
          if(aid>0){
            url1 = url1 + '?'
          }
          for(var key in options1){
            url1 = url1 + (key+'='+options1[key]+'&')
          }
          url1 = '/'+url1
          wx.redirectTo({
            url:url1
          })
        })
      } else {
        
        json.callback(res.data)
      }
    },
    fail:function(res){
      console.log(res)
    }
  })
}
function wxpost(json) {
  wx.request({
    url: json.url,
    method: 'POST',
    data:json.data,
    header: {
      'content-type': 'application/json', 
      Authorization: app1.mytoken,
    },
    success: function (res) {
      if (res.statusCode == 401) {// token 过期
        app1.mytoken = ''
        app1.getusercode(function(){

          var pages = getCurrentPages() //获取加载的页面
          var currentPage = pages[pages.length - 1] //获取当前页面的对象
          var url1 = currentPage.route //当前页面url
          var options1 = currentPage.options //如果要获取url中所带的参数可以查看options
          var aid = 0;
          for (var iv in options1) {
            aid++
          }
          if (aid > 0) {
            url1 = url1 + '?'
          }
          for (var key in options1) {
            url1 = url1 + (key + '=' + options1[key] + '&')
          }
          url1 = '/' + url1
          wx.redirectTo({
            url: url1
          })
        })
      } else {
        json.callback(res.data)
      }
    },
    fail: function (res) {
      console.log(res)
    }
  })
}
function wxput(json) {
  wx.request({
    url: json.url,
    method: 'PUT',
    data: json.data,
    header: {
      'content-type': 'application/json', 
      Authorization: app1.mytoken,
    },
    success: function (res) {
      if (res.statusCode == 401) {// token 过期
        app1.mytoken = ''
        app1.getusercode(function(){

          var pages = getCurrentPages() //获取加载的页面
          var currentPage = pages[pages.length - 1] //获取当前页面的对象
          var url1 = currentPage.route //当前页面url
          var options1 = currentPage.options //如果要获取url中所带的参数可以查看options
          var aid = 0;
          for (var iv in options1) {
            aid++
          }
          if (aid > 0) {
            url1 = url1 + '?'
          }
          for (var key in options1) {
            url1 = url1 + (key + '=' + options1[key] + '&')
          }
          url1 = '/' + url1
          wx.redirectTo({
            url: url1
          })
        })
      } else {
        json.callback(res.data)
      }
    },
    fail: function (res) {
      console.log(res)
    }
  })
}
function get_booklist(page, pageSize, state) {
  var s = '&state=' + state
  if (state == undefined) { s = '' };
  return _host + 'bookByReader?page=' + page + '&pageSize=' + pageSize + s
}
function get_bookdefi(bookId) {
  return _host + 'bookByReader/' + bookId
}
function get_dati(bookId,difId){
  return _host + 'topicsetWithTopic?bookId=' + bookId +'&difficultyId='+difId;
}
function get_mybook(){
  return _host +'myBook?page=1&pageSize=16'
}
function post_defen(topicSetId){
  return _host + 'topicSet/' + topicSetId+'/answer'
}
function get_bookf(){
  return _host +'bookByReader?page=1&pageSize=1'
}
function get_bank(){
  return _host + 'coinPacket?page=1&pageSize=6'
}
function get_weekrank(no){
  return _host + 'weekRank?weekNo='+no
}
function post_goumaijinbi(id){
  return _host + 'coinPacket/' + id +'/wxPrepay'
}
function post_maiti(topicSetId){
  return _host + 'topicSet/' + topicSetId+'/buy'
}
function get_goumaiti(){
  return _host + 'baseConfig/1'
}
function get_datijinbi(){
  return _host + 'coinTask/4'
}

function get_fenxiangjinbi(){
  return _host + 'coinTask/3'
}
function get_qiandao(){
  return _host +'mySignIn'
}
function post_qiandao(){
  return _host +'signIn'
}
function get_myTopicSet(id){
  return _host + 'myTopicSet/'+id
}
function get_mydaguodeti(bookid,page,pageSize){
  return _host + 'book/'+bookid+'/myTopicSet?page='+page+'&pageSize='+pageSize
}
function post_fenxiang(){
  return _host + 'sharewx'
}

function _myCoinTask(){
  return _host +'myCoinTask'
}
function get_myrank(weekid){
  return _host + 'myRanking?weekId='+weekid
}
///myRanking
//{ item: { ranking: 3 } }

function get_myconfig(){
  return _host + 'myUserConfig'
}
function put_myconfig(id) {
  return _host + 'userConfig/'+id
}
module.exports = {
  get_booklist: get_booklist,//书库列表
  get_bookdefi: get_bookdefi,//某本书的难度等级
  get_dati: get_dati,//获得答题套题
  get_mybook: get_mybook,
  post_defen: post_defen,// 上传成绩
  get_bookf: get_bookf,//根据权重查询书list
  get_bank: get_bank,//银行 金币包
  get_weekrank: get_weekrank,//周排行
  post_goumaijinbi: post_goumaijinbi,//下单
  post_maiti: post_maiti,//消费金币 买题
  get_goumaiti: get_goumaiti,//购买题目 需要花多少钱
  get_qiandao: get_qiandao,// 查看是否签到
  post_qiandao: post_qiandao,// 签到 领金币
  get_myTopicSet: get_myTopicSet,//查询我 刚购买的 题的 内容
  get_mydaguodeti: get_mydaguodeti,//查询我 打过的 所有题 
  post_fenxiang: post_fenxiang,//分享
  _myCoinTask: _myCoinTask,// 领金币
  get_myrank: get_myrank,// 我 的 排名
  get_datijinbi: get_datijinbi,//查询 答题10道 给多少金币
  get_myconfig: get_myconfig,// 查询自己的 配置
  put_myconfig: put_myconfig,// 修改 自己的 配置
  get_fenxiangjinbi: get_fenxiangjinbi,// 分享 获得 金币数
  get: wxget,
  post: wxpost,
  put: wxput,
}