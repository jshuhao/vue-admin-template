<template>
  <a-spin class="my-spin"
          :tip="tip"
          :spinning="loading">
    <!-- <a-icon slot="indicator"
            type="loading"
            style="font-size: 24px"
            :style="{display: gif ? 'none' : 'block'}"
            spin /> -->
    <div slot="indicator">
      <a-icon type="loading"
              style="font-size: 24px"
              spin />
    </div>
    <slot></slot>
  </a-spin>
</template>

<script>
export default {
  props: {
    setClass: {
      type: String,
      default: ''
    },
    tip: {
      type: String,
      default: '正在努力加载中...'
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less">
.my-spin {
  height: 100%;
  & > div > .ant-spin {
    max-height: 100% !important;
  }

  flex: 1;
  // .ant-spin-container {
  //   display: flex;
  //   height: 100%;
  // }
}
.set-height {
  .ant-spin-container {
    height: 100%;
  }
}
</style>