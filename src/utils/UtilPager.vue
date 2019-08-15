<template>
  <el-pagination
    @size-change="sizeChange"
    @current-change="currentChange"
    :current-page="paCurrentPage"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="paPageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'UtilPager',
  data() {
    return {
      paCurrentPage: 1,
      paPageSize: 10
    }
  },
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    total: Number,
    start: 0
  },
  watch: {
    total: function(val) {
      const totalPage = parseInt(val / this.pageSize) + 1
      if (this.paCurrentPage > totalPage) {
        this.paCurrentPage = totalPage
      }
    },
    paCurrentPage: function() {
      this.$emit('changeStart', (this.paCurrentPage - 1) * this.paPageSize, this.paPageSize)
    },
    paPageSize: function() {
      this.$emit('changeStart', (this.paCurrentPage - 1) * this.paPageSize, this.paPageSize)
    },
    start: function() {
      if ((this.paCurrentPage - 1) * this.paPageSize !== this.start) {
        this.paCurrentPage = this.start / this.paPageSize + 1
      }
    }
  },
  mounted: function() {
    this.paPageSize = this.pageSize
  },
  methods: {
    currentChange: function(val) {
      this.paCurrentPage = val
    },
    sizeChange: function(val) {
      this.paPageSize = val
    }
  }

}
</script>

<style scoped>

</style>
