// pages/xialia/xialia.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
list:[],
total:0, //总条数
currentPage:1, //当前页数
pageSize:10  //每页条数

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url:'http://127.0.0.1:5000/goods/list',
      data:{
        currentPage:1,
        pageSize:10
      },
      success:(res)=>{
        console.log(res.data.data);
        this.setData({
          list:res.data.data,
          total:res.data.total
        })
      }
    })
  },

  /** 
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
      console.log('我到底了');
      // 4.计算最大页数
      let {total,currentPage,pageSize}=this.data
     let maxpage= Math.ceil(total/pageSize)
      if(currentPage==maxpage){
        wx.showToast({
          title: '我到抵了',
          icon: 'none',
          duration: 2000
        })
        return
      }
      // 1.到低后把当前页数加1
      this.setData({
        currentPage:this.data.currentPage+1
      })
      // 2.发送请求
      wx.request({
        url:'http://127.0.0.1:5000/goods/list',
        data:{
          currentPage:this.data.currentPage, //?
          pageSize:this.data.pageSize  //?
        },
        success:(res)=>{
                // 3.新数组与老数组拼接成新的数组
         var newarr= this.data.list.concat(res.data.data)
          console.log(res);
          this.setData({
            list:newarr, //新请求的数据
            total:res.data.total //总条数
          })
        }
      })
      
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})