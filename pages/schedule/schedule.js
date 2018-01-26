Page({

  data: {
    'yesShow': 0,
    'currentId': -1,
    'long': 0,
    'trans': {},
    'tecaher': 'none',
    'multiIndex': [],
    'multiArray': [['一', '二', '三', '四', '五', '六', '日'], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]],
    'stu': 0,
    'w': '一',
    's': 1,
    'c': 2,
    'x': 0,
    'animationStatus': 0,
    'animaStatus': 0,
    'animationData': {},
    'isShow': 0,
    'weeks': ['一', '二', '三', '四', '五', '六', '日'],
    'sequences': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    'lines': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"]
  },






  onLoad: function (options) {

    var that = this;

    try {
      var value = wx.getStorageSync('courses');
      if (value) {
        that.setData({
          "courses": value
        });
      } else {






        var username;
        var password;
        try {
          username = wx.getStorageSync('username');
          password = wx.getStorageSync('password');
        } catch (e) {
          console.log(e);
        }
        wx.request({
          url: 'https://api.badguy.cn/qfnu/api/v1/syllabus',
          method: "POST",
          data: {
            username: username,
            password: password
          },
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            console.log(res.data);
            that.setData({
              "courses": res.data
            });
            try {
              wx.setStorageSync('courses', that.data.courses);
            } catch (e) {
              console.log(e);
            }
          },
          fail: function (res) {
            console.log(res.data);
          },
        });









      }
    } catch (e) {
      console.log(e);
    }



  },














  none: function (e) { },

  addCourse: function (e) {
    this.setData({
      'isShow': 1
    });
  },

  editOrDel: function (e) {
    wx.vibrateShort({});
    this.setData({
      long: 1
    });
    this.showDetail(e);

  },

  del: function (e) {
    console.log(e.currentTarget.dataset.idx);
    var courses = this.data.courses;
    courses.splice(e.currentTarget.dataset.idx, 1);
    this.setData({
      'courses': courses
    });

  },

  no: function (e) {
    this.setData({
      'w': '一',
      's': 1,
      'c': 1,
      'x': 0,
      'animationStatus': 0,
      'animationData': {},
      'isShow': 0,
    });
  },


  formSubmit: function (e) {
    var name = e.detail.value.name + '@' + e.detail.value.address;

    var courses = this.data.courses;
    courses.push({ "week": this.data.multiIndex[0] + 1, "sequence": this.data.s, "counts": this.data.c, "name": name });
    var w = this.data.w;
    var s = this.data.s;
    var c = this.data.c;
    this.setData({
      'w': w,
      's': s,
      'c': c,
      'x': 0,
      'animationStatus': 0,
      'animationData': {},
      'isShow': 0,
      'courses': courses
    });
  },
  choose: function (e) {
    console.log(e);
  },

  bindMultiPickerChange: function (e) {
    this.setData({
      'multiIndex': [e.detail.value[0], e.detail.value[1], e.detail.value[2]]
    });
    this.setData({
      'w': this.data.multiArray[0][this.data.multiIndex[0]],
      's': this.data.multiArray[1][this.data.multiIndex[1]],
      'c': this.data.multiArray[2][this.data.multiIndex[2]],
    });
    console.log(this.data.s);
  },






  showDetail: function (e) {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease',
    });

    if (this.data.long == 1) {
      if (this.data.animationStatus == 0) {
        this.setData({
          'animationStatus': 1,
          'x': 1
        });
        animation.scale(0.8, 0.8).step();
      } else if (this.data.animationStatus == 1) {
        animation.scale(1, 1).step();
        this.setData({
          'animationStatus': 0,
          'x': 0
        });
      }

      this.setData({
        animationData: animation.export(),
        long: 0,
        //currentId: e.currentTarget.id
      });
    } else {
      /* this.setData({
         
         currentId: e.currentTarget.id,
         yesShow:1,
       });*/
      this.setData({
        currentId: e.currentTarget.id,
      });

      var anim = wx.createAnimation({
        duration: 0,
        timingFunction: 'step-start',
      });

      anim.opacity(0).translateY(-20).step();
      this.setData({
        animationTea: anim.export(),
        long: 0,
      });



      this.seeYou(e);
    }



  },

  seeYou: function (e) {
    clearInterval();
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    });

    if (this.data.yesShow == 1) {
      animation.opacity(0).translateY(-20).step();
      this.setData({
        yesShow: 0,
      });
    } else {
      animation.opacity(1).translateY(0).step();
      this.setData({
        yesShow: 1,
      });
    }

    this.setData({
      animationTea: animation.export(),
    });


    if (this.data.yesShow != 1) {
      this.setData({
        currentId: -1,
      });
    }

  }



})


