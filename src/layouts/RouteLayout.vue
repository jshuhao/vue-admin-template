<template>
  <div class="router-layout height-100">
    <transition name="fade-transform"
                mode="out-in">

      <div class="height-100">
        <keep-alive :exclude="excludeViews">
          <router-view :key="key"
                       v-if="keepAlive" />
        </keep-alive>
        <router-view :key="key"
                     v-if="!keepAlive" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'RouteLayout',
  data () {
    return {}
  },
  computed: {
    excludeViews () {
      return this.$store.state.multiTab.excludeViews
    },
    key () {
      return this.$route.path
    },
    keepAlive () {
      return this.$route.meta.keepAlive
    }
  }
  /*   render() {
    const {
      $route: { meta },
      $store: { getters },
    } = this
    const inKeep = (
      <keep-alive>
        <router-view />
      </keep-alive>
    )
    // const notKeep = <router-view />
    // 这里增加了 multiTab 的判断，当开启了 multiTab 时
    // 应当全部组件皆缓存，否则会导致切换页面后页面还原成原始状态
    // 若确实不需要，可改为 return meta.keepAlive ? inKeep : notKeep
    if (!getters.multiTab && !meta.keepAlive) {
      return notKeep
    }
    return this.keepAlive || getters.multiTab || meta.keepAlive ? inKeep : notKeep
  }, */
}
</script>
