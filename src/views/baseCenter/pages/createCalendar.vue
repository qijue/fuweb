<template lang="pug">
    div.calendar-app
      .calendar-table(v-for="(date, index) in dates" :key="index")
        .calendar-title-div
          el-button.month-btn(type="primaty" size="mini" @click="clickChangeMonth(-1)") 上个月
          .title {{date.year}}-{{date.month}}
          el-button.month-btn(type="primaty" size="mini" @click="clickChangeMonth(1)") 下个月
        .calendar-week
          .calendar-item.rest 日
          .calendar-item 一
          .calendar-item 二
          .calendar-item 三
          .calendar-item 四
          .calendar-item 五
          .calendar-item.rest 六
        .calendar-item-content
          .calendar-item(
            :class="getCalDayClassName(day)"
            v-for="(day, dayindex) in date.days"
            :key="index + '-' + dayindex")
            .date-top(:class="getTopHiddenClass(day.topInfo)") {{day.topInfo || '空'}}
            .date(v-if="day.isToday") 今天
            .date(v-else) {{day.day || ''}}
            .date-bottom(:class="getTopHiddenClass(day.bottomInfo)") {{day.bottomInfo || '空'}}
</template>


<script>
class CalendarDay {
  constructor(isShow, date = "") {
    this.setIsShow(isShow);
    this.setIsDisabled();
    this.setDate(date);
    this.setRest();
    this.setTopInfo();
  }
  setDate(date) {
    this.date = date;
    let _arr = date.split("-");
    this.year = _arr[0] - 0;
    this.month = _arr[1] - 0;
    this.day = _arr[2] - 0;
    this.setIsToday(
      moment().format("YYYY-MM-DD") == moment(date).format("YYYY-MM-DD")
    );
    return this;
  }
  setRest(isRest) {
    this.isRest = isRest;
    return this;
  }
  setIsToday(isToday = false) {
    this.isToday = isToday;
    return this;
  }
  setIsShow(isShow) {
    this.isShow = isShow;
    return this;
  }
  // 设置为不可用
  setIsDisabled(disabled = false) {
    this.isDisabled = disabled;
    return this;
  }

  setTopInfo(info) {
    this.topInfo = info;
    return this;
  }

  static init(isShow, date) {
    return new this(isShow, date);
  }
  static initHide(isShow) {
    return new this(isShow);
  }
}

import moment from "moment";
import { calendar } from "@/utils/index";
import festivel from "@/assets/data/calendar_festival";

export default {
  data() {
    return {
      festivel: festivel,
      currentM: moment(),
      dates: []
    };
  },
  created() {
    let minDate = moment().format("YYYY-MM-DD");
    let maxDate = moment()
      .add(30, "days")
      .endOf("month")
      .format("YYYY-MM-DD");
    this.currentM = moment(minDate)
    let monthCount = this.monthCount(minDate, maxDate);
    this.dates = this.getMonthDaysArr(minDate, maxDate, 1);
  },
  methods: {
    getCalDayClassName(day) {
      let className = [];
      if (!day.isShow) {
          className.push('empty');
      }
      if (day.isRest && !day.isDisabled) {
          className.push('rest');
      }
      if (day.isDisabled) {
          className.push('disabled');
      }
      // if (this.selectedDates.indexOf(day.date) > -1) {
      //     className.push('active');
      // }
      return className.join(' ');
    },
    // 切换月份
    clickChangeMonth(type) {
      if (type == -1) {
        this.currentM = moment(this.currentM).add(-1, 'month').startOf('month')
      } else {
        this.currentM = moment(this.currentM).add(1, 'month').startOf('month')
      }
      let minDate = moment(this.currentM).format('YYYY-MM-DD')
      let maxDate = moment(minDate).add(30, 'days').endOf('month').format('YYYY-MM-DD')
      let monthCount = this.monthCount(minDate, maxDate);
      this.dates = this.getMonthDaysArr(minDate, maxDate, 1);
    },
    // 计算两个日期的月份差
    monthCount(date1, date2) {
      date1 = date1.split("-");
      date2 = date2.split("-");
      let year1 = parseInt(date1[0]),
        month1 = parseInt(date1[1]),
        year2 = parseInt(date2[0]),
        month2 = parseInt(date2[1]),
        months = (year2 - year1) * 12 + (month2 - month1) + 1;
      return months;
    },
    getTopHiddenClass(info) {
      let className = [];
      if(!info || (typeof(info) === 'string' && info.length <= 0)) {
          className.push('hidden-top-bottom');
      }
      return className;
  },
    // 得到多个月 date: 开始的日期
    getMonthDaysArr(minDate, maxDate, count) {
      count = count == 0 ? 1 : count;
      let arr = [];
      for (let i = 0; i < count; i++) {
        let curDate = moment(minDate).add(i, "months");
        let daysArr = this.getDaysArr(curDate._d);
        this.handlerDaysArr(daysArr, minDate, maxDate);
        let obj = {
          year: curDate.format("YYYY"),
          month: curDate.format("MM"),
          date: curDate.format("YYYY-MM-DD"),
          days: daysArr
        };
        arr.push(obj);
      }
      return arr;
    },
    handlerDaysArr(arr, minDate, maxDate) {
      for (let day of arr) {
        let _date = day.date;
        // 判断当前日期是否在可选日期范围内
        let isDisabled = (
          moment(_date).isBefore(moment(moment().format('YYYY-MM-DD', 'day')))
        );
        // // 判断当前日期是否在可选日期范围内
        // let isDisabled = !(
        //   moment(_date) >= moment(minDate) && moment(_date) <= moment(maxDate)
        // );
        day.setIsDisabled(isDisabled);
      }
    },
    // 得到一个月的天数
    getDaysArr(curDate) {
      let arr = [];
      curDate = curDate || new Date();

      let year = curDate.getFullYear();
      let month = curDate.getMonth();
      let monthFirstDate = new Date(year, month, 1);
      let weekIndex = monthFirstDate.getDay();

      // 补空位
      for (let i = 0; i < weekIndex; i++) {
        arr.push(CalendarDay.initHide(false));
      }

      let count = 0;
      for (let i = 0; i < 60; i++) {
        let afterDate = moment(monthFirstDate).add(i, "days");
        let _year = afterDate.format("YYYY") - 0;
        let _month = afterDate.format("M") - 0;
        let _day = afterDate.format("D") - 0;
        let _date = afterDate.format("YYYY-MM-DD");
        let dayObj = new CalendarDay(true, _date);
        dayObj.isRest = false;
        let _mmdd = afterDate.format("MM-DD");
        let _newDate = new Date(_year, _month - 1, _day);
        let _week = _newDate.getDay();
        if (this.festivel.rest[_date] || _week == 0 || _week == 6) {
          dayObj.isRest = true;
          if (this.festivel.work[_date]) {
            dayObj.isRest = false;
          }
        }
        let _chineseDate = calendar.solar2lunar(_year, _month, _day);
        let lunar =
          (_chineseDate.lMonth < 10 ? "0" : "") +
          _chineseDate.lMonth +
          "-" +
          (_chineseDate.lDay < 10 ? "0" : "") +
          _chineseDate.lDay;
        if (this.festivel.rest[_date]) {
          dayObj.topInfo = this.festivel.rest[_date]["info"];
        }
        if (this.festivel.work[_date]) {
          dayObj.topInfo = this.festivel.work[_date]["info"];
        }
        if (this.festivel.gregorianFestival[_mmdd]) {
          dayObj.topInfo = this.festivel.gregorianFestival[_mmdd]["info"];
        }
        if (this.festivel.chineseFestival[lunar]) {
          dayObj.topInfo = this.festivel.chineseFestival[lunar]["info"];
        }
        if (_month - 1 != month) {
          break;
        }
        arr.push(dayObj);
      }
      return arr;
    }
  }
};
</script>


<style lang="scss" scoped>

.calendar-app {
  display: flex;
  justify-content: center;
  .calendar-table {
    display: flex;
    flex-direction: column;
    .calendar-title-div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100px;
      .title {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .month-btn {
        display: flex;
      }
    }
    .calendar-week {
      display: flex;
    }
    .calendar-item-content {
      display: flex;
      flex-wrap: wrap;
      max-width: 700px;

    }
    .calendar-item{
      border: 1px solid #ddd;
      width: 100px;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-left: -1px;
      margin-top: -1px;
      &.empty {
        // visibility: hidden;

      }
      &.disabled {
        color: #999;
      }
      &.rest {
        color: #f0af05;
      }
      &.active {
        background: #FECD15;
        border-radius: 4px;
        color: #222;
      }
      .date {
        margin: 5px 0;
      }
      .date-top, .date-bottom {
        &.hidden-top-bottom {
          visibility: hidden;
        }
      }
    }
  }
}

</style>


