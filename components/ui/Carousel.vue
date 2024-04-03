<template>
  <div class="w-full gap-4 rounded-[10px] drop-shadow-lg">
    <Swiper
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
      <SwiperSlide class="cursor-pointer rounded-lg">
        <NuxtLink to="https://bsdb168.com/" target="_blank">
          <UiImg
            class="max-h-[200px] min-h-[136px] w-full rounded-lg object-cover"
            src="banners/banner-1.jpg"
            alt="banner-1"
          />
        </NuxtLink>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import "swiper/css";
</script>
