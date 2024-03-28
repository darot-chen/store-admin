<template>
  <Swiper
    class="w-full gap-4 rounded-[10px] drop-shadow-lg"
    :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperPagination]"
    :slides-per-view="1"
    :loop="true"
    :effect="'creative'"
    :space-between="50"
    :autoplay="{
      delay: 2500,
    }"
    :creative-effect="{
      prev: {
        shadow: false,
        translate: ['-100%', 0, -1],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    }"
  >
    <SwiperSlide class="cursor-pointer rounded-lg object-cover">
      <NuxtImg
        class="w-full rounded-lg"
        src="/images/banners/banner-1.png"
        height="343"
      />
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import "swiper/css";
</script>
