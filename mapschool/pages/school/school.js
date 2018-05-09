var API_URL = 'http://cj.nhw8.cn/api/schoolinfo?id=';
Page({
  data: {
    school: {}
  },
  onLoad: function (params) {
    console.log(params.id);
    var that = this;
    wx.request({
      url: API_URL + params.id,
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var data = res.data;
        that.setData({
          school: data
        });
        // console.log(res.data);
      }
    })
  }
})