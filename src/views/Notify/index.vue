<template>
  <div class="notify-container">
    <swiper :rows="rows" />
    <div class="q"></div>
  </div>
</template>

<script setup lang="ts">
import swiper from './components/swiper.vue'

const rows = ref([
  { img: 'https://tw.toptoontw.com/dnsimg/cover/tm992931/cover3.jpg' },
  { img: 'https://tw.toptoontw.com/dnsimg/cover/tm992943/cover8.jpg' },
  { img: 'https://tw.toptoontw.com/dnsimg/cover/tm992950/cover3.jpg' },
  { img: 'https://tw.toptoontw.com/pics/cover/tm992892/cover1.jpg' }
])
</script>

<style scoped lang="scss">
.notify-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
</style>
