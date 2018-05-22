// template/model/progressCircle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalWidth: {//这里定义了modalHidden属性，属性值可以在组件使用时指定.写法为modal-hidden  
      type: Number,
      value: 70,
      observer:function(){

      }
    }, 
    modalNum:{
      type: Number,
      value: 10,
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    progress_txt: 10,
    count: 0, // 设置 计数器 初始为0
    countTimer: null, // 设置 定时器 初始为null
    width: 70
  },
  ready: function () { 
    this.setData({
      progress_txt:this.properties.modalNum,
      width: this.properties.modalWidth,
    })
    this.drawProgressbg()
    // this.countInterval()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    drawProgressbg: function () {
        var width = this.data.width;
        // 使用 wx.createContext 获取绘图上下文 context
        const ctx = wx.createCanvasContext('gd',this)
        ctx.setLineWidth(10);// 设置圆环的宽度
        ctx.setStrokeStyle('#ffffff'); // 设置圆环的颜色
        // ctx.setLineCap('round') // 设置圆环端点的形状
        ctx.beginPath();//开始一个新的路径
        ctx.arc(width / 2, width / 2, width / 2 - 10, 0, 2 * Math.PI, false);
        //设置一个原点(100,100)，半径为90的圆的路径到当前路径
        ctx.stroke();//对当前路径进行描边
        ctx.draw();
    },
    drawCircle: function (step, width) {
      const context = wx.createCanvasContext('sd',this);
      // 设置渐变
      // var gradient = context.createLinearGradient(200, 100, 100, 200);
      // gradient.addColorStop("0", "#2661DD");
      // gradient.addColorStop("0.5", "#40ED94");
      // gradient.addColorStop("1.0", "#5956CC");
      context.setLineWidth(6);
      // context.setStrokeStyle(gradient);
      context.setStrokeStyle('red');
      // context.setLineCap('round')
      context.beginPath();
      if (step == 2) { context.clearRect(0, 0, width, width); context.draw() } else {
        // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
        context.arc(width / 2, width / 2, width / 2 - 10, 3 * Math.PI / 2, step * Math.PI - Math.PI / 2, true);
        context.stroke();
        context.draw()
      }
    },
    stopDrawCircle: function () {
      clearInterval(this.data.countTimer);
      return this.data.progress_txt;
    },
    initCircle: function () {
      var self = this;
      self.drawCircle(0, self.data.width)
        self.data.count = 1;
        self.setData({
          progress_txt: self.properties.modelNum
        })
    },
    backInit:function(){
      var self = this;
      self.setData({
        progress_txt: self.properties.modalNum,
      })
      var time = setInterval(() => {
        if (self.data.count > 0) {
          /* 绘制彩色圆环进度条
          注意此处 传参 step 取值范围是0到2，
          所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
          */
          self.data.count-=5;
          self.drawCircle(self.data.count / (10 * self.properties.modalNum), this.data.width)
        } else {
          clearInterval(time);
        }
      },20)
      // self.drawCircle(0, self.data.width)
    },
    countInterval: function () {
      var self = this;
      var width = this.data.width;

        // 设置倒计时 定时器 每50毫秒执行一次，计数器count+1 ,耗时10秒绘一圈
        clearInterval(self.data.countTimer);
        self.data.countTimer = setInterval(() => {
          if (self.data.count <= (20 * self.properties.modalNum)) {
            /* 绘制彩色圆环进度条
            注意此处 传参 step 取值范围是0到2，
            所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
            */
            self.drawCircle(self.data.count / (10 * self.properties.modalNum), width)
            self.data.count++;
            var num = Math.floor(((20 * self.properties.modalNum) - self.data.count) / 20) + 1
            if (num < self.data.progress_txt) {
              self.setData({
                progress_txt: num
              })
            }
          } else {
            clearInterval(self.data.countTimer);
          }
        }, 50)

    },
  }
})
