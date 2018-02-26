window.LCalendar = (function () {
  var MobileCalendar = function () {
    this.gearDate = '';
    this.minY = 1900;
    this.minM = 1;
    this.minD = 1;
    this.maxY = 2099;
    this.maxM = 12;
    this.maxD = 31;
  }
  MobileCalendar.prototype = {
    init: function (params) {
      this.type = params.type;
      this.trigger = document.querySelector(params.trigger);
      var minArr = '';
      if (this.trigger.getAttribute('data-lcalendar') != null) {
        var arr = this.trigger.getAttribute('data-lcalendar').split(',');
        minArr = arr[0].split('-');
        this.minY = ~~minArr[0];
        this.minM = ~~minArr[1];
        this.minD = ~~minArr[2];
        var maxArr = arr[1].split('-');
        this.maxY = ~~maxArr[0];
        this.maxM = ~~maxArr[1];
        this.maxD = ~~maxArr[2];
      }
      if (params.minDate) {
        minArr = params.minDate.split('-');
        this.minY = ~~minArr[0];
        this.minM = ~~minArr[1];
        this.minD = ~~minArr[2];
      }
      if (params.maxDate) {
        maxArr = params.maxDate.split('-');
        this.maxY = ~~maxArr[0];
        this.maxM = ~~maxArr[1];
        this.maxD = ~~maxArr[2];
      }
      this.bindEvent(this.type);
    },
    bindEvent: function (type) {
      var _self = this;
      //  呼出日期插件
      function popupDate(e) {
        _self.gearDate = document.createElement('div');
        _self.gearDate.className = 'gearDate';
        _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
          '<div class="date_btn_box">' +
          '<div class="date_btn lcalendarCancel">取消</div>' +
          '<div class="date_btn lcalendarFinish">确定</div>' +
          '</div>' +
          '<div class="date_roll_mask">' +
          '<div class="date_roll">' +
          '<div>' +
          '<div class="gear dateYY" data-datetype="dateYY"></div>' +
          '<div class="date_grid">' +
          '<div>年</div>' +
          '</div>' +
          '</div>' +
          '<div>' +
          '<div class="gear dateMM" data-datetype="dateMM"></div>' +
          '<div class="date_grid">' +
          '<div>月</div>' +
          '</div>' +
          '</div>' +
          '<div>' +
          '<div class="gear dateDD" data-datetype="dateDD"></div>' +
          '<div class="date_grid">' +
          '<div>日</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>';
        document.body.appendChild(_self.gearDate);
        dateCtrlInit();
        var lcalendarCancel = _self.gearDate.querySelector('.lcalendarCancel');
        lcalendarCancel.addEventListener('touchstart', closeMobileCalendar);
        var lcalendarFinish = _self.gearDate.querySelector('.lcalendarFinish');
        lcalendarFinish.addEventListener('touchstart', finishMobileDate);
        var dateYY = _self.gearDate.querySelector('.dateYY');
        var dateMM = _self.gearDate.querySelector('.dateMM');
        var dateDD = _self.gearDate.querySelector('.dateDD');
        dateYY.addEventListener('touchstart', gearTouchStart);
        dateMM.addEventListener('touchstart', gearTouchStart);
        dateDD.addEventListener('touchstart', gearTouchStart);
        dateYY.addEventListener('touchmove', gearTouchMove);
        dateMM.addEventListener('touchmove', gearTouchMove);
        dateDD.addEventListener('touchmove', gearTouchMove);
        dateYY.addEventListener('touchend', gearTouchEnd);
        dateMM.addEventListener('touchend', gearTouchEnd);
        dateDD.addEventListener('touchend', gearTouchEnd);
      }
      //  初始化年月日插件默认值
      function dateCtrlInit() {
        var date = new Date();
        var dateArr = {
          yy: date.getFullYear(),
          mm: date.getMonth(),
          dd: date.getDate() - 1
        };
        var rs = '';
        if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(_self.trigger.value)) {
          rs = _self.trigger.value.match(/(^|-)\d{1,4}/g);
          dateArr.yy = rs[0] - _self.minY;
          dateArr.mm = rs[1].replace(/-/g, '') - 1;
          dateArr.dd = rs[2].replace(/-/g, '') - 1;
        } else {
          dateArr.yy = dateArr.yy - _self.minY;
        }
        _self.gearDate.querySelector('.dateYY').setAttribute('val', dateArr.yy);
        _self.gearDate.querySelector('.dateMM').setAttribute('val', dateArr.mm);
        _self.gearDate.querySelector('.dateDD').setAttribute('val', dateArr.dd);
        setDateGearTooth();
      }
      //  呼出年月插件
      function popupYM(e) {
        _self.gearDate = document.createElement('div');
        _self.gearDate.className = 'gearDate';
        _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
          '<div class="date_btn_box">' +
          '<div class="date_btn lcalendarCancel">取消</div>' +
          '<div class="date_btn lcalendarFinish">确定</div>' +
          '</div>' +
          '<div class="date_roll_mask">' +
          '<div class="ym_roll">' +
          '<div>' +
          '<div class="gear dateYY" data-datetype="dateYY"></div>' +
          '<div class="date_grid">' +
          '<div>年</div>' +
          '</div>' +
          '</div>' +
          '<div>' +
          '<div class="gear dateMM" data-datetype="dateMM"></div>' +
          '<div class="date_grid">' +
          '<div>月</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>';
        document.body.appendChild(_self.gearDate);
        ymCtrlInit();
        var lcalendarCancel = _self.gearDate.querySelector('.lcalendarCancel');
        lcalendarCancel.addEventListener('touchstart', closeMobileCalendar);
        var lcalendarFinish = _self.gearDate.querySelector('.lcalendarFinish');
        lcalendarFinish.addEventListener('touchstart', finishMobileYM);
        var dateYY = _self.gearDate.querySelector('.dateYY');
        var dateMM = _self.gearDate.querySelector('.dateMM');
        dateYY.addEventListener('touchstart', gearTouchStart);
        dateMM.addEventListener('touchstart', gearTouchStart);
        dateYY.addEventListener('touchmove', gearTouchMove);
        dateMM.addEventListener('touchmove', gearTouchMove);
        dateYY.addEventListener('touchend', gearTouchEnd);
        dateMM.addEventListener('touchend', gearTouchEnd);
      }
      //  初始化年月插件默认值
      function ymCtrlInit() {
        var date = new Date();
        var dateArr = {
          yy: date.getFullYear(),
          mm: date.getMonth()
        };
        var rs = '';
        if (/^\d{4}-\d{1,2}$/.test(_self.trigger.value)) {
          rs = _self.trigger.value.match(/(^|-)\d{1,4}/g);
          dateArr.yy = rs[0] - _self.minY;
          dateArr.mm = rs[1].replace(/-/g, '') - 1;
        } else {
          dateArr.yy = dateArr.yy - _self.minY;
        }
        _self.gearDate.querySelector('.dateYY').setAttribute('val', dateArr.yy);
        _self.gearDate.querySelector('.dateMM').setAttribute('val', dateArr.mm);
        setDateGearTooth();
      }
      //  呼出日期+时间插件
      function popupDateTime(e) {
        _self.gearDate = document.createElement('div');
        _self.gearDate.className = 'gearDatetime';
        _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
          '<div class="date_btn_box">' +
          '<div class="date_btn lcalendarCancel">取消</div>' +
          '<div class="date_btn lcalendarFinish">确定</div>' +
          '</div>' +
          '<div class="date_roll_mask">' +
          '<div class="datetime_roll">' +
          '<div>' +
          '<div class="gear dateYY" data-datetype="dateYY"></div>' +
          '<div class="date_grid">' +
          '<div>年</div>' +
          '</div>' +
          '</div>' +
          '<div>' +
          '<div class="gear dateMM" data-datetype="dateMM"></div>' +
          '<div class="date_grid">' +
          '<div>月</div>' +
          '</div>' +
          '</div>' +
          '<div>' +
          '<div class="gear dateDD" data-datetype="dateDD"></div>' +
          '<div class="date_grid">' +
          '<div>日</div>' +
          '</div>' +
          '</div>' +
          '<div>' +
          '<div class="gear timeHH" data-datetype="timeHH"></div>' +
          '<div class="date_grid">' +
          '<div>时</div>' +
          '</div>' +
          '</div>' +
          '<div>' +
          '<div class="gear timeMM" data-datetype="timeMM"></div>' +
          '<div class="date_grid">' +
          '<div>分</div>' +
          '</div>' +
          '</div>' +
          '</div>' + //  date_roll
          '</div>' + //  date_roll_mask
          '</div>';
        document.body.appendChild(_self.gearDate);
        dateTimeCtrlInit();
        var lcalendarCancel = _self.gearDate.querySelector('.lcalendarCancel');
        lcalendarCancel.addEventListener('touchstart', closeMobileCalendar);
        var lcalendarFinish = _self.gearDate.querySelector('.lcalendarFinish');
        lcalendarFinish.addEventListener('touchstart', finishMobileDateTime);
        var dateYY = _self.gearDate.querySelector('.dateYY');
        var dateMM = _self.gearDate.querySelector('.dateMM');
        var dateDD = _self.gearDate.querySelector('.dateDD');
        var timeHH = _self.gearDate.querySelector('.timeHH');
        var timeMM = _self.gearDate.querySelector('.timeMM');
        dateYY.addEventListener('touchstart', gearTouchStart);
        dateMM.addEventListener('touchstart', gearTouchStart);
        dateDD.addEventListener('touchstart', gearTouchStart);
        timeHH.addEventListener('touchstart', gearTouchStart);
        timeMM.addEventListener('touchstart', gearTouchStart);
        dateYY.addEventListener('touchmove', gearTouchMove);
        dateMM.addEventListener('touchmove', gearTouchMove);
        dateDD.addEventListener('touchmove', gearTouchMove);
        timeHH.addEventListener('touchmove', gearTouchMove);
        timeMM.addEventListener('touchmove', gearTouchMove);
        dateYY.addEventListener('touchend', gearTouchEnd);
        dateMM.addEventListener('touchend', gearTouchEnd);
        dateDD.addEventListener('touchend', gearTouchEnd);
        timeHH.addEventListener('touchend', gearTouchEnd);
        timeMM.addEventListener('touchend', gearTouchEnd);
      }
      //  初始化年月日时分插件默认值
      function dateTimeCtrlInit() {
        var date = new Date();
        var dateArr = {
          yy: date.getFullYear(),
          mm: date.getMonth(),
          dd: date.getDate() - 1,
          hh: date.getHours(),
          mi: date.getMinutes()
        };
        var rs = '';
        if (/^\d{4}-\d{1,2}-\d{1,2}\s\d{2}:\d{2}$/.test(_self.trigger.value)) {
          rs = _self.trigger.value.match(/(^|-|\s|:)\d{1,4}/g);
          dateArr.yy = rs[0] - _self.minY;
          dateArr.mm = rs[1].replace(/-/g, '') - 1;
          dateArr.dd = rs[2].replace(/-/g, '') - 1;
          dateArr.hh = parseInt(rs[3].replace(/\s0?/g, ''));
          dateArr.mi = parseInt(rs[4].replace(/:0?/g, ''));
        } else {
          dateArr.yy = dateArr.yy - _self.minY;
        }
        _self.gearDate.querySelector('.dateYY').setAttribute('val', dateArr.yy);
        _self.gearDate.querySelector('.dateMM').setAttribute('val', dateArr.mm);
        _self.gearDate.querySelector('.dateDD').setAttribute('val', dateArr.dd);
        setDateGearTooth();
        _self.gearDate.querySelector('.timeHH').setAttribute('val', dateArr.hh);
        _self.gearDate.querySelector('.timeMM').setAttribute('val', dateArr.mi);
        setTimeGearTooth();
      }
      //  呼出时间插件
      function popupTime(e) {
        _self.gearDate = document.createElement('div');
        _self.gearDate.className = 'gearDate';
        _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
          '<div class="date_btn_box">' +
          '<div class="date_btn lcalendarCancel">取消</div>' +
          '<div class="date_btn lcalendarFinish">确定</div>' +
          '</div>' +
          '<div class="date_roll_mask">' +
          '<div class="time_roll">' +
          '<div>' +
          '<div class="gear timeHH" data-datetype="timeHH"></div>' +
          '<div class="date_grid">' +
          '<div>时</div>' +
          '</div>' +
          '</div>' +
          '<div>' +
          '<div class="gear timeMM" data-datetype="timeMM"></div>' +
          '<div class="date_grid">' +
          '<div>分</div>' +
          '</div>' +
          '</div>' +
          '</div>' + //  time_roll
          '</div>' +
          '</div>';
        document.body.appendChild(_self.gearDate);
        timeCtrlInit();
        var lcalendarCancel = _self.gearDate.querySelector('.lcalendarCancel');
        lcalendarCancel.addEventListener('touchstart', closeMobileCalendar);
        var lcalendarFinish = _self.gearDate.querySelector('.lcalendarFinish');
        lcalendarFinish.addEventListener('touchstart', finishMobileTime);
        var timeHH = _self.gearDate.querySelector('.timeHH');
        var timeMM = _self.gearDate.querySelector('.timeMM');
        timeHH.addEventListener('touchstart', gearTouchStart);
        timeMM.addEventListener('touchstart', gearTouchStart);
        timeHH.addEventListener('touchmove', gearTouchMove);
        timeMM.addEventListener('touchmove', gearTouchMove);
        timeHH.addEventListener('touchend', gearTouchEnd);
        timeMM.addEventListener('touchend', gearTouchEnd);
      }
      //  初始化时分插件默认值
      function timeCtrlInit() {
        var d = new Date();
        var e = {
          hh: d.getHours(),
          mm: d.getMinutes()
        };
        var rs = '';
        if (/^\d{2}:\d{2}$/.test(_self.trigger.value)) {
          rs = _self.trigger.value.match(/(^|:)\d{2}/g);
          e.hh = parseInt(rs[0].replace(/^0?/g, ''));
          e.mm = parseInt(rs[1].replace(/:0?/g, ''))
        }
        _self.gearDate.querySelector('.timeHH').setAttribute('val', e.hh);
        _self.gearDate.querySelector('.timeMM').setAttribute('val', e.mm);
        setTimeGearTooth();
      }
      //  重置日期节点个数
      function setDateGearTooth() {
        var passY = _self.maxY - _self.minY + 1;
        var dateYY = _self.gearDate.querySelector('.dateYY');
        var itemStr = '';
        if (dateYY && dateYY.getAttribute('val')) {
          //  得到年份的值
          var yyVal = parseInt(dateYY.getAttribute('val'));
          //  p 当前节点前后需要展示的节点个数
          for (var p = 0; p <= passY - 1; p++) {
            itemStr += "<div class='tooth'>" + (_self.minY + p) + '</div>';
          }
          dateYY.innerHTML = itemStr;
          var top = Math.floor(parseFloat(dateYY.getAttribute('top')));
          if (!isNaN(top)) {
            if (top % 2 !== 0) {
              top = top + 1;
            }
            // top % 2 === 0 ? (top === top) : (top = top + 1);
            top > 8 && (top = 8);
            var minTop = 8 - (passY - 1) * 2;
            top < minTop && (top = minTop);
            dateYY.style['-webkit-transform'] = 'translate3d(0,' + top + 'em,0)';
            dateYY.setAttribute('top', top + 'em');
            yyVal = Math.abs(top - 8) / 2;
            dateYY.setAttribute('val', yyVal);
          } else {
            dateYY.style['-webkit-transform'] = 'translate3d(0,' + (8 - yyVal * 2) + 'em,0)';
            dateYY.setAttribute('top', 8 - yyVal * 2 + 'em');
          }
        } else {
          return;
        }
        var dateMM = _self.gearDate.querySelector('.dateMM');
        if (dateMM && dateMM.getAttribute('val')) {
          itemStr = '';
          //  得到月份的值
          var mmVal = parseInt(dateMM.getAttribute('val'));
          var maxM = 11;
          var minM = 0;
          //  当年份到达最大值
          if (yyVal === passY - 1) {
            maxM = _self.maxM - 1;
          }
          //  当年份到达最小值
          if (yyVal === 0) {
            minM = _self.minM - 1;
          }
          // p 当前节点前后需要展示的节点个数
          for (var i = 0; i < maxM - minM + 1; i++) {
            itemStr += "<div class='tooth'>" + (minM + i + 1) + '</div>';
          }
          dateMM.innerHTML = itemStr;
          if (mmVal > maxM) {
            mmVal = maxM;
            dateMM.setAttribute('val', mmVal);
          } else if (mmVal < minM) {
            mmVal = maxM;
            dateMM.setAttribute('val', mmVal);
          }
          dateMM.style['-webkit-transform'] = 'translate3d(0,' + (8 - (mmVal - minM) * 2) + 'em,0)';
          dateMM.setAttribute('top', 8 - (mmVal - minM) * 2 + 'em');
        } else {
          return;
        }
        var dateDD = _self.gearDate.querySelector('.dateDD');
        if (dateDD && dateDD.getAttribute('val')) {
          itemStr = '';
          //  得到日期的值
          var ddVal = parseInt(dateDD.getAttribute('val'));
          //  返回月份的天数
          var maxMonthDays = calcDays(yyVal, mmVal);
          //  p 当前节点前后需要展示的节点个数
          var maxD = maxMonthDays - 1;
          var minD = 0;
          //  当年份月份到达最大值
          if (yyVal === passY - 1 && _self.maxM === mmVal + 1) {
            maxD = _self.maxD - 1;
          }
          //  当年、月到达最小值
          if (yyVal === 0 && _self.minM === mmVal + 1) {
            minD = _self.minD - 1;
          }
          for (var y = 0; y < maxD - minD + 1; y++) {
            itemStr += "<div class='tooth'>" + (minD + y + 1) + '</div>';
          }
          dateDD.innerHTML = itemStr;
          if (ddVal > maxD) {
            ddVal = maxD;
            dateDD.setAttribute('val', ddVal);
          } else if (ddVal < minD) {
            ddVal = minD;
            dateDD.setAttribute('val', ddVal);
          }
          dateDD.style['-webkit-transform'] = 'translate3d(0,' + (8 - (ddVal - minD) * 2) + 'em,0)';
          dateDD.setAttribute('top', 8 - (ddVal - minD) * 2 + 'em');
        } else {
          return false;
        }
      }
      //  重置时间节点个数
      function setTimeGearTooth() {
        var timeHH = _self.gearDate.querySelector('.timeHH');
        if (timeHH && timeHH.getAttribute('val')) {
          var i = '';
          var hhVal = parseInt(timeHH.getAttribute('val'));
          for (var g = 0; g <= 23; g++) {
            i += "<div class='tooth'>" + g + '</div>';
          }
          timeHH.innerHTML = i;
          timeHH.style['-webkit-transform'] = 'translate3d(0,' + (8 - hhVal * 2) + 'em,0)';
          timeHH.setAttribute('top', 8 - hhVal * 2 + 'em');
        } else {
          return
        }
        var timeMM = _self.gearDate.querySelector('.timeMM');
        if (timeMM && timeMM.getAttribute('val')) {
          var o = '';
          var mmVal = parseInt(timeMM.getAttribute('val'));
          for (var f = 0; f <= 59; f++) {
            o += '<div class="tooth">' + f + '</div>';
          }
          timeMM.innerHTML = o;
          timeMM.style['-webkit-transform'] = 'translate3d(0,' + (8 - mmVal * 2) + 'em,0)';
          timeMM.setAttribute('top', 8 - mmVal * 2 + 'em');
        } else {
          return false
        }
      }
      //  求月份最大天数
      function calcDays(year, month) {
        if (month === 1) {
          year += _self.minY;
          if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0 && year % 4000 !== 0)) {
            return 29;
          } else {
            return 28;
          }
        } else {
          if (month === 3 || month === 5 || month === 8 || month === 10) {
            return 30;
          } else {
            return 31;
          }
        }
      }
      //  触摸开始
      function gearTouchStart(e) {
        e.preventDefault();
        var target = e.target;
        while (true) {
          if (!target.classList.contains('gear')) {
            target = target.parentElement;
          } else {
            break
          }
        }
        clearInterval(target['int_' + target.id]);
        target['old_' + target.id] = e.targetTouches[0].screenY;
        target['o_t_' + target.id] = (new Date()).getTime();
        var top = target.getAttribute('top');
        if (top) {
          target['o_d_' + target.id] = parseFloat(top.replace(/em/g, ''));
        } else {
          target['o_d_' + target.id] = 0;
        }
        target.style.webkitTransitionDuration = target.style.transitionDuration = '0ms';
      }
      //  手指移动
      function gearTouchMove(e) {
        e.preventDefault();
        var target = e.target;
        while (true) {
          if (!target.classList.contains('gear')) {
            target = target.parentElement;
          } else {
            break
          }
        }
        target['new_' + target.id] = e.targetTouches[0].screenY;
        target['n_t_' + target.id] = (new Date()).getTime();
        var f = (target['new_' + target.id] - target['old_' + target.id]) * 30 / window.innerHeight;
        target['pos_' + target.id] = target['o_d_' + target.id] + f;
        target.style['-webkit-transform'] = 'translate3d(0,' + target['pos_' + target.id] + 'em,0)';
        target.setAttribute('top', target['pos_' + target.id] + 'em');
        if (e.targetTouches[0].screenY < 1) {
          gearTouchEnd(e);
        };
      }
      //  离开屏幕
      function gearTouchEnd(e) {
        e.preventDefault();
        var target = e.target;
        while (true) {
          if (!target.classList.contains('gear')) {
            target = target.parentElement;
          } else {
            break;
          }
        }
        var flag = (target['new_' + target.id] - target['old_' + target.id]) / (target['n_t_' + target.id] - target['o_t_' + target.id]);
        if (Math.abs(flag) <= 0.2) {
          target['spd_' + target.id] = (flag < 0 ? -0.08 : 0.08);
        } else {
          if (Math.abs(flag) <= 0.5) {
            target['spd_' + target.id] = (flag < 0 ? -0.16 : 0.16);
          } else {
            target['spd_' + target.id] = flag / 2;
          }
        }
        if (!target['pos_' + target.id]) {
          target['pos_' + target.id] = 0;
        }
        rollGear(target);
      }
      //  缓动效果
      function rollGear(target) {
        var d = 0;
        var stopGear = false;

        function setDuration() {
          target.style.webkitTransitionDuration = target.style.transitionDuration = '200ms';
          stopGear = true;
        }
        var passY = _self.maxY - _self.minY + 1;
        clearInterval(target['int_' + target.id]);
        target['int_' + target.id] = setInterval(function () {
          var pos = target['pos_' + target.id];
          var speed = target['spd_' + target.id] * Math.exp(-0.03 * d);
          pos += speed;
          if (Math.abs(speed) > 0.1) {} else {
            var b = Math.round(pos / 2) * 2;
            pos = b;
            setDuration();
          }
          if (pos > 8) {
            pos = 8;
            setDuration();
          }
          switch (target.dataset.datetype) {
            case 'dateYY':
              var minTop = 8 - (passY - 1) * 2;
              if (pos < minTop) {
                pos = minTop;
                setDuration();
              }
              if (stopGear) {
                var gearVal = Math.abs(pos - 8) / 2;
                setGear(target, gearVal);
                clearInterval(target['int_' + target.id]);
              }
              break;
            case 'dateMM':
              var dateYY = _self.gearDate.querySelector('.dateYY');
              //  得到年份的值
              var yyVal = parseInt(dateYY.getAttribute('val'));
              var maxM = 11;
              var minM = 0;
              //  当年份到达最大值
              if (yyVal === passY - 1) {
                maxM = _self.maxM - 1;
              }
              //  当年份到达最小值
              if (yyVal === 0) {
                minM = _self.minM - 1;
              }
              var minTops = 8 - (maxM - minM) * 2;
              if (pos < minTops) {
                pos = minTops;
                setDuration();
              }
              if (stopGear) {
                var gearVals = Math.abs(pos - 8) / 2 + minM;
                setGear(target, gearVals);
                clearInterval(target['int_' + target.id]);
              }
              break;
            case 'dateDD':
              var dateYYs = _self.gearDate.querySelector('.dateYY');
              var dateMM = _self.gearDate.querySelector('.dateMM');
              //  得到年份的值
              var yyVals = parseInt(dateYYs.getAttribute('val'));
              //  得到月份的值
              var mmVal = parseInt(dateMM.getAttribute('val'));
              //  返回月份的天数
              var maxMonthDays = calcDays(yyVals, mmVal);
              var maxD = maxMonthDays - 1;
              var minD = 0;
              //  当年份月份到达最大值
              if (yyVals === passY - 1 && _self.maxM === mmVal + 1) {
                maxD = _self.maxD - 1;
              }
              //  当年、月到达最小值
              if (yyVals === 0 && _self.minM === mmVal + 1) {
                minD = _self.minD - 1;
              }
              var minTopss = 8 - (maxD - minD) * 2;
              if (pos < minTopss) {
                pos = minTopss;
                setDuration();
              }
              if (stopGear) {
                var gearValo = Math.abs(pos - 8) / 2 + minD;
                setGear(target, gearValo);
                clearInterval(target['int_' + target.id]);
              }
              break;
            case 'timeHH':
              if (pos < -38) {
                pos = -38;
                setDuration();
              }
              if (stopGear) {
                var gearValss = Math.abs(pos - 8) / 2;
                setGear(target, gearValss);
                clearInterval(target['int_' + target.id]);
              }
              break;
            case 'timeMM':
              if (pos < -110) {
                pos = -110;
                setDuration();
              }
              if (stopGear) {
                var gearValsss = Math.abs(pos - 8) / 2;
                setGear(target, gearValsss);
                clearInterval(target['int_' + target.id]);
              }
              break;
            default:
          }
          target['pos_' + target.id] = pos;
          target.style['-webkit-transform'] = 'translate3d(0,' + pos + 'em,0)';
          target.setAttribute('top', pos + 'em');
          d++;
        }, 30);
      }
      //  控制插件滚动后停留的值
      function setGear(target, val) {
        val = Math.round(val);
        target.setAttribute('val', val);
        if (/date/.test(target.dataset.datetype)) {
          setDateGearTooth();
        } else {
          setTimeGearTooth();
        }
      }
      //  取消
      function closeMobileCalendar(e) {
        e.preventDefault();
        var evt;
        try {
          evt = new CustomEvent('input');
        } catch (e) {
          //  兼容旧浏览器(注意：该方法已从最新的web标准中删除)
          evt = document.createEvent('Event');
          evt.initEvent('input', true, true);
        }
        _self.trigger.dispatchEvent(evt);
        document.body.removeChild(_self.gearDate);
        _self.gearDate = null;
      }

      //  日期确认
      function finishMobileDate(e) {
        var passY = _self.maxY - _self.minY + 1;
        var dateYY = parseInt(Math.round(_self.gearDate.querySelector('.dateYY').getAttribute('val')));
        var dateMM = parseInt(Math.round(_self.gearDate.querySelector('.dateMM').getAttribute('val'))) + 1;
        dateMM = dateMM > 9 ? dateMM : '0' + dateMM;
        var dateDD = parseInt(Math.round(_self.gearDate.querySelector('.dateDD').getAttribute('val'))) + 1;
        dateDD = dateDD > 9 ? dateDD : '0' + dateDD;
        _self.trigger.value = (dateYY % passY + _self.minY) + '-' + dateMM + '-' + dateDD;
        closeMobileCalendar(e);
      }
      //  年月确认
      function finishMobileYM(e) {
        var passY = _self.maxY - _self.minY + 1;
        var dateYY = parseInt(Math.round(_self.gearDate.querySelector('.dateYY').getAttribute('val')));
        var dateMM = parseInt(Math.round(_self.gearDate.querySelector('.dateMM').getAttribute('val'))) + 1;
        dateMM = dateMM > 9 ? dateMM : '0' + dateMM;
        _self.trigger.value = (dateYY % passY + _self.minY) + '-' + dateMM;
        closeMobileCalendar(e);
      }
      //  日期时间确认
      function finishMobileDateTime(e) {
        var passY = _self.maxY - _self.minY + 1;
        var dateYY = parseInt(Math.round(_self.gearDate.querySelector('.dateYY').getAttribute('val')));
        var dateMM = parseInt(Math.round(_self.gearDate.querySelector('.dateMM').getAttribute('val'))) + 1;
        dateMM = dateMM > 9 ? dateMM : '0' + dateMM;
        var dateDD = parseInt(Math.round(_self.gearDate.querySelector('.dateDD').getAttribute('val'))) + 1;
        dateDD = dateDD > 9 ? dateDD : '0' + dateDD;
        var timeHH = parseInt(Math.round(_self.gearDate.querySelector('.timeHH').getAttribute('val')));
        timeHH = timeHH > 9 ? timeHH : '0' + timeHH;
        var timeMM = parseInt(Math.round(_self.gearDate.querySelector('.timeMM').getAttribute('val')));
        timeMM = timeMM > 9 ? timeMM : '0' + timeMM;
        _self.trigger.value = (dateYY % passY + _self.minY) + '-' + dateMM + '-' + dateDD + ' ' + (timeHH.length < 2 ? '0' : '') + timeHH + (timeMM.length < 2 ? ':0' : ':') + timeMM;
        closeMobileCalendar(e);
      }
      //  时间确认
      function finishMobileTime(e) {
        var timeHH = parseInt(Math.round(_self.gearDate.querySelector('.timeHH').getAttribute('val')));
        timeHH = timeHH > 9 ? timeHH : '0' + timeHH;
        var timeMM = parseInt(Math.round(_self.gearDate.querySelector('.timeMM').getAttribute('val')));
        timeMM = timeMM > 9 ? timeMM : '0' + timeMM;
        _self.trigger.value = (timeHH.length < 2 ? '0' : '') + timeHH + (timeMM.length < 2 ? ':0' : ':') + timeMM;
        closeMobileCalendar(e);
      }
      _self.trigger.addEventListener('click', {
        'ym': popupYM,
        'date': popupDate,
        'datetime': popupDateTime,
        'time': popupTime
      }[type]);
    }
  }
  return MobileCalendar;
})()
