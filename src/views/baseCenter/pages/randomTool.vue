
<template>
  <div style="padding-bottom:50px;padding-left:20px;">
    <div class="filter-box">
      <div style="display: flex;align-items: center;margin-right: 20px;">
        <el-radio v-model="userNameType" label="1">单姓</el-radio>
        <el-radio v-model="userNameType" label="2">复姓</el-radio>
      </div>

      <el-input v-model="birthday" style="width: 300px;" placeholder="请输入指定生日(20190101)"></el-input>
      <el-select v-model="address" filterable placeholder="请选择省">
        <el-option v-for="item in areas" :key="item.code" :label="item.name" :value="item.code"></el-option>
      </el-select>

      <el-select v-model="searchBankValue" filterable placeholder="请选择银行">
        <el-option
          v-for="item in bankTypes"
          :key="item.bank_no"
          :label="item.bank_name"
          :value="item.bank_no"
        ></el-option>
      </el-select>

      <el-button @click="clickCreate" type="primary">生成</el-button>
    </div>

    <el-table :data="randUserInfos">
      <el-table-column prop="userName" label="姓名"></el-table-column>
      <el-table-column prop="userPhone" label="手机号"></el-table-column>
      <el-table-column prop="userIDCard" label="身份证"></el-table-column>
      <el-table-column prop="userBankCard" label="银行卡"></el-table-column>
      <el-table-column prop="userIDCardInfo.cardAddress" label="城市"></el-table-column>
      <el-table-column prop="userIDCardInfo.sex" label="性别"></el-table-column>
      <el-table-column prop="userIDCardInfo.birthday" label="生日"></el-table-column>
      <el-table-column prop="userIDCardInfo.old" label="年龄"></el-table-column>
    </el-table>
  </div>
</template>


<script>

import {
  getAreaInfo,
  getCardIdInfo,
  getRandCardId,
  getRandName,
  getRandMobile,
  getRandBankCard
} from '@/utils/index'

export default {
  data() {
    return {
      randUserInfos: [],
      areas: [],
      birthday: "",
      address: "",
      userNameType: "1",
      searchBankValue: "0102",
      bankTypes: [
        { bank_no: "0102", bank_name: "工商银行" },
        { bank_no: "0103", bank_name: "农业银行" },
        { bank_no: "0105", bank_name: "中国建设银行" },
        { bank_no: "0301", bank_name: "中国交通银行" },
        { bank_no: "104", bank_name: "中国银行" },
        { bank_no: "0303", bank_name: "光大银行" },
        { bank_no: "305", bank_name: "中国民生银行" },
        { bank_no: "0308", bank_name: "中国招商银行" },
        { bank_no: "0410", bank_name: "平安银行" },
        { bank_no: "302", bank_name: "中信银行" },
        { bank_no: "304", bank_name: "华夏银行" },
        { bank_no: "309", bank_name: "兴业银行" },
        { bank_no: "315", bank_name: "常熟农村商业银行" },
        { bank_no: "316", bank_name: "中国工商银行借记卡" }
      ]
    };
  },
  mounted() {
    var areaObj = getAreaInfo();
    this.areas = [{ code: "", name: "请选择地址" }];
    for (var k in areaObj) {
      this.areas.push({
        code: k,
        name: areaObj[k]
      });
    }

    this.clickCreate();
  },
  methods: {
    clickCreate() {
      this.randUserInfos = this.getR();
    },
    getR() {
      var arr = [];
      for (var i = 0; i < 10; i++) {
        var item = {
          userName: getRandName(this.userNameType),
          userIDCard: getRandCardId(this.birthday, this.address),
          userBankCard: getRandBankCard(this.searchBankValue),
          userPhone: getRandMobile()
        };
        item.userIDCardInfo = getCardIdInfo(item.userIDCard);
        arr.push(item);
      }
      return arr;
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
}
.line .name {
  font-size: 14px;
  color: #4fc08d;
}
.filter-box {
  display: flex;
  align-items: center;
}
</style>

