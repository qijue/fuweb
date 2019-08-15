<template lang="pug">
  .pug-page-container
    .list(v-if="1 == 2")
      .one-box(v-for="(item, index) in [1,2,3,4]" :key="index") this is {{index}}
    .list(v-else)
      .one-box this is else
    template(v-if="type == 1")
      .type-div this is type == 1
    template(v-else-if="type == 2")
      .type-div this is type == 2
    template(v-else)
      .type-div this is type == other
</template>

<script>
export default {
  data() {
    return {
      type: 1
    }
  }
}
</script>

<style lang="scss" scoped>
.pug-page-container {
  display: flex;
  background: red;
}
</style>

