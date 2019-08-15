<template>
  <!-- 分割线 -->
  <div class="container">
    <h3>生成短链</h3>
    <el-input v-model="imageUrls" :rows="7" type="textarea" placeholder="格式为 url,url,url"></el-input>
    <el-button type="primary" @click="clickCreateLink">生成短链</el-button>
    <el-table :data="shortLinks">
      <el-table-column prop="oldUrl" label="老地址"></el-table-column>
      <el-table-column prop="newUrl" label="短链地址">
        <template slot-scope="scope">
          <div>{{scope.row.newUrl}}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import API from '@/api/index'

export default {
  data() {
    return {
      shortLinks: [],
      imageUrls: "",
      shortLinkStr: ""
    };
  },
  created() {},
  methods: {

    clickCreateLink() {
      let urls = this.imageUrls.split(",");
      let list = [];
      if (urls.length <= 0) {
        this.$message.warn("请输入需要生成短链的地址");
        return;
      }

      API.baseCenter.httpCreateShortLinks({
        urls: urls
      }).then(data => {
        this.shortLinks = data.urlList;
      }).catch(e => {
        this.handlerError(e)
      })
    },
    handlerError(e) {
      console.warn(e)
      if (e.errorCode) {
        this.$message.warning(e.msg)
      } else {
        this.$message.error(e.message)
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.set-body,
.get-body {
  display: flex;
  margin-bottom: 20px;
}
.get-body {
  flex-direction: column;
}
.get-body .line {
  display: flex;
  align-items: center;
}
.get-body .desc {
  margin-top: 10px;
}
.json-view {
  white-space: pre-wrap;
}
</style>


