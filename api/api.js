var _host = 'http://localhost:8080/qamini/api/';
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
      json.callback(res.data)
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
      json.callback(res.data)
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
      json.callback(res.data)
    }
  })
}
function get_booklist(page, pageSize, state) {
  var s = '&state=' + state
  if (state == undefined) { s = '' };
  return _host + 'book?page=' + page + '&pageSize=' + pageSize + s
}
function get_bookdefi(bookId) {
  return _host + 'bookByReader/' + bookId
}
function get_dati(bookId,difId){
  return _host + 'topicsetWithTopic?bookId=' + bookId +'&difficultyId='+difId;
}
function get_mybook(){
  return _host +'myBook'
}

module.exports = {
  get_booklist: get_booklist,//书库列表
  get_bookdefi: get_bookdefi,//某本书的难度等级
  get_dati: get_dati,//获得答题套题
  get_mybook: get_mybook,
  get: wxget,
  post: wxpost,
  put: wxput,
}