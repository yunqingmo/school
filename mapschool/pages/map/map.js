// 加载配置文件
const config = require('../../utils/config.js');
var API_URL = config.API_HOST;
// var API_URL = 'http://cj.nhw8.cn/api/getschool';

Page({
  data: {
    controls: [{
      id: 1,
      iconPath: '/images/dw.png',
      position: {
        left: 15,
        top: 350,
        width: 30,
        height: 30
      },
      clickable: true
    },
      {
        id: 2,
        iconPath: '/images/u2.png',
        position: {
          left: 330,
          top: 340,
          width: 40,
          height: 40
        },
        clickable: true
      }
    ],
    currentEmail: 1,
    totalEmailsNum: 5,
    // emails: [
    //   {
    //     id: '12312312311231',
    //     bgImgUrl: '../../image/today/email_bg01.jpg',
    //     digest: {
    //       author_img: '../../image/personal.png',
    //       author_name: '熊猫老师',
    //       author_des: '宣传部',
    //       title: "“阅读推行赠书计划”已经开始",
    //       content: {
    //         button: {
    //           text: '加入计划',
    //           url: '../index/index',
    //           eventHandler: 'goToUrl'
    //         },
    //         other: '或者到【我的--邀请好友加入】查看'
    //       }

    //     }
    //   },
    // ]
  },
  onLoad: function () {
    var that = this;
    var markers = [];
    wx.request({
      url: API_URL,
      data: {
        markers: markers
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data);
        that.setData({
          markers: res.data,
          emails:res.data
        })
      }
    }),
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        console.log(res)
        var latitude = res.latitude;
        var longitude = res.longitude;
        that.setData({
          centerX: longitude,
          centerY: latitude
        })
      }
    })
  },

  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  markertap(e) {
    console.log(e.markerId-1)
    this.changeEmail(e, e.markerId-1)
  },
  controltap(e) {
    if (e.controlId == 1){
      this.mapCtx.moveToLocation()
    }
    if (e.controlId == 2){
      wx.navigateTo({
        url: '../index/index',
      });
    }
    console.log(e.controlId)
  },

  changeEmail: function (event, current) {
    // console.log(event);
    var self = this;
    if (current != undefined){
      var currentIndex = current;
    }else{
      var currentIndex = event.detail.current;
    }
    console.log(currentIndex);
    self.setData({ currentEmail: currentIndex });
    // if (currentIndex <= 0) {
    //   //提示用户当前为第一封邮件
    //   self.setData({ err_tips_data: { err_tips_show: true, err_tips_text: '当前为第一封邮件' } });
    //   setTimeout(function () {
    //     self.setData({ err_tips_data: { err_tips_show: false, err_tips_text: '' } });
    //   }, 3000);
    // } else if (currentIndex >= (self.data.totalEmailsNum - 1)) {
    //   //提示用户当前为最后一封
    //   self.setData({ err_tips_data: { err_tips_show: true, err_tips_text: '当前为最后一封邮件' } });
    //   setTimeout(function () {
    //     self.setData({ err_tips_data: { err_tips_show: false, err_tips_text: '' } });
    //   }, 3000);
    // }
    // //当加载到第五篇，就为下面的数据做准备
    // if ((currentIndex + 1) % 5 != 0) {
    //   self.setData({ currentEmailPageid: currentIndex });
    //   // self.getEmailsByPageid(self.data.currentEmailPageid);
    // } else {
    //   //请求后面的邮件数据
    // }
  },
  goToUrl: function (event) {
    //获取位于button上的url参数
    var gotoUrl = event.currentTarget.dataset.gotourl;
    console.log(gotoUrl);
    wx.navigateTo({
      url: gotoUrl,
    });
  }
})

