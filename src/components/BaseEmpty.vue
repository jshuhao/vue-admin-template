<template>
  <div class="width-100 height-100 empty-box"
       :class="{hasFix:'fixed-skeleton'}">
    <a-empty :image="imgUrl"
             :image-style="{
      height: imgHeight+'px',
    }">
      <span slot="description">{{descriptionMsg}}</span>
    </a-empty>
  </div>
</template>

<script>
export default {
  props: {
    hasFix: {
      type: Boolean,
      default: true
    },
    imgHeight: {
      type: Number,
      default: 150
    },
    descriptionMsg: {
      type: String,
      default: '暂无更多数据'
    },
  },
  data () {
    return {
      imgUrl: require('@/assets/original.png')
    }
  }
}
</script>

<style scoped lang="less">
.empty-box {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>