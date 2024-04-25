<script setup lang="ts"></script>

<template>
  <div class="layout-page">
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <!-- 这里的route路由配合 to切换路由 -->
    <van-tabbar route>
      <!-- 路由名字 -->
      <van-tabbar-item to="/home">
        首页
        <template #icon="{ active }">
          <cp-icon :name="`home-index-${active ? 'active' : 'default'}`"></cp-icon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/article"
        >健康百科
        <template #icon="{ active }">
          <cp-icon :name="`home-article-${active ? 'active' : 'default'}`"></cp-icon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/notify"
        >消息通知
        <template #icon="{ active }">
          <cp-icon :name="`home-notice-${active ? 'active' : 'default'}`"></cp-icon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/user"
        >我的
        <template #icon="{ active }">
          <cp-icon :name="`home-mine-${active ? 'active' : 'default'}`"></cp-icon>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<!-- <style>
.van-tabbar-item__text {
  color: #fff;
}
</style> -->
<style scoped lang="scss">
.layout-page {
  :deep() {
    .van-tabbar-item {
      &__icon {
        font-size: 21px;
      }
      &__text {
        font-size: 11px;
      }
      &:not(.van-tabbar-item--active) {
        color: var(--cp-text3);
      }
    }
  }
}
</style>
