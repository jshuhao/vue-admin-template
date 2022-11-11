<template>
  <div class="logo">
    <router-link :to="{ path: defaultRootRoutePath }">
      <!-- <LogoSvg alt="logo" /> -->
      <img :src="logoImg"
           alt="">
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
// import LogoSvg from '@/assets/logo.svg?inline'
import { defaultRootRoutePath } from '@/router/router.config'
export default {
  name: 'Logo',
  // components: {
  //   LogoSvg,
  // },
  data () {
    return {
      defaultRootRoutePath,
      logoImg: require('@/assets/logo.png')
    }
  },
  props: {
    title: {
      type: String,
      default: 'vue-admin',
      required: false,
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
}
</script>
