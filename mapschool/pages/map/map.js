// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
// var schoolData = require('../../resources/gis-school');
var API_URL = 'http://cj.nhw8.cn/api/getschool';
// 实例化API核心类
var demo = new QQMapWX({
  key: 'LFWBZ-U32K4-SZBUS-D6MBG-735I7-5GFZK' // 必填
});
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
    currentEmailPageid: 1,
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
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'LFWBZ-U32K4-SZBUS-D6MBG-735I7-5GFZK'
    });
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
  // onShow: function () {
  //   // 调用接口
  //   qqmapsdk.search({
  //     keyword: '幼儿园',
  //     success: function (res) {
  //       console.log(res.data);
  //     },
  //     fail: function (res) {
  //       console.log(res);
  //     },
  //     complete: function (res) {
  //       console.log(res);
  //     }
  //   })
  // },
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
    // this.moveToLocation()
  },
  // moveToLocation: function () {
  //   this.mapCtx.moveToLocation()
  // },
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

// // 调用接口,逆地址解析
// demo.reverseGeocoder({
//   location: {
//     latitude: 39.984060,
//     longitude: 116.307520
//   },
//   success: function (res) {
//     // console.log(res);
//   },
//   fail: function (res) {
//     console.log(res);
//   },
//   complete: function (res) {
//     // console.log(res);
//   }
// });
// // 调用接口,提供由地址描述到所述位置坐标的转换，与逆地址解析reverseGeocoder()的过程正好相反。
// demo.geocoder({
//   address: '北京市海淀区彩和坊路海淀西大街74号',
//   success: function (res) {
//     // console.log(res.result.location.lng);
//     // console.log(res.result.location.lat);
//   },
//   fail: function (res) {
//     console.log(res);
//   },
//   complete: function (res) {
//     // console.log(res);
//   }
// });

// // 调用接口,计算一个点到多点的步行、驾车距离。
// demo.calculateDistance({
//   to: [{
//     latitude: 39.984060,
//     longitude: 116.307520
//   }, {
//     latitude: 39.984572,
//     longitude: 116.306339
//   }],
//   success: function (res) {
//     // console.log(res);
//   },
//   fail: function (res) {
//     // console.log(res);
//   },
//   complete: function (res) {
//     // console.log(res);
//   }
// });
// // 调用接口,获取全国城市列表数据。
// demo.getCityList({
//   success: function (res) {
//     // console.log(res);
//   },
//   fail: function (res) {
//     console.log(res);
//   },
//   complete: function (res) {
//     // console.log(res);
//   }
// });
// // 调用接口,通过城市ID返回城市下的区县。
// demo.getDistrictByCityId({
//   id: '110000', // 对应城市ID
//   success: function (res) {
//     // console.log(res);
//   },
//   fail: function (res) {
//     console.log(res);
//   },
//   complete: function (res) {
//     // console.log(res);
//   }
// });
